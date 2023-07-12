import React, { Suspense } from 'react';
import Banner from '~/components/Banner/Banner';
import RepeatText from '~/components/RepeatText/RepeatText';

const ShopFood = React.lazy(() => import('~/features/ShopFood/ShopFood'));

function OrderOnline() {
  return (
    <div>
      <Banner />
      <RepeatText title="Popular Menu" text="Wait a minute for delicious" />
      <Suspense
        fallback={
          <p
            style={{
              fontSize: '2rem',
              margin: '30px',
              textAlign: 'center',
            }}
          >
            ...Loading
          </p>
        }
      >
        <ShopFood />
      </Suspense>
    </div>
  );
}

export default OrderOnline;
