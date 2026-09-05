/* =========================================================
   MOVIE MINDSET
   Movie Data & Movie Rendering
========================================================= */

let allMovies = [];
let filteredMovies = [];

const movieGrid = document.getElementById("movieGrid");
const resultsCount = document.getElementById("resultsCount");
const noResults = document.getElementById("noResults");
const sortMovies = document.getElementById("sortMovies");

/* =========================================================
   LOAD MOVIES
========================================================= */

async function loadMovies() {
  try {
    const response = await fetch("data/movies.json");

    if (!response.ok) {
      throw new Error("Unable to load movies.json");
    }

    allMovies = await response.json();

    filteredMovies = [...allMovies];

    renderMovies();
  } catch (error) {
    console.error("Movie loading error:", error);

    resultsCount.textContent = "Unable to load movies.";

    movieGrid.innerHTML = `
            <div class="loading-error">
                <h2>Unable to Load Movies</h2>
                <p>
                    Please make sure the website is running
                    through Live Server.
                </p>
            </div>
        `;
  }
}

/* =========================================================
   RENDER MOVIES
========================================================= */

function renderMovies() {
  movieGrid.innerHTML = "";

  if (filteredMovies.length === 0) {
    noResults.hidden = false;

    resultsCount.textContent = "0 movies found";

    return;
  }

  noResults.hidden = true;

  resultsCount.textContent = `${filteredMovies.length} ${
    filteredMovies.length === 1 ? "movie" : "movies"
  } found`;

  filteredMovies.forEach((movie) => {
    const card = document.createElement("article");

    card.className = "movie-card";

    card.innerHTML = `

            <div class="poster-wrapper">

                <img
                    src="${movie.poster}"
                    alt="${movie.title} movie poster"
                    loading="lazy"
                >

                <div class="rating-badge">
                    ⭐ ${movie.rating}
                </div>

            </div>


            <div class="movie-info">

                <h3>
                    ${movie.title}
                </h3>


                <div class="movie-meta">

                    <span>
                        ${movie.year}
                    </span>

                    <span>•</span>

                    <span>
                        ${movie.industry}
                    </span>

                </div>


                <div class="genre-list">

                    ${movie.genre
                      .slice(0, 2)
                      .map((genre) => `<span>${genre}</span>`)
                      .join("")}

                </div>


                <a
                    href="movie.html?id=${movie.id}"
                    class="review-link"
                >
                    Read Review →
                </a>

            </div>

        `;

    movieGrid.appendChild(card);
  });
}

/* =========================================================
   SORT MOVIES
========================================================= */

if (sortMovies) {
  sortMovies.addEventListener("change", function () {
    const sortType = this.value;

    switch (sortType) {
      case "rating-high":
        filteredMovies.sort((a, b) => b.rating - a.rating);

        break;

      case "rating-low":
        filteredMovies.sort((a, b) => a.rating - b.rating);

        break;

      case "name":
        filteredMovies.sort((a, b) => a.title.localeCompare(b.title));

        break;

      case "year":
        filteredMovies.sort((a, b) => b.year - a.year);

        break;

      case "recent":
        filteredMovies.sort(
          (a, b) => new Date(b.watchedDate) - new Date(a.watchedDate),
        );

        break;
    }

    renderMovies();
  });
}

/* =========================================================
   INITIALIZE
========================================================= */

loadMovies();
