import classNames from 'classnames/bind';
import propType from 'prop-types';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '~/api/authApi';

import Button from '~/components/Button/Button';
import { error as err, success } from '~/constants/ToastMessage/ToastMessage';
import { UserAuth } from '~/firebase/context/AuthContext';
import { addFireBase } from '~/slice/infoFireBase';
import { infoUser, infoUserFireBase } from '~/slice/selector';
import Default from '../Default/Default';

import styles from './DetailInfo.module.scss';
const cx = classNames.bind(styles);

function DetailInfo({ isBlock = false }) {
  const { user } = UserAuth();
  const dispatch = useDispatch();
  const infoMongo = useSelector(infoUser);
  const infoFireBaser = useSelector(infoUserFireBase);
  const [info, setInfo] = useState(
    user
      ? {
          address: infoFireBaser.address,
          numberPhone: infoFireBaser.numberPhone,
          gender: infoFireBaser.gender,
        }
      : {
          name: infoMongo.name,
          email: infoMongo.name,
          address: infoMongo.name,
          numberPhone: infoMongo.name,
          gender: infoMongo.name,
          image: infoMongo.name,
          status: infoMongo.name,
          id: infoMongo.name,
        }
  );

  // Handle gender
  const handleInfoChange = useCallback((field, value) => {
    setInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleUpdate = async () => {
    if (user) {
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
        console.log(error);
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
              value={user?.displayName || info?.name || ''}
              onChange={(e) => handleInfoChange('name', e.target.value)}
              disabled={!!user}
            />
          </div>
          <div className={cx('detail')}>
            <label className={cx('title')}>Email</label>
            <input
              className={cx('input')}
              value={user?.email || info?.email || ''}
              onChange={(e) => handleInfoChange('email', e.target.value)}
              disabled={!!user}
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
            <Button success onClick={handleUpdate}>
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
