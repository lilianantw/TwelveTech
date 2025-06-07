import { createArtistsCartTemplate, renderArtists } from './render-function';
import { fetchArtists } from './api.js';

const IMAGES_PER_PAGE = 8;
let currentPage = 1;

const refs = {
  cardsContainer: document.querySelector('#cards-container'),
  // loadMoreBtn: document.querySelector('.loadMoreBtn'),
};

// let isLastPage = false;

async function init() {
  const artists = await fetchArtists(currentPage, IMAGES_PER_PAGE); // page 1, limit 8
  renderArtists(artists, refs.cardsContainer);
}

init();
