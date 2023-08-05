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

  // const [currentButton, setCurrentButton] = useState(
  //   parseInt(localStorage.getItem('currentButton')) || 0
  // );
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [isElement, setIsElement] = useState(true);
  //fetch data
  useEffect(() => {
    const fetchProductList = async () => {
      try {
        dispatch(fetchProducts());
      } catch (error) {
        console.log('loi');
      }
    };
    if (!status) {
      fetchProductList();
    }
  }, [status]);

  // use useMemo save value current
  const memoizedParams = useMemo(
    () => [itemOffset, itemsPerPage, status, category, searchText, price, rate],
    [itemOffset, itemsPerPage, category, status, searchText, price, rate]
  );

  useEffect(() => {
    if (status) {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(products.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(products.length / itemsPerPage));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memoizedParams]);

  useEffect(() => {
    setIsElement(true);
    setItemOffset(0);
  }, [category, searchText, price, rate]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % 60;
    setIsElement(false);
    setItemOffset(newOffset);
    // setCurrentButton(event.selected);
    // localStorage.setItem('currentButton', event.selected);
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
          onPageChange={handlePageClick}
          // forcePage={currentButton}
          pageCount={pageCount}
          previousLabel="<"
          className={isElement ? 'pagination page-item-active' : 'pagination'}
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
          activeClassName={!isElement && 'active'}
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
}

export default ShopFood;
