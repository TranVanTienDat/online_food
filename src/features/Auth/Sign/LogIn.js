import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Sign.module.scss';
import Button from '~/components/Button/Button';
import { useNavigate } from 'react-router-dom';
// firebase
import { UserAuth } from '~/firebase/context/AuthContext';

const cx = classNames.bind(styles);
function LogIn() {
  const navigate = useNavigate();
  const { googleSignIn, user } = UserAuth();
  const handleSignGoogle = async () => {
    try {
      await googleSignIn();
    } catch {
      console.error('loi');
    }
  };
  useEffect(() => {
    if (user != null) {
      navigate('/');
    }
  }, [user]);
  console.log(user);
  return (
    <div className={cx('wrapper')}>
      <div className={cx('background')}>
        <div className={cx('shape')}></div>
        <div className={cx('shape')}></div>
      </div>
      <form className={cx('form')}>
        <h3 className={cx('heading')}>Login Here</h3>

        <label htmlFor="username">Username</label>
        <input type="text" placeholder="Email or Phone" id="username" />

        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Password" id="password" />

        <div className={cx('social')}>
          <div className={cx('brand')} onClick={handleSignGoogle}>
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
        </div>
        <Button>Log In</Button>
      </form>
    </div>
  );
}

export default LogIn;
