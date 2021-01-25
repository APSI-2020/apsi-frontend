import { axios } from '../utils';

const placesEndpoint = '/places';

export const getPlaces = async () => {
  return await axios.get(placesEndpoint);
};

export const getLecturers = async () => {
  return await axios.get('/user/lecturers/');
};
