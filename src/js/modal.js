document.addEventListener('DOMContentLoaded', () => {
  const modalBackdrop = document.getElementById('backdrop');
  if (!modalBackdrop) return;

  const modalContent = modalBackdrop.querySelector('.modal-content');
  const closeModalBtn = modalBackdrop.querySelector('.modal-close-btn');

  if (!modalContent || !closeModalBtn) return;

  function closeArtistModal() {
    modalBackdrop.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
    modalContent.innerHTML = '';
  }

  closeModalBtn.addEventListener('click', closeArtistModal);
  modalBackdrop.addEventListener('click', event => {
    if (event.target === modalBackdrop) closeArtistModal();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeArtistModal();
  });

  document.querySelector('.gallery')?.addEventListener('click', event => {
    if (event.target.closest('.learn-more-btn')) {
      const card = event.target.closest('.artist-card');
      const artistId = card.dataset.id;
      openArtistModal(artistId);
    }
  });
});

export async function openArtistModal(artistId) {
  const modalBackdrop = document.getElementById('backdrop');
  const modalContent = modalBackdrop?.querySelector('.modal-content');
  const bandAlbumsListContent = modalBackdrop?.querySelector('.band-albums-list');

  if (!modalBackdrop || !modalContent) return;

  try {
    document.body.classList.add('no-scroll');
    modalBackdrop.classList.add('is-open');
    modalContent.innerHTML = '<span class="loader"></span>';

    const response = await fetch(
      `https://sound-wave.b.goit.study/api/artists/${artistId}/albums`
    );
    if (!response.ok) throw new Error('Failed to fetch artist details');

    const data = await response.json();
    modalContent.innerHTML = generateArtistMarkup(data);
    bandAlbumsListContent.innerHTML = generateArtistAlbums(data);
  } catch (err) {
    modalContent.innerHTML = '<p>Error loading artist data.</p>';
  }

}

function generateArtistMarkup(data) {
  const {
    strArtist: bandName,
    strArtistThumb: bandThumbnail,
    intFormedYear: formerYear,
    intDiedYear: diedYear,
    intMembers: members,
    strBiographyEN: biography,
    strCountry: foundationPlace,
    strGender: sex,
  } = data;

  const resulYear = (diedYear === null) ? "Present" : diedYear;
  return `
  <h3 class="band-title">${bandName}</h3>
  
  <div class="wrapper">
    <img class="band-thumbnail" src="${bandThumbnail}" alt="Band Thumbnail">

    <div>
      <div class="modal-first-row">
        <div class="band-years modal-band-overview">
          <ul class="modal-band-element">
            <li class="modal-band-subtitle">Years active</li>
            <li class="modal-band-text">${formerYear} - ${resulYear}</li>
          </ul>
        </div>
        <div class="band-sex modal-band-overview">
          <ul class="modal-band-element">
            <li class="modal-band-subtitle">Gender</li>
            <li class="modal-band-text">${sex}</li>
          </ul>
        </div>
      </div>

      <div class="modal-second-row">
        <div class="band-members modal-band-overview">
          <ul class="modal-band-element">
            <li class="modal-band-subtitle">Members</li>
            <li class="modal-band-text">${members}</li>
          </ul>
        </div>
        <div class="band-country modal-band-overview">
          <ul class="modal-band-element">
            <li class="modal-band-subtitle">Country</li>
            <li class="modal-band-text">${foundationPlace}</li>
          </ul>
        </div>
      </div>

      <div class="band-biography modal-band-history">
        <ul class="modal-band-element">
          <li class="modal-band-subtitle">Biography</li>
          <li class="modal-band-text">${biography}</li>
        </ul>
      </div>
    </div>
  </div>
  `
}

function generateArtistAlbums(data) {
  console.log(data.albumsList);
}