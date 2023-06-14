import { Fragment } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.scss';
import { publicRoutes } from './routes/routes';
import { ToastContainer } from 'react-toastify';
import DefaultLayOut from './Layouts/DefaultLayOut/DefaultLayOut';
import Container from './Layouts/DefaultLayOut/Container/Container';
import { AuthContextProvider } from './firebase/context/AuthContext';

function App() {
  return (
    <Router>
      <AuthContextProvider>
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
      </AuthContextProvider>
    </Router>
  );
}

export default App;
