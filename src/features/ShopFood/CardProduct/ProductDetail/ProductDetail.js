import {
  faArrowLeft,
  faArrowRightArrowLeft,
  faChevronCircleLeft,
  faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import productsApi from '~/api/productsApi';
import Button from '~/components/Button/Button';
import Rating from '~/components/Rating/Rating';
import RelatedProduct from '~/components/RelatedProduct/RelatedProduct';
import UseComment from '~/components/UseComment/UseComment';
import { success, warning } from '~/constants/ToastMessage/ToastMessage';
import { checkProductCart } from '~/hook/func';
import { addIsModal } from '~/slice/infoDataUser';
import { cartSelector, infoDataUserSelector } from '~/slice/selector';
import { addCart } from '../../../../slice/productCartSlice';
import ModalAddress from './ModalAddress';
import styles from './ProductDetail.module.scss';

const cx = classNames.bind(styles);
function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectorCartProduct = useSelector(cartSelector);
  const { status, address, numberPhone, isModal } =
    useSelector(infoDataUserSelector);

  const [product, setProduct] = useState();
  const [detail, setDetail] = useState({
    loading: false,
    toggle: true,
    rating: 'Product review',
    amount: 1,
    initialPrice: null,
    price: null,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Get data from id
        const response = await productsApi.getProduct(id);
        setProduct(response);
        setDetail((prev) => ({
          ...prev,
          initialPrice: response.price,
          price: response.price,
          loading: true,
        }));
        window.scrollTo(0, 0);
      } catch {
        console.log('loi');
      }
    };
    fetchProduct();
  }, [id]);

  const handlePrev = useCallback(() => {
    if (detail.amount > 1) {
      setDetail((prev) => ({
        ...prev,
        amount: prev.amount - 1,
        price: prev.price - prev.initialPrice,
      }));
    }
  }, [detail]);

  const handleNext = useCallback(() => {
    setDetail((prev) => ({
      ...prev,
      amount: detail.amount + 1,
      price: prev.price + prev.initialPrice,
    }));
  }, [detail]);

  // Format price
  const formattedPrice = useMemo(
    () => Intl.NumberFormat('en-US').format(detail?.price || 0),
    [detail]
  );

  const handleAddCart = (e) => {
    e.preventDefault();
    const infoProduct = {
      id: product.id,
      name: product.name,
      img: product.image,
      quantity: detail.amount,
      price: product.price,
    };

    checkProductCart(selectorCartProduct, infoProduct, dispatch, addCart);
  };

  // Handle additional addresses
  const handleAddress = (e) => {
    status
      ? dispatch(addIsModal({ isModal: true }))
      : warning('You need sign in');
  };

  //Handle buy product
  const handleBuy = () =>
    status
      ? product.quantity > 0
        ? success('Buy success')
        : warning('out of product')
      : warning('You need sign in');

  return detail.loading ? (
    <div className={cx('wrapper')}>
      <div className={cx('detail')}>
        <img className={cx('img')} src={product?.image} alt="" />
        <FontAwesomeIcon
          icon={faArrowLeft}
          className={cx('icon-back')}
          onClick={() => navigate(-1)}
        />

        <div className={cx('element')}>
          <h1 className={cx('name')}>{product?.name}</h1>

          <div className={cx('flex')}>
            <span className={cx('star')}>
              <Rating value={product?.evaluate} />
            </span>
            <span className={cx('evaluate')}>62 reviews</span>
            <span className={cx('sell')}>
              {product?.quantity} products in stock
            </span>
          </div>

          <div className={cx('price')}>{formattedPrice}đ</div>
          <div className={cx('product')}>
            <div className={cx('amount')}>
              <span className={cx('prev')} onClick={handlePrev}>
                <FontAwesomeIcon icon={faChevronCircleLeft} />
              </span>
              <span className={cx('number')}>{detail.amount}</span>
              <span className={cx('next')} onClick={handleNext}>
                <FontAwesomeIcon icon={faChevronCircleRight} />
              </span>
            </div>
          </div>
          <div className={cx('discount')}>
            <h2 className={cx('title')}>Coupon code for the shop</h2>
            <span className={cx('promissory-note')}>DOWN 20%</span>
          </div>

          <div className={cx('delivery')}>
            <div className={cx('specifically')}>
              <span className={cx('fz14')}>Free shipping</span>
              <div className={cx('transport')}>
                <span className={cx('heading')}>Transport to:</span>
                <div className={cx('fz14')}>
                  <span className={cx('address')}>{address}</span>
                  <FontAwesomeIcon
                    icon={faArrowRightArrowLeft}
                    className={cx('icon-address')}
                    onClick={handleAddress}
                  />
                </div>
              </div>

              <div className={cx('transport')}>
                <span className={cx('heading')}>Your phone number:</span>
                <div className={cx('fz14')}>{numberPhone}</div>
              </div>

              <div className={cx('transport')}>
                <span className={cx('heading')}>Delivery cost:</span>
                <div className={cx('fz14')}>123.000đ</div>
              </div>
            </div>
          </div>

          <div className={cx('buy__button')}>
            <Button onClick={handleAddCart} danger>
              Add to cart
            </Button>
            <Button
              outline={product?.quantity > 0}
              disabled={product?.quantity <= 0}
              onClick={handleBuy}
            >
              buy now
            </Button>
          </div>

          <div className={cx('description')}> {product?.description}</div>
        </div>
      </div>

      {/* Reviews and related products */}
      <div className={cx('footer')}>
        <div className={cx('comment')}>
          <UseComment id={id} />
        </div>

        <RelatedProduct idProduct={product?.id} />
      </div>
      {isModal && <ModalAddress />}
    </div>
  ) : (
    <h1 style={{ textAlign: 'center', lineHeight: '100vh' }}>Loading...</h1>
  );
}

export default ProductDetail;
