import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import config from '~/config';
import Home from '~/pages/Home';
import ProfileUser from '~/pages/ProfileUser';
import ProductDetail from './features/ShopFood/CardProduct/ProductDetail/ProductDetail';
import LogIn from './features/Auth/Sign/LogIn';
import './App.scss';
import { AuthContextPrevider } from './firebase/context/AuthContext';
import Register from './features/Auth/Sign/Register';
import ToastMessage from './components/ToastMessage/ToastMessage';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
function App() {
  return (
    <Router>
      <AuthContextPrevider>
        <div className="App">
          <ToastMessage
            icon={<FontAwesomeIcon icon={faCheck} />}
            title="thanh cong"
          />
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
