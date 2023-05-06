import config from '~/config';
import Home from '~/pages/Home';
import ProfileUser from '~/pages/ProfileUser';
import OrderOnline from '~/pages/OrderOnline/OrderOnline';
// Public routes
const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.profileUser, component: ProfileUser },
  { path: config.routes.orderOnline, component: OrderOnline },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
