import {
  faHouse,
  faMessage,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import config from '~/config';

export const nav = [
  {
    to: config.routes.home,
    order: 0,
    icon: <FontAwesomeIcon icon={faHouse} />,
    text: 'HOME',
  },
  {
    to: config.routes.orderOnline,
    order: 1,
    icon: <FontAwesomeIcon icon={faUtensils} />,
    text: 'ORDER ONLINE',
  },
  {
    to: config.routes.contact,
    order: 2,
    icon: <FontAwesomeIcon icon={faMessage} />,
    text: 'CONTACT',
  },
];
