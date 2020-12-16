import ax from 'axios';

import { getEnv } from './index';

export const axios = ax.create({
  baseURL: getEnv('REACT_APP_BACKEND_BASE_URL'),
  withCredentials: true,
});

axios.interceptors.request.use(
  function (config) {
    const token = sessionStorage.getItem('token');

    if (token != null) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (err) {
    return Promise.reject(err);
  },
);
