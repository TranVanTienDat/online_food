import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productsApi from '~/api/productsApi';
import CardProduct from '~/features/ShopFood/CardProduct/CardProduct';
import styles from './RelatedProduct.module.scss';
const cx = classNames.bind(styles);
function RelatedProduct() {
  const [listProduct, setListProduct] = useState([]);
  const param = useParams();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await productsApi.getAll();
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
        {listProduct.slice(+param.id, +param.id + 4).map((data, index) => (
          <CardProduct key={index} {...data}></CardProduct>
        ))}
      </div>
    </div>
  );
}

export default RelatedProduct;
