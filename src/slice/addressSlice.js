import { createSlice } from '@reduxjs/toolkit';

const sliceAddress = createSlice({
  name: 'addAddress',
  initialState: {
    address: 'chưa có địa chỉ',
    numberPhone: 'số điện thoại',
    isModal: false,
  },
  reducers: {
    addAddress(state, action) {
      const { address, numberPhone, isModal } = action.payload;
      state.address = address;
      state.numberPhone = numberPhone;
      state.isModal = isModal;
    },
    addIsModal(state, action) {
      const { isModal } = action.payload;
      state.isModal = isModal;
    },
  },
});

export const { addAddress, addIsModal } = sliceAddress.actions;
export default sliceAddress.reducer;
