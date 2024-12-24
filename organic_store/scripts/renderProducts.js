export const renderProducts = (products, appendContainer, startsWith, endsWith, btn) => {
  // If Products File Getting  Error then this will Return Not Exexute function
  if(!products) {
    return;
  }

  // Render Product
  let showProductsOnThisContainerEl = document.querySelector(appendContainer);
  const renderProduct = (id, name, image, actualPrice, discountPrice, shortDescription, longDescription, category, numberOfStars, numberOfSellOut) => {
    let productTemplateEl = document.getElementById("product-card-template");
    let productTemplate = document.importNode(productTemplateEl.content, true);
    // short the name for enhance long name issue
    let shortName = name;
    if(name.length > 30) {
      shortName = name.slice(0, 30) + "...";
    }
    // Changing Template elements value according to product
    productTemplate.querySelector(".product-card").setAttribute("id", `productId${id}`);
    productTemplate.querySelector(".product-img").src = image;
    productTemplate.querySelector(".product-img").alt = name;
    productTemplate.querySelector(".product-name").textContent = shortName;
    // Render Rating Star According To API Give    
    let ratingStarContainerEl = productTemplate.querySelector(".ratings");
    for(let i = 0; i < numberOfStars; i++) {
      let createStar = document.createElement("i");
      createStar.classList.add("bx");
      createStar.classList.add("bxs-star");
      ratingStarContainerEl.appendChild(createStar);
    }
    // Changing Template elements value according to product
    productTemplate.querySelector(".numberOfSellOut").innerText = `( ${numberOfSellOut} )`;
    productTemplate.querySelector(".actualPrice").textContent = actualPrice + ".00";
    productTemplate.querySelector(".discountedPrice").textContent = discountPrice + ".00";
    // Removing Dollar Sign From Products for Calculate percentage
    actualPrice = actualPrice.replaceAll("$", "");
    discountPrice = discountPrice.replaceAll("$", "");
    productTemplate.querySelector(".discountPercentage").textContent = `${Math.round(((actualPrice - discountPrice) * 100) / actualPrice)}% OFF`;
    // Show Add To Card Button On Hover On Product
    let productCardEl = productTemplate.querySelector(".product-card");
    let addToCardContainerEl = productCardEl.querySelector(".addtocard-container")
    productCardEl.addEventListener("mouseover", () => {
      addToCardContainerEl.classList.add("active");
    });
    productCardEl.addEventListener("mouseout", () => {
      addToCardContainerEl.classList.remove("active");
    });
    // Handle Increasing quanity according To Stock
    let quantityInputEl = productTemplate.querySelector(".numberOfQuantity");
    quantityInputEl.addEventListener("input", () => {
      if(quantityInputEl.value < 1) {
        quantityInputEl.value = 1;
      } else if (quantityInputEl.value < numberOfSellOut) {
        quantityInputEl.value = numberOfSellOut;
      }
    });
    showProductsOnThisContainerEl.appendChild(productTemplate);
  };

  // This Function sending Request for render Products on section
  let renderTheseProducts = products.slice(startsWith, endsWith);
  const requestingForRenderProduct = () => {
    renderTheseProducts.forEach(currentProduct => {
      const {id, name, image, actualPrice, discountPrice, shortDescription, longDescription, category, numberOfStars, numberOfSellOut} = currentProduct;
      renderProduct(id, name, image, actualPrice, discountPrice, shortDescription, longDescription, category, numberOfStars, numberOfSellOut);
    });
  }; requestingForRenderProduct();

  // Function For View All Button
  const viewAllButton = () => {
    let buttonEl = document.querySelector(btn);
    let condition = false
    buttonEl.addEventListener("click", () => {
      if(!condition) {
        showProductsOnThisContainerEl.innerHTML = ``;
        renderTheseProducts = products.slice(startsWith, products.length);
        buttonEl.innerText = "View Less";
        condition = true;
        requestingForRenderProduct();
      } else {
        showProductsOnThisContainerEl.innerHTML = ``;
        renderTheseProducts = products.slice(startsWith, endsWith);
        buttonEl.innerText = "View All";
        condition = false;
        requestingForRenderProduct();
      }
    });
  }; viewAllButton();

}