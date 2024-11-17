(() => {

  // References
  const loadingScreenEl = document.querySelector(".loading");
  const headerEl = document.getElementById("header");
  const upperHeaderEl = document.querySelector(".upper-header--container");
  const upperHeaderDividerEl = document.querySelector(".upper-header--divider");

  // Loading Screen Remover
  const loadingCompleted = () => {
    loadingScreenEl.classList.add("completed");
  };

  // Scroll Function
  const hasScrolled = () => {
    let scrollThreshold = 60;
    let isScrolled = window.scrollY > scrollThreshold;

    headerEl.classList.toggle("scroll", isScrolled);
    upperHeaderDividerEl.classList.toggle("scroll", isScrolled);
    upperHeaderEl.classList.toggle("scroll", isScrolled);
  };

  // Window Event Listeners
  window.addEventListener("load", loadingCompleted);
  window.addEventListener("scroll", hasScrolled);

  //  Hero Banner Section
  let slideCount = 0;
  const heroBannersEl = document.querySelectorAll(".hero-banner");
  heroBannersEl.forEach((curBan, index) => {
    curBan.style.left = `${index * 100}%`;
  });

  const nextSlide = () => {
    if (slideCount < heroBannersEl.length - 1) {
      slideCount++;
    } else {
      slideCount = 0;
    }
    heroBannersEl.forEach((curEl) => {
      curEl.style.transform = `translateX(-${slideCount * 100}%)`;
    });
  }

  const prevSlide = () => {
    if (slideCount > 0) {
      slideCount--;
    } else {
      slideCount = heroBannersEl.length - 1;
    }
    heroBannersEl.forEach((curEl) => {
      curEl.style.transform = `translateX(-${slideCount * 100}%)`;
    });
  }

  document.querySelector(".left-arrow").addEventListener("click", nextSlide);
  document.querySelector(".right-arrow").addEventListener("click", prevSlide);

  setInterval(() => {
    nextSlide();
  }, 6000);

// Feature Section DropDown
let featureContainers = document.querySelectorAll(".feature-more--details");

featureContainers.forEach((container) => {
  let headings = container.querySelectorAll(".heading");
  let paragraphs = container.querySelectorAll(".details");

  headings.forEach((heading, index) => {
    heading.addEventListener("click", () => {
      paragraphs[index].classList.toggle("active");
      heading.classList.toggle("active");
    });
  });
});

})();

