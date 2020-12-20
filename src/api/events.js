import { axios } from '../utils';

const eventsEndpoint = '/events';

export const getEvents = async () => {
  return await axios.get(eventsEndpoint);
};

export const getEvent = async (eventId) => {
  return await axios.get(`${eventsEndpoint}/${eventId}`);
};

export const createEvent = async (values) => {
  return await axios.put(`${eventsEndpoint}/`, values);
};
