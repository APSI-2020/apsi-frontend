import { axios } from '../utils';

const placesEndpoint = '/places';

export const getPlaces = async () => {
  return await axios.get(placesEndpoint);
};
