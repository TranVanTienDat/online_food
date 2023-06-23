import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import productsApi from '~/api/productsApi';
import CardProduct from '~/features/ShopFood/CardProduct/CardProduct';
import styles from './RelatedProduct.module.scss';
const cx = classNames.bind(styles);
function RelatedProduct({ idProduct }) {
  const [listProduct, setListProduct] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await productsApi.getAll();
        let randomID = Math.floor(Math.random() * 57);
        setListProduct(res.slice(randomID, randomID + 4));
      } catch {
        console.log('loi');
      }
    };
    fetchProducts();
  }, [idProduct]);

  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('title')}>Related products</h2>
      <div className={cx('list')}>
        {listProduct.map((data, index) => (
          <CardProduct key={index} {...data}></CardProduct>
        ))}
      </div>
    </div>
  );
}

export default RelatedProduct;
