import { faCamera, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword, updateUser } from '~/api/authApi';
import images from '~/assets/images';
import { success, error as err } from '~/constants/ToastMessage/ToastMessage';
import { addFireBase } from '~/slice/info';
import { infoUser } from '~/slice/selector';
import styles from './ProfileUser.module.scss';
const cx = classNames.bind(styles);
function ProfileUser() {
  const dispatch = useDispatch();
  const { name, email, address, numberPhone, gender, image, status, id } =
    useSelector(infoUser);
  const [info, setInfo] = useState({});
  console.log(typeof info.id);
  const [isButtonColor, setIsButtonColor] = useState(true);
  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
  });
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

  // Handle save
  const handleSave = async () => {
    try {
      await updatePassword(info.id, {
        currentPassword: password.currentPassword,
        newPassword: password.newPassword,
      });
      success('Update success');
    } catch (error) {
      // err(error.response.data.message);
      console.log(error);
    }
  };

  const handleButtonColor = (field) => {
    if (field === 'prev') {
      setIsButtonColor(true);
    } else {
      setIsButtonColor(false);
    }
  };

  const handlePasswordChange = (field, value) => {
    setPassword((prev) => ({
      ...prev,
      [field]: value,
    }));
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
                  value="other"
                  onChange={(e) => handleInfoChange('gender', e.target.value)}
                  checked={info?.gender === 'other'}
                />
                <label htmlFor="gender3">Other</label>
              </div>
            </form>
          </div>

          <div className={cx('toggle')}>
            <span
              className={cx('button', isButtonColor ? 'button-color' : '')}
              onClick={() => handleButtonColor('prev')}
            >
              My account
            </span>

            <span
              className={cx(
                'button',
                !isButtonColor ? 'button-color' : '',
                id === '' ? 'disable' : ''
              )}
              onClick={id === '' ? null : () => handleButtonColor('next')}
            >
              Change Password
            </span>
          </div>

          <div className={cx('information')}>
            <div className={cx('inner')}>
              {false ? (
                <>
                  <div className={cx('flex')}>
                    <div className={cx('info')}>
                      <span className={cx('title')}>Full name</span>
                      <input
                        className={cx('input')}
                        value={info?.name || ''}
                        onChange={(e) =>
                          handleInfoChange('name', e.target.value)
                        }
                        disabled={!!(info?.id === '')}
                      />
                    </div>

                    <div className={cx('info')}>
                      <span className={cx('title')}>Email</span>
                      <input
                        className={cx('input')}
                        value={info?.email || ''}
                        onChange={(e) =>
                          handleInfoChange('email', e.target.value)
                        }
                        disabled={!!(info?.id === '')}
                      />
                    </div>
                  </div>

                  <div className={cx('flex')}>
                    <div className={cx('info')}>
                      <span className={cx('title')}>Phone number</span>
                      <input
                        className={cx('input')}
                        value={info?.numberPhone || ''}
                        onChange={(e) =>
                          handleInfoChange('numberPhone', e.target.value)
                        }
                      />
                    </div>

                    <div className={cx('info')}>
                      <span className={cx('title')}>Address</span>
                      <input
                        className={cx('input')}
                        value={info?.address || ''}
                        onChange={(e) =>
                          handleInfoChange('address', e.target.value)
                        }
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className={cx('flex')}>
                    <div className={cx('info')}>
                      <span className={cx('title')}>current password</span>
                      <input
                        className={cx('input')}
                        value={password?.currentPassword || ''}
                        onChange={(e) =>
                          handlePasswordChange(
                            'currentPassword',
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className={cx('info')}>
                      <span className={cx('title')}>new password</span>
                      <input
                        className={cx('input')}
                        value={password.newPassword || ''}
                        onChange={(e) =>
                          handlePasswordChange('newPassword', e.target.value)
                        }
                      />
                    </div>
                  </div>
                </>
              )}
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
