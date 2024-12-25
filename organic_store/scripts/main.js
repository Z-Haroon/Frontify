// Import Function From another files
import { renderCategories } from "./categories.js";
import { footerManager } from "./footer.js";
import { headerManager } from "./headerManager.js";
import { renderBlogs } from "./renderBlogs.js";
import { renderProducts } from "./renderProducts.js";
import { subscribeForm } from "./subscribeForm.js";

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

// Render Tage Section
const renderTags = (products) => {
  // Refrence 
  let tagContainerEl = document.querySelector(".tags-container");
  let renderTheseTags = products.slice(0, 20);
  renderTheseTags.forEach(currentTag => {
    let createParagraphEl = document.createElement("p")
    createParagraphEl.classList.add("tag");
    createParagraphEl.innerText = currentTag.name;
    tagContainerEl.appendChild(createParagraphEl);
  });
};
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
    renderTags(products);
    renderProducts(products, ".selling-products--container", 0, 10, "#selling-all--btn");
    renderProducts(products, ".new-products--container", 10, 15, "#newArrival-all--btn");
    renderProducts(products, ".foryou-products--container", 0, 20, "#loadMoreBtn");
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
  });
  subscribeForm();
  // Fetch Blogs 
  fetch("./assets/api/blogs.json").then(response => {
    if(!response.ok) {
      throw new Error ("Please Check Your Api File");
    }
    return response.json();
  }).then(blogs => {
    renderBlogs(blogs, ".blogs-container", 0, 3);
  }).catch(error => {
    console.warn(error);
  });
  footerManager();
})();