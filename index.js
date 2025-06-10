import{a as m,i as w,S as k}from"./assets/vendor-rzQNFhEO.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))t(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&t(r)}).observe(document,{childList:!0,subtree:!0});function n(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(a){if(a.ep)return;a.ep=!0;const o=n(a);fetch(a.href,o)}})();const p=document.querySelector(".loader-container"),M=({_id:e="",strArtist:s="No name",strArtistThumb:n="https://via.placeholder.com/300x300?text=No+Image",genres:t=[],strBiographyEN:a="No description."})=>{const o=t.length?t.map(l=>`<li class="genre-tag">${l}</li>`).join(""):'<li class="genre-tag">No genres</li>',r=a.slice(0,150)+(a.length>150?"...":"");return`
    <li class="artist-card">
      <img src="${n}" alt="${s}" class="artist-photo" loading="lazy" />
      <ul class="artist-genres">${o}</ul>
      <h3 class="artist-name">${s}</h3>
      <p class="artist-info">${r}</p>
      <button class="learn-more-btn" data-artist-id="${e}">Learn More</button>
    </li>
  `};function b(e,s){if(!Array.isArray(e)||!e.length)return;const n=e.map(t=>M(t)).join("");s.insertAdjacentHTML("beforeend",n)}function E(e){e.classList.remove("hidden")}function f(e){e.classList.add("hidden")}function g(){p.classList.remove("hidden")}function h(){p.classList.add("hidden")}const A="https://sound-wave.b.goit.study/api",u=8;m.defaults.baseURL=A;async function v(e=1,s=u){var n;try{const t=await m.get("/artists",{params:{page:e,limit:s}});return console.log("Fetch returned:",t.data),t.data}catch(t){return console.error("Failed to fetch artists:",t.message,(n=t.response)==null?void 0:n.status),{artists:[],totalArtists:0}}}async function C(e=10,s=1){var n;try{return(await m.get("/feedbacks",{params:{limit:e,page:s}})).data}catch(t){throw console.error("Error fetching feedback list:",t.message,(n=t.response)==null?void 0:n.status),t}}document.addEventListener("DOMContentLoaded",()=>{var a;const e=document.getElementById("backdrop");if(!e)return;const s=e.querySelector(".modal-content"),n=e.querySelector(".modal-close-btn");if(!s||!n)return;function t(){e.classList.remove("is-open"),document.body.classList.remove("no-scroll"),s.innerHTML=""}n.addEventListener("click",t),e.addEventListener("click",o=>{o.target===e&&t()}),document.addEventListener("keydown",o=>{o.key==="Escape"&&t()}),(a=document.querySelector(".gallery"))==null||a.addEventListener("click",o=>{if(o.target.closest(".learn-more-btn")){const l=o.target.closest(".artist-card").dataset.id;y(l)}})});async function y(e){const s=document.getElementById("backdrop"),n=s==null?void 0:s.querySelector(".modal-content"),t=s==null?void 0:s.querySelector(".band-albums-list");if(!(!s||!n))try{document.body.classList.add("no-scroll"),s.classList.add("is-open"),n.innerHTML='<span class="loader"></span>';const a=await fetch(`https://sound-wave.b.goit.study/api/artists/${e}/albums`);if(!a.ok)throw new Error("Failed to fetch artist details");const o=await a.json();n.innerHTML=S(o),t.innerHTML=$(o)}catch{n.innerHTML="<p>Error loading artist data.</p>"}}function S(e){const{strArtist:s,strArtistThumb:n,intFormedYear:t,intDiedYear:a,intMembers:o,strBiographyEN:r,strCountry:l,strGender:i}=e;return`
  <h3 class="band-title">${s}</h3>
  
  <div class="wrapper">
    <img class="band-thumbnail" src="${n}" alt="Band Thumbnail">

    <div>
      <div class="modal-first-row">
        <div class="band-years modal-band-overview">
          <ul class="modal-band-element">
            <li class="modal-band-subtitle">Years active</li>
            <li class="modal-band-text">${t} - ${a===null?"Present":a}</li>
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
            <li class="modal-band-text">${o}</li>
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
          <li class="modal-band-text">${r}</li>
        </ul>
      </div>
    </div>
  </div>
  `}function $(e){console.log(e.albumsList)}let d=1;const c={cardsContainer:document.querySelector("#cards-container"),loadMoreBtn:document.querySelector(".load-more-btn")};async function x(){try{g();const{artists:e,totalArtists:s}=await v(d,u);b(e,c.cardsContainer),d*u<s?E(c.loadMoreBtn):f(c.loadMoreBtn)}catch(e){console.error(e)}finally{h()}}async function L(){d++,g();try{const{artists:e,totalArtists:s}=await v(d,u);b(e,c.cardsContainer);const n=c.cardsContainer.lastElementChild;await new Promise(o=>setTimeout(o,100));const t=n.getBoundingClientRect().height;window.scrollBy({top:t*1,behavior:"smooth"});const a=Math.ceil(s/u);d>=a&&(w.info({title:"",message:"Вы просмотрели всех артистов.",position:"topRight",timeout:4e3,titleColor:"#fff",backgroundColor:"#764191",messageColor:"#fff"}),f(c.loadMoreBtn),c.loadMoreBtn.removeEventListener("click",L))}catch(e){console.error(e)}finally{h()}}function B(e){const s=e.target.closest(".learn-more-btn");if(!s)return;const n=s.dataset.artistId;n&&y(n)}document.addEventListener("DOMContentLoaded",x);c.loadMoreBtn.addEventListener("click",L);c.cardsContainer.addEventListener("click",B);const T=document.querySelector(".swiper-wrapper");async function q(){try{(await C(10,1)).data.forEach(({rating:n,descr:t,name:a})=>{const o=I({rating:n,text:t,user:a});T.appendChild(o)}),O()}catch(e){console.error("Oops...Error",e.message)}}q();function I({rating:e,text:s,user:n}){const t=document.createElement("div");t.classList.add("swiper-slide");const a=Math.round(e);return t.innerHTML=`
    <div class="feedback-card">
      <div class="feedback-stars">${N(a)}</div>
      <p class="feedback-text">"${s}"</p>
      <p class="feedback-user">${n}</p>
    </div>
  `,t}function N(e){let n="";for(let t=1;t<=5;t++){const a=t<=e?"star-filled":"star-outline";n+=`
      <svg class="star-icon ${a}" width="24" height="24">
        <use href="img/symbol-defs.svg#${t<=e?"icon-star-filled":"icon-star-outline"}"></use>
      </svg>
    `}return n}function O(){const e=new k(".feedback-swiper",{loop:!1,navigation:{nextEl:".feedback-button-next",prevEl:".feedback-button-prev"},pagination:{el:".feedback-pagination",clickable:!0,type:"custom",renderCustom:function(s,n,t){const o=t-1;let r="",l="",i="";return n-1===0?r="swiper-pagination-bullet-active":n-1===o?i="swiper-pagination-bullet-active":l="swiper-pagination-bullet-active",`
          <span class="swiper-pagination-bullet ${r}" data-slide-index="0"></span>
          <span class="swiper-pagination-bullet ${l}" data-slide-index="${Math.floor(t/2)}"></span>
          <span class="swiper-pagination-bullet ${i}" data-slide-index="${o}"></span>
        `}},on:{paginationUpdate:function(){document.querySelectorAll(".feedback-pagination .swiper-pagination-bullet").forEach(n=>{n.onclick=()=>{const t=parseInt(n.getAttribute("data-slide-index"));e.slideTo(t+1)}})}},grabCursor:!0})}document.addEventListener("DOMContentLoaded",function(){const e=document.querySelector(".burger-btn"),s=document.querySelector(".mobile-menu"),n=document.querySelector(".mobile-close"),t=document.querySelector(".mobile-backdrop"),a=document.querySelector(".header-logo-link");let o=!1;const r=()=>{t.classList.remove("open"),s.classList.remove("open"),document.body.style.overflow=""};e.addEventListener("click",()=>{if(t.classList.add("open"),s.classList.add("open"),document.body.style.overflow="hidden",!o&&a){const i=a.cloneNode(!0);i.classList.add("mobile-logo"),s.prepend(i),o=!0}}),n.addEventListener("click",r),t.addEventListener("click",i=>{i.target===t&&r()}),s.querySelectorAll("a").forEach(i=>{i.addEventListener("click",r)})});
//# sourceMappingURL=index.js.map
