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
    const albumsList = modalBackdrop.querySelector(
      '#band-albums-list-container'
    );
    if (albumsList) albumsList.innerHTML = '';
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
  const bandAlbumsListContent =
    modalBackdrop?.querySelector('.band-albums-list');

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
    genres,
  } = data;

 const genresMarkup = genres.length
  ? genres.map(genre => `<li class="genre-tag">${genre}</li>`).join("")
   : "";
  
  const resulYear = diedYear === null ? 'Present' : diedYear;
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
    
       <div class="band-genres-container">
        <ul class="band-genres-list">${genresMarkup}</ul>
      </div>
    </div>
  </div>
  `;
}

function generateArtistAlbums(data) {
  if (!data.albumsList || data.albumsList.length === 0) {
    return '<li class="no-albums">No albums found.</li>';
  }

  return data.albumsList
    .map(album => {
      let res = `
          <li class="album-item">
            <p class="album-name">${album.strAlbum}</p>
        `;
      
      res += `
          <ul class="tracks-list">
            <li class="track-info">
              <div class="track-name">Track</div>
              <div class="track-duration">Time</div>
              <div class="track-link">Link</div>
            </li>
            ${generateAlbumTracks(album.tracks)}
          </ul>
        </li>
      `;
      return res;
    }).join('');
}

function generateAlbumTracks(data) {
  return data.map(track => {
    const link = track.movie ? `
    <a href="${track.movie}" target="blank">
      <svg class="modal-youtube-icon" width="24" height="24">
        <use href="./img/symbol-defs.svg#icon-youtube"></use>
      </svg>
    </a>
    ` : '-';
    const time = convertToSeconds(track.intDuration);
    
    return `
    <li class="track-item">
      <div class="track-name">${track.strTrack}</div>
      <div class="track-duration">${time}</div>
      <div class="track-link">${link}</div>
    </li>`
  }).join('')
}

function convertToSeconds(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formattedSeconds = seconds.toString().padStart(2, '0');

  return `${minutes}:${formattedSeconds}`;
}