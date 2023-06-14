import { faCamera, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import images from '~/assets/images';
import { UserAuth } from '~/firebase/context/AuthContext';
import { addAddress } from '~/slice/addressSlice';
import { addressSelector } from '~/slice/selector';
import styles from './ProfileUser.module.scss';
const cx = classNames.bind(styles);
function ProfileUser() {
  const { user } = UserAuth();
  const selector = useSelector(addressSelector);
  const [yourAddress, setYourAddress] = useState(selector.address);
  const [yourPhone, setYourPhone] = useState(selector.numberPhone);
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    // Get data auth
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
        // setUserData(null);
      }
    };
    getUserData();
  }, []);

  const handleYourAddress = (e) => {
    setYourAddress(e.target.value);
  };

  const handleYourPhone = (e) => {
    setYourPhone(e.target.value);
  };
  const handleSave = () => {
    dispatch(
      addAddress({
        address: yourAddress,
        numberPhone: yourPhone,
        isModal: false,
      })
    );
  };
  return (
    <div className={cx('wrapper')}>
      <div>
        <header>
          <h1 className={cx('head')}>PROFILE</h1>
        </header>
        <main>
          <div className={cx('image')}>
            <span className={cx('icon')}>
              <FontAwesomeIcon icon={faCamera} />
            </span>
            <img
              className={cx('image-profile')}
              src={(user && user.photoURL) || images.userProfile}
              alt=""
            ></img>
            <span className={cx('icon')}>
              <FontAwesomeIcon icon={faTrashCan} />
            </span>
          </div>

          <div className={cx('gender')}>
            <form>
              <div className={cx('check')}>
                <input type="radio" id="gender1" name="gender" />
                <label htmlFor="gender1">Male</label>
              </div>
              <div className={cx('check')}>
                <input type="radio" id="gender2" name="gender" />
                <label htmlFor="gender2">Female</label>
              </div>
              <div className={cx('check')}>
                <input type="radio" id="gender3" name="gender" />
                <label htmlFor="gender3">Other</label>
              </div>
            </form>
          </div>

          <div className={cx('information')}>
            <div className={cx('inner')}>
              <div className={cx('flex')}>
                <div className={cx('info')}>
                  <span className={cx('title')}>Full name</span>
                  <input
                    className={cx('input')}
                    value={
                      user?.displayName || userData?.name || 'Hãy đăng nhập'
                    }
                    disabled
                  />
                </div>

                <div className={cx('info')}>
                  <span className={cx('title')}>Email</span>
                  <input
                    className={cx('input')}
                    value={user?.email || userData?.email || 'Hãy đăng nhập'}
                    disabled
                  />
                </div>
              </div>

              <div className={cx('flex')}>
                <div className={cx('info')}>
                  <span className={cx('title')}>Phone number</span>
                  <input
                    className={cx('input')}
                    value={yourPhone}
                    onChange={handleYourPhone}
                  />
                </div>

                <div className={cx('info')}>
                  <span className={cx('title')}>Address</span>
                  <input
                    className={cx('input')}
                    value={yourAddress}
                    onChange={handleYourAddress}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={cx('button')}>
            <button onClick={handleSave}>Save</button>
          </div>
        </main>
        <footer>
          <p className={cx('footer')}>
            Cảm ơn đã điền đầy đủ thông tin trên mong trang bán hàng sẽ giúp quý
            khách có những trải nghiệm mới mẻ và đầy thú vị!
          </p>
        </footer>
      </div>
    </div>
  );
}
export default ProfileUser;
