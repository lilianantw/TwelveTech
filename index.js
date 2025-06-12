import{a as m,i as $,S}from"./assets/vendor-rzQNFhEO.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(a){if(a.ep)return;a.ep=!0;const r=n(a);fetch(a.href,r)}})();const f=document.querySelector(".loader-container"),A=({_id:t="",strArtist:e="No name",strArtistThumb:n="https://via.placeholder.com/300x300?text=No+Image",genres:s=[],strBiographyEN:a="No description."})=>{const r=s.length?s.map(l=>`<li class="genre-tag">${l}</li>`).join(""):'<li class="genre-tag">No genres</li>',o=a.slice(0,150)+(a.length>150?"...":"");return`
    <li class="artist-card">
      <img src="${n}" alt="${e}" class="artist-photo" loading="lazy" />
      <ul class="artist-genres">${r}</ul>
      <h3 class="artist-name">${e}</h3>
      <p class="artist-info">${o}</p>
      <button class="learn-more-btn" data-artist-id="${t}">Learn More</button>
    </li>
  `};function p(t,e){if(!Array.isArray(t)||!t.length)return;const n=t.map(s=>A(s)).join("");e.insertAdjacentHTML("beforeend",n)}function E(t){t.classList.remove("hidden")}function g(t){t.classList.add("hidden")}function v(){f.classList.remove("hidden")}function h(){f.classList.add("hidden")}const C="https://sound-wave.b.goit.study/api",u=8;m.defaults.baseURL=C;async function y(t=1,e=8){var n;try{const s=await m.get("/artists",{params:{page:t,limit:e}});return console.log("Fetch returned:",s.data),s.data}catch(s){return console.error("Failed to fetch artists:",s.message,(n=s.response)==null?void 0:n.status),{artists:[],totalArtists:0}}}async function x(t=10,e=1){var n;try{return(await m.get("/feedbacks",{params:{limit:t,page:e}})).data}catch(s){throw console.error("Error fetching feedback list:",s.message,(n=s.response)==null?void 0:n.status),s}}document.addEventListener("DOMContentLoaded",()=>{var a;const t=document.getElementById("backdrop");if(!t)return;const e=t.querySelector(".modal-content"),n=t.querySelector(".modal-close-btn");if(!e||!n)return;function s(){t.classList.remove("is-open"),document.body.classList.remove("no-scroll"),e.innerHTML="";const r=t.querySelector("#band-albums-list-container");r&&(r.innerHTML="")}n.addEventListener("click",s),t.addEventListener("click",r=>{r.target===t&&s()}),document.addEventListener("keydown",r=>{r.key==="Escape"&&s()}),(a=document.querySelector(".gallery"))==null||a.addEventListener("click",r=>{if(r.target.closest(".learn-more-btn")){const l=r.target.closest(".artist-card").dataset.id;L(l)}})});async function L(t){const e=document.getElementById("backdrop"),n=e==null?void 0:e.querySelector(".modal-content"),s=e==null?void 0:e.querySelector(".band-albums-list");if(!(!e||!n))try{document.body.classList.add("no-scroll"),e.classList.add("is-open"),n.innerHTML='<span class="loader"></span>';const a=await fetch(`https://sound-wave.b.goit.study/api/artists/${t}/albums`);if(!a.ok)throw new Error("Failed to fetch artist details");const r=await a.json();n.innerHTML=T(r),s.innerHTML=B(r)}catch{n.innerHTML="<p>Error loading artist data.</p>"}}function T(t){const{strArtist:e,strArtistThumb:n,intFormedYear:s,intDiedYear:a,intMembers:r,strBiographyEN:o,strCountry:l,strGender:i,genres:b}=t,w=b.length?b.map(M=>`<li class="genre-tag">${M}</li>`).join(""):"";return`
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
          <li class="modal-band-text scrollable-biography">${o}</li>
        </ul>
      </div>
    
       <div class="band-genres-container">
        <ul class="band-genres-list">${w}</ul>
      </div>
    </div>
  </div>
  `}function B(t){return!t.albumsList||t.albumsList.length===0?'<li class="no-albums">No albums found.</li>':t.albumsList.map(e=>{let n=`
          <li class="album-item">
            <p class="album-name">${e.strAlbum}</p>
        `;return n+=`
          <ul class="tracks-list">
            <li class="track-info">
              <div class="track-name">Track</div>
              <div class="track-duration">Time</div>
              <div class="track-link">Link</div>
            </li>
            ${q(e.tracks)}
          </ul>
        </li>
      `,n}).join("")}function q(t){return t.map(e=>{const n=e.movie?`
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
    </li>`}).join("")}function I(t){const e=Math.floor(t/1e3),n=Math.floor(e/60),a=(e%60).toString().padStart(2,"0");return`${n}:${a}`}let d=1;const c={cardsContainer:document.querySelector("#cards-container"),loadMoreBtn:document.querySelector(".load-more-btn")};async function N(){try{v();const{artists:t,totalArtists:e}=await y(d,u);p(t,c.cardsContainer),d*u<e?E(c.loadMoreBtn):g(c.loadMoreBtn)}catch(t){console.error(t)}finally{h()}}async function k(t){t.target.blur(),d++,v();try{const{artists:e,totalArtists:n}=await y(d,u);p(e,c.cardsContainer);const s=c.cardsContainer.lastElementChild;await new Promise(o=>setTimeout(o,100));const a=s.getBoundingClientRect().height;window.scrollBy({top:a*1,behavior:"smooth"});const r=Math.ceil(n/u);d>=r&&($.info({title:"",message:"Ви, передивились всіх артистів.",position:"topRight",timeout:4e3,titleColor:"#fff",backgroundColor:"#764191",messageColor:"#fff"}),g(c.loadMoreBtn),c.loadMoreBtn.removeEventListener("click",k))}catch(e){console.error(e)}finally{h()}}function H(t){const e=t.target.closest(".learn-more-btn");if(!e)return;const n=e.dataset.artistId;n&&L(n)}document.addEventListener("DOMContentLoaded",N);c.loadMoreBtn.addEventListener("click",k);c.cardsContainer.addEventListener("click",H);const O=document.querySelector(".swiper-wrapper");async function P(){try{(await x(10,1)).data.forEach(({rating:n,descr:s,name:a})=>{const r=F({rating:n,text:s,user:a});O.appendChild(r)}),Y()}catch(t){console.error("Oops...Error",t.message)}}P();function F({rating:t,text:e,user:n}){const s=document.createElement("div");s.classList.add("swiper-slide");const a=Math.round(t);return s.innerHTML=`
    <div class="feedback-card">
      <div class="feedback-stars">${j(a)}</div>
      <p class="feedback-text">"${e}"</p>
      <p class="feedback-user">${n}</p>
    </div>
  `,s}function j(t){let n="";for(let s=1;s<=5;s++){const a=s<=t?"star-filled":"star-outline";n+=`
     <svg class="star-icon ${a}" width="24" height="24">
        <use href="img/symbol-defs.svg#${s<=t?"icon-star-filled":"icon-star-outline"}"></use>
      </svg>
    `}return n}function Y(){const t=new S(".feedback-swiper",{loop:!1,navigation:{nextEl:".feedback-button-next",prevEl:".feedback-button-prev"},pagination:{el:".feedback-pagination",clickable:!0,type:"custom",renderCustom:function(e,n,s){const r=s-1;let o="",l="",i="";return n-1===0?o="swiper-pagination-bullet-active":n-1===r?i="swiper-pagination-bullet-active":l="swiper-pagination-bullet-active",`
          <span class="swiper-pagination-bullet ${o}" data-slide-index="0"></span>
          <span class="swiper-pagination-bullet ${l}" data-slide-index="${Math.floor(s/2)}"></span>
          <span class="swiper-pagination-bullet ${i}" data-slide-index="${r}"></span>
        `}},on:{paginationUpdate:function(){document.querySelectorAll(".feedback-pagination .swiper-pagination-bullet").forEach(n=>{n.onclick=()=>{const s=parseInt(n.getAttribute("data-slide-index"));t.slideTo(s+1)}})}},grabCursor:!0})}document.addEventListener("DOMContentLoaded",function(){const t=document.querySelector(".burger-btn"),e=document.querySelector(".mobile-menu"),n=document.querySelector(".mobile-close"),s=document.querySelector(".mobile-backdrop"),a=document.querySelector(".header-logo-link");let r=!1;const o=()=>{s.classList.remove("open"),e.classList.remove("open"),document.body.style.overflow=""};t.addEventListener("click",()=>{if(s.classList.add("open"),e.classList.add("open"),document.body.style.overflow="hidden",!r&&a){const i=a.cloneNode(!0);i.classList.add("mobile-logo"),e.prepend(i),r=!0}}),n.addEventListener("click",o),s.addEventListener("click",i=>{i.target===s&&o()}),e.querySelectorAll("a").forEach(i=>{i.addEventListener("click",o)})});
//# sourceMappingURL=index.js.map
