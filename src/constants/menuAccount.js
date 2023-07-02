import {
  faBell,
  faKey,
  faRightFromBracket,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import DetailInfo from '~/pages/ProfileUser/Account/components/DetailInfo/DetailInfo';
import ChangePassword from '~/pages/ProfileUser/Account/components/ChangePassword/ChangePassword';
import Notification from '~/pages/ProfileUser/Account/components/Notification/Notification';

export const sideBar = [
  { title: 'Account detail', icon: faUser },
  { title: 'Change password', icon: faKey },
  { title: 'Notification', icon: faBell },
  { title: 'Log out', icon: faRightFromBracket },
];

export const content = [
  { title: DetailInfo },
  { title: ChangePassword },
  { title: Notification },
];
