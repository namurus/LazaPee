import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://lazapee-jivl.onrender.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
