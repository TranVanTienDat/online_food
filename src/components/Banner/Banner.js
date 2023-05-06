import Button from '../Button/Button';

// import style scss
import classNames from 'classnames/bind';
import styles from './Banner.module.scss';

//import swiper
import { useNavigate } from 'react-router-dom';
import { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/pagination';
import { dataBanner } from '~/constants/dataBanner';

const cx = classNames.bind(styles);
function Banner({ animate }) {
  const navigate = useNavigate();
  const handleOrder = () => {
    navigate('/order-online');
  };
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
                style={{
                  backgroundImage: `url(${data.image})`,
                }}
              >
                <span className={cx('content')}>
                  <h2 className={cx('text')}>{data.text}</h2>
                  <div className={cx('button')}>
                    <Button danger onClick={handleOrder}>
                      Order now
                    </Button>
                  </div>
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
