// Upper Header Links
const upperHeaderLinks = [
  { linkName: "Home", linkPath: "#" },
  { linkName: "About us", linkPath: "#" },
  { linkName: "Contact us", linkPath: "#" },
  { linkName: "Help & Support", linkPath: "#" },
  { linkName: "Call us +923123456789", linkPath: "tel:+923123456789" }
];

// Header Categories
const headerCategories = [
  { CategoryName: "Shop All", categoryId: "shopAllCategory", linkPath: "#" },
  { CategoryName: "Computers", categoryId: "computersCategory", linkPath: "#" },
  { CategoryName: "Tablets", categoryId: "tabletsCategory", linkPath: "#" },
  { CategoryName: "Drones & Cameras", categoryId: "dronesCamerasCategory", linkPath: "#" },
  { CategoryName: "Audio", categoryId: "audioCategory", linkPath: "#" },
  { CategoryName: "Mobile", categoryId: "mobileCategory", linkPath: "#" },
  { CategoryName: "TV & Home Cinema", categoryId: "tvHomeCinemaCategory", linkPath: "#" },
  { CategoryName: "Wearable Tech", categoryId: "wearableTechCategory", linkPath: "#" },
  { CategoryName: "Sale", categoryId: "saleCategory", linkPath: "#" }
];

// Handle scroll to add/remove active class
const hasScrolled = () => {
  const upperHeaderEl = document.querySelector(".upper-header");
  if (window.scrollY > 50) {
    upperHeaderEl.classList.add("active");
  } else {
    upperHeaderEl.classList.remove("active");
  }
};

// Show best-selling products
const bestSellingProducts = (products) => {
  const containerEl = document.querySelector(".best-selling-items__container");
  const productTemplateEl = document.getElementById("best-selling--template");
  const top30Products = products.slice(0, 30);

  top30Products.forEach((curProd) => {
    const productTemplate = document.importNode(productTemplateEl.content, true);
    const { id, image, name, sellOut, shortDescription, longDiscription, category, actualPrice, DiscountPrice, numberOfRating } = curProd;

    productTemplate.querySelector(".best-selling--item").setAttribute("id", `product${id}`);
    productTemplate.querySelector(".best-selling-product_image").src = image;
    productTemplate.querySelector(".best-selling-product_image").alt = name;
    productTemplate.querySelector(".title").textContent = name;

    const ratingContainerEl = productTemplate.querySelector(".rating");
    for (let i = 0; i < numberOfRating; i++) {
      let createIcon = document.createElement("i");
      createIcon.classList.add("fas", "fa-star");
      ratingContainerEl.append(createIcon);
    }

    productTemplate.querySelector(".discount-price").textContent = `Rs. ${DiscountPrice}`;
    productTemplate.querySelector(".original-price").textContent = `Rs. ${actualPrice}`;

    containerEl.append(productTemplate);
  });

  const productsElem = document.querySelectorAll(".best-selling--item");
  productsElem.forEach((prodElem, index) => {
    prodElem.style.left = `${index * 22}%`;
  });

  let numberOfSlides = 0;
  const productsOnScreen = 4;

  const nextSlide = () => {
    if (numberOfSlides < productsElem.length - productsOnScreen) {
      numberOfSlides++;
    } else {
      numberOfSlides = 0;
    }
    updateSlidePosition();
  };

  const prevSlide = () => {
    if (numberOfSlides > 0) {
      numberOfSlides--;
    } else {
      numberOfSlides = productsElem.length - productsOnScreen;
    }
    updateSlidePosition();
  };

  const updateSlidePosition = () => {
    productsElem.forEach((curEl) => {
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

// Fetch all products and pass to best-selling function
const productsFetcher = () => {
  fetch("./assets/api/products.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Products file has been removed or replaced. Please try again.");
      }
      return response.json();
    })
    .then((prod) => {
      bestSellingProducts(prod);
    })
    .catch((error) => {
      console.warn(error);
    });
};
// Category Section Manager
const categorySectionManager = () => {

  const showCategories = (categories) => {
    const containerEl = document.querySelector(".categories-items");
    const categoryTemplateEl = document.getElementById("category-template");
    categories.forEach(curEl => {
      const categoryTemplate = document.importNode(categoryTemplateEl.content, true);
      const {id, image, name} = curEl;
      categoryTemplate.querySelector(".category").setAttribute("id", `category${id}`);
      categoryTemplate.querySelector(".cate-image").src = image;
      categoryTemplate.querySelector(".cate-image").alt = name;
      categoryTemplate.querySelector(".category-name").textContent = name;
      containerEl.append(categoryTemplate);
    });
  };

  fetch("./assets/api/categories.json").then(response => {
    if(!response.ok) {
      throw new Error("Category file has been removed or replaced. Please try again.")
    }
    return response.json();
  }).then(categories => {
    console.log(categories);
    showCategories(categories);
  }).catch(error => {
    console.warn(error);
  });
}; 
// Initialize page load behavior and event listeners
(() => {
  // Simulate loading completion on page load
  window.addEventListener("load", () => {
    setTimeout(() => {
      document.querySelector(".loading").classList.add("completed");
    }, 500);
  });

  // Add scroll event listener for the upper header
  window.addEventListener("scroll", hasScrolled);

  // Render upper header links
  const upperheaderContainerEl = document.querySelector(".upper-header-list");
  if (upperheaderContainerEl) {
    upperHeaderLinks.forEach((curLink) => {
      const listEl = document.createElement("li");
      listEl.innerHTML = `<a href="${curLink.linkPath}">${curLink.linkName}</a>`;
      upperheaderContainerEl.append(listEl);
    });
  }

  // Render header categories
  const headerCategoryContainer = document.querySelector(".category-list");
  if (headerCategoryContainer) {
    headerCategories.forEach((curCategory) => {
      const listEl = document.createElement("li");
      listEl.id = curCategory.categoryId;
      listEl.innerHTML = `<span class="category"><a href="${curCategory.linkPath}">${curCategory.CategoryName}</a></span>`;
      headerCategoryContainer.append(listEl);
    });
  }
  productsFetcher();
  categorySectionManager();
})();
