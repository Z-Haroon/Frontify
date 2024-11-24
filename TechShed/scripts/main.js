// Upper Header Links
let upperHeaderLinks = [
  { linkName: "Home", linkPath: "#" },
  { linkName: "About us", linkPath: "#" },
  { linkName: "Contact us", linkPath: "#" },
  { linkName: "Help & Support", linkPath: "#" },
  { linkName: "Call us +923123456789", linkPath: "tel:+923123456789" },
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
  // On page load, simulate loading completion
  window.addEventListener("load", () => {
    setTimeout(() => {
      document.querySelector(".loading").classList.add("completed");
    }, 500);
  });

  // Add scroll event listener
  window.addEventListener("scroll", hasScrolled);

  // Render Upper Header Links
  const upperheaderContainerEl = document.querySelector(".upper-header-list");
  if (upperheaderContainerEl) {
    upperHeaderLinks.forEach(curLink => {
      const listEl = document.createElement("li");
      listEl.innerHTML = `<a href="${curLink.linkPath}">${curLink.linkName}</a>`;
      upperheaderContainerEl.append(listEl);
    });
  }

  // Render Header Categories
  const headerCategoryContainer = document.querySelector(".category-list");
  if (headerCategoryContainer) {
    headerCategories.forEach(curCategory => {
      const listEl = document.createElement("li");
      listEl.id = curCategory.categoryId;
      listEl.innerHTML = `<span class="category"><a href="${curCategory.linkPath}">${curCategory.CategoryName}</a></span>`;
      headerCategoryContainer.append(listEl);
    });
  }
})();
