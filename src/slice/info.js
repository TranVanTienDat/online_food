import { createSlice } from '@reduxjs/toolkit';

const infoUser = createSlice({
  name: 'infoUser',
  initialState: {
    name: '',
    email: '',
    address: '',
    numberPhone: '',
    gender: '',
    image: '',
    status: false,
    id: '',
    isModal: false,
  },

  reducers: {
    addInfo(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.address = action.payload.address;
      state.numberPhone = action.payload.numberPhone;
      state.gender = action.payload.gender;
      state.image = action.payload.image;
      state.status = action.payload.status;
      state.id = action.payload.id;
    },
    setStatus(state, action) {
      state.status = action.payload.status;
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
export const { addInfo, setStatus, addAddress, addIsModal } = infoUser.actions;
export default infoUser.reducer;
