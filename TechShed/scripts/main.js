(() => {
  window.addEventListener("load", () => {
    setTimeout(() => {
      document.querySelector(".loading").classList.add("completed");
    }, 500);
  });
})();