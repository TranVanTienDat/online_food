import { Link, useNavigate } from 'react-router-dom';
import {
  faArrowRightFromBracket,
  faArrowRightToBracket,
  faBars,
  faBell,
  faCircleInfo,
  faHouseFire,
  faIdBadge,
  faMessage,
  faUserPlus,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import images from '~/assets/images';
import Button from '~/components/Button/Button';
import Cart from '~/components/MenuCart/Cart';
import config from '~/config';
import { UserAuth } from '~/firebase/context/AuthContext';

import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '~/api/authApi';
import { mobileNav } from '~/constants/mobileNav';
import { addInfo, setStatus } from '~/slice/info';
import { infoUser } from '~/slice/selector';
import styles from './header.module.scss';
const cx = classNames.bind(styles);

function Header() {
  const { logOut, user } = UserAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const infoUserSelector = useSelector(infoUser);
  // console.log('userSelector: ', infoUserSelector);

  const [isBackground, setIsBackground] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);

  // log out
  const handleLogOut = async () => {
    try {
      if (infoUserSelector.status) {
        if (infoUserSelector.id === '') {
          dispatch(setStatus({ status: false }));
          await logOut();
        } else if (infoUserSelector.id !== '') {
          localStorage.removeItem('access');
          dispatch(addInfo({ ...infoUserSelector, status: false, id: '' }));
        }

        navigate('/');
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
        if (res) {
          dispatch(
            addInfo({
              ...res, // spread res object
              numberPhone: res.phoneNumber,
              image: images.userIcon,
              status: true,
              id: res._id,
            })
          );
        }
      } catch (error) {
        console.log('No users');
      }
    };
    fetchData();

    // Handling background header
    const handleScroll = () => {
      setIsBackground(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);

    // clear fn
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (user?.displayName !== undefined || user?.email !== undefined) {
      dispatch(
        addInfo({
          name: user?.displayName,
          email: user?.email,
          address: '',
          numberPhone: '',
          gender: '',
          image: user?.photoURL,
          status: true,
          id: '',
        })
      );
    }
  }, [user]);

  //handle menu mobile
  const handleMenu = () => setToggleMenu((prevState) => !prevState);

  //handling classes background
  const classes = cx('header', {
    opacity: isBackground,
    transparent: !isBackground,
  });

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
        <div className={cx('nav')}>
          <div className={cx('logo')}>
            <img
              src={images.logo}
              alt="onlineFood"
              className={cx('logo-img')}
              onClick={() => navigate('/')}
            />
          </div>
          <div className={cx('action')}>
            <Button
              to={config.routes.home}
              text
              icon={<FontAwesomeIcon icon={faHouseFire} />}
            >
              HOME
            </Button>
            <Button
              text
              to={config.routes.orderOnline}
              icon={<FontAwesomeIcon icon={faUtensils} />}
            >
              ORDER ONLINE
            </Button>
            <Button text icon={<FontAwesomeIcon icon={faMessage} />}>
              CONTACT
            </Button>
          </div>
        </div>
        <div className={cx('user')}>
          <FontAwesomeIcon icon={faBell} className={cx('bell')} />
          <Cart />
          {infoUserSelector.status ? (
            <Tippy
              arrow={true}
              interactive
              render={(attrs) => (
                <ul className={cx('menu__user')} {...attrs} tabIndex="-1">
                  <li
                    className={cx('menu__item')}
                    onClick={() => navigate('/profile')}
                  >
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
              {infoUserSelector.status && (
                <img
                  className={cx('user-avatar')}
                  src={infoUserSelector.image || images.userIcon}
                  alt=""
                />
              )}
            </Tippy>
          ) : (
            <>
              <div className={cx('logIn')} onClick={() => navigate('/log-in')}>
                <Button
                  login
                  icon={<FontAwesomeIcon icon={faArrowRightToBracket} />}
                >
                  Sign in
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
