export async function fetchArtists(page = 1, limit = 8) {
  try {
    const response = await axios.get('/artists', {
      params: { page, limit },
    });
    -console.log('Fetch returned:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Failed to fetch artists:',
      error.message,
      error.response?.status
    );
    return { artists: [], totalArtists: 0 };
  }
}

export async function checkApiStatus() {
  try {
    const response = await axios.get('/feedbacks', {
      params: { limit: 1, page: 1 },
    });
    -console.log('API status: OK, response:', response.status);
    return { status: 'online', message: 'API is accessible' };
  } catch (error) {
    console.error(
      'API status: Offline, error:',
      error.message,
      error.response?.status
    );
    return { status: 'offline', message: 'API is not accessible' };
  }
}
