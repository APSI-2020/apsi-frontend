import queryString from 'querystring';

import { axios } from '../utils';

const paymentsBaseUrl = '/payments';

export const getPaymentUrl = async (eventId) =>
  axios
    .get(
      `${paymentsBaseUrl}/get-url?${queryString.stringify({ event_id: eventId })}`,
    )
    .then((response) => response.data);

export const makePaymentApi = async (eventId) =>
  axios.post(`${paymentsBaseUrl}/`, {
    event_id: eventId,
  });
