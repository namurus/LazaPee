import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://lazapee-ceu1.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
)

export const baseURL = 'https://lazapee-ceu1.onrender.com';

export default instance;
