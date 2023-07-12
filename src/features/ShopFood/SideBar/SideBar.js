import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { Menu, MenuItem, Sidebar, useProSidebar } from 'react-pro-sidebar';
import { useDispatch } from 'react-redux';
import images from '~/assets/images';
import { priceProduct, rateProduct } from '~/constants/MenuSideBar';
import { setPrice, setRate } from '~/slice/productsSlice';
import styles from './SideBar.module.scss';

const cx = classNames.bind(styles);

// Style ItemMenu
const MenuItemStyles = {
  root: {
    fontSize: '1.4rem',
    fontWeight: 500,
    color: '#818181',
    fontFamily: 'sans-serif',
  },
};

// Custom  title
const customStyle = {
  fontSize: '2rem',
  fontWeight: '500',
  display: 'flex',
  padding: '10px 0 10px 10px',
  borderBottom: '1px solid #818181',
  marginBottom: '6px',
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
  const [isContainer, setIsContainer] = useState(false);

  // Handle menu price
  const handlePrice = (PriceId) => {
    dispatch(setPrice(PriceId));
    localStorage.setItem('isMenuPrice', PriceId);
    setIsMenuPrice(PriceId);
  };

  // Handle menu rate
  const handleRate = (rateId) => {
    dispatch(setRate(rateId));
    localStorage.setItem('isMenuRate', rateId);
    setIsMenuRate(rateId);
  };
  const handleMenu = () => {
    collapseSidebar();
    setIsContainer(!isContainer);
  };

  return (
    <div className={cx('sidebar')}>
      <Sidebar
        breakpoint="sm"
        width="200px"
        collapsedWidth="78px"
        backgroundColor="#fff"
      >
        {/* Icon menu */}
        <div
          style={
            isContainer
              ? { textAlign: 'center' }
              : {
                  display: 'flex',
                  justifyContent: 'flex-end',
                }
          }
        >
          <img
            src={images.logo}
            alt=""
            style={{
              width: '40px',
              cursor: 'pointer',
            }}
            onClick={handleMenu}
          />
        </div>
        {/* Icon menu */}

        {/* render title menu price */}
        {priceProduct.map((item, index) => {
          return (
            <div key={index}>
              <div style={isContainer ? { display: 'none' } : customStyle}>
                {item.title}
              </div>
              <Menu menuItemStyles={MenuItemStyles}>
                {item.childrenTitle.map((childrenItem, index) => {
                  return (
                    <MenuItem
                      key={index}
                      style={
                        isMenuPrice === index + 1
                          ? {
                              backgroundColor: '#ebf1ff',
                              color: '#3c71ff',
                            }
                          : null
                      }
                      onClick={() => {
                        handlePrice(index + 1);
                      }}
                      icon={<FontAwesomeIcon icon={childrenItem.icon} />}
                    >
                      {childrenItem.itemTitle}
                    </MenuItem>
                  );
                })}
              </Menu>
            </div>
          );
        })}
        {/* render title menu price */}

        {/* render title menu rate */}
        {rateProduct.map((item, index) => {
          return (
            <div key={index}>
              <div style={isContainer ? { display: 'none' } : customStyle}>
                {item.title}
              </div>
              <form>
                {item.star.map((item, index) => {
                  return (
                    <Menu key={index}>
                      <MenuItem
                        onClick={() => {
                          handleRate(index);
                        }}
                        style={
                          isMenuRate === index
                            ? {
                                backgroundColor: '#ebf1ff',
                              }
                            : null
                        }
                      >
                        <span
                          id={item.label}
                          className={cx(
                            'input',
                            isMenuRate === index ? 'active' : null
                          )}
                        ></span>
                        <label
                          htmlFor={item.label}
                          style={
                            isContainer
                              ? { display: 'none' }
                              : { cursor: 'pointer' }
                          }
                        >
                          {Array.isArray(item.itemStar) ? (
                            item.itemStar.map((icon, index) => {
                              return <span key={index}>{icon}</span>;
                            })
                          ) : (
                            <span>{item.itemStar}</span>
                          )}
                        </label>
                      </MenuItem>
                    </Menu>
                  );
                })}
              </form>
            </div>
          );
        })}
        {/* render title menu rate */}
      </Sidebar>
    </div>
  );
}

export default SideBar;
