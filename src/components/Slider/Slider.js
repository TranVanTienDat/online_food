import { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import styles
import classNames from 'classnames/bind';
import styles from './Slider.module.scss';
// style swiper
import 'swiper/scss';
import 'swiper/scss/navigation';
import { dataCategory } from '~/constants/dataCategory';

const cx = classNames.bind(styles);

function Slider() {
  return (
    <section className={cx('category')}>
      <Swiper
        modules={[Autoplay, Navigation]}
        loop={true}
        loopFillGroupWithBlank={true}
        slidesPerView={5}
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
