import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { loginUser } from '~/api/authApi';
import images from '~/assets/images';
import Button from '~/components/Button/Button';
import { warning } from '~/constants/ToastMessage/ToastMessage';
import { UserAuth } from '~/firebase/context/AuthContext';

import styles from './Sign.module.scss';
const cx = classNames.bind(styles);
function Login() {
  const navigate = useNavigate();
  const { googleSignIn, user } = UserAuth();
  const [animate, setAnimate] = useState(false);

  // form rules
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit } = useForm(formOptions);

  // Log in with Mongo
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
      warning(error.response.data.message);
    }
  };

  const handleSignGoogle = async () => {
    try {
      setAnimate(!animate);
      await googleSignIn();
      setAnimate(!animate);
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
    <>
      <div className={cx('inner')}>
        <div className={cx('login')}>
          <div className={cx('input')}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className={cx('title')}>Log in</h1>
              <label htmlFor="email">Email</label>
              <input name="email" {...register('email')} autoComplete="email" />
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                {...register('password')}
              />

              <div className={cx('link')}>
                <Link to="/reset-password">
                  <span>Forgot password</span>
                </Link>

                <Link className={cx('register')} to="/register">
                  Create account
                </Link>
              </div>

              <Button small type="submit">
                Log in
              </Button>

              <h4 className={cx('text')}>or continue with</h4>
              <div className={cx('logo')}>
                <div className={cx('brand')} onClick={handleSignGoogle}>
                  {animate ? (
                    <Animate />
                  ) : (
                    <>
                      <img className={cx('icon')} src={images.google} alt="" />
                      Sign in with Google
                    </>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

export const Animate = () => {
  return (
    // <div className={cx('animate')}>
    <>
      <span className={cx('pointer')}></span>
      <span className={cx('pointer')}></span>
      <span className={cx('pointer')}></span>
    </>
    // </div>
  );
};
