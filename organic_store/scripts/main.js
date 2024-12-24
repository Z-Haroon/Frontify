// Import Function From another files
import { renderCategories } from "./categories.js";
import { headerManager } from "./headerManager.js";

// ? Hide Loading Screen 
const hideLoadingScreen = () => {
  // Avoid Multiple Times Hide
  const hide = (elem) => {
    let element = document.querySelector(elem);
    element.classList.add("completed");
  };
  // Calling Hide function with Element Class As Parameter
  hide(".loading");
  hide("body");
}

// Auto Calling function like main function
(() => {
  // Calling Loading screen hide Function
  window.addEventListener("load", hideLoadingScreen);

  // Fetch Prodocuts
  fetch("./assets/api/products.json").then(response => {
    if(!response.ok) {
      throw new Error("Please Check Your Api File")
    }
    return response.json();
  }).then(products => {
    headerManager(products);
  }).catch(error => {
    console.error(error);
  });

  // Fetch Categories
  fetch("./assets/api/categories.json").then(response => {
    if(!response.ok) {
      throw new Error("Please Check Your Api File");
    }
    return response.json();
  }).then(categories => {
    renderCategories(categories);
  }).catch(error => {
    console.warn(error);
  })
})();