import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '~/pages/Home';
import ProfileUser from '~/pages/ProfileUser';
import './App.scss';
import LogIn from './features/Auth/Sign/LogIn';
import Register from './features/Auth/Sign/Register';
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
            <Route path="/Logn-in" element={<LogIn />}></Route>
          </Routes>
        </div>
      </AuthContextPrevider>
    </Router>
  );
}

export default App;
