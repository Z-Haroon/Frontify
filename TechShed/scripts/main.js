/* * ********Loading Screen Start Here******** * */
let loadingScreen = () => { 
  let loadingScreenEl = document.querySelector(".loading");
  loadingScreenEl.classList.add("active");
}
/* * ********Loading Screen End Here******** * */
/* * ********Header Manager Start Here******** * */
let headerLinkArr = {
  upperHeaderLinks: [
    {linkName: "Home", linkPath: "index.html"},
    {linkName: "Blogs", linkPath: "./html/blogs.html"},
    {linkName: "About us", linkPath: "./html/about.html"},
    {linkName: "Contact us", linkPath: "./html/contact.html"},
    {linkName: "Call us", linkPath: "tel: +923012345678"},
  ],
  headerCategories: [
    {linkName: "Shop All", linkPath: "#"},
    {linkName: "Computers", linkPath: "#"},
    {linkName: "Tablets", linkPath: "#"},
    {linkName: "Drones & Cameras", linkPath: "#"},
    {linkName: "Audio", linkPath: "#"},
    {linkName: "Mobile", linkPath: "#"},
    {linkName: "T.V & Home Cinemas", linkPath: "#"},
    {linkName: "Wearable Tech", linkPath: "#"},
    {linkName: "Sale", linkPath: "#"},
  ]
}
const headerManager = () => {
  // Hide Upper Header & Category Section During Scrolling
  let scrollBehavior = (elem, sizeOfScroll) => {
    if(elem) {
      if(window.scrollY > sizeOfScroll) {
        elem.classList.add("scroll");
      } else {
        elem.classList.remove("scroll");
      }
    }
  }
  let upperHeaderEl = document.querySelector(".upper-header");
  let headerCategoryEl = document.querySelector(".header-categories--container");
  window.addEventListener("scroll", () => {
    scrollBehavior(upperHeaderEl, 50);
    scrollBehavior(headerCategoryEl, 100);
  });
  // Render Upper Header Links
  let renderLinks = (appCon, linkArr) => {
    let containerEl = document.querySelector(`.${appCon}`);
    linkArr.forEach(curEl => {
      let createListItemEl = document.createElement("li");
      let createHyperLinkEl = document.createElement("a");
      createHyperLinkEl.href = curEl.linkPath;
      createHyperLinkEl.textContent = curEl.linkName;
      createListItemEl.append(createHyperLinkEl);
      containerEl.append(createListItemEl);
    });
  }
  renderLinks("upper-header--nav", headerLinkArr.upperHeaderLinks);
  renderLinks("header-categories--items", headerLinkArr.headerCategories);

};
/* * ********Header Manager End Here******** * */
/* * ********Sliding Products Section Manager Start Here******** * */
// Render Products
let renderProduct = (appendContainer, id, image, name, sellOut, shortDiscription, longDescription, category, actualPrice, discountedPrice, numberOfRating) => {
  let formatNumber = (number) => {
    return new Intl.NumberFormat('en-US').format(number);
  };
  let changedformateActual = formatNumber(actualPrice);
  let changedformateDis = formatNumber(discountedPrice); 
  let fixedLongProductName;
  if(name.length >= 40) {
    fixedLongProductName = name.slice(0, 40) + "..."
  } else {
    fixedLongProductName = name;
  }
  let productTemplateEl = document.getElementById("product-card--template");
  let productTemplate = document.importNode(productTemplateEl.content, true);
  productTemplate.querySelector(".product-card").setAttribute("id", `productId${id}`);
  productTemplate.querySelector(".product-img").src = image;
  productTemplate.querySelector(".product-img").alt = name;
  productTemplate.querySelector(".product-title").textContent = fixedLongProductName;
  productTemplate.querySelector(".realPrice").textContent = `Rs. ${changedformateActual}`;
  productTemplate.querySelector(".discountedPrice").textContent = `Rs. ${changedformateDis}`;
  productTemplate.querySelector(".discountPercentage").textContent = `${Math.round(((actualPrice - discountedPrice) * 100 / actualPrice))}% OFF`;
  let ratingStarContainerEl = productTemplate.querySelector(".ratings");
  for(let i = 0; i < numberOfRating; i++) {
    let createStar = document.createElement("i");
    createStar.classList.add("fa-solid");
    createStar.classList.add("fa-star");
    ratingStarContainerEl.append(createStar);
  }
  productTemplate.querySelector(".ratingCount").textContent = numberOfRating;
  productTemplate.querySelector(".soldOut").innerText = `( ${sellOut} ) `;
  let quantityInputEl = productTemplate.querySelector(".quantityInput");
  quantityInputEl.addEventListener("input", () => {
    if(quantityInputEl.value < 1) {
      quantityInputEl.value = 1;
    } else if (quantityInputEl.value >= sellOut) {
      quantityInputEl.value = sellOut;
    }
  })
  let containerEl = document.querySelector(`.${appendContainer}`);
  containerEl.append(productTemplate);
};
// Create Products Slider
const productSlider = (products, startWith, endWith, appendContainer, leftBtn, rightBtn) => {
  let renderThisProducts = products.slice(startWith, endWith);
  renderThisProducts.forEach(curProd => {
    const {id, image, name, sellOut, shortDescription, longDescription, category, actualPrice, DiscountPrice, numberOfRating} = curProd;
    renderProduct(appendContainer, id, image, name, sellOut, shortDescription, longDescription, category, actualPrice, DiscountPrice, numberOfRating);
  });
  let containerEl = document.querySelector(`.${appendContainer}`)
  let allProductsEl = containerEl.querySelectorAll(".product-card");
  let position = 0;
  allProductsEl.forEach(curProd => {
    curProd.style.position = "absolute";
    curProd.style.left = `${position * 16.7}%`;
    position++;
  });
  let slideCount = 0;
  let productOnPage = 6;
  // Next Slide
  const nextSlide = () => {
    if(slideCount < allProductsEl.length - productOnPage) {
      slideCount++;
    } else {
      slideCount = 0;
    }
    allProductsEl.forEach(curProd => {
      curProd.style.transform = `translateX(-${slideCount * 105}%)`;
    });
  };
  // Prev Slide 
  const prevSlide = () => {
    if(slideCount > 0) {
      slideCount--;
    } else {
      slideCount = allProductsEl.length - productOnPage;
    }
    allProductsEl.forEach(curProd => {
      curProd.style.transform = `translateX(-${slideCount * 105}%)`;
    });
  }
  let leftBtnEl = document.querySelector(`.${leftBtn}`);
  let rightBtnEl = document.querySelector(`.${rightBtn}`);
  rightBtnEl.addEventListener("click", () => {
    nextSlide();
  });
  leftBtnEl.addEventListener("click", () => {
    prevSlide();
  });
};
/* * ********Sliding Products Section Manager End Here******** * */
/* * ********Just For You Products Start Here******** * */
const forYouSection = (products) => {
  let startWith = 0;
  let endsWith = 30;
  let renderProductsOnSection = (startWith, endsWith) => {
    let renderProducts = products.slice(startWith, endsWith);
    renderProducts.forEach(curProd => {
      const {id, image, name, sellOut, shortDescription, longDescription, category, actualPrice, DiscountPrice, numberOfRating} = curProd;
      renderProduct("foryou-products--container", id, image, name, sellOut, shortDescription, longDescription, category, actualPrice, DiscountPrice, numberOfRating)
    });
  }
  const loadMoreProducts = () => {
    startWith += 30;
    endsWith += 30;
  renderProductsOnSection(startWith, endsWith);
  };
  renderProductsOnSection(startWith, endsWith);
  let loadmoreBtn = document.getElementById("foryou-loadmore--btn");
  loadmoreBtn.addEventListener("click", () => {
    if(endsWith < products.length) {
      loadMoreProducts();
    }
    if(endsWith >= products.length) {
      loadmoreBtn.style.display = "none";
    }
  }); 
};
/* * ********Just For You Products End Here******** * */
(() => {
  headerManager();
  window.addEventListener("load", loadingScreen);
  fetch("./assets/api/products.json").then(response => {
    if(!response.ok) {
     throw new Error("Api File Was Removed Or moved Check First Then Try Again"); 
    }
    return response.json();
  }).then(products => {
    productSlider(products, 0, 30, "best-selling--container", "best-left--arrow", "best-right--arrow");
    productSlider(products, 30, 60, "new-arrival--container", "new-arrival--left", "new-arrival--right");
    forYouSection(products);
  }).catch(error => {
    console.warn(error);
  })
})();