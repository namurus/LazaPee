import { del, fetchWithInstance, get, post, put } from '../config';

const getCarts = () => {
  return fetchWithInstance('carts');
};

const getMyCart = () => {
  return get('cart');
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
  return post('cart/add', product);
};

const updateProductInCart = (id, product) => {
  return put(`carts/${id}`, product);
};

const updateCartQuantity = (id, quantity) => {
  return put('cart/update', {
    cartItemId: id,
    quantity,
  });
};

const deleteProductFromCart = (productID) => {
  return del(`cart/remove/${productID}`);
};

const deleteCart = (id) => {
  return del(`carts/${id}`);
};

const checkVoucher = (voucher) => {
  return post('voucher/check', {
    code: voucher,
  });
};

const checkoutFromCart = (voucher = null) => {
  return post('/order/checkout', {
    voucherCode: voucher,
  });
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
  getMyCart,
  updateCartQuantity,
  checkVoucher,
  checkoutFromCart,
};
