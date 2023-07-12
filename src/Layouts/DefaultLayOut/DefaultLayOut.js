import propTypes from 'prop-types';
import Container from './Container/Container';
import Footer from './Footer/Footer';
import Header from './Header/Header';
function DefaultLayOut({ children }) {
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
