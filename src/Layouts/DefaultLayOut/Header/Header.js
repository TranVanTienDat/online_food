import {
  faArrowRightFromBracket,
  faArrowRightToBracket,
  faBars,
  faCircleInfo,
  faIdBadge,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';

import images from '~/assets/images';
import Button from '~/components/Button/Button';
import Cart from '~/components/MenuCart/Cart';
import config from '~/config';
import { UserAuth } from '~/firebase/context/AuthContext';

import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { getUserData } from '~/api/authApi';
import { mobileNav } from '~/constants/mobileNav';
import styles from './header.module.scss';
const cx = classNames.bind(styles);

function Header() {
  const { logOut, user } = UserAuth();
  const [userData, setUserData] = useState(); //lấy data từ server
  const [isBackground, setIsBackground] = useState();
  const [toggleMenu, setToggleMenu] = useState(false);
  const navigate = useNavigate();

  // Auth fireBase
  const handleLogOut = async () => {
    try {
      if (user) {
        await logOut();
      } else if (userData) {
        localStorage.removeItem('access');
        setUserData(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Get data auth mongodb
    const fetchData = async () => {
      try {
        const res = await getUserData();
        setUserData(res);
      } catch (error) {
        // console.log(error);
        console.log('No users');
      }
    };
    fetchData();
    // Handling background header
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsBackground(true);
      } else {
        setIsBackground(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
  }, []);

  // handling navigate
  const handleLogIn = () => {
    navigate('/log-in');
  };
  const handleOrder = () => {
    navigate('/order-online');
  };
  const handleLogo = () => {
    navigate('/');
  };

  //handling classes background
  const classes = cx('header', {
    blue: isBackground,
    transparent: !isBackground,
  });

  //handle menu mobile
  const handleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <div className={classes}>
      <div className={cx('inner')}>
        {/* xử lí responsive mobile*/}
        <div className={cx('menu-mobile')}>
          <FontAwesomeIcon
            className={cx('icon')}
            icon={faBars}
            onClick={handleMenu}
          ></FontAwesomeIcon>
          <ul
            className={cx(
              'list-nav',
              toggleMenu ? 'toggle-open' : 'toggle-close'
            )}
          >
            {mobileNav.map((item, i) => {
              return (
                <Link
                  key={i}
                  to={item.link}
                  className={cx('item')}
                  onClick={() => setToggleMenu(!toggleMenu)}
                >
                  <FontAwesomeIcon
                    className={cx('item-icon')}
                    icon={item.icon}
                  />
                  {item.title}
                </Link>
              );
            })}
          </ul>
        </div>
        {/* xử lí responsive mobile*/}

        <div className={cx('logo')}>
          <img
            src={images.logo}
            alt="onlineFood"
            className={cx('logo-img')}
            onClick={handleLogo}
          />
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
          {user || userData ? (
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
                  <li className={cx('menu__item')} onClick={handleLogOut}>
                    <FontAwesomeIcon
                      className={cx('menu__icon')}
                      icon={faArrowRightFromBracket}
                    />
                    Log out
                  </li>
                </ul>
              )}
            >
              {(user && (
                <img
                  className={cx('user-avatar')}
                  src={user?.photoURL ? user.photoURL : images.userIcon}
                  alt=""
                />
              )) ||
                (userData && (
                  <img
                    className={cx('user-avatar')}
                    src={images.userIcon}
                    alt=""
                  />
                ))}
            </Tippy>
          ) : (
            <>
              <div className={cx('logIn')} onClick={handleLogIn}>
                <Button
                  login
                  icon={<FontAwesomeIcon icon={faArrowRightToBracket} />}
                >
                  Sing in
                </Button>
                {/* xử lí responsive */}
                <div className={cx('login-user-responsive')}>
                  <FontAwesomeIcon icon={faUserPlus}></FontAwesomeIcon>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
