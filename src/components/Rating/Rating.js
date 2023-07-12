import propTypes from 'prop-types';

import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarBorder } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function Rating({ value }) {
  return (
    <>
      <span
        className="rating"
        style={{
          color: 'rgb(255, 140, 0)',
          fontSize: '1.4rem',
        }}
      >
        <FontAwesomeIcon icon={value >= 1 ? faStar : faStarBorder} />
        <FontAwesomeIcon icon={value >= 2 ? faStar : faStarBorder} />
        <FontAwesomeIcon icon={value >= 3 ? faStar : faStarBorder} />
        <FontAwesomeIcon icon={value >= 4 ? faStar : faStarBorder} />
        <FontAwesomeIcon icon={value >= 5 ? faStar : faStarBorder} />
      </span>
    </>
  );
}

Rating.propTypes = {
  value: propTypes.number,
};

export default Rating;
