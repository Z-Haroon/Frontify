// Page Loader Function
const pageLoadSucess = () => {
  const loadingScreenEl = document.querySelector(".loading");
  setTimeout(() => {
    loadingScreenEl.classList.add("active");
  }, 500);
};


(() => {

  
  window.addEventListener("load", pageLoadSucess);
})();