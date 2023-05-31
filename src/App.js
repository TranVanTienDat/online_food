import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '~/pages/Home';
import './App.scss';
import ProfileUser from './pages/ProfileUser/ProfileUser';
import LogIn from './features/Auth/Sign/LogIn';
import Register from './features/Auth/Sign/Register';
import OrderOnline from './pages/OrderOnline/OrderOnline';
import ProductDetail from './features/ShopFood/CardProduct/ProductDetail/ProductDetail';
import { AuthContextPrevider } from './firebase/context/AuthContext';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Router>
      <AuthContextPrevider>
        <div className="App">
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/profile" element={<ProfileUser />}></Route>
            <Route path="/cart/:id" element={<ProductDetail />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/Log-in" element={<LogIn />}></Route>
            <Route path="/order-online" element={<OrderOnline />}></Route>
          </Routes>
        </div>
      </AuthContextPrevider>
    </Router>
  );
}

export default App;
