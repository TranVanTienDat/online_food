import {
  faAddressBook,
  faHouse,
  faMessage,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import config from '~/config';
export const mobileNav = [
  {
    link: config.routes.home,
    icon: faHouse,
    title: 'Home',
  },

  {
    link: config.routes.orderOnline,
    icon: faUtensils,
    title: 'Order food',
  },
  {
    link: config.routes,
    icon: faMessage,
    title: 'Contact',
  },
];
