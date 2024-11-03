// import { fetchWithInstance } from '../config';

import { post } from '../config';

const getMe = async () => {
  //   return get('user/me');
  // try {
  //   const response = await post('https://dummyjson.com/auth/login', {
  //     username: 'emilys',
  //     password: 'emilyspass',
  //     expiresInMins: 30,
  //   });
  //   // throw new Error("Failed to fetch user's data");
  //   return response;
  // } catch (error) {
  //   console.log(error);
  // }
  if (localStorage.getItem('ACCESS_TOKEN')) {
    return Promise.resolve({
      accessToken: localStorage.getItem('ACCESS_TOKEN'),
    });
  } else {
    return Promise.reject(new Error('Failed to fetch user data'));
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
