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
  console.log(artists);
  const markup = artists
    .map(artist => createArtistsCartTemplate(artist))
    .join('');
  container.insertAdjacentHTML('beforeend', markup);
}


// версія співрозробниці
export function renderArtists(artists, container) {
  if (!Array.isArray(artists)) return;

  const markup = artists
    .map(artist => {
      const name = artist.name || 'No name';
      const genres = artist.genres?.join(', ') || 'No genres';
      const about = artist.about || 'No description.';
      const image =
        artist.avatar_url ||
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
