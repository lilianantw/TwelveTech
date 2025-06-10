import axios from 'axios';

const BASE_URL = 'https://sound-wave.b.goit.study/api/';
const LIMIT = 8;

axios.defaults.baseURL = BASE_URL;

export async function fetchArtists(page = 1, limit = LIMIT) {
  try {
    const response = await axios.get('/artists', {
      params: { page, limit },
    });
    console.log('Fetch returned:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch artists:', error);
    return { artists: [], totalArtists: 0 };
  }
}

export { LIMIT };
