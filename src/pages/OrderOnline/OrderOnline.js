import { useEffect } from 'react';
import Banner from '~/components/Banner/Banner';
import RepeatText from '~/components/RepeatText/RepeatText';
import ShopFood from '~/features/ShopFood/ShopFood';

function OrderOnline() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Banner />
      <RepeatText title="Popular Menu" text="Wait a minute for delicious" />
      <ShopFood />
    </div>
  );
}

export default OrderOnline;
