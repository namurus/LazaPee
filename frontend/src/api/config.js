import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://fakestoreapi.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

const fetchWithInstance = async (endPoint, options) => {
  try {
    const response = await instance({
      url: endPoint,
      ...options,
    });
    return response.data;
  } catch (error) {
    throw new Error(`${error.response.status}`);
  }
};

const get = async (endPoint) => {
  return fetchWithInstance(endPoint, {
    method: 'GET',
  });
};

const post = async (endPoint, body) => {
  return fetchWithInstance(endPoint, {
    method: 'POST',
    data: body,
  });
};

const put = async (endPoint, body) => {
  return fetchWithInstance(endPoint, {
    method: 'PUT',
    data: body,
  });
};

const del = async (endPoint) => {
  return fetchWithInstance(endPoint, {
    method: 'DELETE',
  });
};

export { fetchWithInstance, get, post, put, del, instance };
