import axios from 'axios';
axios.defaults.baseURL = 'https://sound-wave.b.goit.study/api/';

export async function fetchArtists(page, limit) {
  try {
    const response = await axios.get('/artists', {
      params: {
        limit,
        page,
      },
    });
    return response.data.artists; // тут буде масив артистів
  } catch (err) {
    console.error(err);
    return []; // щоб не поламати цикл
  }
}

fetchArtists().then(data => console.log(data));



// версія співрозробниці
const BASE_URL = 'https://sound-wave.b.goit.study/api';
const LIMIT = 8;

export async function fetchArtists(page = 1, limit = LIMIT) {
  try {
    const response = await fetch(
      `${BASE_URL}/artists?page=${page}&limit=${limit}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Fetch returned:', data);

    return data;
  } catch (error) {
    console.error('Failed to fetch artists:', error);
    return { artists: [] };
  }
}

export { LIMIT };