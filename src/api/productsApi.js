import axiosClient from './axiosClient';

const productsApi = {
  getAll: (params) => {
    const url = '/product';
    return axiosClient.get(url, { params });
  },
  getProduct: (id) => {
    return axiosClient.get(`/product/${id}`);
  },
  // getTopRatedProducts: () => {
  //   return axiosClient.get('/api/products/topRated');
  // },
};

export default productsApi;
