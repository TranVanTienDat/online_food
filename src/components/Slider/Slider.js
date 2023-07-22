import { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import styles
import classNames from 'classnames/bind';
import styles from './Slider.module.scss';
// style swiper
import 'swiper/scss';
import 'swiper/scss/navigation';
import { dataCategory } from '~/constants/dataCategory';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Slider() {
  const [isWidth, setIsWidth] = useState(window.innerWidth <= 800);

  useEffect(() => {
    const handleSetWidth = () => {
      setIsWidth(window.innerWidth <= 800);
    };
    window.addEventListener('resize', handleSetWidth);
    return () => {
      window.removeEventListener('resize', handleSetWidth);
    };
  }, []);
  return (
    <section className={cx('category')}>
      <h3 className={cx('title')}>What we have?</h3>
      <h2 className={cx('heading')}>list of products</h2>
      <Swiper
        modules={[Autoplay, Navigation]}
        loop={true}
        loopFillGroupWithBlank={true}
        slidesPerView={isWidth ? 3 : 6}
        navigation={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
      >
        {dataCategory.map((data, index) => {
          return (
            <SwiperSlide key={index}>
              <div className={cx('card')}>
                <div className={cx('background')}>
                  <div className={cx('image')}>
                    <img
                      className={cx('image__product')}
                      src={data.img}
                      alt=""
                    />
                  </div>
                  <h2 className={cx('name')}>{data.name}</h2>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}

export default Slider;
