import classNames from 'classnames/bind';
import styles from './DefaultLayOut.module.scss';
import Header from './Header';
import Footer from './Footer';
import Container from './Container/Container';
const cx = classNames.bind(styles);
function DefaultLayOut() {
  return (
    <div className={cx('wapper')}>
      <Header />
      <Container />
      <Footer />
    </div>
  );
}

export default DefaultLayOut;
