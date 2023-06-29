import classNames from 'classnames/bind';
import propTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import images from '~/assets/images';
import { Cart } from '~/components/Icon';
import Rating from '~/components/Rating/Rating';
import { warning } from '~/constants/ToastMessage/ToastMessage';
import { cartSelector } from '~/slice/selector';
import { addCart } from '../../../slice/productCartSlice';
import styles from './CardProduct.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function CardProduct({
  id,
  image,
  noImg = images.noImage,
  name,
  description,
  purchase,
  price,
  evaluate,
}) {
  let formatPrice = Intl.NumberFormat('en-US');
  const selectorCartProduct = useSelector(cartSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Handle towards product details
  const handleNavigate = () => {
    navigate(`/cart/${id}`);
  };

  // Handle more products to the cart
  const handleAdd = (e) => {
    e.preventDefault();
    const addProduct = {
      id: id,
      name: name,
      img: image || noImg,
      quantity: 1,
      price: price,
    };
    const isCheck = selectorCartProduct.some(
      (item) => item.id === addProduct.id
    );
    if (!isCheck) {
      dispatch(addCart(addProduct));
    } else {
      warning('Products already in the cart');
    }
  };

  return (
    <div className={cx('wrapper')}>
      <img
        className={cx('img')}
        src={image || noImg}
        alt=""
        onClick={handleNavigate}
      />

      <h1 className={cx('name')}>{name}</h1>
      <div className={cx('evaluate')}>
        <Rating value={evaluate} />
      </div>
      <p className={cx('description')}>{description}</p>
      <div className={cx('footer')}>
        <span className={cx('price')}>{formatPrice.format(price)}đ</span>
        <div className={cx('quantity')}>Sold {purchase}</div>
      </div>

      <div className={cx('cart')} onClick={handleAdd}>
        <FontAwesomeIcon icon={faCartShopping} />
      </div>
    </div>
  );
}

CardProduct.propTypes = {
  image: propTypes.node,
  noImg: propTypes.node,
  name: propTypes.string,
  description: propTypes.string,
  price: propTypes.number,
  purchase: propTypes.number,
  evaluate: propTypes.number,
};

export default CardProduct;
