import axios from 'axios';
import { Constants } from '../lib/const/constants';

export const fetchConversionList = async (loginWorkspacesId, loginToken) => {
  try {
    const response = await axios.get(
      `${Constants.BASE_URL}API-FX-180-CONVERSIONLIST/${loginWorkspacesId}?page=1&from=2024-8--86&to=2024-8-14`,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(loginToken)}`,
          fx_key: Constants.SUBSCRIPTION_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching conversion list:', error);
    throw error;
  }
};