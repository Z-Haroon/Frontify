(() => {

  const loadingScreenEl = document.querySelector(".loading");
  const headerEl = document.getElementById("header");
  const upperHeaderEl = document.querySelector(".upper-header--container");
  const upperHeaderDividerEl = document.querySelector(".upper-header--divider");

  const loadingCompleted = () => {
    loadingScreenEl.classList.add("completed");
  };

  const hasScrolled = () => {
    let scrollThreshold = 60;
    let isScrolled = window.scrollY > scrollThreshold;

    headerEl.classList.toggle("scroll", isScrolled);
    upperHeaderDividerEl.classList.toggle("scroll", isScrolled);
    upperHeaderEl.classList.toggle("scroll", isScrolled);
  };

  window.addEventListener("load", loadingCompleted);
  window.addEventListener("scroll", hasScrolled);
})();

