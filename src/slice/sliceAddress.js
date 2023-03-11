import { createSlice } from '@reduxjs/toolkit';

const sliceAddress = createSlice({
  name: 'addAddress',
  initialState: {
    address: 'chưa có địa chỉ',
    isModal: false,
  },
  reducers: {
    addAddress(state, action) {
      const { address, isModal } = action.payload;
      return {
        ...state,
        address,
        isModal,
      };
    },
    addIsModal(state, action) {
      const { isModal } = action.payload;
      return {
        ...state,
        isModal,
      };
    },
  },
});

export const { addAddress, addIsModal } = sliceAddress.actions;
export default sliceAddress.reducer;
