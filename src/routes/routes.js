//Page
import config from '~/config';
import LogIn from '~/features/Auth/Sign/LogIn';
import Register from '~/features/Auth/Sign/Register';
import ProductDetail from '~/features/ShopFood/CardProduct/ProductDetail/ProductDetail';
import Home from '~/pages/Home';
import OrderOnline from '~/pages/OrderOnline/OrderOnline';
import ProfileUser from '~/pages/ProfileUser';
import ResetPassword from '~/pages/ProfileUser/resetPassword/ResetPassword';
// Public routes
const publicRoutes = [
  { path: config.routes.home, component: Home },
  {
    path: config.routes.profileUser,
    component: ProfileUser,
  },
  {
    path: config.routes.orderOnline,
    component: OrderOnline,
  },
  {
    path: config.routes.cartDetail,
    component: ProductDetail,
  },
  { path: config.routes.LogIn, component: LogIn, layout: null },
  { path: config.routes.register, component: Register, layout: null },
  { path: config.routes.resetPassword, component: ResetPassword, layout: null },
];

const privateRoutes = [];

export { privateRoutes, publicRoutes };
