import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateUser } from '~/api/authApi';
import Button from '~/components/Button/Button';
import { warning } from '~/constants/ToastMessage/ToastMessage';
import { addAddress, addIsModal } from '~/slice/info';
import { infoUser } from '~/slice/selector';

function ModalAddress() {
  const userSelector = useSelector(infoUser);
  const [updateAddress, setUpdateAddress] = useState({
    address: userSelector.address,
    numberPhone: userSelector.numberPhone,
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
      if (userSelector.id === '') {
        dispatch(
          addAddress({
            address: updateAddress.address,
            numberPhone: updateAddress.numberPhone,
            isModal: false,
          })
        );
      } else {
        await updateUser(userSelector.id, {
          name: userSelector.name,
          email: userSelector.email,
          gender: userSelector.gender,
          address: updateAddress.address,
          phoneNumber: updateAddress.numberPhone,
        });
        dispatch(addIsModal({ isModal: false }));
        window.location.reload();
      }
      setUpdateAddress({});
    } else {
      warning('nhập đầy đủ');
    }
  };

  const handleClose = () => {
    dispatch(addIsModal({ isModal: false }));
  };
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0,0.3)',
        position: 'fixed',
        top: '0',
        left: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          minWidth: '450px',
          backgroundColor: '#fff',
        }}
      >
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: ' 10px',
          }}
        >
          <span
            style={{
              fontSize: '2rem',
              fontWeight: '500',
              padding: '20px',
            }}
          >
            Địa chỉ nhận hàng
          </span>
          <span
            style={{
              fontSize: '2.6rem',
              padding: '5px 10px',
              cursor: 'pointer',
              backgroundColor: 'rgba(219, 40, 40, 0.3)',
            }}
            onClick={handleClose}
          >
            <FontAwesomeIcon icon={faXmark} />
          </span>
        </header>
        <main
          style={{
            padding: '0 10px 10px',
          }}
        >
          <div
            style={{
              marginBottom: '20px',
            }}
          >
            {' '}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <input
                placeholder="Tìm Thành phố, Quận/Huyện"
                style={{
                  flex: '1',
                  border: '1px solid #000',
                  padding: '10px',
                }}
                value={updateAddress.address}
                onChange={handleInputAddress}
              />
              <input
                placeholder="số điện thoại"
                style={{
                  flex: '1',
                  marginTop: '10px',
                  border: '1px solid #000',
                  padding: '10px',
                  marginBottom: '10px',
                }}
                value={updateAddress.numberPhone}
                onChange={handleInputNumberPhone}
              />
            </div>
            <span style={{ marginLeft: '-10px' }}>
              <Button danger onClick={handleTransferAddress}>
                Sử dung
              </Button>
            </span>
          </div>
          <div
            style={{
              marginTop: '20px',
              fontSize: '1.5rem',
            }}
          >
            <Link
              to="/"
              style={{
                color: '#08f',
                marginRight: '5px',
              }}
              onClick={handleClose}
            >
              Đăng nhập?
            </Link>
            chọn địa chỉ nhận hàng
          </div>
        </main>
      </div>
    </div>
  );
}

export default ModalAddress;
