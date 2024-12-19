// ? Remove Loading Screen After Load JavaScript
const hideLoadingScreen = () => {
  const hide = (elem) => {
    if(elem) {
      elem.classList.add("completed");
    } else return;
  }
  let bodyEl = document.querySelector("body");
  let loadingScreenEl = document.querySelector(".loading")
  hide(bodyEl);
  hide(loadingScreenEl);
};

// ? Remove Loading Screen After Load JavaScript
const hideHeaderOnScroll = () => {
  const hide = (elem, scrollLimit) => {
    if(!elem && scrollLimit) return;
    if(window.scrollY > scrollLimit) {
      elem.classList.add("active");
    } else {
      elem.classList.remove("active");
    }
  }
  let upperHeaderEl = document.querySelector(".upper-header");
  let headerCategoriesEl = document.querySelector(".header-category--container")
  hide(upperHeaderEl, 30);
  hide(headerCategoriesEl, 80);
};

// ? Render Product & Append
const renderProdct = (appendContainer, id, image, name, sellOut, shortDescription, longDescription, category, actualPrice, DiscountPrice, numberOfRating) => {
  let appendContainerEl = document.querySelector(`.${appendContainer}`);
  let productTemplateEl = document.getElementById("product-template");
  let shortTitle = name;
  if(shortTitle.length > 35) {
    shortTitle = name.slice(0, 35) + "..."
  }
  let formatedOrginalPrice = new Intl.NumberFormat("en-US").format(actualPrice);
  let formatedDiscountPrice = new Intl.NumberFormat("en-US").format(DiscountPrice);
  let productTemplate = document.importNode(productTemplateEl.content, true);
  productTemplate.querySelector(".product-card").setAttribute("id", `productNo${id}`);
  productTemplate.querySelector(".product-img").src = image;
  productTemplate.querySelector(".product-img").alt = name;
  productTemplate.querySelector(".product-title").textContent = shortTitle;
  let ratingStarContainerEl = productTemplate.querySelector(".stars");
  for (let i = 0; i < numberOfRating; i++) {
    let createStart = document.createElement("i");
    createStart.classList.add("fa");
    createStart.classList.add("fa-star");
    ratingStarContainerEl.append(createStart);
  };
  productTemplate.querySelector(".ratingCount").textContent = numberOfRating;
  productTemplate.querySelector(".sellOut").innerText = `( ${sellOut} )`;
  productTemplate.querySelector(".originalPrice").textContent = `Rs.${formatedOrginalPrice}`;
  productTemplate.querySelector(".discountPrice").textContent = `Rs.${formatedDiscountPrice}`;
  productTemplate.querySelector(".discountPercentage").innerText = `${Math.round(((actualPrice - DiscountPrice) * 100) / actualPrice)}% OFF`;
  let quantityInputEl = productTemplate.querySelector(".quantityCount");
  quantityInputEl.addEventListener("input", () => {
    if(quantityInputEl.value < 1) {
      quantityInputEl.value = 1;
    } else if(quantityInputEl.value > sellOut) {
      quantityInputEl.value = sellOut;
    }
  });
  let wishlistBtn = productTemplate.querySelector(".wishlist-container");
  wishlistBtn.addEventListener("click", () => {
    wishlistBtn.classList.toggle("active");
  });
  appendContainerEl.append(productTemplate);
};

let renderShortProducts = (products, appendContainer, startWith, endsWith, loadMoreBtn) => {
  let loadProducts = () => {
    let numberOfProductsForRender = products.slice(startWith, endsWith);
    numberOfProductsForRender.forEach(curProd => {
      const {id, image, name, sellOut, shortDescription, longDescription, category, actualPrice, DiscountPrice, numberOfRating} = curProd;
      renderProdct(appendContainer, id, image, name, sellOut, shortDescription, longDescription, category, actualPrice, DiscountPrice, numberOfRating);
    });
  }; loadProducts();
  let loadMoreBtnEl = document.querySelector(`#${loadMoreBtn}`);
  if(endsWith > products.length) {
    loadMoreBtnEl.style.display = "none";
  }
  loadMoreBtnEl.addEventListener("click", () => {
    if(endsWith > products.length) {
      loadMoreBtnEl.style.display = "none";
    } else {
      startWith += 6;
      endsWith +=6;
      loadProducts();
    }
  });
};

// Render Cateogry Section
const renderCategory = (categories) => {
  let categoryContainerEl = document.querySelector(".page--category-container");
  let templateEl = document.getElementById("category-template");
  categories.forEach(curCat => {
    let template = document.importNode(templateEl.content, true);
    const {id, image, name} = curCat;
    template.querySelector(".category").setAttribute("id", `CategoryNo${id}`);
    template.querySelector(".category-img").src = image;
    template.querySelector(".category-img").alt = name;
    template.querySelector(".category-name").textContent = name;
    categoryContainerEl.append(template);
  });
};

(() => {

  fetch("./assets/api/products.json").then(res => {
    if(!res.ok) throw new Error("Something Went Wrond Check your File Path Then Try Again");
    return res.json();
  }).then(products => {
    renderShortProducts(products, "top-Selling", 0, 6, "top-load-more");
    renderShortProducts(products, "new-arrivals--container", 10, 16, "arrival-load-more");
    renderShortProducts(products, "foryou-container", 0, 20, "foryou-load-more");
  }).catch(err => {
    console.error(err);
  });
  fetch("./assets/api/categories.json").then(res => {
    if(!res.ok) throw new Error("Something Went Wrond Check your File Path Then Try Again");
    return res.json();
  }).then(categories => {
    renderCategory(categories);
  }).catch(err => {
    console.error(err);
  });

  window.addEventListener("load", hideLoadingScreen);
  window.addEventListener("scroll", hideHeaderOnScroll);
})();