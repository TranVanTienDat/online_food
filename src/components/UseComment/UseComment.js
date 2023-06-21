import classNames from 'classnames/bind';
import propTypes from 'prop-types';
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { commentSelector, infoUser } from '~/slice/selector';
import { addComment } from '~/slice/userCommentSlice';
import Button from '../Button/Button';
import styles from './UseComment.module.scss';

const cx = classNames.bind(styles);

function UseComment({ id }) {
  const dispatch = useDispatch();
  const infoUserSelector = useSelector(infoUser);
  const commentUserSelector = useSelector(commentSelector);
  console.log('selector', commentUserSelector);
  const [comment, setComment] = useState('');

  // Handle input
  const handleChange = (e) => {
    const valueComment = e.target.value;
    if (!valueComment.startsWith(' ')) {
      setComment(valueComment);
    }
  };

  const handleComment = () => {
    if (comment.length > 0) {
      const objectUserComment = {
        id: id,
        avatar: infoUserSelector.image,
        name: infoUserSelector.name,
        comment: comment,
      };
      dispatch(addComment(objectUserComment));
    }
    setComment('');
  };
  return (
    <div className={cx('wrapper')}>
      <input
        className={cx('input')}
        value={comment}
        placeholder="Viết bình luận"
        onChange={handleChange}
      />
      <Button success onClick={handleComment}>
        Đăng
      </Button>

      <div className={cx('list__user')}>
        {commentUserSelector
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

UseComment.propTypes = {
  id: propTypes.node,
};

export default UseComment;
