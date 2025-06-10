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


export async function fetchFeedbacks(page = 1, limit = 10) {
  try {
    const response = await axios.get('/feedbacks', {
      params: { page, limit },
    });

    const result = response.data;

    console.log(result);

    if (Array.isArray(result.data)) {
      return result.data;
    } else {
      console.error(result);
      return [];
    }
  } catch (err) {
    console.error(err);
    return [];
  }
}
