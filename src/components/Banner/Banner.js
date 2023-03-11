import Button from '../Button/Button';

// import style scss
import classNames from 'classnames/bind';
import styles from './Banner.module.scss';

//import swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import { dataBanner } from '~/constants/dataBanner';
import 'swiper/scss';
import 'swiper/scss/pagination';

const cx = classNames.bind(styles);
function Banner() {
  return (
    <section className={cx('wrapper')}>
      <Swiper
        slidesPerView={1}
        pagination={true}
        modules={[Pagination, Autoplay]}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        {dataBanner.map((data, i) => {
          return (
            <SwiperSlide key={i} className={cx('mySwiper')}>
              <div
                className={cx('banner')}
                style={{ backgroundImage: `url(${data.image})` }}
              >
                <span className={cx('content')}>
                  <h2 className={cx('text')}>{data.text}</h2>
                  <Button danger>Order now</Button>
                </span>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}

export default Banner;
