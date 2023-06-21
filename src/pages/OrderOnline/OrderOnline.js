import Banner from '~/components/Banner/Banner';
import RepeatText from '~/components/RepeatText/RepeatText';
import ShopFood from '~/features/ShopFood/ShopFood';

function OrderOnline() {
  return (
    <div>
      <Banner />
      <RepeatText title="Popular Menu" text="Wait a minute for delicious" />
      <ShopFood />
    </div>
  );
}

export default OrderOnline;
