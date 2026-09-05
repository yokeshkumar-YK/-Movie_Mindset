/* =========================================================
   MOVIE MINDSET
   Search Functionality
========================================================= */

const movieSearch = document.getElementById("movieSearch");

if (movieSearch) {
  movieSearch.addEventListener("input", function () {
    const searchText = this.value.trim().toLowerCase();

    filteredMovies = allMovies.filter((movie) => {
      return movie.title.toLowerCase().includes(searchText);
    });

    renderMovies();
  });
}
