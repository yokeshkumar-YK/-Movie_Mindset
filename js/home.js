/* =========================================
   MOVIE MINDSET - HOME PAGE
   Loads all movie data from movies.json
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  loadHomeMovies();
});

/* =========================================
   LOAD MOVIES FROM JSON
========================================= */

async function loadHomeMovies() {
  try {
    const response = await fetch("data/movies.json");

    if (!response.ok) {
      throw new Error(`Failed to load movies.json: ${response.status}`);
    }

    const movies = await response.json();

    console.log("Movies loaded:", movies);

    updateStatistics(movies);

    renderLatestMovies(movies);

    renderTopRatedMovies(movies);
  } catch (error) {
    console.error("Error loading movie data:", error);
  }
}

/* =========================================
   UPDATE HOME PAGE STATISTICS
========================================= */

function updateStatistics(movies) {
  const moviesCount = document.getElementById("moviesCount");

  const reviewsCount = document.getElementById("reviewsCount");

  const highestRating = document.getElementById("highestRating");

  const industriesCount = document.getElementById("industriesCount");

  const heroHighestRating = document.getElementById("heroHighestRating");

  const heroMovieCount = document.getElementById("heroMovieCount");

  /* ---------- Total Movies ---------- */

  const totalMovies = movies.length;

  /* ---------- Total Reviews ---------- */

  const totalReviews = movies.filter(
    (movie) => Array.isArray(movie.review) && movie.review.length > 0,
  ).length;

  /* ---------- Highest Rating ---------- */

  const highest = Math.max(...movies.map((movie) => Number(movie.rating) || 0));

  /* ---------- Total Industries ---------- */

  const industries = new Set(
    movies.map((movie) => movie.industry).filter(Boolean),
  );

  /* ---------- Update Main Stats ---------- */

  if (moviesCount) {
    moviesCount.textContent = String(totalMovies).padStart(2, "0");
  }

  if (reviewsCount) {
    reviewsCount.textContent = String(totalReviews).padStart(2, "0");
  }

  if (highestRating) {
    highestRating.textContent = highest;
  }

  if (industriesCount) {
    industriesCount.textContent = industries.size;
  }

  /* ---------- Update Hero ---------- */

  if (heroHighestRating) {
    heroHighestRating.textContent = highest;
  }

  if (heroMovieCount) {
    heroMovieCount.textContent = totalMovies;
  }
}

/* =========================================
   RECENTLY WATCHED MOVIES
========================================= */

function renderLatestMovies(movies) {
  const container = document.getElementById("latestMovies");

  if (!container) {
    return;
  }

  /*
    Sort movies by watched date.
    Newest movie appears first.
  */

  const latestMovies = [...movies]
    .sort((a, b) => {
      return new Date(b.watchedDate) - new Date(a.watchedDate);
    })
    .slice(0, 4);

  container.innerHTML = latestMovies
    .map((movie) => createMovieCard(movie))
    .join("");
}

/* =========================================
   CREATE MOVIE CARD
========================================= */

function createMovieCard(movie) {
  const cleanTitle = removeYearFromTitle(movie.title);

  const genres = Array.isArray(movie.genre) ? movie.genre.slice(0, 2) : [];

  const genreHTML = genres
    .map((genre) => `<span>${escapeHTML(genre)}</span>`)
    .join("");

  return `

    <article class="movie-card">

      <div class="poster-wrapper">

        <img
          src="${escapeHTML(movie.poster)}"
          alt="${escapeHTML(cleanTitle)} movie poster"
          loading="lazy"
        />

        <div class="rating-badge">
          ⭐ ${escapeHTML(movie.rating)}
        </div>

      </div>


      <div class="movie-info">

        <h3>
          ${escapeHTML(cleanTitle)}
        </h3>


        <div class="movie-meta">

          <span>
            ${escapeHTML(movie.year)}
          </span>

          <span>
            •
          </span>

          <span>
            ${escapeHTML(movie.industry)}
          </span>

        </div>


        <div class="genre-list">

          ${genreHTML}

        </div>


        <a
          href="movie.html?id=${encodeURIComponent(movie.id)}"
          class="review-link"
        >
          Read Review →
        </a>

      </div>

    </article>

  `;
}

/* =========================================
   TOP RATED MOVIES
========================================= */

function renderTopRatedMovies(movies) {
  const container = document.getElementById("topRatedMovies");

  if (!container) {
    return;
  }

  /*
    Sort by rating from highest to lowest.
  */

  const topMovies = [...movies]
    .sort((a, b) => {
      return Number(b.rating) - Number(a.rating);
    })
    .slice(0, 10);

  container.innerHTML = topMovies
    .map((movie, index) => createRankingItem(movie, index + 1))
    .join("");
}

/* =========================================
   CREATE TOP RATED ITEM
========================================= */

function createRankingItem(movie, rank) {
  const cleanTitle = removeYearFromTitle(movie.title);

  return `

    <div class="ranking-item">

      <span class="rank-number">
        ${String(rank).padStart(2, "0")}
      </span>


      <img
        src="${escapeHTML(movie.poster)}"
        alt="${escapeHTML(cleanTitle)}"
        loading="lazy"
      />


      <div class="ranking-info">

        <h3>
          ${escapeHTML(cleanTitle)}
        </h3>

        <p>
          ${escapeHTML(movie.industry)}
          •
          ${escapeHTML(movie.year)}
        </p>

      </div>


      <div class="ranking-rating">

        <span>
          ⭐
        </span>

        <strong>
          ${escapeHTML(movie.rating)}
        </strong>

        <small>
          / 10
        </small>

      </div>

    </div>

  `;
}

/* =========================================
   REMOVE YEAR FROM TITLE
========================================= */

function removeYearFromTitle(title) {
  if (!title) {
    return "";
  }

  return title.replace(/\s*\(\d{4}\)\s*$/, "");
}

/* =========================================
   ESCAPE HTML
========================================= */

function escapeHTML(value) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
