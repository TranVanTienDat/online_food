import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import { UserAuth } from '~/firebase/context/AuthContext';
import Button from '../Button/Button';
import styles from './UseComment.module.scss';

const cx = classNames.bind(styles);

function UseComment({ id }) {
  const { user } = UserAuth();
  const inputRef = useRef();
  const localCommentUser = JSON.parse(localStorage.getItem('comment'));
  const [comment, setComment] = useState('');
  const [listUserComments, setListUserComments] = useState(
    localCommentUser ?? []
  );

  // Xử lí input
  const handleChange = (e) => {
    const valueComment = e.target.value;
    if (!valueComment.startsWith(' ')) {
      setComment(valueComment);
    }
  };
  const handleComment = () => {
    const objectUserComment = {
      id: id,
      avatar: user.photoURL,
      name: user.displayName,
      comment: comment,
    };
    setListUserComments((prev) => {
      const newComment = [...prev, objectUserComment];

      //   lưu vào bộ nhớ cục bộ
      const jsonComment = JSON.stringify(newComment);
      localStorage.setItem('comment', jsonComment);
      return newComment;
    });
    setComment('');
  };

  return (
    <div className={cx('wrapper')}>
      <input
        className={cx('input')}
        ref={inputRef}
        value={comment}
        placeholder="Viết bình luận"
        onChange={handleChange}
      />
      <Button success onClick={handleComment}>
        Đăng
      </Button>

      <div className={cx('list__user')}>
        {listUserComments
          .filter((data) => data.id === id)
          .map((item, index) => (
            <div key={index} className={cx('user')}>
              <div className={cx('user__flex')}>
                <img className={cx('user__avatar')} src={item.avatar} alt="" />

                <div className={cx('user__comment')}>
                  <span className={cx('name')}>{item.name}</span>
                  <p className={cx('comment')}>{item.comment}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default UseComment;
