import classNames from 'classnames/bind';
import propType from 'prop-types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { updatePassword } from '~/api/authApi';
import Button from '~/components/Button/Button';
import { error as err, success } from '~/constants/ToastMessage/ToastMessage';
import { infoUser } from '~/slice/selector';
import Default from '../Default/Default';
import styles from './ChangePassword.module.scss';
const cx = classNames.bind(styles);

function ChangePassword({ isBlock = false }) {
  const { id } = useSelector(infoUser);
  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
    enterPassword: '',
  });

  const handlePasswordChange = (field, value) => {
    setPassword((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdatePassword = async () => {
    if (id !== '') {
      if (password.currentPassword === password.newPassword) {
        err('The same password');
      } else if (
        password.newPassword === password.enterPassword &&
        password.newPassword.length > 0
      ) {
        try {
          await updatePassword(id, {
            currentPassword: password.currentPassword,
            newPassword: password.newPassword,
          });
          success('Update success');
          setPassword({
            currentPassword: '',
            newPassword: '',
            enterPassword: '',
          });
        } catch (error) {
          err(error.response.data.message);
        }
      } else {
        err('Please enter correctly');
      }
    } else {
      err('No password update');
    }
  };

  return (
    <div style={isBlock ? { display: 'block' } : { display: 'none' }}>
      <Default title="Change password">
        {/* detail */}
        <div className={cx('detail')}>
          <label className={cx('title')}>Current password</label>
          <input
            className={cx('input')}
            value={password?.currentPassword}
            onChange={(e) =>
              handlePasswordChange('currentPassword', e.target.value)
            }
          />
        </div>

        <div className={cx('detail')}>
          <label className={cx('title')}>New password</label>
          <input
            className={cx('input')}
            type="password"
            value={password?.newPassword}
            onChange={(e) =>
              handlePasswordChange('newPassword', e.target.value)
            }
          />
        </div>

        <div className={cx('detail')}>
          <label className={cx('title')}>Enter the password</label>
          <input
            className={cx('input')}
            type="password"
            value={password?.enterPassword}
            onChange={(e) =>
              handlePasswordChange('enterPassword', e.target.value)
            }
          />
        </div>
        {/* detail */}

        <span className={cx('button')}>
          <Button success onClick={handleUpdatePassword}>
            update
          </Button>
        </span>
      </Default>
    </div>
  );
}

ChangePassword.propType = {
  isBlock: propType.bool,
};
export default ChangePassword;
