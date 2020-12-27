import { axios } from '../utils';

const userBase = '/user';

export const getUserData = async () => axios(`${userBase}/current/`);
