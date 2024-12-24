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
const renderProduct = (id, appendContainer, name, image, acutalPrice, discountPrice, shortDescription, longDescription, category, numberOfStars, numberOfSellOut) => {
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
  productTemplate.querySelector(".actualPrice").textContent = `${acutalPrice}.00`;
  productTemplate.querySelector(".discountedPrice").textContent = `${discountPrice}.00`;
  acutalPrice = parseInt(acutalPrice.replaceAll("$", ""));
  discountPrice = parseInt(discountPrice.replaceAll("$", ""));
  productTemplate.querySelector(".discountPercentage").textContent = `${Math.round(((acutalPrice - discountPrice) * 100) / acutalPrice)}% OFF`;

  // Show Add To Card Button On Hover 
  const hoverRenderAddToCart = (hoverContainer, targetContainer) => {
    let containerEl = productTemplate.querySelector(hoverContainer);
    let targetContainerEl = productTemplate.querySelector(targetContainer);
    containerEl.addEventListener("mouseover", () => {
      targetContainerEl.classList.add("active");
    });
    containerEl.addEventListener("mouseout", () => {
      targetContainerEl.classList.remove("active");
    });
  };
  // Calling Function
  hoverRenderAddToCart(".product-card", ".product-card .addtocard-container");
  // hoverRenderAddToCart(".product-card");

  // Quantity Event
  let quantityEl = productTemplate.querySelector(".numberOfQuantity");
  quantityEl.addEventListener("input", () => {
    if(quantityEl.value < 1) {
      quantityEl.value = 1;
    } else if (quantityEl.value > numberOfSellOut) {
      quantityEl.value = numberOfSellOut;
    }
  });
  let containerElement = document.querySelector(appendContainer);
  containerElement.append(productTemplate);
};

// Create Request for Append Products On Screen 
const requestForRenderProducts = (products, appendContainer, startsWith, endsWith, veiwAll) => {
  // Number OF Products for Render
  let renderProducts = products.slice(startsWith, endsWith);
  const requestForRender = () => {
    renderProducts.forEach(currentElement => {
    const {id, name, image, actualPrice, discountPrice, shortDescription, longDescription, category, numberOfStars, numberOfSellOut} = currentElement;
    renderProduct(id, appendContainer, name, image, actualPrice, discountPrice, shortDescription, longDescription, category, numberOfStars, numberOfSellOut);
  });
  }; requestForRender();
  // View All Butt function & Event Listener
  let check = false;
  const productsViewAllButton = (btn) => {
    let containerEl = document.querySelector(appendContainer);
    if(!check) {
      containerEl.innerHTML = ``;
      renderProducts = products.slice(startsWith, products.length);
      requestForRender();
      btn.innerText = "View Less";
      check = true;
    } else {
      containerEl.innerHTML = ``;
      btn.innerText = "View All";
      renderProducts = products.slice(startsWith, endsWith);
      requestForRender();
      check = false;
    }
  };
  
  let viewAllBtn = document.querySelector(veiwAll);
  viewAllBtn.addEventListener("click", () => productsViewAllButton(viewAllBtn));

};

// Shaking Effect
const shakingEffect = (targetElement) => {
  targetElement.style.transition = `transform 0.1s linear`;
  let times = 0;
  let number = 20; // Start with a positive value
  
  const interval = setInterval(() => {
    targetElement.style.transform = `translateX(${number}px)`;
    number = -number; // Alternate the direction
    times++;
    
    if (times > 5) { // Stop after 5 shakes
      clearInterval(interval);
      targetElement.style.transform = 'translateX(0)'; // Reset position
    }
  }, 100); // Adjust timing as needed
};


