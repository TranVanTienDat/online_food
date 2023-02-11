import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  faCartPlus,
  faChevronCircleLeft,
  faChevronCircleRight,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import productsApi from '~/api/productsApi';
import Button from '~/components/Button/Button';
import styles from './ProductDetail.module.scss';
import Rating from '~/components/Rating/Rating';
import { useDispatch } from 'react-redux';
import { addCart } from '../productSlice';
import UseComment from '~/components/UseComment/UseComment';
import RelatedProduct from '~/components/RelatedProduct/RelatedProduct';
import { UserAuth } from '~/firebase/context/AuthContext';
import Footer from '~/Layouts/DefaulLayOut/Footer';
import ToastMessage from '~/components/ToastMessage/ToastMessage';

const cx = classNames.bind(styles);
function ProductDetail() {
  const [product, setProduct] = useState(); //2
  const [toastMessage, setToastMessage] = useState(false); //1
  const [togle, setTogle] = useState(true); //1
  const [rating, setRating] = useState('Đánh giá'); //1
  const [loading, setLoading] = useState(false); //1
  const [amount, setAmount] = useState(1); //1
  const [initialPrice, setInitialPrice] = useState(); //2
  const [price, setPrice] = useState(); //2
  const param = useParams();
  const dispatch = useDispatch();

  const { user } = UserAuth(); // lấy ra người dùng có đăng nhập hay không?

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const response = await productsApi.getProduct(param.id);
        setProduct(response);
        const initialPrice = response.price;
        setInitialPrice(initialPrice);
        setPrice(initialPrice);
        setLoading(true);
      } catch {
        console.log('loi');
      }
    };
    fetchProductList();
  }, [param.id]);

  // Xử lí giảm số lượng và giá sản phẩm
  const handlePrev = () => {
    if (amount >= 2) {
      setAmount((amount) => amount - 1);
    }

    if (price > initialPrice) {
      setPrice((pr) => pr - initialPrice);
    }
  };

  // Xử lí tăng số lượng và giá sản phẩm
  const handleNext = () => {
    setAmount((amount) => amount + 1);

    setPrice((pr) => pr + initialPrice);
  };

  // xử lí thêm sản phẩm vào giỏ hàng
  const handleAddCart = (e) => {
    e.preventDefault();
    const addProduct = {
      id: product.id,
      name: product.name,
      img: product.image,
      price: product.price,
    };
    dispatch(addCart(addProduct));
  };

  // Xử lí nút bấm đánh giá và mô tả
  const handleTogle = () => {
    if (user) {
      setTogle(!togle);
      togle ? setRating('Mô tả') : setRating('Đánh giá');
    } else {
      setToastMessage(true);
      setTimeout(function () {
        setToastMessage(false);
      }, 3500);
    }
  };

  console.log('toastM');

  return loading ? (
    <div className={cx('wrapper')}>
      <div className={cx('detail')}>
        <img className={cx('img')} src={product.image} alt="" />
        <div className={cx('element')}>
          <h1 className={cx('name')}>{product.name}</h1>

          <div className={cx('flex')}>
            <span className={cx('star')}>
              <Rating value={product.evaluate} />
            </span>
            <span className={cx('evaluate')}>62 lượt đánh giá</span>
            <span className={cx('sell')}>{product.purchase} lượt bán</span>
          </div>

          <div className={cx('price')}>{price}.000đ</div>
          <div className={cx('shop-discount')}>
            <h2 className={cx('title')}>Mã giảm giá của shop</h2>
            <span className={cx('promissory-note')}>80% GIẢM</span>
          </div>

          <div className={cx('delivery')}>
            <span className={cx('heading')}>Vận Chuyển</span>
            <div className={cx('specifically')}>
              <span className="fz14">Miễn phí vận chuyển</span>
              <div className={cx('transport')}>
                <span className={cx('heading')}>Vận Chuyển tới</span>
                <p className={cx('fz14')}>phường Phước Vĩnh, ThànH Phố Huế</p>
              </div>

              <div className={cx('transport')}>
                <span className={cx('heading')}>Phí Vận Chuyển</span>
                <div className={cx('fz14')}>123.000đ</div>
              </div>
            </div>
          </div>

          <div className={cx('product')}>
            <div className={cx('amount')}>
              <span className={cx('prev')} onClick={handlePrev}>
                <FontAwesomeIcon icon={faChevronCircleLeft} />
              </span>
              <span className={cx('number')}>{amount}</span>
              <span className={cx('next')} onClick={handleNext}>
                <FontAwesomeIcon icon={faChevronCircleRight} />
              </span>
            </div>
            <h4 className={cx('available')}>48 sản phẩm có sẵn</h4>
          </div>

          <div className={cx('buy')}>
            <Button
              danger
              icon={<FontAwesomeIcon icon={faCartPlus} />}
              onClick={handleAddCart}
            >
              Thêm vào giỏ hàng
            </Button>
            <Button outline>mua ngay</Button>
          </div>
        </div>
      </div>

      <div className={cx('footer')}>
        <span>
          <Button info onClick={handleTogle}>
            {rating}
          </Button>
        </span>

        <div className={cx('comment')}>
          {togle ? (
            <div style={{ margin: '10px 0' }}>{product.description}</div>
          ) : (
            <UseComment id={product.id} />
          )}
        </div>
        <RelatedProduct />
      </div>
      <Footer />
      {toastMessage && (
        <ToastMessage
          icon={<FontAwesomeIcon icon={faRightFromBracket} />}
          title="Bạn cần đăng nhập"
          danger
          block
        />
      )}
    </div>
  ) : (
    <h1 style={{ textAlign: 'center', lineHeight: '100vh' }}>Loading...</h1>
  );
}

export default ProductDetail;
