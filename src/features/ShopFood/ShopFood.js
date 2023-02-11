import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import classNames from 'classnames/bind';
import styles from './ShopFood.module.scss';
import productsApi from '~/api/productsApi';
import CardProduct from './CardProduct/CardProduct';
import images from '~/assets/images';
const cx = classNames.bind(styles);

function ShopFood() {
  const itemsPerPage = 10;
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const response = await productsApi.getAll();
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(response.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(response.length / itemsPerPage));
      } catch {
        console.log('loi');
      }
    };
    fetchProductList();
  }, [itemOffset, itemsPerPage]);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % 60;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <div className={cx('shop')}>
      <div className={cx('home-product')}>
        {currentItems.length > 0 ? (
          currentItems.map((data, index) => (
            <CardProduct
              key={index}
              id={data.id}
              img={data.image}
              name={data.name}
              description={data.description}
              price={data.price}
              evaluate={data.evaluate}
            />
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
  );
}

export default ShopFood;
