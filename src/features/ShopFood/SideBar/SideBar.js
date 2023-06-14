import { faBars, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import {
  Menu,
  MenuItem,
  Sidebar,
  menuClasses,
  useProSidebar,
} from 'react-pro-sidebar';
import { priceProduct } from '~/constants/MenuSideBar';
import { useDispatch } from 'react-redux';
import styles from './SideBar.module.scss';
import { setPrice, setRate, setCategory } from '~/slice/productsSlice';

const cx = classNames.bind(styles);
const themes = {
  light: {
    sidebar: {
      backgroundColor: '#ffffff',
      color: '#607489',
    },
    menu: {
      menuContent: '#fbfcfd',
      icon: '#0098e5',
      hover: {
        backgroundColor: '#c5e4ff',
        color: '#44596e',
      },
      disabled: {
        color: '#9fb6cf',
      },
    },
  },
  dark: {
    sidebar: {
      backgroundColor: '#0b2948',
      color: '#8ba1b7',
    },
    menu: {
      menuContent: '#082440',
      icon: '#59d0ff',
      hover: {
        backgroundColor: '#00458b',
        color: '#b6c8d9',
      },
      disabled: {
        color: '#3e5e7e',
      },
    },
  },
};

const MenuItemStyles = {
  root: {
    fontSize: '1.6rem',
    fontWeight: 600,
    color: '#818181',
  },
  icon: {
    color: themes.light.menu.icon,
    [`&.${menuClasses.disabled}`]: {
      color: themes.dark.menu.disabled.color,
    },
  },
  SubMenuExpandIcon: {
    color: '#b6b7b9',
  },
  button: {
    [`&.${menuClasses.disabled}`]: {
      color: themes.dark.menu.disabled.color,
    },
  },
  label: ({ open }) => ({
    fontWeight: open ? 600 : undefined,
  }),
};

function SideBar() {
  const { collapseSidebar } = useProSidebar();
  const dispatch = useDispatch();
  const handlePrice = (PriceId) => {
    dispatch(setPrice(PriceId));
  };
  const handleRate = (rateId) => {
    dispatch(setRate(rateId));
  };
  const handleReset = () => {
    dispatch(setPrice(0));
    dispatch(setRate(0));
    dispatch(setCategory('All'));
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
                    >
                      {childrenItem.itemTitle}
                    </MenuItem>
                  );
                })}
              </Menu>
            </div>
          );
        })}

        <div
          className={cx('title')}
          style={{
            fontSize: '2rem',
            fontWeight: '500',
            display: 'flex',
            padding: '10px 0 10px 10px',
            borderBottom: '1px solid #818181',
          }}
        >
          Rate
        </div>
        <Menu
          MenuItemStyles={MenuItemStyles}
          style={{
            color: '#FBB403',
          }}
        >
          <MenuItem
            onClick={() => {
              handleRate(5);
            }}
          >
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleRate(4);
            }}
          >
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleRate(3);
            }}
          >
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
          </MenuItem>
        </Menu>
        <div
          style={{
            display: 'flex',
            padding: '10px 0 10px 10px',
          }}
        >
          <span
            style={{
              backgroundColor: 'rgba(219, 40, 40, 0.3)',
              padding: '10px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
            onClick={() => {
              handleReset();
            }}
          >
            Reset
          </span>
        </div>
      </Sidebar>
    </div>
  );
}

export default SideBar;
