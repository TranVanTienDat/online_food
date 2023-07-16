import propTypes from 'prop-types';
import { useEffect } from 'react';

function Container({ children }) {
  const access = localStorage.getItem('access');
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.clear();
      localStorage.setItem('access', access);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <>{children}</>;
}

Container.propTypes = {
  children: propTypes.node,
};

export default Container;
