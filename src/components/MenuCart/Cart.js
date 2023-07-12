import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { faCartPlus, faTrashArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react/headless';
import images from '~/assets/images';
import { removeCart } from '~/slice/productCartSlice';
import styles from './Cart.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Cart() {
  let formatPrice = Intl.NumberFormat('en-US');
  const dispatch = useDispatch();

  const products = useSelector((state) => state.product);
  // console.log(products);
  const handleDelete = (id) => {
    dispatch(removeCart(id));
  };

  return (
    <Tippy
      placement="bottom-start"
      arrow={true}
      interactive
      render={(attrs) => (
        <div className={cx('cart')} tabIndex="-1" {...attrs}>
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
                        <span className={cx('price')}>
                          {formatPrice.format(item.price)}đ
                        </span>

                        <span className={cx('quantity')}>{item.quantity}</span>
                        <buton
                          className={cx('delete-product')}
                          onClick={() => handleDelete(item.id)}
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
      )}
    >
      <div
        className={cx('icon__cart')}
        aria-label="Cart"
        aria-live="polite"
        aria-atomic="true"
      >
        <FontAwesomeIcon icon={faCartPlus} />
        <span className={cx('total')}>{products.length}</span>
      </div>
    </Tippy>
  );
}

export default Cart;
