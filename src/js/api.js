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
    return response.data; // повертаємо повний об'єкт
  } catch (err) {
    console.error(err);
    return { artists: [], totalArtists: 0 }; // щоб не поламати цикл
  }
}
