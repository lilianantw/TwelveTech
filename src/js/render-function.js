export function renderArtists(artists, container) {
  if (!Array.isArray(artists)) return;

  const markup = artists
    .map(artist => {
      const name = artist.strArtist || 'No name';
      const genres = Array.isArray(artist.genres)
        ? artist.genres.join(', ')
        : 'No genres';
      const about = artist.strBiographyEN
        ? artist.strBiographyEN.slice(0, 150) + '...'
        : 'No description.';
      const image =
        artist.strArtistThumb ||
        'https://via.placeholder.com/300x300?text=No+Image';
      const id = artist._id || '';

      return `
        <li class="artist-card">
          <img class="artist-img" src="${image}" alt="${name}" loading="lazy" />
          <div class="artist-content">
            <p class="artist-genres">${genres}</p>
            <h3 class="artist-name">${name}</h3>
            <p class="artist-about">${about}</p>
            <button class="learn-more-btn" data-id="${id}">Learn More</button>
          </div>
        </li>
      `;
    })
    .join('');

  container.insertAdjacentHTML('beforeend', markup);
}
