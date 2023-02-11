import propTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import images from '~/assets/images';
import classNames from 'classnames/bind';
import styles from './CardProduct.module.scss';
import { Cart, Heart, Share } from '~/components/Icon';
import { useDispatch } from 'react-redux';
import { addCart } from './productSlice';
import Rating from '~/components/Rating/Rating';
const cx = classNames.bind(styles);
function CardProduct({
  id,
  img,
  noImg = images.noImage,
  name,
  description,
  price,
  evaluate,
}) {
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
      img: img,
      price: price,
    };
    dispatch(addCart(addProduct));
  };

  return (
    <div className={cx('wrapper')}>
      <img
        className={cx('img')}
        src={img || noImg}
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
        <div className={cx('like')}>
          <span className={cx('heart')}>
            <Heart />
          </span>
          <span className={cx('share')}>
            <Share />
          </span>
        </div>
      </div>

      <div className={cx('cart')} onClick={handleAdd}>
        <Cart />
      </div>
    </div>
  );
}

CardProduct.propTypes = {
  onClick: propTypes.func,
  img: propTypes.node,
  noImg: propTypes.node,
  name: propTypes.string,
  description: propTypes.string,
  price: propTypes.number,
};

export default CardProduct;
