import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';
// import authApi from '~/api/authApi';
import { createUser } from '~/api/authApi';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Button from '~/components/Button/Button';
import styles from './Sign.module.scss';
import { success, warning } from '~/constants/ToastMessage/ToastMessage';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);
function Register() {
  const navigate = useNavigate();
  // form validation rules
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;
  const onSubmit = async (data) => {
    try {
      const user = {
        email: data.email,
        password: data.password,
      };
      const rs = await createUser(user);
      console.log(rs);
      success('đăng kí thành công');
      navigate('/Log-in');
    } catch (error) {
      console.error(error.response.data.message);
      warning(error.response.data.message);
    }
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('background')}>
        <div className={cx('shape')}></div>
        <div className={cx('shape')}></div>
      </div>
      <form className={cx('form')} onSubmit={handleSubmit(onSubmit)}>
        <h3 className={cx('heading')}>Register here</h3>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Email"
          name="email"
          {...register('email')}
        />
        <div className={cx('error')}>{errors.email?.message}</div>

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          {...register('password')}
        />
        <div className={cx('error')}>{errors.password?.message}</div>

        <Button type="submit">Register</Button>
      </form>
    </div>
  );
}

export default Register;
