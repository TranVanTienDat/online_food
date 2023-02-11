import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import DefaultLayOut from '~/Layouts/DefaulLayOut/DefaultLayOut';

const cx = classNames.bind(styles);

function Home() {
  return (
    <div className={cx('wrapper')}>
      <DefaultLayOut />
    </div>
  );
}

export default Home;
