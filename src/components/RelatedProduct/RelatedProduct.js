import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import productsApi from '~/api/productsApi';
import CardProduct from '~/features/ShopFood/CardProduct/CardProduct';
import styles from './RelatedProduct.module.scss';
const cx = classNames.bind(styles);
function RelatedProduct() {
  const [listProduct, setListProduct] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await productsApi.getAll();
        // const products = res.map(() => Math.floor(Math.random() * 10));
        setListProduct(res);
      } catch {
        console.log('loi');
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('title')}>sản phẩm liên quan</h2>
      <div className={cx('list')}>
        {listProduct.slice(55).map((data, index) => (
          <CardProduct
            key={index}
            id={data.id}
            img={data.image}
            name={data.name}
            description={data.description}
            price={data.price}
            evaluate={data.evaluate}
          ></CardProduct>
        ))}
      </div>
    </div>
  );
}

export default RelatedProduct;
