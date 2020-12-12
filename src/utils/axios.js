import ax from 'axios';

import { getEnv } from './index';

export const axios = ax.create({
  baseURL: getEnv('REACT_APP_BACKEND_BASE_URL'),
  withCredentials: true,
});
