"use strict";

const inputSearch = document.querySelector(".search");
const buttonSearch = document.querySelector(".button-search");
const animeApi = document.querySelector('.animes__search')

let arreyAnimes =[]

function handleInput(event) {
  event.preventDefault();
  const infoSearch = inputSearch.value;

  fetch(`https://api.jikan.moe/v4/anime?q=${infoSearch}`)
    .then((response) => response.json())
    .then((data) => {
      const infoAnimes = data.data;

    for(let anime of infoAnimes){
        const img = anime.images.jpg.image_url
        const name = anime.titles[0].title
    }


    });


}

buttonSearch.addEventListener("click", handleInput);
