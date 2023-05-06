import Footer from '~/Layouts/DefaulLayOut/Footer/Footer';
import Header from '~/Layouts/DefaulLayOut/Header/Header';
import Banner from '~/components/Banner/Banner';
import ShopFood from '~/features/ShopFood/ShopFood';
import RepeatText from '~/components/RepeatText/RepeatText';
import { useEffect } from 'react';

function OrderOnline() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Header />
      <Banner />
      <RepeatText title="Popular Menu" text="Wait a minute for delicious" />
      <ShopFood />
      <Footer />
    </div>
  );
}

export default OrderOnline;