// Manage Banner Subscription farm
let subscribedUsersData = JSON.parse(localStorage.getItem("subscribedUsers")) || [];
const manageBannerSubscribeForm = () => {
  // References
  let nameInputEl = document.querySelector(".subscribe-name--input");
  let nameErrorMessageEl = document.querySelector(".subscribe-name--error");
  let emailInputEl = document.querySelector(".subscribe-email--input");
  let emailErrorMessageEl = document.querySelector(".subscribe-email--error");
  // Error Message Changer
  const errorMessage = (errorElement, errorText) => {
    if(!errorElement && !errorText) {
      return;
    }
    errorElement.style.color = `#ff0000`;
    errorElement.innerText = errorText;
  };
  // Red Green Border Creater 
  const redBorder = (Element) => {
    Element.style.border = `2px solid #ff0000`;
  };
  const greenBorder = (Element) => {
    Element.style.border = `2px solid #00ff00`;
  };
  // Focus And Hover
  const focusBlur = (inputEl) => {
    if(!inputEl) {
      return;
    }
    // Focus Function
    const focus = (inputElement) => {
      inputElement.addEventListener("focus", () => greenBorder(inputElement), {once: true});
    }
    
    let condition = true;

    inputEl.addEventListener("blur", () => {
      inputEl.value = inputEl.value.trim();
      inputEl.value = inputEl.value.replace(/\s+/g, ' ').trim();
      if(inputEl.value.length < 1) {
        redBorder(inputEl);
        shakingEffect(inputEl);
        if(condition) {
          condition = false;
          focus(inputEl);
        }
      }
    }); 
    
  };
  focusBlur(emailInputEl);
  focusBlur(nameInputEl);

  // Conditions For Submit Buttons
  let validName = false;
  let validEmail = false;
  // Let's Create Some Errors Message According to user Input
  nameInputEl.addEventListener("input", () => {
    if(nameInputEl.value.length == 0) {
      redBorder(nameInputEl);
      errorMessage(nameErrorMessageEl, "Empty Input Element Isn't Allowed");
      validName = false;
    } else if (/[0-9!@#$%^&*(),.?":{}|<>]/.test(nameInputEl.value)) {
      redBorder(nameInputEl);
      errorMessage(nameErrorMessageEl, "Numbers (1,2,3,4,5,6,7,8,9) and special character (@#$%^&*%$#@!) isn't Allowed");
      validName = false;
    } else if (nameInputEl.value.length < 4) {
      redBorder(nameInputEl);
      errorMessage(nameErrorMessageEl, "Your Name is to short please enter your original name");
      validName = false;
    } else {
      greenBorder(nameInputEl);
      errorMessage(nameErrorMessageEl, "Sucess");
      nameErrorMessageEl.style.color = `#00ff00`;
      validName = true;
    }
  });

  // Let's Create Error Messages for email
  emailInputEl.addEventListener("input", () => {
    if(emailInputEl.value.length == 0) {
      emailInputEl.value = emailInputEl.value.trim();
      redBorder(emailInputEl);
      errorMessage(emailErrorMessageEl, "Empty email Input Isn't Allowed This is Required");
      validEmail = false;
    } else if (!emailInputEl.value.includes("@") ) {
      emailInputEl.value = emailInputEl.value.trim();
      redBorder(emailInputEl);
      errorMessage(emailErrorMessageEl, "Please Enter Valid email address Example (example@gmail.com)");
      validEmail = false;
    } else if (subscribedUsersData.includes(emailInputEl.value.toLowerCase())) {
      redBorder(emailInputEl);
      errorMessage(emailErrorMessageEl, "This Email Was Aleardy Subscribed Please try Another");
      validEmail = false;
    } else {
      emailInputEl.value = emailInputEl.value.trim();
      greenBorder(emailInputEl);
      errorMessage(emailErrorMessageEl, "Sucess");
      emailErrorMessageEl.style.color = `#00ff00`;
      validEmail = true;
    }
  });

  // Submit button 
  let submitBtnEl = document.querySelector(".subscribe-form");
  let submitErrorMessageEl = document.querySelector(".submit-btn--error");
  submitBtnEl.addEventListener("submit", (e) => {
    e.preventDefault();
    if(validEmail && validName) {
      subscribedUsersData.push(emailInputEl.value.toLowerCase());
      subscribedUsersData = [...new Set (subscribedUsersData)]
      localStorage.setItem("subscribedUsers", JSON.stringify(subscribedUsersData));
      nameInputEl.value = "";
      emailInputEl.value = "";
      nameErrorMessageEl.innerText = "";
      emailErrorMessageEl.innerText = "";
      greenBorder(nameInputEl);
      greenBorder(emailInputEl);
      errorMessage(submitErrorMessageEl, "You are subscribed Please Check Your email address");
      submitErrorMessageEl.style.color = "#00ff00";
      setTimeout(() => {
        submitErrorMessageEl.innerText = "";
      }, 10000)
    } else if (!validEmail && validName) {
      errorMessage(submitErrorMessageEl, "Something Went Wrong With Your Email Address");
      shakingEffect(emailInputEl);
      redBorder(emailInputEl);
    } else if (validEmail && !validName) {
      shakingEffect(nameInputEl);
      errorMessage(submitErrorMessageEl, "Something Went Wrong With Your Full Name");
      redBorder(nameInputEl);
    } else if (!validEmail && !validName) {
      shakingEffect(nameInputEl);
      shakingEffect(emailInputEl);
      errorMessage(submitErrorMessageEl, "Something Went Wrong With Your Email & Full Name");
      redBorder(emailInputEl);
      redBorder(nameInputEl);
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
    renderPageCategories(categories);
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
    requestForRenderProducts(products, ".selling-products--container", 0, 10, "#selling-all--btn");
    requestForRenderProducts(products, ".new-products--container", 15, 25, "#newArrival-all--btn");
  }).catch(error => {
    console.warn(error);
  });
  window.addEventListener("load", hideloadingScreen);
  dropdownHeaderCategory();
  manageBannerSubscribeForm();
})();