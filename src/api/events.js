import { axios } from '../utils';

const eventsEndpoint = '/events';

export const getEvents = async (filters) => {
  if (!filters) return await axios.get(eventsEndpoint);
  else
    return await axios.get(
      `${eventsEndpoint}?${Object.keys(filters)
        .map((key) => key + '=' + filters[key])
        .join('&')}`,
    );
};

export const getEvent = async (eventId) => {
  return await axios.get(`${eventsEndpoint}/${eventId}`);
};

export const createEvent = async (values) => {
  return await axios.put(`${eventsEndpoint}/`, values);
};

export const joinEvent = async (eventId) => {
  return await axios.post(`${eventsEndpoint}/${eventId}/join`);
};
