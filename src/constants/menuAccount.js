import {
  faUser,
  faBell,
  faTrashCan,
} from '@fortawesome/free-regular-svg-icons';
import {
  // faBell,
  faKey,
  faRightFromBracket,
  // faTrash,
  // faUser,
} from '@fortawesome/free-solid-svg-icons';

import ChangePassword from '~/pages/ProfileUser/Account/components/ChangePassword/ChangePassword';
import DetailInfo from '~/pages/ProfileUser/Account/components/DetailInfo/DetailInfo';
import Notification from '~/pages/ProfileUser/Account/components/Notification/Notification';

export const sideBar = [
  { title: 'Account detail', icon: faUser },
  { title: 'Change password', icon: faKey },
  { title: 'Notification', icon: faBell },
  { title: 'Log out', icon: faRightFromBracket },
  { title: 'Delete user', icon: faTrashCan },
];

export const content = [
  { title: DetailInfo },
  { title: ChangePassword },
  { title: Notification },
];
