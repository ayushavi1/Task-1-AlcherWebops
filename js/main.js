// API information.
const apiUrl =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=2b96854c586847c8f736c6bed580923e";
const IMGPATH = "https://image.tmdb.org/t/p/w500";
const searchUrl =
  "https://api.themoviedb.org/3/search/movie?&api_key=2b96854c586847c8f736c6bed580923e&query=";
// Selecting our Elements.
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search-box");
var results = document.getElementById("results");

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showMovies(data.results);
    });
}

function showMovies(data) {
  main.innerHTML = "";
  data.forEach((movie) => {
    const { title, poster_path } = movie;
    const el = document.createElement("div");
    el.classList.add("movie");
    el.innerHTML = `
            <img class="movie-img" src="${
              IMGPATH + poster_path
            }" alt="${title}" />
            <p class="movie-text">${title}</p>
        
        `;
    main.appendChild(el);
  });
}

getMovies(apiUrl);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm) {
    getMovies(searchUrl + searchTerm);
  } else {
    getMovies(apiUrl);
  }
});
