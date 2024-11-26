//  Remove Loading Screen After Load JavaScript
let loadingComplete = () => {
  const loadingScreenEl = document.querySelector(".loading");
  loadingScreenEl.classList.add("completed");
};

//  Remove Loading Screen After Load JavaScript
let hasScrolled = () => {
  let hideHeaderEl = document.querySelector(".upper-header");
  if(window.scrollY > 50) {
    hideHeaderEl.classList.add("active");
  } else {
    hideHeaderEl.classList.remove("active");
  }
};

// Upper Header Links
const upperHeaderLinks = [
  { linkName: "Home", linkPath: "#" },
  { linkName: "About us", linkPath: "#" },
  { linkName: "Contact us", linkPath: "#" },
  { linkName: "Help & Support", linkPath: "#" },
  { linkName: "Call us +923123456789", linkPath: "tel:+923123456789" }
];

// Render Upper Header Links
let renderUpperHeaderLinks = () => {
  let containerEl = document.querySelector(".upper-header-list");
  upperHeaderLinks.forEach(curLink => {
    let createListItem = document.createElement("li");
    createListItem.innerHTML = `<a href="${curLink.linkPath}">${curLink.linkName}</a>`;
    containerEl.append(createListItem);
  });
};

// Header Categories
const headerCategories = [
  { CategoryName: "Shop All", categoryId: "shopAllCategory", linkPath: "#" },
  { CategoryName: "Computers", categoryId: "computersCategory", linkPath: "#" },
  { CategoryName: "Tablets", categoryId: "tabletsCategory", linkPath: "#" },
  { CategoryName: "Drones & Cameras", categoryId: "dronesCamerasCategory", linkPath: "#" },
  { CategoryName: "Audio", categoryId: "audioCategory", linkPath: "#" },
  { CategoryName: "Mobile", categoryId: "mobileCategory", linkPath: "#" },
  { CategoryName: "TV & Home Cinema", categoryId: "tvHomeCinemaCategory", linkPath: "#" },
  { CategoryName: "Wearable Tech", categoryId: "wearableTechCategory", linkPath: "#" },
  { CategoryName: "Sale", categoryId: "saleCategory", linkPath: "#" }
];

// Render Bottom Header Categories
let renderBottomHeaderCategories = () => {
  let containerEl = document.querySelector(".category-list");
  headerCategories.forEach(curLink => {
    let createListItem = document.createElement("li");
    createListItem.innerHTML = `<span class="category"><a href="${curLink.linkPath}">${curLink.CategoryName}</a></span>`;
    containerEl.append(createListItem);
  });
};
// Render Sliding Products
const renderSliderProducts = (products, startWith, endsWith, templateEl, appendContainerEl, leftArrowBtn, rightArrowBtn) => {

  
};

(() => {
  window.addEventListener("load", () => {
    setTimeout(() => loadingComplete(), 500);
  });
  window.addEventListener("scroll", hasScrolled);

  fetch("./assets/api/products.json").then(response => {
    if(!response.ok) {
      throw new Error("The Api Files Was Deleted Or Moved Please Check & Then Reload The Page");
    }
    return response.json();
  }).then(products => {
    renderSliderProducts(products,0, 30, "best-selling--template", "best-selling-items__container", "best-left", "best-right");
  }).catch(error => {
    console.error(error);
  });

  renderUpperHeaderLinks();
  renderBottomHeaderCategories();
})();
