import axios from 'axios';

const BASE_URL = 'https://podcast-api.netlify.app';

export const fetchShows = async () => {
  const response = await axios.get(`${BASE_URL}/shows`);
  return response.data;
};

export const fetchShowDetails = async (id) => {
  const response = await axios.get(`${BASE_URL}/id/${id}`);
  return response.data;
};

export const fetchGenres = async () => {
  const response = await axios.get(`${BASE_URL}/genres`);
  return response.data;
};

