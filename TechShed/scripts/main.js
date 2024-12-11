// Remove Loading Screen After JavaScript Load
const hideLoadingScreen = () => {
  let bodyEl = document.body;
  let loadingScreenEl = document.querySelector(".loading");
  loadingScreenEl.classList.add("completed");
  bodyEl.classList.remove("during-loading");
};

// Remove Upper Header & Category section while scrolling
const hideUpperHeader = () => {
  let hideElem = (elem, size) => {
    let myElem = document.querySelector(`.${elem}`);
    if(window.scrollY > size) {
      myElem.classList.add("active");
    } else {
      myElem.classList.remove("active");
    }
  };
  hideElem("upper-header", 60); // Hide Upper Header
  hideElem("header-category--container", 120); // Hide Header Categories
}

// Render Product
const renderProduct = (appendContainer, id, image, name, sellOut, shortDescription, longDescription, category, actualPrice, DiscountPrice, numberOfRating) => {
  let containerEl = document.querySelector(`.${appendContainer}`);
  let productTemplateEl = document.getElementById("product-template");
  let productTemplate = document.importNode(productTemplateEl.content, true);
  let shortName = name;
  if(name.length > 50) { // Fixing Long Name Issues
    shortName = name.slice(0, 50) + "..."; 
  }
  let formatedActualPrice = new Intl.NumberFormat('en-US').format(actualPrice); // Converting 1,000 to 1,000
  let formatedDiscountPrice = new Intl.NumberFormat('en-US').format(DiscountPrice); // Converting 1,000 to 1,000
  productTemplate.querySelector(".product-card").setAttribute("id", `prodId${id}`);
  productTemplate.querySelector(".product-img").src = image;
  productTemplate.querySelector(".product-img").alt = name;
  productTemplate.querySelector(".product-title").textContent = shortName;
  let ratingContainerEl = productTemplate.querySelector(".ratings");
  for(let i = 0; i < numberOfRating; i++) {
    let createStar = document.createElement("i");
    createStar.classList.add("fa");
    createStar.classList.add("fa-star");
    ratingContainerEl.append(createStar);
  }
  productTemplate.querySelector(".numberOfRating").textContent = numberOfRating;
  productTemplate.querySelector(".numberOfStock").textContent = `( ${sellOut} )`;
  productTemplate.querySelector(".actualPrice").textContent = `Rs. ${formatedActualPrice}`;
  productTemplate.querySelector(".discountedPrice").textContent = `Rs. ${formatedDiscountPrice}`;
  productTemplate.querySelector(".discountPercentage").textContent = `${Math.round(((actualPrice - DiscountPrice) * 100) / actualPrice)}% OFF`;
  let quantityEl = productTemplate.querySelector(".quantity-input");
  quantityEl.addEventListener("input", () => { // Quantity Toggler Not go above the stock
    if(quantityEl.value < 1) {
      quantityEl.value = 1;
    } else if (quantityEl.value > sellOut) {
      quantityEl.value = sellOut;
    }
  });
  containerEl.append(productTemplate);
};

// Sliding Products Section
const productsSlider = (products, appendContainer, startWith, endsWith, leftArrow, rightArrow) => {
  let numberOfRenderProducts = products.slice(startWith, endsWith);
  numberOfRenderProducts.forEach(curProd => {
    const {id, image, name, sellOut, shortDiscription, longDescription, category, actualPrice, DiscountPrice, numberOfRating} = curProd;
    renderProduct(appendContainer, id, image, name, sellOut, shortDiscription, longDescription, category, actualPrice, DiscountPrice, numberOfRating);
  });
  let containerEl = document.querySelector(`.${appendContainer}`);
  let numberOfProducts = containerEl.querySelectorAll(".product-card");
  let Productposition = 0;
  numberOfProducts.forEach(curProd => {
    curProd.style.position = "absolute";
    curProd.style.transform = `translateX(${Productposition * 105}%)`;
    Productposition++;
  });

  // Slider Start Here
  let slidingContainerEl = document.querySelector(".best-selling--container");
  // Next Slide
  let numberOfSlide = 1;
  const nextSlide = () => {
    if(numberOfSlide <= numberOfProducts.length - 14) {
      numberOfSlide++;
    } else {
      numberOfSlide = 0;
    }
    slidingContainerEl.style.transform = `translateX(-${numberOfSlide * 34}%)`
  };
  const prevSlide = () => {
    if(numberOfSlide > 1) {
      numberOfSlide--;
    } else {
      numberOfSlide = numberOfProducts.length - 13;
    }
    slidingContainerEl.style.transform = `translateX(-${numberOfSlide * 34}%)`
  };
  let leftBtnEl = document.querySelector(`.${leftArrow}`);
  let rightBtnEl = document.querySelector(`.${rightArrow}`);
  rightBtnEl.addEventListener("click", nextSlide);
  leftBtnEl.addEventListener("click", prevSlide)
};

(() => {
  fetch("./assets/api/products.json").then(response => {
    if(!response.ok) {
      throw new Error("The Api File Was Removed Or Moved Check Then Try Again");
    }
    return response.json();
  }).then(products => {
    productsSlider(products, "best-selling--container", 0, 30, "best-left--arrow", "best-right--arrow")
  }).catch(error => {
    console.error(error);
  })
  window.addEventListener("scroll", hideUpperHeader);
  window.addEventListener("load", hideLoadingScreen);
})();