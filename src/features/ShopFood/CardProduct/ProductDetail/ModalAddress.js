import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '~/components/Button/Button';
import { warning } from '~/constants/ToastMessage/ToastMessage';
import { addIsModal, addAddress } from '~/slice/sliceAddress';

function ModalAddress() {
  const [address, setAddress] = useState('');
  const dispatch = useDispatch();
  const handleInput = (e) => {
    setAddress(e.target.value);
  };
  const handleTransferAddress = () => {
    if (address.length > 0) {
      dispatch(addAddress({ address, isModal: false }));
      setAddress('');
    } else {
      warning('bạn chưa nhập địa chỉ');
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
              marginRight: '10px',
              backgroundColor: 'rgba(219, 40, 40, 0.3)',
            }}
            onClick={handleClose}
          >
            <FontAwesomeIcon icon={faXmark} />
          </span>
        </header>
        <main
          style={{
            padding: '0 20px 10px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            <input
              placeholder="Tìm Thành phố, Quận/Huyện"
              style={{
                flex: '1',
                border: '1px solid var(--black-color)',
                padding: '10px',
                marginRight: '10px',
              }}
              value={address}
              onChange={handleInput}
            />
            <Button danger onClick={handleTransferAddress}>
              Sử dung
            </Button>
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
