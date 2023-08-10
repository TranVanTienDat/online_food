import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { updateUser } from '~/api/authApi';
import Button from '~/components/Button/Button';
import { warning } from '~/constants/ToastMessage/ToastMessage';
import { addAddress, addIsModal } from '~/slice/infoDataUser';
import { infoDataUserSelector } from '~/slice/selector';
import styles from './ProductDetail.module.scss';
const cx = classNames.bind(styles);

function ModalAddress() {
  const { address, numberPhone, id } = useSelector(infoDataUserSelector);
  const [updateAddress, setUpdateAddress] = useState({
    address,
    numberPhone,
  });
  const dispatch = useDispatch();

  const handleInputAddress = (e) => {
    setUpdateAddress((prev) => ({ ...prev, address: e.target.value }));
  };
  const handleInputNumberPhone = (e) => {
    setUpdateAddress((prev) => ({ ...prev, numberPhone: e.target.value }));
  };
  const handleTransferAddress = async () => {
    if (
      updateAddress.address.length > 0 &&
      updateAddress.numberPhone.length > 0
    ) {
      dispatch(
        addAddress({
          address: updateAddress.address,
          numberPhone: updateAddress.numberPhone,
          isModal: false,
        })
      );
      if (id !== 'firebase') {
        await updateUser(id, {
          address: address,
          phoneNumber: numberPhone,
        });
        dispatch(addIsModal({ isModal: false }));
      }
      setUpdateAddress({});
    } else {
      warning('Full enter');
    }
  };

  const handleClose = () => {
    dispatch(addIsModal({ isModal: false }));
  };
  return (
    <div className={cx('modal')}>
      <div className={cx('inner')}>
        <div className={cx('content')}>
          <header className={cx('heading')}>
            <span className={cx('title')}>Address to receive goods</span>
            <span className={cx('menu')} onClick={handleClose}>
              <FontAwesomeIcon icon={faXmark} />
            </span>
          </header>
          <main className={cx('main')}>
            <div className={cx('input')}>
              <input
                className={cx('input__info')}
                placeholder="Find cities, districts"
                value={updateAddress.address}
                onChange={handleInputAddress}
              />
              <input
                className={cx('input__info')}
                placeholder="Phone number"
                value={updateAddress.numberPhone}
                onChange={handleInputNumberPhone}
              />
            </div>
            <span className={cx('button')}>
              <Button danger onClick={handleTransferAddress}>
                Use
              </Button>
            </span>

            <div className={cx('text')}>
              <Link to="/" className={cx('link')} onClick={handleClose}>
                Log in?
              </Link>
              Select the address to receive goods
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default ModalAddress;
