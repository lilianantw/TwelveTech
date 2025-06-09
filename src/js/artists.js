import {
  createArtistsCartTemplate,
  renderArtists,
  showLoadMoreButton,
  hideLoadMoreButton,
  showLoader,
  hideLoader,
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
  try {
    showLoader();

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
  } catch (err) {
    console.log(err);
  } finally {
    hideLoader();
  }
}

init();

async function onLoadMoreBtn() {
  currentPage++;
  showLoader();

  try {
    const { artists, totalArtists, page } = await fetchArtists(
      currentPage,
      IMAGES_PER_PAGE
    );

    renderArtists(artists, refs.cardsContainer);

    //---Page scrolling
    const firstNewCard = refs.cardsContainer.lastElementChild; //Get the last item in the gallery
    await new Promise(resolve => setTimeout(resolve, 100)); // Image upload;pause

    const cardHeight = firstNewCard.getBoundingClientRect().height; //Calculate height
    window.scrollBy({
      top: cardHeight * 1,
      behavior: 'smooth',
    });

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
  } finally {
    hideLoader();
  }
}

//--------Learn More Btn------

function onArtistCardClick(event) {
  const learnMoreBtn = event.target.closest('.learn-more-btn');
  if (!learnMoreBtn) return;

  const artistId = learnMoreBtn.dataset.artistId;

  if (!artistId) return;

  //openArtistModal(artistId); // ← here invoke your modal logic
}

refs.loadMoreBtn.addEventListener('click', onLoadMoreBtn);
refs.cardsContainer.addEventListener('click', onArtistCardClick);

//as an example for me

// import axios from 'axios';
// export async function openArtistModal(artistId) {
//   try {
//     const { data } = await axios.get(`/artists/${artistId}`);
//      Рендеримо дані в DOM
//     const modalMarkup = `
//       <div class="modal">
//         <button class="close-modal">X</button>
//         <h2>${data.strArtist}</h2>
//         <img src="${data.strArtistThumb}" alt="${data.strArtist}" />
//         <p>${data.strBiographyEN}</p>
//         <ul>${data.genres.map(genre => `<li>${genre}</li>`).join('')}</ul>
//       </div>
//     `;

//     const modalContainer = document.querySelector('.modal-container');
//     modalContainer.innerHTML = modalMarkup;
//     modalContainer.classList.add('is-visible');
//   } catch (err) {
//     console.error('Error fetching artist details:', err);
//   }
// }
