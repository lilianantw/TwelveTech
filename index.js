import{a}from"./assets/vendor-BvLu_gPC.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const i of e.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function o(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function n(t){if(t.ep)return;t.ep=!0;const e=o(t);fetch(t.href,e)}})();const l=({_id:r,strArtist:s,strArtistThumb:o,genres:n,strBiographyEN:t})=>`
<li class="artist-card">
  <img src="${o}" alt="${s}" class="artist-photo" />
  <ul class="artist-genres">
    ${n.map(e=>`<li class="genre-tag">${e}</li>`).join("")}
  </ul>
  <h3 class="artist-name">${s}</h3>
  <p class="artist-info">${t}</p>
 <button class="learn-more-btn" data-artist-id="${r}">Learn More</button>
</li>
`;function u(r,s){console.log(r);const o=r.map(n=>l(n)).join("");s.insertAdjacentHTML("beforeend",o)}a.defaults.baseURL="https://sound-wave.b.goit.study/api/";async function c(r,s){try{return(await a.get("/artists",{params:{limit:s,page:r}})).data.artists}catch(o){return console.error(o),[]}}c().then(r=>console.log(r));const d=8;let f=1;const p={cardsContainer:document.querySelector("#cards-container")};async function m(){const r=await c(f,d);u(r,p.cardsContainer)}m();
//# sourceMappingURL=index.js.map
