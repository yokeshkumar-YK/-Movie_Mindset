/* =========================================================
   MOVIE MINDSET
   Common Website JavaScript
========================================================= */

/* =========================================================
   CURRENT YEAR
========================================================= */

const currentYear = new Date().getFullYear();

document.querySelectorAll(".footer-bottom").forEach((footer) => {
  footer.innerHTML = footer.innerHTML.replace(/©\s*\d{4}/, `© ${currentYear}`);
});

/* =========================================================
   IMAGE ERROR HANDLING
========================================================= */

document.querySelectorAll("img").forEach((image) => {
  image.addEventListener("error", function () {
    this.style.display = "none";
  });
});

/* =========================================================
   SMOOTH SCROLL
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (event) {
    const targetId = this.getAttribute("href");

    if (targetId === "#" || !targetId) {
      return;
    }

    const target = document.querySelector(targetId);

    if (target) {
      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll(".nav-link").forEach((link) => {
  const linkPage = link.getAttribute("href").split("/").pop();

  if (linkPage === currentPage) {
    link.classList.add("active");
  }
});
