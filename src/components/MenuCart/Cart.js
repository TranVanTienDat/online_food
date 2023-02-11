import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { faTrashArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import images from '~/assets/images';
import { removeCart } from '~/features/ShopFood/CardProduct/productSlice';
import MenuCart from './MenuCart';
import styles from './Cart.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Cart() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.product);
  const hanleDelete = () => {
    dispatch(removeCart());
  };

  return (
    <MenuCart>
      <div className={cx('cart')}>
        {products.length > 0 ? (
          <div className={cx('product')}>
            <h1 className={cx('title')}>Sản phẩm mới thêm</h1>
            {products.map((item, i) => {
              return (
                <div className={cx('product-item')} key={i}>
                  <img className={cx('img')} src={item.img} alt="" />
                  <div className={cx('description')}>
                    <div className={cx('name')}>{item.name}</div>
                    <div className={cx('pri-del')}>
                      <span className={cx('price')}>{item.price}.000đ</span>
                      <buton
                        className={cx('delete-product')}
                        onClick={hanleDelete}
                      >
                        <FontAwesomeIcon icon={faTrashArrowUp} />
                      </buton>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className={cx('btn')}>
              <h4 className={cx('Product-number')}>
                {products.length} sản phẩm đã thêm vào
              </h4>
              <button className={cx('btn-more')}>xem giỏ hàng</button>
            </div>
          </div>
        ) : (
          <div className={cx('no-product')}>
            <h2 className={cx('heading')}>Không có sản phẩm nào</h2>
            <img
              className={cx('img-no-product')}
              src={images.noProduct}
              alt=""
            ></img>
          </div>
        )}
      </div>
    </MenuCart>
  );
}

export default Cart;
