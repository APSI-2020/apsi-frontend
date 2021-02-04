import { axios } from '../utils';

const groupsEndpoint = '/user/user-groups/';

export const getGroups = async () => {
  return await axios.get(groupsEndpoint);
};
