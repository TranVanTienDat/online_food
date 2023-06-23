import {
  faArrowRightArrowLeft,
  faCartPlus,
  faChevronCircleLeft,
  faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import productsApi from '~/api/productsApi';
import Button from '~/components/Button/Button';
import Rating from '~/components/Rating/Rating';
import RelatedProduct from '~/components/RelatedProduct/RelatedProduct';
import UseComment from '~/components/UseComment/UseComment';
import { success, warning } from '~/constants/ToastMessage/ToastMessage';
// import { addIsModal } from '~/slice/addressSlice';
import { addIsModal } from '~/slice/info';
import { cartSelector, infoUser } from '~/slice/selector';
import { addCart } from '../../../../slice/productCartSlice';
import ModalAddress from './ModalAddress';
import styles from './ProductDetail.module.scss';

const cx = classNames.bind(styles);
function ProductDetail() {
  const selectorCartProduct = useSelector(cartSelector);
  const userSelector = useSelector(infoUser);
  const [product, setProduct] = useState();
  const [detail, setDetail] = useState({
    loading: false,
    toggle: true,
    rating: 'Product review',
    amount: 1,
    initialPrice: null,
    price: null,
  });
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductList = async () => {
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
    fetchProductList();
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

  // processing products in the cart
  const handleAddCart = (e) => {
    if (product.quantity > 0) {
      e.preventDefault();
      const addProduct = {
        id: product.id,
        name: product.name,
        img: product.image,
        quantity: detail.amount,
        price: product.price,
      };
      const isCheck = selectorCartProduct.some(
        (item) => item.id === addProduct.id
      );
      if (!isCheck) {
        dispatch(addCart(addProduct));
        success('The product has been added');
      } else {
        warning('Products already in the cart');
      }
    } else {
      warning('The product is over');
    }
  };

  const handleToggle = useCallback(() => {
    if (userSelector.status) {
      setDetail((prev) => ({ ...prev, toggle: !prev.toggle }));
      detail.toggle
        ? setDetail((prev) => ({ ...prev, rating: 'Product description' }))
        : setDetail((prev) => ({ ...prev, rating: 'Product review' }));
    } else {
      warning('You need to log in to evaluate the product');
    }
  }, [userSelector]);

  // Handle additional addresses
  const handleAddress = (e) => {
    if (userSelector.status) {
      e.preventDefault();
      dispatch(addIsModal({ isModal: true }));
    } else {
      warning('You need sign in');
    }
  };

  //Handle buy product
  const handleBuy = () =>
    userSelector.status ? success('Buy success') : warning('You need sign in');

  return detail.loading ? (
    <div className={cx('wrapper')}>
      <div className={cx('detail')}>
        <img className={cx('img')} src={product?.image} alt="" />
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
          <div className={cx('shop-discount')}>
            <h2 className={cx('title')}>Coupon code for the shop</h2>
            <span className={cx('promissory-note')}>DOWN 20%</span>
          </div>

          <div className={cx('delivery')}>
            <span className={cx('heading')}>Transport</span>
            <div className={cx('specifically')}>
              <span className={cx('fz14')}>Free shipping</span>
              <div className={cx('transport')}>
                <span className={cx('heading')}>Transport to</span>
                <div className={cx('fz14')}>
                  <span className={cx('address')}>{userSelector.address}</span>
                  <FontAwesomeIcon
                    icon={faArrowRightArrowLeft}
                    className={cx('icon-address')}
                    onClick={handleAddress}
                  />
                </div>
              </div>

              <div className={cx('transport')}>
                <span className={cx('heading')}>Your phone number</span>
                <div className={cx('fz14')}>{userSelector.numberPhone}</div>
              </div>

              <div className={cx('transport')}>
                <span className={cx('heading')}>Delivery cost</span>
                <div className={cx('fz14')}>123.000đ</div>
              </div>
            </div>
          </div>

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
            <h4 className={cx('available')}>48 available products</h4>
          </div>

          <div className={cx('buy')}>
            <Button
              icon={<FontAwesomeIcon icon={faCartPlus} />}
              onClick={handleAddCart}
              danger={product?.quantity > 0}
              disabled={product?.quantity <= 0}
            >
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
        </div>
      </div>

      <div className={cx('footer')}>
        <span>
          <Button info onClick={handleToggle}>
            {detail.rating}
          </Button>
        </span>

        <div className={cx('comment')}>
          {detail.toggle ? (
            <div style={{ margin: '10px 0', textAlign: 'justify' }}>
              {product?.description}
            </div>
          ) : (
            <UseComment id={detail.product?.id} />
          )}
        </div>
        <RelatedProduct idProduct={product?.id} />
      </div>
      {userSelector.isModal && <ModalAddress />}
    </div>
  ) : (
    <h1 style={{ textAlign: 'center', lineHeight: '100vh' }}>Loading...</h1>
  );
}

export default ProductDetail;
