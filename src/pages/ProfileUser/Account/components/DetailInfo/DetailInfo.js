import classNames from 'classnames/bind';
import propType from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, updatePassword } from '~/api/authApi';
import images from '~/assets/images';

import Button from '~/components/Button/Button';
import Default from '../Default/Default';
import { addFireBase } from '~/slice/info';
import { infoUser } from '~/slice/selector';
import { success, error as err } from '~/constants/ToastMessage/ToastMessage';

import styles from './DetailInfo.module.scss';
const cx = classNames.bind(styles);

function DetailInfo({ isBlock = false }) {
  const dispatch = useDispatch;
  const { name, email, address, numberPhone, gender, image, status, id } =
    useSelector(infoUser);
  const [info, setInfo] = useState({});
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

  // Handle gender
  const handleInfoChange = useCallback((field, value) => {
    setInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleSave = async () => {
    if (info.id === '') {
      try {
        dispatch(
          addFireBase({
            address: info.address,
            numberPhone: info.numberPhone,
            gender: info.gender,
          })
        );
        success('Update success');
      } catch (error) {
        err('Update failure');
      }
    } else {
      try {
        await updateUser(info.id, {
          name: info.name,
          email: info.email,
          gender: info.gender,
          address: info.address,
          phoneNumber: info.numberPhone,
        });
        success('Update success');
        window.location.reload();
      } catch (error) {
        err(error.response.data.message);
      }
    }
  };

  return (
    <div style={isBlock ? { display: 'block' } : { display: 'none' }}>
      <Default title="My account">
        <div className={cx('inner')}>
          <div className={cx('gender')}>
            <h4 className={cx('title')}>Gender</h4>
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
            {/* gender */}
          </div>

          {/*  */}
          <div className={cx('detail')}>
            <label className={cx('title')}>Full name</label>
            <input
              className={cx('input')}
              value={info?.name || ''}
              onChange={(e) => handleInfoChange('name', e.target.value)}
            />
          </div>
          <div className={cx('detail')}>
            <label className={cx('title')}>Email</label>
            <input
              className={cx('input')}
              value={info?.email || ''}
              onChange={(e) => handleInfoChange('email', e.target.value)}
              disabled={!!(info?.id === '')}
            />
          </div>
          <div className={cx('detail')}>
            <label className={cx('title')}>Address</label>
            <input
              className={cx('input')}
              value={info?.address || ''}
              onChange={(e) => handleInfoChange('address', e.target.value)}
            />
          </div>
          <div className={cx('detail')}>
            <label className={cx('title')}>Phone number</label>
            <input
              className={cx('input')}
              value={info?.numberPhone || ''}
              onChange={(e) => handleInfoChange('numberPhone', e.target.value)}
            />
          </div>
          {/*  */}
          <span>
            <Button success onClick={handleSave}>
              Update
            </Button>
          </span>
        </div>
      </Default>
    </div>
  );
}

Default.propType = {
  isBlock: propType.bool,
};

export default DetailInfo;
