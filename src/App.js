import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Fragment } from 'react';
// import Home from '~/pages/Home';
import './App.scss';
// import ProfileUser from './pages/ProfileUser/ProfileUser';
// import LogIn from './features/Auth/Sign/LogIn';
// import Register from './features/Auth/Sign/Register';
// import OrderOnline from './pages/OrderOnline/OrderOnline';
// import ProductDetail from './features/ShopFood/CardProduct/ProductDetail/ProductDetail';
import { AuthContextPrevider } from './firebase/context/AuthContext';
// import DefaultLayOut from './Layouts/DefaulLayOut/DefaultLayOut';
import Container from './Layouts/DefaulLayOut/Container/Container';
import { publicRoutes } from './routes/routes';
import { ToastContainer } from 'react-toastify';
import DefaultLayOut from './Layouts/DefaulLayOut/DefaultLayOut';

function App() {
  return (
    <Router>
      <AuthContextPrevider>
        <div className="App">
          <ToastContainer />
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              let Layout = DefaultLayOut;

              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Container>
                        <Page />
                      </Container>
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </div>
      </AuthContextPrevider>
    </Router>
  );
}

export default App;
