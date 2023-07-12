import {
  faBowlRice,
  faBurger,
  faChess,
  faPizzaSlice,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarBorder } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const priceProduct = [
  {
    title: 'Price',
    childrenTitle: [
      { icon: faPizzaSlice, itemTitle: 'All prices' },
      { icon: faBurger, itemTitle: 'Under 50k' },
      { icon: faBowlRice, itemTitle: '50k-100k' },
      { icon: faChess, itemTitle: 'Above 100k' },
    ],
  },
];

export const rateProduct = [
  {
    title: 'Rate',
    star: [
      { label: 'allStar', itemStar: 'All rates' },
      {
        label: 'fiveStar',
        itemStar: [
          <FontAwesomeIcon icon={faStar} />,
          <FontAwesomeIcon icon={faStar} />,
          <FontAwesomeIcon icon={faStar} />,
          <FontAwesomeIcon icon={faStar} />,
          <FontAwesomeIcon icon={faStar} />,
        ],
      },
      {
        label: 'fourStar',
        itemStar: [
          <FontAwesomeIcon icon={faStar} />,
          <FontAwesomeIcon icon={faStar} />,
          <FontAwesomeIcon icon={faStar} />,
          <FontAwesomeIcon icon={faStar} />,
          <FontAwesomeIcon icon={faStarBorder} />,
        ],
      },
      {
        label: 'threeStar',
        itemStar: [
          <FontAwesomeIcon icon={faStar} />,
          <FontAwesomeIcon icon={faStar} />,
          <FontAwesomeIcon icon={faStar} />,
          <FontAwesomeIcon icon={faStarBorder} />,
          <FontAwesomeIcon icon={faStarBorder} />,
        ],
      },
    ],
  },
];
