// import 'izitoast/dist/css/iziToast.min.css';
// підвантаження даних//
const modalBackdrop = document.getElementById('artist-modal');
const modalContent = modalBackdrop.querySelector('.modal-content');
const closeModalBtn = modalBackdrop.querySelector('.close-btn');

export async function openArtistModal(artistId) {
  try {
    document.body.classList.add('no-scroll');
    modalBackdrop.classList.remove('is-hidden');
    modalContent.innerHTML = '<span class="loader">Loading...</span>';

    const response = await fetch(
      `https://sound-wave.b.goit.study/api/artists/${artistId}`
    );
    if (!response.ok) throw new Error('Failed to fetch artist details');
    const data = await response.json();

    modalContent.innerHTML = generateArtistMarkup(data);
  } catch (err) {
    modalContent.innerHTML = '<p>Error loading artist data.</p>';
  }
}

function closeArtistModal() {
  modalBackdrop.classList.add('is-hidden');
  document.body.classList.remove('no-scroll');
  modalContent.innerHTML = '';
}

closeModalBtn.addEventListener('click', closeArtistModal);
modalBackdrop.addEventListener('click', e => {
  if (e.target === modalBackdrop) closeArtistModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeArtistModal();
});

// відкриття модалки//
document.querySelector('.gallery').addEventListener('click', e => {
  if (e.target.closest('.learn-more-btn')) {
    const card = e.target.closest('.artist-card');
    const artistId = card.dataset.id;
    openArtistModal(artistId);
  }
});
