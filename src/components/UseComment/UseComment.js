import axios from 'axios';
import classNames from 'classnames/bind';
import propTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import images from '~/assets/images';
import { UserAuth } from '~/firebase/context/AuthContext';
import { commentSelector } from '~/slice/selector';
import { addComment } from '~/slice/userCommentSlice';
import Button from '../Button/Button';
import styles from './UseComment.module.scss';

const cx = classNames.bind(styles);

function UseComment({ id }) {
  const { user } = UserAuth();
  const dispatch = useDispatch();
  const selector = useSelector(commentSelector);
  const [userData, setUserData] = useState();
  const [comment, setComment] = useState('');
  useEffect(() => {
    // Get data auth mongodb
    const getUserData = async () => {
      const authToken = localStorage.getItem('access');

      if (!authToken) {
        throw new Error('Unauthorized');
      }

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_AUTH_URL}/user/getAuth`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        setUserData(response.data.user);
      } catch (error) {
        throw new Error('Failed to fetch user data');
      }
    };
    getUserData();
  }, []);

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
        avatar: user?.photoURL || images.userIcon,
        name: user?.displayName || userData.name,
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
        {selector
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
