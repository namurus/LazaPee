// import { fetchWithInstance } from '../config';

import { fetchWithInstance, post } from '../config';

// import { post } from '../config';

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
    // Validate the token
    try {
      const user = await fetchWithInstance('auth/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
        },
      });
      if (!user) {
        return Promise.reject(new Error('Failed to fetch user data'));
      }
      return Promise.resolve(user);
    } catch {
      return Promise.reject(new Error('Failed to fetch user data'));
    }
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

const login = async (data) => {
  return post('auth/login', data);
};

const signup = async (data) => {
  return post('auth/register', data);
};

export { getMe, getRefreshToken, login, signup };
