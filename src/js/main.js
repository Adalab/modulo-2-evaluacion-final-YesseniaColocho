"use strict";

const inputSearch = document.querySelector(".search");
const buttonSearch = document.querySelector(".button-search");
const animeContainer = document.querySelector(".animes__search");
const animeFavorites = document.querySelector(".animes__favorites");
const resetButton = document.querySelector(".js-reset");

let resultAnimes = [];
let favoriteAnimes = JSON.parse(localStorage.getItem("favoriteAnimes")) || [];
printAnimes(favoriteAnimes);

function handleFavoriteClick(e) {
  const animeId = e.currentTarget.id;
  e.currentTarget.classList.add("favorite");

  const foundFavoriteAnime = favoriteAnimes.find(
    (anime) => parseInt(animeId) === anime.mal_id
  );
  if (!foundFavoriteAnime) {
    const animeResult = resultAnimes.find(
      (anime) => parseInt(animeId) === anime.mal_id
    );
    favoriteAnimes.push(animeResult);
    localStorage.setItem("favoriteAnimes", JSON.stringify(favoriteAnimes));

    printAnimes(favoriteAnimes);
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

        const favoriteMatch = favoriteAnimes.find(
          (fav) => fav.mal_id === anime.mal_id
        );
        animeContainer.innerHTML += `<div 
          class="anime ${favoriteMatch ? "favorite" : ""}" 
          id="${anime.mal_id}" >
            <img src="${img}"/> ${name}
        </div>`;
      }

      let animeElements = document.querySelectorAll(".animes__search .anime");
      for (let animeElement of animeElements) {
        animeElement.addEventListener("click", handleFavoriteClick);
      }
    });
}

function printAnimes(animes) {
  animeFavorites.innerHTML = "";
  for (let favoriteAnime of animes) {
    let img = favoriteAnime.images.jpg.image_url;
    if (!img) {
      img = `https://via.placeholder.com/210x295/fafafa/666666/?text=CopyAnimu-TV`;
    }
    let name = favoriteAnime.title;
    animeFavorites.innerHTML += `<div class="anime anime--favorite"><img src="${img}" /> ${name}</div>`;
  }
}

function handleRemove() {
  animeContainer.innerHTML = "";
  localStorage.removeItem("favoriteAnimes");
  favoriteAnimes = [];
  inputSearch.value = "";
  printAnimes([]);
}

buttonSearch.addEventListener("click", handleInput);
resetButton.addEventListener("click", handleRemove);
