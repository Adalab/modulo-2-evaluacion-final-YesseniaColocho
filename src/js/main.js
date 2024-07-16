"use strict";

const inputSearch = document.querySelector(".search");
const buttonSearch = document.querySelector(".button-search");
const animeContainer = document.querySelector(".animes__search");
const animeFavorites = document.querySelector(".anime__favorites");

let resultAnimes = [];
let favoriteAnimes = [];


function handleAnimeClick(e) {
  const animeId = e.currentTarget.id;
  const foundFavoriteAnime = favoriteAnimes.find((anime)=> parseInt(animeId)=== anime.mal_id)
  if(!foundFavoriteAnime){
  const animeResult = resultAnimes.find((anime) => parseInt(animeId) === anime.mal_id);
  favoriteAnimes.push(animeResult);
  animeFavorites.innerHTML= ""

  for(let favoriteAnime of favoriteAnimes){
    let img = favoriteAnime.images.jpg.image_url
    let name = favoriteAnime.title
    animeFavorites.innerHTML += `<div><img src="${img}" /> ${name}</div>`
  }
}
}

function handleInput(event) {
  event.preventDefault();
  const infoSearch = inputSearch.value;

  fetch(`https://api.jikan.moe/v4/anime?q=${infoSearch}`)
    .then((response) => response.json())
    .then((data) => {
      animeContainer.innerHTML = "";
      const infoAnimes = data.data;
      resultAnimes = data.data;

      for (let anime of infoAnimes) {
        let img = anime.images.jpg.image_url;

        if (!img) {
          img = `https://via.placeholder.com/210x295/fafafa/666666/?text=Animu-TV`;
        }

        const name = anime.title;
        animeContainer.innerHTML += `<div class="anime" id="${anime.mal_id}" ><img src="${img}"/> ${name}</div>`;
      }

      let animeElements = document.querySelectorAll(".anime");
      for (let animeElement of animeElements) {
        animeElement.addEventListener("click", handleAnimeClick);
      }
    });
}

buttonSearch.addEventListener("click", handleInput);
