import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import images from '~/assets/images';
import Button from '~/components/Button/Button';
import { content, sideBar } from '~/constants/menuAccount';
import { UserAuth } from '~/firebase/context/AuthContext';
import { addInfo } from '~/slice/info';
import { infoUser } from '~/slice/selector';
import styles from './Account.module.scss';
const cx = classNames.bind(styles);
const item = ['', '', ''];
function Account() {
  const { logOut, user } = UserAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const infoSelector = useSelector(infoUser);

  const [nav, setnav] = useState(0);
  const [isTag, setIsTag] = useState(0);
  const [progress, setProgress] = useState(-1);
  const [image, setImage] = useState(
    localStorage.getItem('image') || images.userProfile
  );

  useEffect(() => {
    const getProgress = () => {
      if (infoSelector.gender !== '') {
        setProgress((prev) => prev + 1);
      }
      if (infoSelector.name !== '' && infoSelector.email !== '') {
        setProgress((prev) => prev + 1);
      }
      if (infoSelector.address !== '' && infoSelector.numberPhone !== '') {
        setProgress((prev) => prev + 1);
      }
    };
    getProgress();
  }, [infoSelector]);

  const handleNavigate = async (i) => {
    if (i < 3) {
      setIsTag(i);
      setnav(i);
    }
    if (i === 3) {
      try {
        if (user) {
          await logOut();
        } else {
          localStorage.removeItem('access');
          localStorage.removeItem('isMenuPrice');
          localStorage.removeItem('isMenuRate');
          dispatch(addInfo({ ...infoSelector, status: false, id: '' }));
        }

        navigate('/');
      } catch (error) {
        console.log(error);
      }
    }
  };

  // upload file image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
      localStorage.setItem('image', reader.result);
      window.location.reload();
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Remove image
  const handleRemoveImg = () => {
    setImage(images.userProfile);
    localStorage.removeItem('image');
    window.location.reload();
  };

  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('title')}>Account setting</h2>
      <div className={cx('inner')}>
        <div className={cx('account')}>
          <div className={cx('profile')}>
            <div className={cx('info')}>
              <div className={cx('sideBar')}>
                {/* progress */}
                <div className={cx('progress')}>
                  {item.map((item, i) => {
                    return (
                      <div
                        key={i}
                        className={cx('item', progress >= i ? 'color' : '')}
                      ></div>
                    );
                  })}
                </div>
                {/* progress */}
                <div className={cx('navigate')}>
                  {sideBar.map((item, i) => {
                    return (
                      <span
                        key={i}
                        className={cx('item', nav === i ? 'background' : '')}
                        onClick={() => handleNavigate(i)}
                      >
                        <FontAwesomeIcon
                          icon={item.icon}
                          className={cx('icon')}
                        />
                        <h4 className={cx('title')}>{item.title}</h4>
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className={cx('content')}>
                {/*render component*/}
                {content.map((item, i) => {
                  const Tag = item.title;
                  return <Tag key={i} isBlock={isTag === i ? true : false} />;
                })}
                {/*render component*/}
              </div>
            </div>
          </div>
          <div className={cx('image')}>
            <img className={cx('img')} src={image} alt="" />
            <span className={cx('fullName')}>{infoSelector.name}</span>
            <input
              id="file"
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            <div className={cx('button')}>
              <Button danger>
                <label htmlFor="file">Upload</label>
              </Button>
              <Button danger onClick={handleRemoveImg}>
                Remove
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
