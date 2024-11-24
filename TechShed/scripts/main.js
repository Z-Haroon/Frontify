// upper Header Links
let upperHeaderLinks = [
  { linkName: "Home", linkPath: "#" },
  { linkName: "About us", linkPath: "#" },
  { linkName: "Contact us", linkPath: "#" },
  { linkName: "Help & Support", linkPath: "#" },
  { linkName: "Call us +923123456789", linkPath: "tel: +923123456789" },
];
// Header Categories
let headerCategories = [
  { CategoryName: "Shop All", categoryId: "shopAllCategory", linkPath: "#" },
  { CategoryName: "Computers", categoryId: "computersCategory", linkPath: "#" },
  { CategoryName: "Tablets", categoryId: "tabletsCategory", linkPath: "#" },
  { CategoryName: "Drones & Cameras", categoryId: "dronesCamerasCategory", linkPath: "#" },
  { CategoryName: "Audio", categoryId: "audioCategory", linkPath: "#" },
  { CategoryName: "Mobile", categoryId: "mobileCategory", linkPath: "#" },
  { CategoryName: "TV & Home Cinema", categoryId: "tvHomeCinemaCategory", linkPath: "#" },
  { CategoryName: "Wearable Tech", categoryId: "wearableTechCategory", linkPath: "#" },
  { CategoryName: "Sale", categoryId: "saleCategory", linkPath: "#" },
];



const hasScrolled = () => {
  const upperHeaderEl = document.querySelector(".upper-header");
  if (window.scrollY > 50) {
    upperHeaderEl.classList.add("active");
  } else {
    upperHeaderEl.classList.remove("active");
  }
};

(() => {

  window.addEventListener("load", () => {
    setTimeout(() => {
      document.querySelector(".loading").classList.add("completed");
    }, 500);
  });
  window.addEventListener("scroll", hasScrolled);

  const upperheaderContainerEl = document.querySelector(".upper-header-list");
  upperHeaderLinks.forEach(curLink => {
    let listEl = document.createElement("li");
    listEl.innerHTML = `<a href="${curLink.linkPath}">${curLink.linkName}</a>`;
    upperheaderContainerEl.append(listEl);
  });

  const headerCategoryContainer = document.querySelector(".category-list");
  headerCategories.forEach(curCategory => {
    let listEl = document.createElement("li");
    listEl.setAttribute("id", curCategory.categoryId);
    listEl.innerHTML = `<span class="category"><a href="${curCategory.linkPath}">${curCategory.CategoryName}</a></span>`;
    headerCategoryContainer.append(listEl);
  });

})();