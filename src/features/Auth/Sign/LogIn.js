import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Sign.module.scss';
import Button from '~/components/Button/Button';
import { success, warning } from '~/constants/ToastMessage/ToastMessage';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// firebase
import { UserAuth } from '~/firebase/context/AuthContext';
import { loginUser } from '~/api/authApi';

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
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = async (data) => {
    try {
      const user = {
        email: data.email,
        password: data.password,
      };
      const rs = await loginUser(user);
      console.log(rs);
      // success('thành công');
      navigate('/');
    } catch (error) {
      console.error(error.response.data.message);
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
  console.log(user);

  // login email

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  return (
    <div className={cx('wrapper')}>
      <div className={cx('background')}>
        <div className={cx('shape')}></div>
        <div className={cx('shape')}></div>
      </div>
      <form className={cx('form')} onSubmit={handleSubmit(onSubmit)}>
        <h3 className={cx('heading')}>Login Here</h3>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Email or Phone"
          name="email"
          {...register('email')}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
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
        <Link className={cx('register')} to="/register">
          <span>Have you registered your account yet? </span>Register
        </Link>
        <Button type="submit">Log In</Button>
      </form>
    </div>
  );
}

export default LogIn;
