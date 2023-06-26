import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { Menu, MenuItem, Sidebar, useProSidebar } from 'react-pro-sidebar';
import { useDispatch } from 'react-redux';
import { priceProduct, rateProduct } from '~/constants/MenuSideBar';
import { setPrice, setRate } from '~/slice/productsSlice';
import styles from './SideBar.module.scss';

const cx = classNames.bind(styles);
const MenuItemStyles = {
  root: {
    fontSize: '1.6rem',
    fontWeight: 550,
    color: '#818181',
  },
};

function SideBar() {
  const { collapseSidebar } = useProSidebar();
  const dispatch = useDispatch();
  const [isMenuPrice, setIsMenuPrice] = useState(
    parseInt(localStorage.getItem('isMenuPrice')) || 1
  );
  const [isMenuRate, setIsMenuRate] = useState(
    parseInt(localStorage.getItem('isMenuRate')) || 0
  );

  const handlePrice = (PriceId) => {
    dispatch(setPrice(PriceId));
    localStorage.setItem('isMenuPrice', PriceId);
    setIsMenuPrice(PriceId);
  };
  const handleRate = (rateId) => {
    dispatch(setRate(rateId));
    localStorage.setItem('isMenuRate', rateId);
    setIsMenuRate(rateId);
  };

  return (
    <div className={cx('sidebar')}>
      <Sidebar breakpoint="sm" width="200px" collapsedWidth="100px">
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <FontAwesomeIcon
            icon={faBars}
            style={{
              fontSize: '2.8rem',
              cursor: 'pointer',
              color: '#000',
              margin: '5px 5px 0 0',
            }}
            onClick={() => collapseSidebar()}
          />
        </div>

        {priceProduct.map((item, index) => {
          return (
            <div key={index}>
              <div
                style={{
                  fontSize: '2rem',
                  fontWeight: '500',
                  display: 'flex',
                  padding: '10px 0 10px 10px',
                  borderBottom: '1px solid #818181',
                }}
              >
                {item.title}
              </div>
              <Menu menuItemStyles={MenuItemStyles}>
                {item.childrenTitle.map((childrenItem, index) => {
                  return (
                    <MenuItem
                      onClick={() => {
                        handlePrice(index + 1);
                      }}
                      key={index}
                      style={
                        isMenuPrice === index + 1
                          ? {
                              backgroundColor: 'blue',
                              color: '#fff',
                            }
                          : null
                      }
                    >
                      {childrenItem.itemTitle}
                    </MenuItem>
                  );
                })}
              </Menu>
            </div>
          );
        })}

        {/* Rate product */}
        {rateProduct.map((item, index) => {
          return (
            <div key={index}>
              <div
                style={{
                  fontSize: '2rem',
                  fontWeight: '500',
                  display: 'flex',
                  padding: '10px 0 10px 10px',
                  borderBottom: '1px solid #818181',
                }}
              >
                {item.title}
              </div>
              {item.star.map((item, index) => {
                return (
                  <Menu
                    key={index}
                    MenuItemStyles={MenuItemStyles}
                    style={{
                      color: '#FBB403',
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        handleRate(index);
                      }}
                      style={
                        isMenuRate === index
                          ? {
                              backgroundColor: 'blue',
                              color: '#fff',
                            }
                          : null
                      }
                    >
                      {Array.isArray(item.itemStar) ? (
                        item.itemStar.map((icon, index) => {
                          return <span key={index}>{icon}</span>;
                        })
                      ) : (
                        <span
                          style={{
                            fontSize: '1.6rem',
                            fontWeight: '550',
                          }}
                        >
                          {item.itemStar}
                        </span>
                      )}
                    </MenuItem>
                  </Menu>
                );
              })}
            </div>
          );
        })}
      </Sidebar>
    </div>
  );
}

export default SideBar;
