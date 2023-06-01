import classNames from 'classnames/bind';
import Button from '~/components/Button/Button';
import styles from './Sign.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);
function Register() {
  const navigate = useNavigate();
  const handleNavigate = () => navigate('/');
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

        <Button onClick={handleNavigate}>Register</Button>
      </form>
    </div>
  );
}

export default Register;
