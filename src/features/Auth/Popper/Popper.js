import classNames from 'classnames/bind';
import styles from './Popper.module.scss';
import Login from '../Sign/Login';
import Register from '../Sign/Register';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const cx = classNames.bind(styles);
function Popper() {
  const [isToggle, setIsToggle] = useState(false);

  const handleToggle = () => {
    setIsToggle(!isToggle);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('image')}>
          <img
            className={cx('background')}
            src={images.backgroundLogin}
            alt=""
          />
        </div>
        <div className={cx('sign-in')}>
          <div className={cx('toggle')} onClick={handleToggle}>
            <FontAwesomeIcon icon={faRightToBracket} />
          </div>
          {isToggle ? <Register /> : <Login />}
        </div>
      </div>
    </div>
  );
}

export default Popper;
