import {
  faArrowRightFromBracket,
  faArrowRightToBracket,
  faCircleInfo,
  faIdBadge,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import images from '~/assets/images';
import Button from '~/components/Button/Button';
import Cart from '~/components/MenuCart/Cart';
import config from '~/config';
import { UserAuth } from '~/firebase/context/AuthContext';

import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './header.module.scss';
import { useEffect, useState } from 'react';
const cx = classNames.bind(styles);

function Header() {
  const { logOut, user } = UserAuth();
  const [isbackground, setIsBackground] = useState();
  // console.log(user);
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };
  const handleRegister = () => {
    navigate('/register');
  };
  const handleLognIn = () => {
    navigate('/log-in');
  };
  const handleOrder = () => {
    navigate('/order-online');
  };
  const classes = cx('header', {
    blue: isbackground,
    transparent: !isbackground,
  });
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsBackground(true);
      } else {
        setIsBackground(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={classes}>
      <div className={cx('inner')}>
        <div className={cx('logo')}>
          <img src={images.logo} alt="onlineFood" className={cx('logo-img')} />
        </div>

        <div className={cx('action')}>
          <Button to={config.routes.home} text>
            HOME
          </Button>
          <Button to={config.routes.profileUser} text>
            PROFILE
          </Button>
          <Button text onClick={handleOrder}>
            ORDER ONLINE
          </Button>
          <Button text>CONTACT</Button>
        </div>
        <div className={cx('user')}>
          <Cart />
          {user ? (
            <Tippy
              arrow={true}
              interactive
              render={(attrs) => (
                <ul className={cx('menu__user')} {...attrs} tabIndex="-1">
                  <li className={cx('menu__item')}>
                    <FontAwesomeIcon
                      className={cx('menu__icon')}
                      icon={faIdBadge}
                    />
                    My account
                  </li>
                  <li className={cx('menu__item')}>
                    <FontAwesomeIcon
                      className={cx('menu__icon')}
                      icon={faCircleInfo}
                    />
                    Feedback and help
                  </li>
                  <li className={cx('menu__item')} onClick={handleSignOut}>
                    <FontAwesomeIcon
                      className={cx('menu__icon')}
                      icon={faArrowRightFromBracket}
                    />
                    Log out
                  </li>
                </ul>
              )}
            >
              <img
                className={cx('user-avatar')}
                src={user && user.photoURL}
                alt=""
              ></img>
            </Tippy>
          ) : (
            <>
              <div className={cx('logIn')}>
                <Button
                  login
                  onClick={handleLognIn}
                  icon={<FontAwesomeIcon icon={faArrowRightToBracket} />}
                >
                  Sing in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
