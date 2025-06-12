import{a as f,i as A,S}from"./assets/vendor-C4Du_sK1.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(a){if(a.ep)return;a.ep=!0;const r=n(a);fetch(a.href,r)}})();const g=document.querySelector(".loader-container"),T=({_id:t="",strArtist:e="No name",strArtistThumb:n="https://via.placeholder.com/300x300?text=No+Image",genres:s=[],strBiographyEN:a="No description."})=>{const r=s.length?s.map(i=>`<li class="genre-tag">${i}</li>`).join(""):'<li class="genre-tag">No genres</li>',o=a.slice(0,150)+(a.length>150?"...":"");return`
    <li class="artist-card">
      <img src="${n}" alt="${e}" class="artist-photo" loading="lazy" />
      <ul class="artist-genres">${r}</ul>
      <h3 class="artist-name">${e}</h3>
      <p class="artist-info">${o}</p>
      <button class="learn-more-btn" data-artist-id="${t}">Learn More</button>
    </li>
  `};function v(t,e){if(!Array.isArray(t)||!t.length)return;const n=t.map(s=>T(s)).join("");e.insertAdjacentHTML("beforeend",n)}function x(t){t.classList.remove("hidden")}function h(t){t.classList.add("hidden")}function y(){g.classList.remove("hidden")}function L(){g.classList.add("hidden")}const B="https://sound-wave.b.goit.study/api",u=8;f.defaults.baseURL=B;async function k(t=1,e=8){var n;try{return(await f.get("/artists",{params:{page:t,limit:e}})).data}catch(s){return console.error("Failed to fetch artists:",s.message,(n=s.response)==null?void 0:n.status),{artists:[],totalArtists:0}}}async function q(t=10,e=1){var n;try{return(await f.get("/feedbacks",{params:{limit:t,page:e}})).data}catch(s){throw console.error("Error fetching feedback list:",s.message,(n=s.response)==null?void 0:n.status),s}}document.addEventListener("DOMContentLoaded",()=>{var a;const t=document.getElementById("backdrop");if(!t)return;const e=t.querySelector(".modal-content"),n=t.querySelector(".modal-close-btn");if(!e||!n)return;function s(){t.classList.remove("is-open"),document.body.classList.remove("no-scroll"),e.innerHTML="";const r=t.querySelector("#band-albums-list-container");r&&(r.innerHTML="")}n.addEventListener("click",s),t.addEventListener("click",r=>{r.target===t&&s()}),document.addEventListener("keydown",r=>{r.key==="Escape"&&s()}),(a=document.querySelector(".gallery"))==null||a.addEventListener("click",r=>{if(r.target.closest(".learn-more-btn")){const i=r.target.closest(".artist-card").dataset.id;w(i)}})});async function w(t){const e=document.getElementById("backdrop"),n=e==null?void 0:e.querySelector(".modal-content"),s=e==null?void 0:e.querySelector(".band-albums-list");if(!(!e||!n))try{document.body.classList.add("no-scroll"),e.classList.add("is-open"),n.innerHTML='<span class="loader"></span>';const a=await fetch(`https://sound-wave.b.goit.study/api/artists/${t}/albums`);if(!a.ok)throw new Error("Failed to fetch artist details");const r=await a.json();n.innerHTML=N(r),s.innerHTML=P(r)}catch{n.innerHTML="<p>Error loading artist data.</p>"}}function N(t){const{strArtist:e,strArtistThumb:n,intFormedYear:s,intDiedYear:a,intMembers:r,strBiographyEN:o,strCountry:i,strGender:c,genres:p}=t,E=p.length?p.map($=>`<li class="genre-tag">${$}</li>`).join(""):"";return`
  <h3 class="band-title">${e}</h3>
  
  <div class="wrapper">
    <img class="band-thumbnail" src="${n}" alt="Band Thumbnail">

    <div>
      <div class="modal-first-row">
        <div class="band-years modal-band-overview">
          <ul class="modal-band-element">
            <li class="modal-band-subtitle">Years active</li>
            <li class="modal-band-text">${s} - ${a===null?"Present":a}</li>
          </ul>
        </div>
        <div class="band-sex modal-band-overview">
          <ul class="modal-band-element">
            <li class="modal-band-subtitle">Gender</li>
            <li class="modal-band-text">${c}</li>
          </ul>
        </div>
      </div>

      <div class="modal-second-row">
        <div class="band-members modal-band-overview">
          <ul class="modal-band-element">
            <li class="modal-band-subtitle">Members</li>
            <li class="modal-band-text">${r}</li>
          </ul>
        </div>
        <div class="band-country modal-band-overview">
          <ul class="modal-band-element">
            <li class="modal-band-subtitle">Country</li>
            <li class="modal-band-text">${i}</li>
          </ul>
        </div>
      </div>

      <div class="band-biography modal-band-history">
        <ul class="modal-band-element">
          <li class="modal-band-subtitle">Biography</li>
          <li class="modal-band-text scrollable-biography">${o}</li>
        </ul>
      </div>
    
       <div class="band-genres-container">
        <ul class="band-genres-list">${E}</ul>
      </div>
    </div>
  </div>
  `}function P(t){return!t.albumsList||t.albumsList.length===0?'<li class="no-albums">No albums found.</li>':t.albumsList.map(e=>{let n=`
          <li class="album-item">
            <p class="album-name">${e.strAlbum}</p>
        `;return n+=`
          <ul class="tracks-list">
            <li class="track-info">
              <div class="track-name">Track</div>
              <div class="track-duration">Time</div>
              <div class="track-link">Link</div>
            </li>
            ${H(e.tracks)}
          </ul>
        </li>
      `,n}).join("")}function H(t){return t.map(e=>{const n=e.movie?`
    <a href="${e.movie}" target="blank">
      <svg class="modal-youtube-icon" width="24" height="24">
        <use href="./img/symbol-defs.svg#icon-youtube"></use>
      </svg>
    </a>
    `:"-",s=I(e.intDuration);return`
    <li class="track-item">
      <div class="track-name">${e.strTrack}</div>
      <div class="track-duration">${s}</div>
      <div class="track-link">${n}</div>
    </li>`}).join("")}function I(t){const e=Math.floor(t/1e3),n=Math.floor(e/60),a=(e%60).toString().padStart(2,"0");return`${n}:${a}`}let d=1;const l={cardsContainer:document.querySelector("#cards-container"),loadMoreBtn:document.querySelector(".load-more-btn")};async function O(){try{y();const{artists:t,totalArtists:e}=await k(d,u);v(t,l.cardsContainer),d*u<e?x(l.loadMoreBtn):h(l.loadMoreBtn)}catch(t){console.error(t)}finally{L()}}async function M(t){t.target.blur(),d++,y();try{const{artists:e,totalArtists:n}=await k(d,u);v(e,l.cardsContainer);const s=l.cardsContainer.lastElementChild;await new Promise(o=>setTimeout(o,100));const a=s.getBoundingClientRect().height;window.scrollBy({top:a*1,behavior:"smooth"});const r=Math.ceil(n/u);d>=r&&(A.info({title:"",message:"Ви, передивились всіх артистів.",position:"topRight",timeout:4e3,titleColor:"#fff",backgroundColor:"#764191",messageColor:"#fff"}),h(l.loadMoreBtn),l.loadMoreBtn.removeEventListener("click",M))}catch(e){console.error(e)}finally{L()}}function j(t){const e=t.target.closest(".learn-more-btn");if(!e)return;const n=e.dataset.artistId;n&&w(n)}document.addEventListener("DOMContentLoaded",O);l.loadMoreBtn.addEventListener("click",M);l.cardsContainer.addEventListener("click",j);let m;const D=document.querySelector(".swiper-wrapper"),b=document.querySelector(".feedback-pagination");async function F(){try{(await q(10,1)).data.forEach(({rating:n,descr:s,name:a})=>{const r=Y({rating:n,text:s,user:a});D.appendChild(r)}),_()}catch(t){console.error("Oops...Error",t.message)}}function Y({rating:t,text:e,user:n}){const s=document.createElement("div");s.classList.add("swiper-slide");const a=Math.round(t);return s.innerHTML=`
    <div class="feedback-card">
      <div class="feedback-stars">${R(a)}</div>
      <p class="feedback-text">"${e}"</p>
      <p class="feedback-user">${n}</p>
    </div>
  `,s}function R(t){let n="";for(let s=1;s<=5;s++){const a=s<=t?"star-filled":"star-outline";n+=`
     <svg class="star-icon ${a}" width="24" height="24">
        <use href="img/symbol-defs.svg#${s<=t?"icon-star-filled":"icon-star-outline"}"></use>
      </svg>
    `}return n}function _(){m=new S(".feedback-swiper",{loop:!1,navigation:{nextEl:".feedback-button-next",prevEl:".feedback-button-prev"},grabCursor:!0,on:{slideChange:z}}),C(),G()}function C(){b.innerHTML="";const t=m.slides.length,e=m.activeIndex;if(t===0)return;const n=0,s=Math.floor(t/2),a=t-1;[n,s,a].forEach(o=>{const i=document.createElement("span");i.classList.add("swiper-pagination-bullet"),i.setAttribute("data-slide-index",o),e===o&&i.classList.add("swiper-pagination-bullet-active"),b.appendChild(i)})}function z(){C()}function G(){b.addEventListener("click",t=>{const e=t.target.closest(".swiper-pagination-bullet");if(!e)return;const n=parseInt(e.getAttribute("data-slide-index"),10);m.slideTo(n)})}F();document.addEventListener("DOMContentLoaded",function(){const t=document.querySelector(".burger-btn"),e=document.querySelector(".mobile-menu"),n=document.querySelector(".mobile-close"),s=document.querySelector(".mobile-backdrop"),a=document.querySelector(".header-logo-link");let r=!1;const o=()=>{s.classList.remove("open"),e.classList.remove("open"),document.body.style.overflow=""};t.addEventListener("click",()=>{if(s.classList.add("open"),e.classList.add("open"),document.body.style.overflow="hidden",!r&&a){const c=a.cloneNode(!0);c.classList.add("mobile-logo"),e.prepend(c),r=!0}}),n.addEventListener("click",o),s.addEventListener("click",c=>{c.target===s&&o()}),e.querySelectorAll("a").forEach(c=>{c.addEventListener("click",o)})});
//# sourceMappingURL=index.js.map
