import {
  faBowlRice,
  faBurger,
  faChess,
  faPizzaSlice,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
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
      {
        itemStar: 'All rates',
      },
      {
        itemStar: [
          <FontAwesomeIcon icon={faStar} />,
          <FontAwesomeIcon icon={faStar} />,
          <FontAwesomeIcon icon={faStar} />,
          <FontAwesomeIcon icon={faStar} />,
          <FontAwesomeIcon icon={faStar} />,
        ],
      },
      {
        itemStar: [
          <FontAwesomeIcon icon={faStar} />,
          <FontAwesomeIcon icon={faStar} />,
          <FontAwesomeIcon icon={faStar} />,
          <FontAwesomeIcon icon={faStar} />,
        ],
      },
      {
        itemStar: [
          <FontAwesomeIcon icon={faStar} />,
          <FontAwesomeIcon icon={faStar} />,
          <FontAwesomeIcon icon={faStar} />,
        ],
      },
    ],
  },
];
