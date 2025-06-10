import{a as m,i as w,S as k}from"./assets/vendor-rzQNFhEO.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))t(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&t(r)}).observe(document,{childList:!0,subtree:!0});function n(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function t(o){if(o.ep)return;o.ep=!0;const a=n(o);fetch(o.href,a)}})();const M=document.querySelector(".main-button");M.addEventListener("click",function(e){e.preventDefault(),document.querySelector("#artist-section").scrollIntoView({behavior:"smooth"})});const b=document.querySelector(".loader-container"),E=({_id:e="",strArtist:s="No name",strArtistThumb:n="https://via.placeholder.com/300x300?text=No+Image",genres:t=[],strBiographyEN:o="No description."})=>{const a=t.length?t.map(l=>`<li class="genre-tag">${l}</li>`).join(""):'<li class="genre-tag">No genres</li>',r=o.slice(0,150)+(o.length>150?"...":"");return`
    <li class="artist-card">
      <img src="${n}" alt="${s}" class="artist-photo" loading="lazy" />
      <ul class="artist-genres">${a}</ul>
      <h3 class="artist-name">${s}</h3>
      <p class="artist-info">${r}</p>
      <button class="learn-more-btn" data-artist-id="${e}">Learn More</button>
    </li>
  `};function p(e,s){if(!Array.isArray(e)||!e.length)return;const n=e.map(t=>E(t)).join("");s.insertAdjacentHTML("beforeend",n)}function A(e){e.classList.remove("hidden")}function f(e){e.classList.add("hidden")}function g(){b.classList.remove("hidden")}function h(){b.classList.add("hidden")}const C="https://sound-wave.b.goit.study/api",u=8;m.defaults.baseURL=C;async function v(e=1,s=u){var n;try{const t=await m.get("/artists",{params:{page:e,limit:s}});return console.log("Fetch returned:",t.data),t.data}catch(t){return console.error("Failed to fetch artists:",t.message,(n=t.response)==null?void 0:n.status),{artists:[],totalArtists:0}}}async function S(e=10,s=1){var n;try{return(await m.get("/feedbacks",{params:{limit:e,page:s}})).data}catch(t){throw console.error("Error fetching feedback list:",t.message,(n=t.response)==null?void 0:n.status),t}}document.addEventListener("DOMContentLoaded",()=>{var o;const e=document.getElementById("backdrop");if(!e)return;const s=e.querySelector(".modal-content"),n=e.querySelector(".modal-close-btn");if(!s||!n)return;function t(){e.classList.remove("is-open"),document.body.classList.remove("no-scroll"),s.innerHTML=""}n.addEventListener("click",t),e.addEventListener("click",a=>{a.target===e&&t()}),document.addEventListener("keydown",a=>{a.key==="Escape"&&t()}),(o=document.querySelector(".gallery"))==null||o.addEventListener("click",a=>{if(a.target.closest(".learn-more-btn")){const l=a.target.closest(".artist-card").dataset.id;y(l)}})});async function y(e){const s=document.getElementById("backdrop"),n=s==null?void 0:s.querySelector(".modal-content"),t=s==null?void 0:s.querySelector(".band-albums-list");if(!(!s||!n))try{document.body.classList.add("no-scroll"),s.classList.add("is-open"),n.innerHTML='<span class="loader"></span>';const o=await fetch(`https://sound-wave.b.goit.study/api/artists/${e}/albums`);if(!o.ok)throw new Error("Failed to fetch artist details");const a=await o.json();n.innerHTML=$(a),t.innerHTML=x(a)}catch{n.innerHTML="<p>Error loading artist data.</p>"}}function $(e){const{strArtist:s,strArtistThumb:n,intFormedYear:t,intDiedYear:o,intMembers:a,strBiographyEN:r,strCountry:l,strGender:i}=e;return`
  <h3 class="band-title">${s}</h3>
  
  <div class="wrapper">
    <img class="band-thumbnail" src="${n}" alt="Band Thumbnail">

    <div>
      <div class="modal-first-row">
        <div class="band-years modal-band-overview">
          <ul class="modal-band-element">
            <li class="modal-band-subtitle">Years active</li>
            <li class="modal-band-text">${t} - ${o===null?"Present":o}</li>
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
            <li class="modal-band-text">${a}</li>
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
  `}function x(e){console.log(e.albumsList)}let d=1;const c={cardsContainer:document.querySelector("#cards-container"),loadMoreBtn:document.querySelector(".load-more-btn")};async function B(){try{g();const{artists:e,totalArtists:s}=await v(d,u);p(e,c.cardsContainer),d*u<s?A(c.loadMoreBtn):f(c.loadMoreBtn)}catch(e){console.error(e)}finally{h()}}async function L(){d++,g();try{const{artists:e,totalArtists:s}=await v(d,u);p(e,c.cardsContainer);const n=c.cardsContainer.lastElementChild;await new Promise(a=>setTimeout(a,100));const t=n.getBoundingClientRect().height;window.scrollBy({top:t*1,behavior:"smooth"});const o=Math.ceil(s/u);d>=o&&(w.info({title:"",message:"Вы просмотрели всех артистов.",position:"topRight",timeout:4e3,titleColor:"#fff",backgroundColor:"#764191",messageColor:"#fff"}),f(c.loadMoreBtn),c.loadMoreBtn.removeEventListener("click",L))}catch(e){console.error(e)}finally{h()}}function q(e){const s=e.target.closest(".learn-more-btn");if(!s)return;const n=s.dataset.artistId;n&&y(n)}document.addEventListener("DOMContentLoaded",B);c.loadMoreBtn.addEventListener("click",L);c.cardsContainer.addEventListener("click",q);const T=document.querySelector(".swiper-wrapper");async function I(){try{(await S(10,1)).data.forEach(({rating:n,descr:t,name:o})=>{const a=N({rating:n,text:t,user:o});T.appendChild(a)}),P()}catch(e){console.error("Oops...Error",e.message)}}I();function N({rating:e,text:s,user:n}){const t=document.createElement("div");t.classList.add("swiper-slide");const o=Math.round(e);return t.innerHTML=`
    <div class="feedback-card">
      <div class="feedback-stars">${O(o)}</div>
      <p class="feedback-text">"${s}"</p>
      <p class="feedback-user">${n}</p>
    </div>
  `,t}function O(e){let n="";for(let t=1;t<=5;t++){const o=t<=e?"star-filled":"star-outline";n+=`
      <svg class="star-icon ${o}" width="24" height="24">
        <use href="../img/symbol-defs.svg#${t<=e?"icon-star-filled":"icon-star-outline"}"></use>
      </svg>
    `}return n}function P(){const e=new k(".feedback-swiper",{loop:!1,navigation:{nextEl:".feedback-button-next",prevEl:".feedback-button-prev"},pagination:{el:".feedback-pagination",clickable:!0,type:"custom",renderCustom:function(s,n,t){const a=t-1;let r="",l="",i="";return n-1===0?r="swiper-pagination-bullet-active":n-1===a?i="swiper-pagination-bullet-active":l="swiper-pagination-bullet-active",`
          <span class="swiper-pagination-bullet ${r}" data-slide-index="0"></span>
          <span class="swiper-pagination-bullet ${l}" data-slide-index="${Math.floor(t/2)}"></span>
          <span class="swiper-pagination-bullet ${i}" data-slide-index="${a}"></span>
        `}},on:{paginationUpdate:function(){document.querySelectorAll(".feedback-pagination .swiper-pagination-bullet").forEach(n=>{n.onclick=()=>{const t=parseInt(n.getAttribute("data-slide-index"));e.slideTo(t+1)}})}},grabCursor:!0})}document.addEventListener("DOMContentLoaded",function(){const e=document.querySelector(".burger-btn"),s=document.querySelector(".mobile-menu"),n=document.querySelector(".mobile-close"),t=document.querySelector(".mobile-backdrop"),o=document.querySelector(".header-logo-link");let a=!1;const r=()=>{t.classList.remove("open"),s.classList.remove("open"),document.body.style.overflow=""};e.addEventListener("click",()=>{if(t.classList.add("open"),s.classList.add("open"),document.body.style.overflow="hidden",!a&&o){const i=o.cloneNode(!0);i.classList.add("mobile-logo"),s.prepend(i),a=!0}}),n.addEventListener("click",r),t.addEventListener("click",i=>{i.target===t&&r()}),s.querySelectorAll("a").forEach(i=>{i.addEventListener("click",r)})});
//# sourceMappingURL=index.js.map
