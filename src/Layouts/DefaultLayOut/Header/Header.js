import { faBell } from '@fortawesome/free-regular-svg-icons';
import {
  faArrowRightFromBracket,
  faArrowRightToBracket,
  faBars,
  faCircleInfo,
  faHouse,
  faIdBadge,
  faMessage,
  faUserPlus,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import 'tippy.js/dist/svg-arrow.css';
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
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '~/api/authApi';
import { mobileNav } from '~/constants/mobileNav';
import { handleLogOut } from '~/hook/func';
import { addInfoDataUser } from '~/slice/infoDataUser';
import { infoDataUserSelector } from '~/slice/selector';
import styles from './header.module.scss';
const cx = classNames.bind(styles);

function Header() {
  const { logOut, user } = UserAuth();

  const { id, status, image } = useSelector(infoDataUserSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isBackground, setIsBackground] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);

  useEffect(() => {
    // Handling background header
    const handleScroll = () => {
      setIsBackground(window.scrollY > 500);
    };

    // dispatch from user
    const dispatchUserInfo = () => {
      console.log('firebase');
      if (user?.emailVerified) {
        dispatch(
          addInfoDataUser({
            name: user.displayName,
            email: user.email,
            image: user.photoURL || images.userProfile,
            status: true,
            id: 'firebase',
          })
        );
      }
    };

    // Get data auth mongodb
    // const fetchData = async () => {
    //   try {
    //     const res = await getUserData();
    //     if (res) {
    //       dispatch(
    //         addInfoDataUser({
    //           ...res, // spread res object
    //           numberPhone: res.phoneNumber,
    //           image: images.userProfile,
    //           status: true,
    //           id: res._id,
    //         })
    //       );
    //     }
    //   } catch (error) {
    //     console.log('No users');
    //   }
    // };

    //Call
    window.addEventListener('scroll', handleScroll);
    dispatchUserInfo();
    // fetchData();

    // clear event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [user, dispatch]);

  //handle menu mobile
  const handleMenu = () => setToggleMenu((prevState) => !prevState);

  //handling classes background
  const classes = cx('header', {
    opacity: isBackground,
    transparent: !isBackground,
  });

  return (
    <div className={classes}>
      {/* overlay responsive mobile*/}
      <div
        className={cx(toggleMenu ? 'overlay--open' : 'overlay--close')}
        onClick={handleMenu}
      ></div>
      {/* overlay responsive mobile*/}

      <div className={cx('inner')}>
        {/* handle responsive mobile*/}
        <div className={cx('mobile__menu')}>
          <FontAwesomeIcon
            className={cx('icon')}
            icon={faBars}
            onClick={handleMenu}
          ></FontAwesomeIcon>
          <ul
            className={cx(
              'navigates',
              toggleMenu ? 'toggle--open' : 'toggle--close'
            )}
          >
            {mobileNav.map((item, i) => {
              return (
                <li key={i}>
                  <Link
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
                </li>
              );
            })}
          </ul>

          <img
            src={images.logo}
            alt="onlineFood"
            className={cx('mobile__logo')}
            onClick={() => navigate('/')}
          />
        </div>
        {/* handle responsive mobile*/}

        <div className={cx('navigate')}>
          <div className={cx('logo')}>
            <img
              src={images.logo}
              alt="onlineFood"
              className={cx('logo__img')}
              onClick={() => navigate('/')}
            />
          </div>

          <div className={cx('action')}>
            <Button
              to={config.routes.home}
              text
              icon={<FontAwesomeIcon icon={faHouse} />}
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
          <div>
            <Cart />
          </div>
          {status ? (
            <Tippy
              arrow={true}
              interactive
              render={(attrs) => (
                <ul className={cx('user__menu')} {...attrs} tabIndex="-1">
                  <li
                    className={cx('item')}
                    onClick={() => navigate('/profile')}
                  >
                    <FontAwesomeIcon className={cx('icon')} icon={faIdBadge} />
                    My account
                  </li>
                  <li className={cx('item')}>
                    <FontAwesomeIcon
                      className={cx('icon')}
                      icon={faCircleInfo}
                    />
                    Feedback and help
                  </li>
                  <li
                    className={cx('item')}
                    onClick={() => handleLogOut(id, logOut, dispatch, navigate)}
                  >
                    <FontAwesomeIcon
                      className={cx('icon')}
                      icon={faArrowRightFromBracket}
                    />
                    Log out
                  </li>
                </ul>
              )}
            >
              {status && (
                <img className={cx('user__avatar')} src={image} alt="user" />
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
                {/* handle responsive */}
                <div className={cx('user__logIn__responsive')}>
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
