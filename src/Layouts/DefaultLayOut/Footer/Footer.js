import {
  faFacebook,
  faTiktok,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
  return (
    <div className={cx('footer')}>
      <div className={cx('view')}>
        <div className={cx('brand')}>
          <img className={cx('img')} src={images.logo} alt="" />
          <p className={cx('epilogue')}>
            Retail food delivery is a courier sevice inwhich a restaurant,
            store, or independent food-delivery
          </p>
          <div className={cx('Social-Network')}>
            <FontAwesomeIcon className={cx('icon')} icon={faFacebook} />
            <FontAwesomeIcon className={cx('icon')} icon={faTwitter} />
            <FontAwesomeIcon className={cx('icon')} icon={faTiktok} />
          </div>
        </div>
        <div className={cx('customer')}>
          <div className={cx('element')}>
            <h1 className={cx('title')}>Company</h1>
            <ul>
              <li className={cx('item')}>About</li>
              <li className={cx('item')}>Contact Us</li>
              <li className={cx('item')}>Team of Use</li>
              <li className={cx('item')}>How it Work</li>
            </ul>
          </div>
          <div className={cx('element')}>
            <h1 className={cx('title')}>Company</h1>
            <ul>
              <li className={cx('item')}>About</li>
              <li className={cx('item')}>Contact Us</li>
              <li className={cx('item')}>Team of Use</li>
              <li className={cx('item')}>How it Work</li>
            </ul>
          </div>
          <div className={cx('element')}>
            <h1 className={cx('title')}>Company</h1>
            <ul>
              <li className={cx('item')}>About</li>
              <li className={cx('item')}>Contact Us</li>
              <li className={cx('item')}>Team of Use</li>
              <li className={cx('item')}>How it Work</li>
            </ul>
          </div>
          <div className={cx('element')}>
            <h1 className={cx('title')}>Company</h1>
            <ul>
              <li className={cx('item')}>About</li>
              <li className={cx('item')}>Contact Us</li>
              <li className={cx('item')}>Team of Use</li>
              <li className={cx('item')}>How it Work</li>
            </ul>
          </div>
        </div>
      </div>
      <div className={cx('end-page')}>
        <span className={cx('text')}>Copyright @ 2022 HieuFood.com</span>
        <span className={cx('text')}>
          Created by <strong>KIMCA</strong>
        </span>
      </div>
    </div>
  );
}

export default Footer;
