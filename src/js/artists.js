import {
  createArtistsCartTemplate,
  renderArtists,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './render-function';
import { fetchArtists } from './api.js';
import iziToast from 'izitoast';

const IMAGES_PER_PAGE = 8;
let currentPage = 1;

const refs = {
  cardsContainer: document.querySelector('#cards-container'),
  loadMoreBtn: document.querySelector('.loadMoreBtn'),
};

async function init() {
  const { artists, totalArtists } = await fetchArtists(
    currentPage,
    IMAGES_PER_PAGE
  );
  renderArtists(artists, refs.cardsContainer);

  const artistsLoaded = currentPage * IMAGES_PER_PAGE;
  if (artistsLoaded < totalArtists) {
    showLoadMoreButton(refs.loadMoreBtn);
  } else {
    hideLoadMoreButton(refs.loadMoreBtn);
  }
}

init();

async function onLoadMoreBtn() {
  currentPage++;
  try {
    const { artists, totalArtists, page } = await fetchArtists(
      currentPage,
      IMAGES_PER_PAGE
    );

    renderArtists(artists, refs.cardsContainer);
    //---End of collection
    const totalPages = Math.ceil(totalArtists / IMAGES_PER_PAGE);

    if (currentPage >= totalPages) {
      iziToast.info({
        title: '',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        timeout: 4000,
        titleColor: '#fff',
        backgroundColor: ' #09f',
        messageColor: '#fff',
      });
      hideLoadMoreButton(refs.loadMoreBtn);
      refs.loadMoreBtn.removeEventListener('click', onLoadMoreBtn);
    }
  } catch (err) {
    console.log(err);
  }
}

refs.loadMoreBtn.addEventListener('click', onLoadMoreBtn);
