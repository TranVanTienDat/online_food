//Page
import config from '~/config';
import Home from '~/pages/Home';
import ProfileUser from '~/pages/ProfileUser';
import OrderOnline from '~/pages/OrderOnline/OrderOnline';
import LogIn from '~/features/Auth/Sign/LogIn';
import Register from '~/features/Auth/Sign/Register';
import ProductDetail from '~/features/ShopFood/CardProduct/ProductDetail/ProductDetail';
//Layout
import DefaultLayOut from '~/Layouts/DefaulLayOut/DefaultLayOut';
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
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
