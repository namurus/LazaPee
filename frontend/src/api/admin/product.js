import { del, get, fetchWithInstance, post, put } from '../config';

const getProducts = () => {
  return fetchWithInstance('products');
};

const getProduct = (id) => {
  return fetchWithInstance(`products/${id}`);
};

const getProductsWithLimit = (limit) => {
  return fetchWithInstance(`products?limit=${limit}`);
};

const getProductsWithSort = (sort) => {
  return fetchWithInstance(`products?sort=${sort}`);
};

const getCategories = () => {
  return get('category');
};

const getCategoryProducts = (category) => {
  return fetchWithInstance(`category/${category}`);
};

const addProduct = (product) => {
  return post('products', product);
};

const updateProduct = (id, product) => {
  return put(`products/${id}`, product);
};

const deleteProduct = (id) => {
  return del(`products/${id}`);
};

export {
  getProducts,
  getProduct,
  getProductsWithLimit,
  getProductsWithSort,
  getCategories,
  getCategoryProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
