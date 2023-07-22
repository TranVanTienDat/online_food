import classNames from 'classnames/bind';
import propTypes from 'prop-types';
import styles from './CardIntroduce.module.scss';
import Button from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function CardIntroduce({
  img,
  title,
  paragraph,
  button,
  icon,
  maxWith = false,
  w150 = false,
  boxShadow = false,
}) {
  const classes = cx('img', {
    maxWith,
    w150,
  });

  const className = cx('wrapper', {
    boxShadow,
  });

  return (
    <div className={className}>
      <img className={classes} src={img} alt="" />
      <h1 className={cx('title')}>{title}</h1>
      <p className={cx('text')}>{paragraph}</p>
      {button && (
        <Button icon={<FontAwesomeIcon icon={faAngleRight} />} success>
          {button}
        </Button>
      )}
    </div>
  );
}

CardIntroduce.propTypes = {
  img: propTypes.node,
  title: propTypes.string,
  paragraph: propTypes.string,
  button: propTypes.string,
  icon: propTypes.node,
  maxWith: propTypes.bool,
  w150: propTypes.bool,
  boxShadow: propTypes.bool,
};

export default CardIntroduce;
