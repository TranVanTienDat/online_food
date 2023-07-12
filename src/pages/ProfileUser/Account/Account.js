import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { content, sideBar } from '~/constants/menuAccount';
import { UserAuth } from '~/firebase/context/AuthContext';
import { setStatus } from '~/slice/infoDataUser';
import { infoDataUserSelector } from '~/slice/selector';
import styles from './Account.module.scss';
const cx = classNames.bind(styles);
const item = ['', '', ''];
function Account() {
  const { logOut } = UserAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, email, address, numberPhone, gender, id, image } =
    useSelector(infoDataUserSelector);

  const [navigation, setNavigation] = useState(0);
  const [tag, setTag] = useState(0);
  const [progress, setProgress] = useState(-1);

  useEffect(() => {
    const getProgress = () => {
      if (gender !== '') {
        setProgress((prev) => prev + 1);
      }
      if (name !== '' && email !== '') {
        setProgress((prev) => prev + 1);
      }
      if (address !== '' && numberPhone !== '') {
        setProgress((prev) => prev + 1);
      }
    };
    getProgress();
  }, [name, email, address, numberPhone, gender]);

  const handleNavigate = async (i) => {
    if (i < 3) {
      setTag(i);
      setNavigation(i);
    }
    if (i === 3) {
      try {
        if (id === 'firebase') {
          await logOut();
        } else {
          localStorage.removeItem('access');
          localStorage.removeItem('isMenuPrice');
          localStorage.removeItem('isMenuRate');
          dispatch(setStatus({ status: false, id: '' }));
        }

        navigate('/');
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
                  {item.map((item, i) => {
                    return (
                      <div
                        key={i}
                        className={cx('item', progress >= i ? 'color' : '')}
                      ></div>
                    );
                  })}
                </div>
                {/* progress */}
                <div className={cx('navigate')}>
                  {sideBar.map((item, i) => {
                    return (
                      <span
                        key={i}
                        className={cx(
                          'item',
                          navigation === i ? 'background' : ''
                        )}
                        onClick={() => handleNavigate(i)}
                      >
                        <FontAwesomeIcon
                          icon={item.icon}
                          className={cx('icon')}
                        />
                        <h4 className={cx('title')}>{item.title}</h4>
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className={cx('content')}>
                {/*render component*/}
                {content.map((item, i) => {
                  const Tag = item.title;
                  return <Tag key={i} isBlock={tag === i ? true : false} />;
                })}
                {/*render component*/}
              </div>
            </div>
          </div>
          <div className={cx('image')}>
            <img className={cx('img')} src={image} alt="" />
            <span className={cx('fullName')}>{name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
