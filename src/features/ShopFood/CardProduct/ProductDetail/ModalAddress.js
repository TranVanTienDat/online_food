import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '~/components/Button/Button';
import { warning } from '~/constants/ToastMessage/ToastMessage';
import { addIsModal, addAddress } from '~/slice/addressSlice';
import { addressSelector } from '~/slice/selector';

function ModalAddress() {
  const selector = useSelector(addressSelector);
  const [address, setAddress] = useState(selector.address);
  const [numberPhone, setNumberPhone] = useState(selector.numberPhone);
  const dispatch = useDispatch();

  const handleInputAddress = (e) => {
    setAddress(e.target.value);
  };
  const handleInputNumberPhone = (e) => {
    setNumberPhone(e.target.value);
  };
  const handleTransferAddress = () => {
    if (address.length > 0 && numberPhone.length > 0) {
      dispatch(addAddress({ address, numberPhone, isModal: false }));
      setAddress('');
      setNumberPhone('');
    } else {
      warning('nhập đầy đủ');
    }
  };

  const handleClose = () => {
    dispatch(addIsModal({ isModal: false }));
  };
  console.log(address);
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
          backgroundColor: 'var(--white-color)',
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
                  border: '1px solid var(--black-color)',
                  padding: '10px',
                }}
                value={address}
                onChange={handleInputAddress}
              />
              <input
                placeholder="số điện thoại"
                style={{
                  flex: '1',
                  marginTop: '10px',
                  border: '1px solid var(--black-color)',
                  padding: '10px',
                  marginBottom: '10px',
                }}
                value={numberPhone}
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
