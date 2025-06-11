import{a as m,i as k,S as w}from"./assets/vendor-rzQNFhEO.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(a){if(a.ep)return;a.ep=!0;const r=n(a);fetch(a.href,r)}})();const b=document.querySelector(".loader-container"),M=({_id:e="",strArtist:t="No name",strArtistThumb:n="https://via.placeholder.com/300x300?text=No+Image",genres:s=[],strBiographyEN:a="No description."})=>{const r=s.length?s.map(l=>`<li class="genre-tag">${l}</li>`).join(""):'<li class="genre-tag">No genres</li>',o=a.slice(0,150)+(a.length>150?"...":"");return`
    <li class="artist-card">
      <img src="${n}" alt="${t}" class="artist-photo" loading="lazy" />
      <ul class="artist-genres">${r}</ul>
      <h3 class="artist-name">${t}</h3>
      <p class="artist-info">${o}</p>
      <button class="learn-more-btn" data-artist-id="${e}">Learn More</button>
    </li>
  `};function f(e,t){if(!Array.isArray(e)||!e.length)return;const n=e.map(s=>M(s)).join("");t.insertAdjacentHTML("beforeend",n)}function $(e){e.classList.remove("hidden")}function p(e){e.classList.add("hidden")}function g(){b.classList.remove("hidden")}function v(){b.classList.add("hidden")}const S="https://sound-wave.b.goit.study/api",u=8;m.defaults.baseURL=S;async function h(e=1,t=u){var n;try{const s=await m.get("/artists",{params:{page:e,limit:t}});return console.log("Fetch returned:",s.data),s.data}catch(s){return console.error("Failed to fetch artists:",s.message,(n=s.response)==null?void 0:n.status),{artists:[],totalArtists:0}}}async function A(e=10,t=1){var n;try{return(await m.get("/feedbacks",{params:{limit:e,page:t}})).data}catch(s){throw console.error("Error fetching feedback list:",s.message,(n=s.response)==null?void 0:n.status),s}}document.addEventListener("DOMContentLoaded",()=>{var a;const e=document.getElementById("backdrop");if(!e)return;const t=e.querySelector(".modal-content"),n=e.querySelector(".modal-close-btn");if(!t||!n)return;function s(){e.classList.remove("is-open"),document.body.classList.remove("no-scroll"),t.innerHTML="";const r=e.querySelector("#band-albums-list-container");r&&(r.innerHTML="")}n.addEventListener("click",s),e.addEventListener("click",r=>{r.target===e&&s()}),document.addEventListener("keydown",r=>{r.key==="Escape"&&s()}),(a=document.querySelector(".gallery"))==null||a.addEventListener("click",r=>{if(r.target.closest(".learn-more-btn")){const l=r.target.closest(".artist-card").dataset.id;y(l)}})});async function y(e){const t=document.getElementById("backdrop"),n=t==null?void 0:t.querySelector(".modal-content"),s=t==null?void 0:t.querySelector(".band-albums-list");if(!(!t||!n))try{document.body.classList.add("no-scroll"),t.classList.add("is-open"),n.innerHTML='<span class="loader"></span>';const a=await fetch(`https://sound-wave.b.goit.study/api/artists/${e}/albums`);if(!a.ok)throw new Error("Failed to fetch artist details");const r=await a.json();n.innerHTML=E(r),s.innerHTML=C(r)}catch{n.innerHTML="<p>Error loading artist data.</p>"}}function E(e){const{strArtist:t,strArtistThumb:n,intFormedYear:s,intDiedYear:a,intMembers:r,strBiographyEN:o,strCountry:l,strGender:i}=e;return`
  <h3 class="band-title">${t}</h3>
  
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
            <li class="modal-band-text">${i}</li>
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
            <li class="modal-band-text">${l}</li>
          </ul>
        </div>
      </div>

      <div class="band-biography modal-band-history">
        <ul class="modal-band-element">
          <li class="modal-band-subtitle">Biography</li>
          <li class="modal-band-text">${o}</li>
        </ul>
      </div>
    </div>
  </div>
  `}function C(e){return!e.albumsList||e.albumsList.length===0?'<li class="no-albums">No albums found.</li>':e.albumsList.map(t=>{let n=`
          <li class="album-item">
            <p class="album-name">${t.strAlbum}</p>
        `;return n+=`
          <ul class="tracks-list">
            <li class="track-info">
              <div class="track-name">Track</div>
              <div class="track-duration">Time</div>
              <div class="track-link">Link</div>
            </li>
            ${x(t.tracks)}
          </ul>
        </li>
      `,n}).join("")}function x(e){return e.map(t=>{const n=t.movie?`
    <a href="${t.movie}" target="blank">
      <svg class="modal-youtube-icon" width="24" height="24">
        <use href="/img/symbol-defs.svg#icon-youtube"></use>
      </svg>
    </a>
    `:"-",s=T(t.intDuration);return`
    <li class="track-item">
      <div class="track-name">${t.strTrack}</div>
      <div class="track-duration">${s}</div>
      <div class="track-link">${n}</div>
    </li>`}).join("")}function T(e){const t=Math.floor(e/1e3),n=Math.floor(t/60),a=(t%60).toString().padStart(2,"0");return`${n}:${a}`}let d=1;const c={cardsContainer:document.querySelector("#cards-container"),loadMoreBtn:document.querySelector(".load-more-btn")};async function B(){try{g();const{artists:e,totalArtists:t}=await h(d,u);f(e,c.cardsContainer),d*u<t?$(c.loadMoreBtn):p(c.loadMoreBtn)}catch(e){console.error(e)}finally{v()}}async function L(){d++,g();try{const{artists:e,totalArtists:t}=await h(d,u);f(e,c.cardsContainer);const n=c.cardsContainer.lastElementChild;await new Promise(r=>setTimeout(r,100));const s=n.getBoundingClientRect().height;window.scrollBy({top:s*1,behavior:"smooth"});const a=Math.ceil(t/u);d>=a&&(k.info({title:"",message:"Ви, передивились всіх артистів.",position:"topRight",timeout:4e3,titleColor:"#fff",backgroundColor:"#764191",messageColor:"#fff"}),p(c.loadMoreBtn),c.loadMoreBtn.removeEventListener("click",L))}catch(e){console.error(e)}finally{v()}}function q(e){const t=e.target.closest(".learn-more-btn");if(!t)return;const n=t.dataset.artistId;n&&y(n)}document.addEventListener("DOMContentLoaded",B);c.loadMoreBtn.addEventListener("click",L);c.cardsContainer.addEventListener("click",q);const I=document.querySelector(".swiper-wrapper");async function N(){try{(await A(10,1)).data.forEach(({rating:n,descr:s,name:a})=>{const r=H({rating:n,text:s,user:a});I.appendChild(r)}),P()}catch(e){console.error("Oops...Error",e.message)}}N();function H({rating:e,text:t,user:n}){const s=document.createElement("div");s.classList.add("swiper-slide");const a=Math.round(e);return s.innerHTML=`
    <div class="feedback-card">
      <div class="feedback-stars">${O(a)}</div>
      <p class="feedback-text">"${t}"</p>
      <p class="feedback-user">${n}</p>
    </div>
  `,s}function O(e){let n="";for(let s=1;s<=5;s++){const a=s<=e?"star-filled":"star-outline";n+=`
     <svg class="star-icon ${a}" width="24" height="24">
        <use href="img/symbol-defs.svg#${s<=e?"icon-star-filled":"icon-star-outline"}"></use>
      </svg>
    `}return n}function P(){const e=new w(".feedback-swiper",{loop:!1,navigation:{nextEl:".feedback-button-next",prevEl:".feedback-button-prev"},pagination:{el:".feedback-pagination",clickable:!0,type:"custom",renderCustom:function(t,n,s){const r=s-1;let o="",l="",i="";return n-1===0?o="swiper-pagination-bullet-active":n-1===r?i="swiper-pagination-bullet-active":l="swiper-pagination-bullet-active",`
          <span class="swiper-pagination-bullet ${o}" data-slide-index="0"></span>
          <span class="swiper-pagination-bullet ${l}" data-slide-index="${Math.floor(s/2)}"></span>
          <span class="swiper-pagination-bullet ${i}" data-slide-index="${r}"></span>
        `}},on:{paginationUpdate:function(){document.querySelectorAll(".feedback-pagination .swiper-pagination-bullet").forEach(n=>{n.onclick=()=>{const s=parseInt(n.getAttribute("data-slide-index"));e.slideTo(s+1)}})}},grabCursor:!0})}document.addEventListener("DOMContentLoaded",function(){const e=document.querySelector(".burger-btn"),t=document.querySelector(".mobile-menu"),n=document.querySelector(".mobile-close"),s=document.querySelector(".mobile-backdrop"),a=document.querySelector(".header-logo-link");let r=!1;const o=()=>{s.classList.remove("open"),t.classList.remove("open"),document.body.style.overflow=""};e.addEventListener("click",()=>{if(s.classList.add("open"),t.classList.add("open"),document.body.style.overflow="hidden",!r&&a){const i=a.cloneNode(!0);i.classList.add("mobile-logo"),t.prepend(i),r=!0}}),n.addEventListener("click",o),s.addEventListener("click",i=>{i.target===s&&o()}),t.querySelectorAll("a").forEach(i=>{i.addEventListener("click",o)})});
//# sourceMappingURL=index.js.map
