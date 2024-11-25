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

//  Best Selling Products Show
const bestSellingProducts = (products) => {
  const containerEl = document.querySelector(".best-selling-items__container");
  const productTemplateEl = document.getElementById("best-selling--template");
  let top30Products = products.slice(0, 30);
  top30Products.forEach((curProd) => {
    const productTemplate = document.importNode(productTemplateEl.content, true);
    const {id, image, name, sellOut, shortDescription, longDiscription, category, actualPrice, DiscountPrice, numberOfRating} = curProd;
    productTemplate.querySelector(".best-selling--item").setAttribute("id", id);
    productTemplate.querySelector(".best-selling-product_image").src = image;
    productTemplate.querySelector(".best-selling-product_image").alt = name;
    productTemplate.querySelector(".title").textContent = name;
    const ratingContainerEl = productTemplate.querySelector(".rating");
    for(let i = 0; i < numberOfRating; i++) {
      let createIcon = document.createElement("i");
      createIcon.classList.add("fas");
      createIcon.classList.add("fa-star");
      ratingContainerEl.append(createIcon);
    };
    productTemplate.querySelector(".discount-price").textContent = `Rs. ${DiscountPrice}`;
    productTemplate.querySelector(".original-price").textContent = `Rs. ${actualPrice}`;
    containerEl.append(productTemplate)
  });

  const productsElem = document.querySelectorAll(".best-selling--item");
  productsElem.forEach((prodElem, index) => {
    prodElem.style.left = `${index * 22}%`;
  });

  let numberOfSlides = 0;
  let productsOnScreen = 4;
  const nextSlide = () => {
    if(numberOfSlides < productsElem.length - productsOnScreen) {
      numberOfSlides++;
    } else {
      numberOfSlides = 0;
    }
    productsElem.forEach(curEl => {
      curEl.style.transform = `translateX(-${numberOfSlides * 103}%)`;
    });
  };

  const prevSlide = () => {
    if (numberOfSlides > 0) {
      numberOfSlides--;
    } else {
      numberOfSlides = productsElem.length - productsOnScreen;
    }
    productsElem.forEach(curEl => {
      curEl.style.transform = `translateX(-${numberOfSlides * 103}%)`;
    });
  };

  const rightButtonEl = document.querySelector(".best-right");
  const leftButtonEl = document.querySelector(".best-left");
  let slideInterval = setInterval(nextSlide, 3000);
  rightButtonEl.addEventListener("click", () => {
    clearInterval(slideInterval);
    nextSlide();
      slideInterval = setInterval(nextSlide, 3000);
  });
  leftButtonEl.addEventListener("click", () => {
    clearInterval(slideInterval);
    prevSlide();
      slideInterval = setInterval(nextSlide, 3000);
  });
};
//  Fetch All Products
const productsFetcher = () => {
  fetch("./assets/api/products.json").then((response) => {
    if(!response.ok) {
      throw new Error("Products File Has Beed Removed or Replaced Please Try Again");
    }
    return response.json();
  }).then((prod) => {
    bestSellingProducts(prod)
  }).catch((error) => {
    console.warn(error);
  })
}; productsFetcher();

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
