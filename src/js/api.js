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