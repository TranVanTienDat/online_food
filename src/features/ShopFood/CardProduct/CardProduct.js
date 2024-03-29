import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import propTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import images from '~/assets/images';
import Rating from '~/components/Rating/Rating';
import { checkProductCart } from '~/hook/func';
import { cartSelector } from '~/slice/selector';
import { addCart } from '../../../slice/productCartSlice';
import styles from './CardProduct.module.scss';
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
    const infoProduct = {
      id: id,
      name: name,
      img: image || noImg,
      quantity: 1,
      price: price,
    };

    checkProductCart(selectorCartProduct, infoProduct, dispatch, addCart);
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
