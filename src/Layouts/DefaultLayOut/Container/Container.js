import propTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserData } from '~/api/authApi';
import images from '~/assets/images';
import { addInfoDataUser } from '~/slice/infoDataUser';
function Container({ children }) {
  const access = localStorage.getItem('access');
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUserData();
        if (res) {
          dispatch(
            addInfoDataUser({
              ...res, // spread res object
              numberPhone: res.phoneNumber,
              image: images.userProfile,
              status: true,
              id: res._id,
            })
          );
        }
      } catch (error) {
        console.log('No users');
      }
    };
    fetchData();

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
