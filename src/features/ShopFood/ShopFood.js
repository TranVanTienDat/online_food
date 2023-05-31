import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
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
  const { status, searchText, category, price, rate } = useSelector(
    (state) => state.products
  );
  const products = useSelector(productList);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  let itemsPerPage = 8;
  useEffect(() => {
    const fetchProductList = async () => {
      try {
        dispatch(fetchProducts());
        if (status) {
          if (searchText.length > 0) {
            setItemOffset(0);
          }
          const endOffset = itemOffset + itemsPerPage;
          setCurrentItems(products.slice(itemOffset, endOffset));
          setPageCount(Math.ceil(products.length / itemsPerPage));
        }
      } catch {
        console.log('loi');
      }
    };
    fetchProductList();
  }, [
    itemOffset,
    itemsPerPage,
    dispatch,
    status,
    searchText,
    category,
    price,
    rate,
  ]);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % 60;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
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
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="<"
          className="pagination"
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
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
}

export default ShopFood;
