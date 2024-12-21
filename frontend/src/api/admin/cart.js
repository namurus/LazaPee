import { del, fetchWithInstance, post, put } from '../config';

const getCarts = () => {
  return fetchWithInstance('carts');
};

const getCart = (id) => {
  return fetchWithInstance(`carts/${id}`);
};

const getCartWithLimit = (limit) => {
  return fetchWithInstance(`carts?limit=${limit}`);
};

const getCartWithSort = (sort) => {
  return fetchWithInstance(`carts?sort=${sort}`);
};

const getCartInDateRange = (start, end) => {
  return fetchWithInstance(`carts?startdate=${start}&enddate=${end}`);
};

const getUserCarts = (user) => {
  return fetchWithInstance(`carts/user/${user}`);
};

const addProductToCart = (product) => {
  return post('carts', product);
};

const updateProductInCart = (id, product) => {
  return put(`carts/${id}`, product);
};

const deleteProductFromCart = (id, productID) => {
  return del(`carts/${id}/${productID}`);
};

const deleteCart = (id) => {
  return del(`carts/${id}`);
};

export {
  getCarts,
  getCart,
  getCartWithLimit,
  getCartWithSort,
  getCartInDateRange,
  getUserCarts,
  addProductToCart,
  updateProductInCart,
  deleteProductFromCart,
  deleteCart,
};
