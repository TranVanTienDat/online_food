import classNames from 'classnames/bind';
import styles from './Container.module.scss';
import Banner from '~/components/Banner';
import Slider from '~/components/Slider';
import { dataIntroduce } from '~/constants/dataIntroduce';
import { dataBlog } from '~/constants/dataBlog';
import CardIntroduce from '~/components/CardIntroduce';
import RepeatText from '~/components/RepeatText';
import ShopFood from '~/features/ShopFood';
const cx = classNames.bind(styles);
function Container() {
  return (
    <div className={cx('container')}>
      <Banner />
      <Slider />
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
      <RepeatText title="Popular Menu" text="Wait a minute for delicious" />
      <ShopFood />
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
