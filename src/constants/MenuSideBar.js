import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const priceProduct = [
  {
    title: 'Price',
    childrenTitle: [
      { itemTitle: 'All prices' },
      { itemTitle: 'Under 50k' },
      { itemTitle: '50k-100k' },
      { itemTitle: 'Above 100k' },
    ],
  },
];

export const rateProduct = [
  {
    title: 'Rate',
    star: [
      {
        itemStar: 'All rate',
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
