// * Hide Loading Screen
const hideloadingScreen = () => {
  const hide = (elem) => {
    if(!elem) return;
    let element = document.querySelector(elem)
    element.classList.add("completed");
  };
  hide(".loading");
  hide("body");
};

// ? Header Categories Data Array
let headerCategoriesArr = ["All categories", "groceries", "drinks", "chocolates"];
// * Dropdown Header Category Section
const dropdownHeaderCategory = () => {
  // Elements
  let headerCategoryContainerEl = document.querySelector(".dropdown-category");
  let dropdownCategoryEl = document.querySelector(".dropdown-container");
  let dropdownListEl = document.querySelector(".dropdown-category--inner");
  let dropdownHeadingEl = document.querySelector(".dropdown-heading");

  // Render Categories
  headerCategoriesArr.forEach(curElement => {
    let createListItem = document.createElement("li");
    createListItem.textContent = curElement;
    dropdownListEl.append(createListItem);
  });

  // Change Heading Inner Text On user selection
  let dropdownOptionsEl = document.querySelectorAll(".dropdown-category--inner li");
  let changeTextOnClick = () => {
    dropdownOptionsEl.forEach(curElement => {
      if(curElement.innerText === dropdownHeadingEl.innerText) {
        curElement.classList.add("active");
      } else if (curElement.innerText !== dropdownHeadingEl.innerText) {
        curElement.classList.remove("active");
      }
      curElement.addEventListener("click", () => {
        dropdownHeadingEl.innerText = curElement.innerText;
      });
    });
  };
  // Check Condition
  let checkCondition = (e) => {
    if(!e.target.classList.contains("dropCategory")){
      dropdownCategoryEl.classList.remove("active");
    }
    let fixToggleBug = (elementClass) => {
      if(e.target.classList.contains(elementClass)) {
        dropdownCategoryEl.classList.add("active");
      }
    }
    fixToggleBug("dropdown-container");
    fixToggleBug("dropdown-category--inner");
  };

  // Event Listener
  const showDropdownMenu = (e) => {
    dropdownCategoryEl.classList.toggle("active");
    changeTextOnClick();
  };
  window.addEventListener("click", checkCondition)
  headerCategoryContainerEl.addEventListener("click", showDropdownMenu)
};

// Veiw All Button 
const veiwAllButton = (buttonId, containerEl) => {
  // Error Handling
  if(!buttonId && !containerEl) {
    return;
  }
  // References
  let buttonEl = document.getElementById(buttonId);
  let targetContainerEl = document.querySelector(containerEl);
  // Condition check
  let check = false;
  // Click Event
  buttonEl.addEventListener("click", () => {
    if(!check) { // Condition For Open
      targetContainerEl.classList.add("active");
      check = true;
      buttonEl.innerText = "View Less";
    } else { // Condition For Close
      targetContainerEl.classList.remove("active");
      check = false;
      buttonEl.innerText = "View All";
    }
  });
};

// Render Page Categories
const renderPageCategories = (categories) => {
  let render = (appendContainer, id, image, name) => {
    // Error Handling
    if(!appendContainer) return;
    // Reference
    let appendContainerEl = document.querySelector(`.${appendContainer}`);
    let templateEl = document.getElementById("page-category--template");
    let pageCategoryTemplateEl = document.importNode(templateEl.content, true);
    // Changes In document
    pageCategoryTemplateEl.querySelector(".page-category").setAttribute("id", `categoryIdNo${id}`);
    pageCategoryTemplateEl.querySelector(".image").src = image;
    pageCategoryTemplateEl.querySelector(".image").alt = name;
    pageCategoryTemplateEl.querySelector(".category-name").textContent = name;
    appendContainerEl.append(pageCategoryTemplateEl);
  };
  // Loop For Render multiple Categories
  categories.forEach(currentElement => {
    const {id, image, name} = currentElement;
    render("page-category--container", id, image, name);
  });
  veiwAllButton("category-all--btn", ".page-category--container");
};

// Render Product 
const renderProducts = (appendContainer, name, image, acutalPrice, discountPrice, shortDescription, longDescription, category, numberOfStars, numberOfSellOut) => {
  let productTemplateEl = document.getElementById("product-car-template");
  let productTemplate = document.importNode(productTemplateEl.content, true);
  // Let Fix Long Name Products Into .... it
  let shortName = name;
  if(name.length > 30) {
    shortName = name.slice(0, 30) + "...";
  }
  productTemplate.querySelector(".product-card").setAttribute("id", `productNo${id}`);
  productTemplate.querySelector(".product-img").src = image;
  productTemplate.querySelector(".product-img").alt = name;
  productTemplate.querySelector(".product-name").textContent = shortName;
  // Render Rating Stars According To API 
  let ratingStartContainerEl = productTemplate.querySelector(".ratings");
  for(let i = 0; i < numberOfStars; i++) {
    let createStarEl = document.createElement("li");
    createStarEl.classList.add("bx");
    createStarEl.classList.add("bxs-star");
    ratingStartContainerEl.append(createStarEl);
  }
  productTemplate.querySelector(".numberOfSellOut").textContent = `( ${numberOfSellOut} )`;
  productTemplate.querySelector(".actualPrice").textContent = acutalPrice + ".00";
  productTemplate.querySelector(".discountedPrice").textContent = discountPrice + ".00";
  productTemplate.querySelector(".discountPercentage").textContent = `${Math.round(((acutalPrice - discountPrice)* 100) / acutalPrice)}% OFF`;
  // Show Add To Card Button On Hover 
  const hoverRenderAddToCart = (container) => {
    let containerEl = productTemplate.querySelector(container);
    containerEl.addEventListener("mouseover", () => {
      containerEl.classList.add("active");
    });
    containerEl.addEventListener("mouseout", () => {
      containerEl.classList.add("remove");
    })
  };
  // Calling Function
  hoverRenderAddToCart(".addtocard-container");
  hoverRenderAddToCart(".product-card");

  // Quantity Event
  let quantityEl = productTemplate.querySelector(".numberOfQuantity");
  quantityEl.addEventListener("input", () => {
    if(quantityEl.value < 1) {
      quantityEl.value = 1;
    } else if (quantityEl.value > numberOfSellOut) {
      quantityEl.value = numberOfSellOut;
    }
  });
};

(() => {
  // Fetching Categories From API
  fetch("./assets/api/categories.json").then(res => {
    if(!res.ok) {
      throw new Error("Check your file path & your files was moved or removed");
    }
    return res.json();
  }).then(categories => {
    renderPageCategories(categories)
  }).catch(err => {
    console.error(err)
  });
  
  // Fetching Products From API
  fetch("./assets/api/products.json").then(response => {
    if(!response.ok) {
      throw new Error("Check your file path & your files was moved or removed");
    }
    return response.json();
  }).then(products => {

  }).catch(error => {
    console.warn(error);
  });
  window.addEventListener("load", hideloadingScreen);
  dropdownHeaderCategory();
})();