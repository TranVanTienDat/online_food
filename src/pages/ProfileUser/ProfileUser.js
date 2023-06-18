import { faCamera, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, updateUser } from '~/api/authApi';
import images from '~/assets/images';
import { UserAuth } from '~/firebase/context/AuthContext';
import { addAddress } from '~/slice/addressSlice';
import { addressSelector } from '~/slice/selector';
import styles from './ProfileUser.module.scss';
import { success } from '~/constants/ToastMessage/ToastMessage';
const cx = classNames.bind(styles);
function ProfileUser() {
  const { user } = UserAuth();
  console.log(user);
  const dispatch = useDispatch();
  const { address, numberPhone, gender } = useSelector(addressSelector);
  const [_id, set_id] = useState();
  const [info, setInfo] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    address,
    numberPhone,
    gender,
  });
  console.log(info);
  useEffect(() => {
    window.scrollTo(0, 0);
    // Get data auth mongodb
    const fetchData = async () => {
      try {
        const res = await getUserData();
        // console.log('res: ', res);
        if (res) {
          setInfo((prev) => ({
            ...prev,
            name: res.name,
            email: res.email,
            address: res.address,
            numberPhone: res.phoneNumber,
            gender: res.gender,
          }));
          set_id(res._id);
        }
      } catch (error) {
        // console.log(error);
        console.log('No users');
      }
    };
    fetchData();
  }, []);

  const handleFullName = useCallback((e) => {
    setInfo((prev) => ({ ...prev, name: e.target.value }));
  }, []);

  const handleEmail = useCallback((e) => {
    setInfo((prev) => ({ ...prev, email: e.target.value }));
  }, []);

  const handleYourAddress = useCallback((e) => {
    setInfo((prev) => ({ ...prev, address: e.target.value }));
  }, []);

  const handleYourPhone = useCallback((e) => {
    setInfo((prev) => ({ ...prev, numberPhone: e.target.value }));
  }, []);

  const handleGenderChange = useCallback((e) => {
    setInfo((prev) => ({ ...prev, gender: e.target.value }));
  }, []);

  const handleSave = async () => {
    if (user) {
      dispatch(
        addAddress({
          address: info.address,
          numberPhone: info.numberPhone,
          gender: info.gender,
          isModal: false,
        })
      );
    } else {
      await updateUser(_id, {
        name: info.name,
        email: info.email,
        gender: info.gender,
        address: info.address,
        phoneNumber: info.numberPhone,
      });
    }

    success('Update success');
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
                <input
                  type="radio"
                  id="gender1"
                  name="gender"
                  value="male"
                  onChange={handleGenderChange}
                  checked={info.gender === 'male'}
                />
                <label htmlFor="gender1">Male</label>
              </div>
              <div className={cx('check')}>
                <input
                  type="radio"
                  id="gender2"
                  name="gender"
                  value="female"
                  onChange={handleGenderChange}
                  checked={info.gender === 'female'}
                />
                <label htmlFor="gender2">Female</label>
              </div>
              <div className={cx('check')}>
                <input
                  type="radio"
                  id="gender3"
                  name="gender"
                  value="other"
                  onChange={handleGenderChange}
                  checked={info.gender === 'other'}
                />
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
                    value={user ? user.displayName : info.name}
                    onChange={handleFullName}
                    disabled={!!user}
                  />
                </div>

                <div className={cx('info')}>
                  <span className={cx('title')}>Email</span>
                  <input
                    className={cx('input')}
                    value={user ? user.email : info.email}
                    onChange={handleEmail}
                    disabled={!!user}
                  />
                </div>
              </div>

              <div className={cx('flex')}>
                <div className={cx('info')}>
                  <span className={cx('title')}>Phone number</span>
                  <input
                    className={cx('input')}
                    value={info.numberPhone}
                    onChange={handleYourPhone}
                  />
                </div>

                <div className={cx('info')}>
                  <span className={cx('title')}>Address</span>
                  <input
                    className={cx('input')}
                    value={info.address}
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
