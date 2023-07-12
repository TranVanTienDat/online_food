//Page
import config from '~/config';
import Popper from '~/features/Auth/Popper/Popper';
import ProductDetail from '~/features/ShopFood/CardProduct/ProductDetail/ProductDetail';
import Home from '~/pages/Home/Home';
import OrderOnline from '~/pages/OrderOnline/OrderOnline';
import Account from '~/pages/ProfileUser/Account/Account';
import ResetPassword from '~/pages/ProfileUser/resetPassword/ResetPassword';
// Public routes
const publicRoutes = [
  { path: config.routes.home, component: Home },

  {
    path: config.routes.orderOnline,
    component: OrderOnline,
  },
  {
    path: config.routes.profileUser,
    component: Account,
  },
  {
    path: config.routes.cartDetail,
    component: ProductDetail,
  },
  { path: config.routes.resetPassword, component: ResetPassword, layout: null },
  { path: config.routes.LogIn, component: Popper, layout: null },
];

const privateRoutes = [];

export { privateRoutes, publicRoutes };
