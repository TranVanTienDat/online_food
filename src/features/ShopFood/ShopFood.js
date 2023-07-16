import classNames from 'classnames/bind';
import { useEffect, useMemo, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import images from '~/assets/images';
import { fetchProducts } from '~/slice/productsSlice';
import { productList } from '~/slice/selector';
import CardProduct from './CardProduct/CardProduct';
import Search from './Search/Search';
import styles from './ShopFood.module.scss';
import SideBar from './SideBar/SideBar';

const cx = classNames.bind(styles);

function ShopFood() {
  const dispatch = useDispatch();
  const { status, category, price, rate, searchText } = useSelector(
    (state) => state.products
  );
  const [currentButton, setCurrentButton] = useState(
    parseInt(localStorage.getItem('currentButton')) || 0
  );
  const products = useSelector(productList);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(
    parseInt(localStorage.getItem('pageCount')) || 0
  );
  const [itemOffset, setItemOffset] = useState(
    parseInt(localStorage.getItem('itemOffset')) || 0
  );
  const [isElement, setIsElement] = useState(
    JSON.parse(localStorage.getItem('isElement'))
  );
  const itemsPerPage = 8;

  // use useMemo save value current
  const memoizedParams = useMemo(
    () => [itemOffset, itemsPerPage, status, category, searchText, price, rate],
    [itemOffset, itemsPerPage, status, category, searchText, price, rate]
  );

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        dispatch(fetchProducts());
        if (status) {
          const endOffset = itemOffset + itemsPerPage;
          setCurrentItems(products.slice(itemOffset, endOffset));
          setPageCount(Math.ceil(products.length / itemsPerPage));
        }
      } catch {
        console.log('loi');
      }
    };
    fetchProductList();
  }, memoizedParams);

  useEffect(() => {
    setIsElement(true);
    if (price !== 1 || rate !== 0 || searchText !== '') {
      if (isElement) {
        setCurrentButton(0);
        setItemOffset(0);
      }
    }
  }, [price, rate, searchText]);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % 60;
    setIsElement(false);
    setItemOffset(newOffset);
    localStorage.setItem('currentButton', event.selected);
    localStorage.setItem('itemOffset', newOffset);
    localStorage.setItem('isElement', false);
    localStorage.setItem('pageCount', event.selected);
  };

  return (
    <div className={cx('shop')}>
      <SideBar />
      <div className={cx('product')}>
        <Search />
        <div className={cx('home')}>
          {currentItems.length > 0 ? (
            currentItems.map((data, index) => (
              <CardProduct key={index} {...data} />
            ))
          ) : (
            <img className={cx('no-found')} src={images.noFound} alt="" />
          )}
        </div>

        <ReactPaginate
          nextLabel=">"
          forcePage={currentButton}
          onPageChange={handlePageClick}
          pageCount={pageCount}
          previousLabel="<"
          className={'pagination'}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName={'active'}
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
}

export default ShopFood;
