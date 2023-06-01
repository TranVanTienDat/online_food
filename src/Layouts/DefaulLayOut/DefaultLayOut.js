import classNames from 'classnames/bind';
import Container from './Container/Container';
import Footer from './Footer';
import Header from './Header';
function DefaultLayOut({ children }) {
  return (
    <>
      <Header />
      <Container children={children} />
      <Footer />
    </>
  );
}

export default DefaultLayOut;
