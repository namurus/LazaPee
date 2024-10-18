import { del, fetchWithInstance, post, put } from '../config';

const getUsers = () => {
  return fetchWithInstance('users');
};

const getUser = (id) => {
  return fetchWithInstance(`users/${id}`);
};

const getUserWithLimit = (limit) => {
  return fetchWithInstance(`users?limit=${limit}`);
};

const getUserWithSort = (sort) => {
  return fetchWithInstance(`users?sort=${sort}`);
};

// user = {email: 'email', username: 'username', password: 'password', name: {first: 'first', last: 'last'}, address: {city: 'city', street: 'street', number: 'number', zipcode: 'zipcode'}, phone: 'phone'}
const addUser = (user) => {
  return post('users', user);
};

const updateUser = (id, user) => {
  return put(`users/${id}`, user);
};

const deleteUser = (id) => {
  return del(`users/${id}`);
};

export {
  getUsers,
  getUser,
  getUserWithLimit,
  getUserWithSort,
  addUser,
  updateUser,
  deleteUser,
};
