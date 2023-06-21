import propTypes from 'prop-types';
import { useEffect } from 'react';

function Container({ children }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [children]);
  return <>{children}</>;
}

Container.propTypes = {
  children: propTypes.node,
};

export default Container;
