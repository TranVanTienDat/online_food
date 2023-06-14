import classNames from 'classnames/bind';
import propTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import images from '~/assets/images';
import { Cart } from '~/components/Icon';
import Rating from '~/components/Rating/Rating';
import { warning } from '~/constants/ToastMessage/ToastMessage';
import { cardSelector } from '~/slice/selector';
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
  const selector = useSelector(cardSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // xử lí chuyển hướng đến trang chi tiết sản phẩm
  const handleNavigate = () => {
    navigate(`/cart/${id}`);
  };

  // xử lí thêm sản phẩm vào giỏ hàng
  const handleAdd = (e) => {
    e.preventDefault();
    const addProduct = {
      id: id,
      name: name,
      img: image || noImg,
      quantity: 1,
      price: price,
    };
    const isCheck = selector.some((item) => item.id === addProduct.id);
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
        <span className={cx('price')}>{price}.000đ</span>
        <div className={cx('quantity')}>đã bán {purchase}</div>
      </div>

      <div className={cx('cart')} onClick={handleAdd}>
        <Cart />
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
