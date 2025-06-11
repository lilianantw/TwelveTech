const loaderContainer = document.querySelector('.loader-container');

// ===== Шаблон карточки артиста =====
export const createArtistsCartTemplate = ({
  _id: id = '',
  strArtist: name = 'No name',
  strArtistThumb: photo = 'https://via.placeholder.com/300x300?text=No+Image',
  genres = [],
  strBiographyEN: shortInfo = 'No description.',
}) => {
  const genresMarkup = genres.length
    ? genres.map(genre => `<li class="genre-tag">${genre}</li>`).join('')
    : '<li class="genre-tag">No genres</li>';

  const shortText = shortInfo.slice(0, 150) + (shortInfo.length > 150 ? '...' : '');

  return `
    <li class="artist-card">
      <img src="${photo}" alt="${name}" class="artist-photo" loading="lazy" />
      <ul class="artist-genres">${genresMarkup}</ul>
      <h3 class="artist-name">${name}</h3>
      <p class="artist-info">${shortText}</p>
      <button class="learn-more-btn" data-artist-id="${id}">Learn More</button>
    </li>
  `;
};

// ===== Рендер артистов =====
export function renderArtists(artists, container) {
  if (!Array.isArray(artists) || !artists.length) return;
  const markup = artists.map(artist => createArtistsCartTemplate(artist)).join('');
  container.insertAdjacentHTML('beforeend', markup);
}

// ===== Показываем кнопку =====
export function showLoadMoreButton(button) {
  button.classList.remove('hidden');
}

// ===== Скрываем кнопку =====
export function hideLoadMoreButton(button) {
  button.classList.add('hidden');
}

// ===== Показываем лоадер =====
export function showLoader() {
  loaderContainer.classList.remove('hidden');
}

// ===== Скрываем лоадер =====
export function hideLoader() {
  loaderContainer.classList.add('hidden');
}

