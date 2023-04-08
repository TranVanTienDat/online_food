import {
  Menu,
  MenuItem,
  Sidebar,
  useProSidebar,
  menuClasses,
  SubMenu,
} from 'react-pro-sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faStar } from '@fortawesome/free-solid-svg-icons';

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
    color: 'var(--light-color)',
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
  return (
    <Sidebar breakpoint="sm" width="200px" collapsedWidth="60px">
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
      <div
        style={{
          fontSize: '2rem',
          fontWeight: '500',
          display: 'flex',
          padding: '10px 0 10px 10px',
          borderBottom: '1px solid var(--light-color)',
        }}
      >
        Price
      </div>
      <Menu menuItemStyles={MenuItemStyles}>
        <MenuItem>Under 50k</MenuItem>
        <MenuItem>50k-100k</MenuItem>
        <MenuItem>Above 100k</MenuItem>
      </Menu>

      <div
        style={{
          fontSize: '2rem',
          fontWeight: '500',
          display: 'flex',
          padding: '10px 0 10px 10px',
          borderBottom: '1px solid var(--light-color)',
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
        <MenuItem>
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
        </MenuItem>
        <MenuItem>
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
        </MenuItem>
        <MenuItem>
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
        </MenuItem>
        <MenuItem>
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
        </MenuItem>
        <MenuItem>
          <FontAwesomeIcon icon={faStar} />
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}

export default SideBar;
