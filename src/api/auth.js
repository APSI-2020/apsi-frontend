import { axios } from '../utils';

const authBase = '/auth';

export const signIn = async (data) => axios.post(`${authBase}/login/`, data);

export const signUp = async (data) => axios.post(`${authBase}/register/`, data);
