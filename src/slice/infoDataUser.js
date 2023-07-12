import { createSlice } from '@reduxjs/toolkit';

const infoDataUser = createSlice({
  name: 'infoDataUser',
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
    addInfoDataUser(state, action) {
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
      state.id = action.payload.id;
    },
    addInfoFirebase(state, action) {
      const { address, numberPhone, gender } = action.payload;
      state.address = address;
      state.numberPhone = numberPhone;
      state.gender = gender;
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
    uploadImage(state, action) {
      state.image = action.payload.image;
    },
  },
});
export const {
  addInfoDataUser,
  setStatus,
  addAddress,
  addInfoFirebase,
  addIsModal,
  uploadImage,
} = infoDataUser.actions;
export default infoDataUser.reducer;
