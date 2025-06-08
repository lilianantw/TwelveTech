export const createArtistsCartTemplate = ({
  _id: id,
  strArtist: name,
  strArtistThumb: photo,
  genres: genres,
  strBiographyEN: shortInfo,
}) => {
  return `
<li class="artist-card">
  <img src="${photo}" alt="${name}" class="artist-photo" />
  <ul class="artist-genres">
    ${genres.map(genre => `<li class="genre-tag">${genre}</li>`).join('')}
  </ul>
  <h3 class="artist-name">${name}</h3>
  <p class="artist-info">${shortInfo}</p>
 <button class="learn-more-btn" data-artist-id="${id}">Learn More</button>
</li>
`;
};

export function renderArtists(artists, container) {
  if (!artists || !artists.length) return;

  const markup = artists
    .map(artist => createArtistsCartTemplate(artist))
    .join('');
  container.insertAdjacentHTML('beforeend', markup);
}

export function showLoadMoreButton(button) {
  button.classList.remove('hidden');
}
export function hideLoadMoreButton(button) {
  button.classList.add('hidden');
}
