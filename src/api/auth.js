import { axios } from '../utils';

const authBase = '/auth';

export const signIn = async () =>
  axios.get(`${authBase}/login/`).then((response) => console.log(response));
