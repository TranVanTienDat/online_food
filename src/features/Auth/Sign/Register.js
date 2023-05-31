import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Sign.module.scss';
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);
function Register() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('background')}>
        <div className={cx('shape')}></div>
        <div className={cx('shape')}></div>
      </div>
      <form className={cx('form')}>
        <h3 className={cx('heading')}>Register here</h3>

        <label htmlFor="username">Username</label>
        <input type="text" placeholder="Email or Phone" id="username" />

        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Password" id="password" />

        {/* <div className={cx('social')}>
          <div className={cx('brand')}>
            <span className={cx('logo')}>
              <FontAwesomeIcon icon={faGoogle} />
            </span>
            Google
          </div>
          <div className={cx('brand')}>
            <span className={cx('logo')}>
              <FontAwesomeIcon icon={faFacebook} />
            </span>
            Facebook
          </div>
        </div> */}

        <Button>Register</Button>
      </form>
    </div>
  );
}

export default Register;
