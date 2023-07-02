import { createSlice } from '@reduxjs/toolkit';

const infoFireBase = createSlice({
  name: 'infoFireBase',
  initialState: {
    address: '',
    numberPhone: '',
    gender: '',
    isModal: false,
  },

  reducers: {
    setStatus(state, action) {
      state.status = action.payload.status;
    },
    addFireBase(state, action) {
      state.gender = action.payload.gender;
      state.address = action.payload.address;
      state.numberPhone = action.payload.numberPhone;
    },
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
export const { addInfo, setStatus, addFireBase, addAddress, addIsModal } =
  infoFireBase.actions;
export default infoFireBase.reducer;
