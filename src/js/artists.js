import {
  renderArtists,
  showLoadMoreButton,
  hideLoadMoreButton,
  showLoader,
  hideLoader,
} from './render-function.js';
import { fetchArtists, LIMIT } from './api.js';
import { openArtistModal } from './modal.js';
import iziToast from 'izitoast';

let currentPage = 1;

const refs = {
  cardsContainer: document.querySelector('#cards-container'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
};

// ===== ІНІЦІАЛІЗАЦІЯ СТОРІНКИ =====
async function initArtists() {
  try {
    showLoader();

    const { artists, totalArtists } = await fetchArtists(currentPage, LIMIT);
    renderArtists(artists, refs.cardsContainer);

    if (currentPage * LIMIT < totalArtists) {
      showLoadMoreButton(refs.loadMoreBtn);
    } else {
      hideLoadMoreButton(refs.loadMoreBtn);
    }
  } catch (err) {
    console.error(err);
  } finally {
    hideLoader();
  }
}

// ===== ОПРАЦЮВАННЯ КЛІКУ "ЗАВАНТАЖИТИ ЩЕ" =====
async function onLoadMoreBtnClick() {
  currentPage++;
  showLoader();

  try {
    const { artists, totalArtists } = await fetchArtists(currentPage, LIMIT);
    renderArtists(artists, refs.cardsContainer);

    const firstNewCard = refs.cardsContainer.lastElementChild;
    await new Promise(resolve => setTimeout(resolve, 100));
    const cardHeight = firstNewCard.getBoundingClientRect().height;
    window.scrollBy({ top: cardHeight * 1, behavior: 'smooth' });

    const totalPages = Math.ceil(totalArtists / LIMIT);
    if (currentPage >= totalPages) {
      iziToast.info({
        title: '',
        message: "Ви, передивились всіх артистів.",
        position: 'topRight',
        timeout: 4000,
        titleColor: '#fff',
        backgroundColor: '#764191',
        messageColor: '#fff',
      });
      hideLoadMoreButton(refs.loadMoreBtn);
      refs.loadMoreBtn.removeEventListener('click', onLoadMoreBtnClick);
    }
  } catch (err) {
    console.error(err);
  } finally {
    hideLoader();
  }
}

// ===== ОПРАЦЮВАННЯ КНОПКИ "ДІЗНАТИСЬ БІЛЬШЕ" =====
function onArtistCardClick(event) {
  const learnMoreBtn = event.target.closest('.learn-more-btn');
  if (!learnMoreBtn) return;

  const artistId = learnMoreBtn.dataset.artistId;
  if (!artistId) return;

  openArtistModal(artistId); // ← сюда подключить модалку, если будет нужно
}

document.addEventListener('DOMContentLoaded', initArtists);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
refs.cardsContainer.addEventListener('click', onArtistCardClick);

