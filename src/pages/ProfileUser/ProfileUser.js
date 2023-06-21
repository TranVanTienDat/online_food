import { faCamera, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '~/api/authApi';
import images from '~/assets/images';
import { success } from '~/constants/ToastMessage/ToastMessage';
import { addFireBase } from '~/slice/info';
import { infoUser } from '~/slice/selector';
import styles from './ProfileUser.module.scss';
const cx = classNames.bind(styles);
function ProfileUser() {
  const dispatch = useDispatch();
  const { name, email, address, numberPhone, gender, image, status, id } =
    useSelector(infoUser);
  const [info, setInfo] = useState();
  console.log('info: ', info);
  useEffect(() => {
    setInfo({
      name,
      email,
      address,
      numberPhone,
      gender,
      image,
      status,
      id,
    });
  }, [name, email, address, numberPhone, gender, image, status, id]);

  const handleInfoChange = useCallback((field, value) => {
    setInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleSave = async () => {
    if (info.id === '') {
      dispatch(
        addFireBase({
          address: info.address,
          numberPhone: info.numberPhone,
          gender: info.gender,
        })
      );
    } else {
      await updateUser(info.id, {
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
              src={(info && info.image) || images.userProfile}
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
                  onChange={(e) => handleInfoChange('gender', e.target.value)}
                  checked={info?.gender === 'male'}
                />
                <label htmlFor="gender1">Male</label>
              </div>
              <div className={cx('check')}>
                <input
                  type="radio"
                  id="gender2"
                  name="gender"
                  value="female"
                  onChange={(e) => handleInfoChange('gender', e.target.value)}
                  checked={info?.gender === 'female'}
                />
                <label htmlFor="gender2">Female</label>
              </div>
              <div className={cx('check')}>
                <input
                  type="radio"
                  id="gender3"
                  name="gender"
                  value="other"
                  onChange={(e) => handleInfoChange('gender', e.target.value)}
                  checked={info?.gender === 'other'}
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
                    value={info?.name}
                    onChange={(e) => handleInfoChange('name', e.target.value)}
                    disabled={!!(info?.id === '')}
                  />
                </div>

                <div className={cx('info')}>
                  <span className={cx('title')}>Email</span>
                  <input
                    className={cx('input')}
                    value={info?.email}
                    onChange={(e) => handleInfoChange('email', e.target.value)}
                    disabled={!!(info?.id === '')}
                  />
                </div>
              </div>

              <div className={cx('flex')}>
                <div className={cx('info')}>
                  <span className={cx('title')}>Phone number</span>
                  <input
                    className={cx('input')}
                    value={info?.numberPhone}
                    onChange={(e) =>
                      handleInfoChange('numberPhone', e.target.value)
                    }
                  />
                </div>

                <div className={cx('info')}>
                  <span className={cx('title')}>Address</span>
                  <input
                    className={cx('input')}
                    value={info?.address}
                    onChange={(e) =>
                      handleInfoChange('address', e.target.value)
                    }
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
