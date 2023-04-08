import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { setProductSearch } from '~/slice/productsSlice';
import { useDispatch } from 'react-redux';
import { useDebounce } from '~/hook/debounce';
import styles from './Search.module.scss';
const cx = classNames.bind(styles);

function Search() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const ref = useRef();

  const handleOnchange = (e) => {
    const valueSearch = e.target.value;
    if (!valueSearch.startsWith(' ')) {
      setSearch(valueSearch);
    }
  };
  const debounceValue = useDebounce(search);
  useEffect(() => {
    dispatch(setProductSearch(debounceValue));
  }, [dispatch, debounceValue]);
  return (
    <div className={cx('search')}>
      <input
        placeholder="search foods"
        ref={ref}
        value={search}
        onChange={handleOnchange}
      />
      <div className={cx('category')}>
        <form>
          <div>
            <input
              type="radio"
              id="category1"
              name="category"
              value="All"
              defaultChecked
            />
            <label htmlFor="category1">All</label>
          </div>
          <div>
            <input type="radio" id="category2" name="category" value="Foods" />
            <label htmlFor="category2">Foods</label>
          </div>
          <div>
            <input type="radio" id="category3" name="category" value="Drinks" />
            <label htmlFor="category3">Drinks</label>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Search;
