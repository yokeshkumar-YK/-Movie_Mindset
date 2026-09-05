/* =========================================================
   MOVIE MINDSET
   Reviews Page
========================================================= */

let allReviews = [];
let displayedReviews = [];

const reviewsList = document.getElementById("reviewsList");

const reviewSearch = document.getElementById("reviewSearch");

const reviewSort = document.getElementById("reviewSort");

const reviewNoResults = document.getElementById("reviewNoResults");

/* =========================================================
   LOAD REVIEWS
========================================================= */

async function loadReviews() {
  try {
    const response = await fetch("data/movies.json");

    if (!response.ok) {
      throw new Error("Unable to load movies.json");
    }

    allReviews = await response.json();

    displayedReviews = [...allReviews];

    sortReviews();
  } catch (error) {
    console.error("Reviews loading error:", error);

    reviewsList.innerHTML = `

            <div class="loading-error">

                <h2>
                    Unable to Load Reviews
                </h2>

                <p>
                    Please make sure you are running
                    the website using Live Server.
                </p>

            </div>

        `;
  }
}

/* =========================================================
   RENDER REVIEWS
========================================================= */

function renderReviews() {
  reviewsList.innerHTML = "";

  if (displayedReviews.length === 0) {
    reviewNoResults.hidden = false;

    return;
  }

  reviewNoResults.hidden = true;

  displayedReviews.forEach((movie) => {
    const card = document.createElement("article");

    card.className = "review-card";

    /*
     * Take first paragraph as preview
     */

    const reviewPreview = movie.review[0] || "";

    card.innerHTML = `

            <div class="review-card-poster">

                <img
                    src="${movie.poster}"
                    alt="${movie.title} poster"
                    loading="lazy"
                >

            </div>


            <div class="review-card-content">

                <div class="review-card-top">

                    <div>

                        <span class="section-label">
                            ${movie.industry}
                        </span>

                        <h2>
                            ${movie.title}
                        </h2>

                    </div>


                    <div class="review-card-rating">

                        ⭐

                        <strong>
                            ${movie.rating}
                        </strong>

                        <span>
                            /10
                        </span>

                    </div>

                </div>


                <div class="review-card-meta">

                    <span>
                        ${movie.year}
                    </span>

                    <span>•</span>

                    <span>
                        ${movie.language}
                    </span>

                    <span>•</span>

                    <span>
                        ${movie.genre.join(", ")}
                    </span>

                </div>


                <p class="review-preview">

                    ${reviewPreview}

                </p>


                <div class="review-card-bottom">

                    <span class="watched-date">

                        Watched
                        ${formatReviewDate(movie.watchedDate)}

                    </span>


                    <a
                        href="movie.html?id=${movie.id}"
                        class="review-link"
                    >
                        Read Full Review →
                    </a>

                </div>

            </div>

        `;

    reviewsList.appendChild(card);
  });
}

/* =========================================================
   SEARCH
========================================================= */

if (reviewSearch) {
  reviewSearch.addEventListener("input", function () {
    const search = this.value.trim().toLowerCase();

    displayedReviews = allReviews.filter((movie) => {
      return (
        movie.title.toLowerCase().includes(search) ||
        movie.industry.toLowerCase().includes(search) ||
        movie.genre.join(" ").toLowerCase().includes(search)
      );
    });

    sortReviews();
  });
}

/* =========================================================
   SORT
========================================================= */

if (reviewSort) {
  reviewSort.addEventListener("change", sortReviews);
}

function sortReviews() {
  if (!reviewSort) {
    renderReviews();

    return;
  }

  const sortType = reviewSort.value;

  switch (sortType) {
    case "rating-high":
      displayedReviews.sort((a, b) => b.rating - a.rating);

      break;

    case "rating-low":
      displayedReviews.sort((a, b) => a.rating - b.rating);

      break;

    case "recent":
      displayedReviews.sort(
        (a, b) => new Date(b.watchedDate) - new Date(a.watchedDate),
      );

      break;

    case "name":
      displayedReviews.sort((a, b) => a.title.localeCompare(b.title));

      break;
  }

  renderReviews();
}

/* =========================================================
   DATE FORMAT
========================================================= */

function formatReviewDate(date) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/* =========================================================
   START
========================================================= */

loadReviews();
