import { axios } from '../utils';

const eventsEndpoint = '/events';

export const getEvents = async (authToken) => {
  return await axios.get(eventsEndpoint, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
};
