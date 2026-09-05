/* =========================================================
   MOVIE MINDSET
   Movie Details Page
========================================================= */

/* =========================================================
   ELEMENTS
========================================================= */

const movieDetails = document.getElementById("movieDetails");

const movieError = document.getElementById("movieError");

const relatedMovies = document.getElementById("relatedMovies");

/* =========================================================
   GET MOVIE ID FROM URL
========================================================= */

const urlParams = new URLSearchParams(window.location.search);

const movieId = urlParams.get("id");

/* =========================================================
   LOAD MOVIE DATA
========================================================= */

async function loadMovieDetails() {
  try {
    /* Check whether movie ID exists */

    if (!movieId) {
      showMovieError();

      return;
    }

    /* Load JSON */

    const response = await fetch("data/movies.json");

    if (!response.ok) {
      throw new Error("Unable to load movies.json");
    }

    const movies = await response.json();

    /* Find requested movie */

    const movie = movies.find((item) => item.id === movieId);

    /* Movie doesn't exist */

    if (!movie) {
      showMovieError();

      return;
    }

    /* Display movie */

    displayMovie(movie);

    /* Display related movies */

    displayRelatedMovies(movies, movie.id);
  } catch (error) {
    console.error("Movie details error:", error);

    showMovieError();
  }
}

/* =========================================================
   DISPLAY MOVIE
========================================================= */

function displayMovie(movie) {
  /* Update browser title */

  document.title = `${movie.title} | Movie Mindset`;

  /* Generate genres */

  const genres = movie.genre.map((genre) => `<span>${genre}</span>`).join("");

  /* Generate review paragraphs */

  const reviewParagraphs = movie.review
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join("");

  /* Rating label */

  const ratingLabel = getRatingLabel(movie.rating);

  /* Insert content */

  movieDetails.innerHTML = `

        <!-- =============================================
             MOVIE HERO
        ============================================== -->

        <div class="movie-detail-hero">


            <!-- POSTER -->

            <div class="movie-detail-poster">

                <img
                    src="${movie.poster}"
                    alt="${movie.title} movie poster"
                >

            </div>


            <!-- MOVIE INFORMATION -->

            <div class="movie-detail-info">

                <span class="section-label">
                    ${movie.industry}
                </span>


                <h1>
                    ${movie.title}
                </h1>


                <div class="movie-detail-meta">

                    <span>
                        ${movie.year}
                    </span>

                    <span>•</span>

                    <span>
                        ${movie.language}
                    </span>

                    <span>•</span>

                    <span>
                        ${movie.industry}
                    </span>

                </div>


                <!-- GENRES -->

                <div class="detail-genres">

                    ${genres}

                </div>


                <!-- RATING -->

                <div class="my-rating">

                    <div class="rating-number">

                        <span>
                            ⭐
                        </span>

                        <strong>
                            ${movie.rating}
                        </strong>

                        <small>
                            / 10
                        </small>

                    </div>


                    <div class="rating-description">

                        <strong>
                            My Rating
                        </strong>

                        <span>
                            ${ratingLabel}
                        </span>

                    </div>

                </div>


                <!-- WATCHED DATE -->

                <div class="watched-info">

                    <span>
                        Watched on
                    </span>

                    <strong>
                        ${formatDate(movie.watchedDate)}
                    </strong>

                </div>

            </div>

        </div>



        <!-- =============================================
             REVIEW
        ============================================== -->

        <div class="full-review">

            <div class="review-heading">

                <span class="section-label">
                    MY REVIEW
                </span>

                <h2>
                    What I Thought About This Movie
                </h2>

            </div>


            <div class="review-content">

                ${reviewParagraphs}

            </div>


            <!-- VERDICT -->

            <div class="review-verdict">

                <div>

                    <span class="section-label">
                        MY VERDICT
                    </span>

                    <h3>
                        ${ratingLabel}
                    </h3>

                </div>


                <div class="verdict-rating">

                    <span>
                        ⭐
                    </span>

                    <strong>
                        ${movie.rating}
                    </strong>

                    <small>
                        / 10
                    </small>

                </div>

            </div>

        </div>

    `;
}

/* =========================================================
   RATING LABEL
========================================================= */

function getRatingLabel(rating) {
  if (rating >= 9.5) {
    return "Masterpiece";
  }

  if (rating >= 9) {
    return "Excellent";
  }

  if (rating >= 8) {
    return "Very Good";
  }

  if (rating >= 7) {
    return "Good";
  }

  if (rating >= 6) {
    return "Average";
  }

  if (rating >= 5) {
    return "Below Average";
  }

  return "Poor";
}

/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(dateString) {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/* =========================================================
   RELATED MOVIES
========================================================= */

function displayRelatedMovies(movies, currentMovieId) {
  if (!relatedMovies) {
    return;
  }

  /* Remove current movie */

  const otherMovies = movies.filter((movie) => movie.id !== currentMovieId);

  /* Sort by rating */

  otherMovies.sort((a, b) => b.rating - a.rating);

  /* Display maximum 4 */

  const selectedMovies = otherMovies.slice(0, 4);

  relatedMovies.innerHTML = selectedMovies
    .map((movie) => {
      return `

                    <article class="movie-card">

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

                    </article>

                `;
    })
    .join("");
}

/* =========================================================
   SHOW ERROR
========================================================= */

function showMovieError() {
  if (movieDetails) {
    movieDetails.innerHTML = "";
  }

  if (movieError) {
    movieError.hidden = false;
  }
}

/* =========================================================
   START
========================================================= */

loadMovieDetails();
