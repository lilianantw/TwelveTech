import { fetchArtists, LIMIT } from './api.js';
import { renderArtists } from './render-function.js';

let currentPage = 1;

const cardsContainer = document.getElementById('cards-container');
const loadMoreBtn = document.querySelector('.load-more-btn');
const loader = document.querySelector('.loader');

// ===== Load initial artists =====
async function initArtists() {
  loader.classList.remove('hidden');

  const { artists } = await fetchArtists(currentPage);
  renderArtists(artists, cardsContainer);

  loader.classList.add('hidden');

  if (artists.length === LIMIT) {
    loadMoreBtn.classList.remove('hidden');
  } else {
    loadMoreBtn.classList.add('hidden');
  }
}

// ===== Load more logic =====
loadMoreBtn.addEventListener('click', async () => {
  currentPage++;
  loader.classList.remove('hidden');

  const { artists } = await fetchArtists(currentPage);
  renderArtists(artists, cardsContainer);

  loader.classList.add('hidden');

  if (artists.length < LIMIT) {
    loadMoreBtn.classList.add('hidden');
  }
});

// ===== Initialize on page load =====
document.addEventListener('DOMContentLoaded', initArtists);
