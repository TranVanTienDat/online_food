import axios from 'axios';

export const createUser = (payload) =>
  axios.post(`${process.env.REACT_APP_AUTH_URL}/user/register`, payload);

export const loginUser = (payload) =>
  axios.post(`${process.env.REACT_APP_AUTH_URL}/user/login`, payload);

export const fetchUser = () =>
  axios.get(`${process.env.REACT_APP_AUTH_URL}/users`);

export const updateUser = (id, payload) =>
  axios.put(`${process.env.REACT_APP_AUTH_URL}/user/${id}`, payload);

// export const getAuth = () =>
//   axios.get(`${process.env.REACT_APP_AUTH_URL}/user/getAuth`);

export const getAuth = async () => {
  const token = localStorage.getItem('authToken');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_AUTH_URL}/user/getAuth`,
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
