import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './ToastMessage.module.scss';

const cx = classNames.bind(styles);

function ToastMessage({
  icon,
  title,
  success = false,
  danger = false,
  error = false,
  block = false,
}) {
  var time = new Date();
  var classes = cx('wrapper', {
    success,
    danger,
    error,
    block,
  });

  return (
    <div className={classes}>
      <div className={cx('flex')}>
        {icon && <span className={cx('icon')}>{icon}</span>}
        <span className={cx('message')}>
          <h4 className={cx('title')}>{title}</h4>
          <span className={cx('time')}>
            Today {time.getHours()}:{time.getMinutes()}
          </span>
        </span>
      </div>
    </div>
  );
}

export default ToastMessage;
