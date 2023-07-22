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
  const itemsPerPage = 8;
  const dispatch = useDispatch();
  const { status, category, price, rate, searchText } = useSelector(
    (state) => state.products
  );
  const products = useSelector(productList);
  const [currentItems, setCurrentItems] = useState([]);

  const [currentButton, setCurrentButton] = useState(
    parseInt(localStorage.getItem('currentButton')) || 0
  );
  const [pageCount, setPageCount] = useState(
    parseInt(localStorage.getItem('pageCount')) || 0
  );
  const [itemOffset, setItemOffset] = useState(
    parseInt(localStorage.getItem('itemOffset')) || 0
  );
  const [isElement, setIsElement] = useState(
    JSON.parse(localStorage.getItem('isElement'))
  );

  //fetch data
  useEffect(() => {
    const fetchProductList = async () => {
      try {
        dispatch(fetchProducts());
        //
      } catch (error) {
        console.log('loi');
      }
    };
    fetchProductList();
  }, []);

  // use useMemo save value current
  const memoizedParams = useMemo(
    () => [itemOffset, itemsPerPage, status, category, searchText, price, rate],
    [itemOffset, itemsPerPage, status, category, searchText, price, rate]
  );

  useEffect(() => {
    if (status) {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(products.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(products.length / itemsPerPage));
    }
    setIsElement(true);
    if (price !== 1 || rate !== 0 || searchText !== '' || category !== 'All') {
      if (isElement) {
        setCurrentButton(0);
        setItemOffset(0);
      }
    }
  }, [memoizedParams, price, rate, searchText, category]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % 60;
    setIsElement(false);
    setItemOffset(newOffset);
    localStorage.setItem('isElement', false);
    localStorage.setItem('itemOffset', newOffset);
    localStorage.setItem('pageCount', event.selected);
    localStorage.setItem('currentButton', event.selected);
  };

  return (
    <div className={cx('shop')}>
      <SideBar />
      <div className={cx('product')}>
        <Search />
        {currentItems.length > 0 ? (
          <div className={cx('main')}>
            {currentItems.map((data, index) => (
              <CardProduct key={index} {...data} />
            ))}
          </div>
        ) : (
          <img className={cx('no-found')} src={images.noFound} alt="" />
        )}

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
