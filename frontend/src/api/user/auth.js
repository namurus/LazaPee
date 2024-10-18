// import { fetchWithInstance } from '../config';

import { post } from '../config';

const getMe = async () => {
  //   return get('user/me');
  try {
    const response = await post('https://dummyjson.com/auth/login', {
      username: 'emilys',
      password: 'emilyspass',
      expiresInMins: 30,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getRefreshToken = () => {
  // return get('auth/refresh');
  return fetch('https://dummyjson.com/auth/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
};

export { getMe, getRefreshToken };
