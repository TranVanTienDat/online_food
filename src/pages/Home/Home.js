import classNames from 'classnames/bind';
import React, { Suspense } from 'react';
import Banner from '~/components/Banner/Banner';
import CardIntroduce from '~/components/CardIntroduce/CardIntroduce';
import RepeatText from '~/components/RepeatText/RepeatText';
import Slider from '~/components/Slider/Slider';
import { dataBlog } from '~/constants/dataBlog';
import { dataIntroduce } from '~/constants/dataIntroduce';
import styles from './Home.module.scss';
const ShopFood = React.lazy(() => import('~/features/ShopFood/ShopFood'));
const cx = classNames.bind(styles);

function Home() {
  return (
    <div className={cx('wrapper')}>
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
      <RepeatText title="Near Me" text="Our regular updated new blogs." />
      <div className={cx('demo')}>
        {dataBlog.map((data, index) => {
          return (
            <CardIntroduce
              maxWith
              key={index}
              img={data.img}
              title={data.title}
              paragraph={data.paragraph}
              button="Apply Now"
              boxShadow
            />
          );
        })}
      </div>
    </div>
  );
}

export default Home;
