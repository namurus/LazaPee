import instance from '../lib/axios';

const fetchWithInstance = async (endPoint, options) => {
  try {
    const response = await instance({
      url: endPoint,
      ...options,
    });
    if (!response) {
      console.error(`Undefined response fetching api from ${endPoint}`);
      return null;
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    if (error.response) {
      console.error(
        'Response error:',
        error.response.status,
        error.response.data
      );
    }
    return null;
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

const patch = async (endPoint, body) => {
  return fetchWithInstance(endPoint, {
    method: 'PATCH',
    data: body,
  });
};

const del = async (endPoint) => {
  return fetchWithInstance(endPoint, {
    method: 'DELETE',
  });
};

export { fetchWithInstance, get, post, patch, put, del, instance };
