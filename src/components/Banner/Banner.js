import {
  faAngleRight,
  faLocationCrosshairs,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import RepeatText from '../RepeatText';
import styles from './Banner.module.scss';

const cx = classNames.bind(styles);
function Banner() {
  return (
    <div className={cx('banner')}>
      <div className={cx('title')}>
        <RepeatText title="Hungry?" text="Wait a minute for delicious" />
        <p className={cx('text')}>
          best cooks and bets delivery guys all at your sevice hot tasty will
          reach you in 20mins
        </p>
        <div className={cx('delivery-locattion')}>
          <input
            className={cx('input')}
            placeholder="Enter your delivery location"
          />
          <FontAwesomeIcon
            className={cx('icon-location')}
            icon={faLocationCrosshairs}
          />
          <div className={cx('discover')}>
            <span className={cx('text')}>Descover</span>
            <FontAwesomeIcon className={cx('right-icon')} icon={faAngleRight} />
          </div>
        </div>
        <div className={cx('sign-in')}>
          Already member of our communty?
          <span className={cx('text-signIn')}>sign In</span>
        </div>
      </div>

      <img className={cx('img-delivery')} src={images.delivery} alt=""></img>
    </div>
  );
}

export default Banner;
