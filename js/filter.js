/* =========================================================
   MOVIE MINDSET
   Industry Filter
========================================================= */

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach((button) => {
  button.addEventListener("click", function () {
    /* Remove active class */

    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    /* Add active class */

    this.classList.add("active");

    const selectedIndustry = this.dataset.industry;

    /* Get search text */

    const searchText =
      document.getElementById("movieSearch")?.value.trim().toLowerCase() || "";

    /* Filter movies */

    filteredMovies = allMovies.filter((movie) => {
      const matchesIndustry =
        selectedIndustry === "All" || movie.industry === selectedIndustry;

      const matchesSearch = movie.title.toLowerCase().includes(searchText);

      return matchesIndustry && matchesSearch;
    });

    renderMovies();
  });
});
