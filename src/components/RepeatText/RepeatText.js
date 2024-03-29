import classNames from 'classnames/bind';
import styles from './RepeatText.module.scss';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function RepeatText({ title, text }) {
  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('title')}>{title}</h1>
      <h2 className={cx('heading')}>{text}</h2>
    </div>
  );
}
RepeatText.PropType = {
  title: PropTypes.string,
  text: PropTypes.string,
};

export default RepeatText;
