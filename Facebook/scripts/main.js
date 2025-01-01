import { headerManager } from "./headerManager.js";

// Remove Loading Screen After Page Render
const loadingComplete = () => {
  // Referece Of Loading Screen Element
  let loadingScreenElement = document.querySelector(".loading");

  // Adding Class For Hide Loading Screen
  loadingScreenElement.classList.add("active")
}

(() => {

  // Event Listner For Calling Loading Screen Hide Function
  window.addEventListener("load", loadingComplete);

  // Calling Header Manager For Maintain Header Functions
  headerManager();
})();