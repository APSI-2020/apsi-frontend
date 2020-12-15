import { axios } from '../utils';

const authBase = '/auth';

export const signIn = async (data) => axios.post(`${authBase}/login/`, data);
