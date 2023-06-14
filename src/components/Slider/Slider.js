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
  const [isWidth, setIsWidth] = useState();
  useEffect(() => {
    const handleSetWidth = () => {
      if (window.innerWidth <= 800) {
        setIsWidth(true);
      } else {
        setIsWidth(false);
      }
    };
    window.addEventListener('resize', handleSetWidth);
  });
  return (
    <section className={cx('category')}>
      <h4 className={cx('title')}>What we have?</h4>
      <h2 className={cx('heading')}>list of products</h2>
      <Swiper
        modules={[Autoplay, Navigation]}
        loop={true}
        loopFillGroupWithBlank={true}
        slidesPerView={isWidth ? 2 : 5}
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
                <div className={cx('card-background')}>
                  <div className={cx('description')}>
                    <h2 className={cx('name')}>{data.name}</h2>
                    <h3 className={cx('country')}>Stating</h3>
                    <h3 className={cx('price')}>${data.price}</h3>
                  </div>

                  <img className={cx('img-product')} src={data.img} alt="" />
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
