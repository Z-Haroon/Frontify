// Loading Screen Remover After Load Full JavaScript
let loadingCompleted = () => {
  const loadingScreenEl = document.querySelector(".loading");
  setTimeout(() => {
    loadingScreenEl.classList.add("completed");
  }, 500);
};

// Upper Header Remover When We Scroll
let upperHeaderRemover = () => {
  let upperHeaderEl = document.querySelector(".upperHeader-container");
  if(window.scrollY > 50) {
    upperHeaderEl.classList.add("scroll");
  } else {
    upperHeaderEl.classList.remove("scroll")
  }
};

// Upper Header Links Generator
let upperHeaderArr = [
  {linkName: "Home", linkLocation: "index.html"},
  {linkName: "About us", linkLocation: "#"},
  {linkName: "Contact us", linkLocation: "#"},
  {linkName: "Help & Support", linkLocation: "#"},
  {linkName: "Call us +9231234567", linkLocation: "tel: +9231234567"}
];

// Rendering Upper Header Links
let renderUpperHeaderLinks = () => {
  let containerEl = document.querySelector(".upperHeader-link--list");
  upperHeaderArr.forEach(curLink => {
  let createListItemEl = document.createElement("li");
  createListItemEl.innerHTML = `<a href="${curLink.linkLocation}">${curLink.linkName}</a>`;
  containerEl.append(createListItemEl);
  });
};

// Header Bottom Categories Container
let headerCategoriesArr = [
  {categoryName: "Shop All", categoryLink: "#"},
  {categoryName: "Computers", categoryLink: "#"},
  {categoryName: "Tablets", categoryLink: "#"},
  {categoryName: "Drones & Cameras", categoryLink: "#"},
  {categoryName: "Audio", categoryLink: "#"},
  {categoryName: "Mobile", categoryLink: "#"},
  {categoryName: "TV & Home Cinemas", categoryLink: "#"},
  {categoryName: "Wearable", categoryLink: "#"},
  {categoryName: "Sale", categoryLink: "#"},
];

// Rendering Header Categories
let renderHeaderCategories = () => {
  const containerEl = document.querySelector(".category-list");
  headerCategoriesArr.forEach(curCategory => {
    let createListItemEl = document.createElement("li");
    createListItemEl.innerHTML = `<span><a href="${curCategory.categoryLink}">${curCategory.categoryName}</a></span>`;
    containerEl.append(createListItemEl);
  });
};

// Sliding Products Handler
const slidingProductsHandler = (products, startsWith, endsWith, appendCountainerEl, TemplateEl, rightArrowEl, leftArrowEl) => {
  let renderProducts = products.slice(startsWith, endsWith);
  let containerEl = document.querySelector(`.${appendCountainerEl}`);
  let productTemplateEl = document.getElementById(TemplateEl);
  renderProducts.forEach(curProd => {
    let productTemplate = document.importNode(productTemplateEl.content, true);
    const {id, image, name, sellOut, shortDescription, longDescription, category, actualPrice, DiscountPrice, numberOfRating} = curProd;
    productTemplate.querySelector(".product-card").setAttribute("id", `productNo${id}`);
    productTemplate.querySelector(".product-img").src = image;
    productTemplate.querySelector(".product-img").alt = name;
    productTemplate.querySelector(".product-title").textContent = name;
    let ratingContainerEl = productTemplate.querySelector(".rating-container");
    for(let i = 0; i < numberOfRating; i++) {
      let createRatingStar = document.createElement("i");
      createRatingStar.classList.add("fa-solid");
      createRatingStar.classList.add("fa-star");
      ratingContainerEl.append(createRatingStar);
    };
    productTemplate.querySelector(".ratingCount").textContent = `(${sellOut})`;
    productTemplate.querySelector(".actualPrice").textContent = `Rs.${actualPrice}`;
    productTemplate.querySelector(".discountedPrice").textContent = `Rs.${DiscountPrice}`;
    productTemplate.querySelector(".discountPercentage").textContent = `${Math.round(((actualPrice - DiscountPrice) / actualPrice) * 100)}% OFF`;
    let quanitityEl = productTemplate.getElementById("cartQuantity");
    quanitityEl.addEventListener("input", () => {
      if(!isNaN(parseInt(sellOut))) {
        if(quanitityEl.value > parseInt(sellOut)) {
          quanitityEl.value = sellOut;
        } else if (quanitityEl.value < 1) {
          quanitityEl.value = 1;
        }
      }
    });
    containerEl.append(productTemplate);
  });

  // Slider
  let rederedProductsEl = document.querySelectorAll(".product-card");
  let productsOnScreen = 5;
  let slideCount = 0;
  rederedProductsEl.forEach((curProd, index) => {
    curProd.style.left = `${index * 20}%`
  });

  // Next Slide Mover 
  let nextSlide = () => {
    if (slideCount < rederedProductsEl.length - productsOnScreen) {
      slideCount++;
    } else {
      slideCount = 0;
    }
    rederedProductsEl.forEach((curEl) => {
      curEl.style.transform = `translateX(-${slideCount * 100}%)`;
    });
  }
  // Previous Slide
  let prevSlide = () => {
    if (slideCount > 0) {
      slideCount--;
    } else {
      slideCount = rederedProductsEl.length - productsOnScreen;
    }
    rederedProductsEl.forEach((curEl) => {
      curEl.style.transform = `translateX(-${slideCount * 105}%)`;
    });
  }
  let rightArrowBtnEl = document.querySelector(`.${rightArrowEl}`);
  let leftArrowBtnEl = document.querySelector(`.${leftArrowEl}`);
  rightArrowBtnEl.addEventListener("click", nextSlide);
  leftArrowBtnEl.addEventListener("click", prevSlide);
};


(() => {

  fetch("./assets/api/products.json").then(resp => {
    if(!resp.ok) {
      throw new Error("The Api File Was Removed Or Replaced Please Check Before Try Again");
    }
    return resp.json();
  }).then(products => {
    slidingProductsHandler(products, 0, 30, "best-selling--sliding", "product-card--template", "best-right--btn", "best-left--btn");
  }).catch(error => {
    console.warn(error)
  });

  renderUpperHeaderLinks();
  renderHeaderCategories();
  window.addEventListener("load", loadingCompleted);
  window.addEventListener("scroll", upperHeaderRemover);

})();
