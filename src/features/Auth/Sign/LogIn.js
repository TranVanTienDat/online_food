import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Button from '~/components/Button/Button';
import { warning } from '~/constants/ToastMessage/ToastMessage';
import styles from './Sign.module.scss';
// firebase
import { loginUser } from '~/api/authApi';
import { UserAuth } from '~/firebase/context/AuthContext';

const cx = classNames.bind(styles);
function LogIn() {
  const navigate = useNavigate();

  // form rules
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit } = useForm(formOptions);

  const onSubmit = async (data) => {
    try {
      const user = {
        email: data.email,
        password: data.password,
      };
      const rs = await loginUser(user);

      JSON.stringify(localStorage.setItem('access', rs.data.token));
      navigate('/');
    } catch (error) {
      // console.error(error.response.data.message);
      warning(error.response.data.message);
    }
  };

  // login fireBase
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

  return (
    <div className={cx('wrapper')}>
      <div className={cx('background')}>
        <div className={cx('shape')}></div>
        <div className={cx('shape')}></div>
      </div>
      <form className={cx('form')} onSubmit={handleSubmit(onSubmit)}>
        <h3 className={cx('heading')}>Login Here</h3>

        <label htmlFor="email">Email</label>
        <input
          type="text"
          placeholder="Email or Phone"
          name="email"
          autoComplete="username"
          {...register('email')}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="current-password"
          {...register('password')}
        />

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

        <Button type="submit">Log In</Button>
        <div className={cx('link')}>
          <Link to="/reset-password">
            <span>Forgot password</span>
          </Link>

          <Link className={cx('register')} to="/register">
            Create account
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LogIn;
