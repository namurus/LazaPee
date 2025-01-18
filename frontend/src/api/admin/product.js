import { del, get, fetchWithInstance, post, put, patch } from '../config';

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

const getCategoryProducts = (category, queryParams = {}) => {
  return fetchWithInstance(`category/${category}`, {
    params: queryParams,
  });
};

const getShippingUnits = () => {
  return get('shop/shipment/shippingCompany');
};

const searchProducts = (search, queryParams = {}) => {
  return fetchWithInstance(`search?keyword=${search}`, {
    params: queryParams,
  });
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

const getProductReviews = (id, queryParams = {}) => {
  return get(`review/${id}`, {
    params: queryParams,
  });
};

const createReview = (productID, review) => {
  return post(`review/${productID}`, review);
};

const deleteReview = (reviewID) => {
  return del(`review/${reviewID}`);
};

const editReview = (reviewID, review) => {
  return patch(`review/${reviewID}`, review);
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
  getProductReviews,
  createReview,
  deleteReview,
  searchProducts,
  editReview,
  getShippingUnits,
};
