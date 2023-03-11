import React, { Suspense } from 'react';
import classNames from 'classnames/bind';
import styles from './Container.module.scss';
import Banner from '~/components/Banner';
import Slider from '~/components/Slider';
import { dataIntroduce } from '~/constants/dataIntroduce';
import { dataBlog } from '~/constants/dataBlog';
import CardIntroduce from '~/components/CardIntroduce';
import RepeatText from '~/components/RepeatText';
const ShopFood = React.lazy(() => import('~/features/ShopFood'));
// import ShopFood from '~/features/ShopFood';
const cx = classNames.bind(styles);

function Container() {
  return (
    <div className={cx('container')}>
      <Banner />
      <RepeatText title="Hungry?" text="Wait a minute for delicious" />
      <div className={cx('demo')}>
        {dataIntroduce.map((data, index) => {
          return (
            <CardIntroduce
              w150
              key={index}
              img={data.img}
              title={data.title}
              paragraph={data.paragraph}
            />
          );
        })}
      </div>
      <Slider />
      <RepeatText title="Popular Menu" text="Wait a minute for delicious" />
      <Suspense fallback={<p>...Loading</p>}>
        <ShopFood />
      </Suspense>
      <RepeatText title="Newar Me" text="Our regular updated new blogs." />
      <div className={cx('demo')}>
        {dataBlog.map((data, index) => {
          return (
            <CardIntroduce
              maxWith
              key={index}
              img={data.img}
              title={data.title}
              paragraph={data.paragraph}
              buton="Apply Now"
              boxShadow
            />
          );
        })}
      </div>
    </div>
  );
}

export default Container;
