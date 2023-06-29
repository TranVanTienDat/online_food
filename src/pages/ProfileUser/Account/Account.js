import {
  faBell,
  faKey,
  faRightFromBracket,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '~/components/Button/Button';
import { UserAuth } from '~/firebase/context/AuthContext';
import { addInfo, setStatus } from '~/slice/info';
import { infoUser } from '~/slice/selector';
import styles from './Account.module.scss';
import ChangePassword from './components/ChangePassword/ChangePassword';
import DetailInfo from './components/DetailInfo/DetailInfo';
import Notification from './components/Notification/Notification';
const cx = classNames.bind(styles);

const sideBar = [
  { title: 'Account detail', icon: faUser },
  { title: 'Change password', icon: faKey },
  { title: 'Notification', icon: faBell },
  { title: 'Log out', icon: faRightFromBracket },
];

const content = [
  { title: DetailInfo },
  { title: ChangePassword },
  { title: Notification },
];

function Account() {
  const { logOut } = UserAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const infoSelector = useSelector(infoUser);

  const [nav, setnav] = useState(0);
  const [isTag, setIsTag] = useState(0);

  const handleNavigate = async (i) => {
    setnav(i);
    if (i < 3) {
      setIsTag(i);
    }
    if (i === 3) {
      try {
        if (infoSelector.status) {
          if (infoSelector.id === '') {
            dispatch(setStatus({ status: false }));
            await logOut();
          } else if (infoSelector.id !== '') {
            localStorage.removeItem('access');
            dispatch(addInfo({ ...infoSelector, status: false, id: '' }));
          }

          navigate('/');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('title')}>Account setting</h2>
      <div className={cx('inner')}>
        <div className={cx('account')}>
          <div className={cx('profile')}>
            <div className={cx('info')}>
              <div className={cx('sideBar')}>
                {/* progress */}
                <div className={cx('progress')}>
                  <div className={cx('item', 'color')}></div>
                  <div className={cx('item')}></div>
                  <div className={cx('item')}></div>
                </div>
                {/* progress */}
                <div className={cx('navigate')}>
                  {sideBar.map((item, i) => {
                    return (
                      <span
                        key={i}
                        className={cx('item', nav === i ? 'background' : '')}
                        onClick={() => handleNavigate(i)}
                      >
                        <FontAwesomeIcon
                          icon={item.icon}
                          className={cx('icon')}
                        />
                        {item.title}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className={cx('content')}>
                {/*render component*/}
                {content.map((item, i) => {
                  const Tag = item.title;
                  return <Tag key={i} isBlock={isTag === i ? true : false} />;
                })}
                {/*render component*/}
              </div>
            </div>
          </div>
          <div className={cx('image')}>
            <img
              className={cx('img')}
              src="https://previews.123rf.com/images/123rfexclusive/123rfexclusive2210/123rfexclusive221009178/192573942-3d-user-icon.jpg"
              alt=""
            />
            <div className={cx('button')}>
              <Button danger>Remove</Button>
              <Button danger>Upload</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
