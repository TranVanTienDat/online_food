import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function Rating({ value }) {
  return (
    <>
      <span className="rating">
        <FontAwesomeIcon
          icon={faStar}
          style={value >= 1 ? { color: '#FFFF00' } : { color: '#00FF00' }}
        />
        <FontAwesomeIcon
          icon={faStar}
          style={value >= 2 ? { color: '#FFFF00' } : { color: '#00FF00' }}
        />
        <FontAwesomeIcon
          icon={faStar}
          style={value >= 3 ? { color: '#FFFF00' } : { color: '#00FF00' }}
        />
        <FontAwesomeIcon
          icon={faStar}
          style={value >= 4 ? { color: '#FFFF00' } : { color: '#00FF00' }}
        />
        <FontAwesomeIcon
          icon={faStar}
          style={value >= 5 ? { color: '#FFFF00' } : { color: '#00FF00' }}
        />
      </span>
    </>
  );
}

export default Rating;
