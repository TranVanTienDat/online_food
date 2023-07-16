import propTypes from 'prop-types';
import Container from './Container/Container';
import Footer from './Footer/Footer';
import { useEffect } from 'react';
import Header from './Header/Header';
function DefaultLayOut({ children }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [children]);
  return (
    <>
      <Header />
      <Container children={children} />
      <Footer />
    </>
  );
}

DefaultLayOut.propTypes = {
  children: propTypes.node,
};

export default DefaultLayOut;
