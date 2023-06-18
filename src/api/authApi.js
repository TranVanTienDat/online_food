import axios from 'axios';

export const createUser = (payload) =>
  axios.post(`${process.env.REACT_APP_AUTH_URL}/user/register`, payload);

export const loginUser = (payload) =>
  axios.post(`${process.env.REACT_APP_AUTH_URL}/user/login`, payload);

export const fetchUser = () =>
  axios.get(`${process.env.REACT_APP_AUTH_URL}/users`);

export const updateUser = (id, payload) =>
  axios.put(`${process.env.REACT_APP_AUTH_URL}/user/${id}`, payload);

export const getUserData = async () => {
  const authToken = localStorage.getItem('access');

  if (!authToken) {
    throw new Error('Unauthorized');
  }

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_AUTH_URL}/user/getAuth`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    return response.data.user;
  } catch (error) {
    throw new Error('Failed to fetch user data');
  }
};
