// Header Menu Create Post Section links
const menuCreateData = {
  listOne: [
    {imgPath: "./assets/edit.png", name: "Post"},
    {imgPath: "./assets/book.png", name: "Story"},
    {imgPath: "./assets/reel.png", name: "Reel"},
    {imgPath: "./assets/star.png", name: "Life Event"},
  ],
  listSecond: [
    {imgPath: "./assets/flag.png", name: "Page"},
    {imgPath: "./assets/megaphone.png", name: "Ad"},
    {imgPath: "./assets/menu-group.png", name: "Group"},
    {imgPath: "./assets/event.png", name: "Event"},
    {imgPath: "./assets/store.png", name: "Marketplace Listing"},
  ]
}

// Render Header Menu Post Section Elements
const renderPostSectionElements = (loopName, appendContainer) => {
  // Error Handling
  if(!loopName && !appendContainer) return;

  // References
  let showElementsContainerEl = document.querySelector(appendContainer);
  let elementTemplate = document.getElementById("header-menu--item");

  // For Each For Render
  loopName.forEach(currentElement => {
    // Import Elements From Template
    let element = document.importNode(elementTemplate.content, true);
    // Change Element Details According to array Data
    element.querySelector(".img").src = currentElement.imgPath;
    element.querySelector(".img").alt = currentElement.name;
    element.querySelector(".name").textContent = currentElement.name;
    // Show Element
    showElementsContainerEl.appendChild(element);
  });
};



// Hide Menues On Window Click
const hideMenuesOnWindowClick = (commonClass, hideThisElement) => {
  // Error Handling
  if(!commonClass || !hideThisElement) return ;

  window.addEventListener("click", (e) => {
    // If Target Element Not Have CommonClass It's Hide Automatically
    if(!e.target.classList.contains(commonClass)) {
      hideThisElement.classList.remove("active");
    }
  })
}
export const headerManager = () => {
  // Get all header icons
  let headerIconEl = document.querySelectorAll(".js-header--icon");

  // Add hover functionality to each icon
  headerIconEl.forEach(currentIcon => {
    let popupMessageEl = currentIcon.querySelector(".popup-message");

    // Skip if no popup message
    if (!popupMessageEl) return;

    let myTimeOut;

    currentIcon.addEventListener("mouseover", () => {
      // Delay showing the popup
      myTimeOut = setTimeout(() => {
        popupMessageEl.classList.add("show");
      }, 400);
    });

    currentIcon.addEventListener("mouseout", () => {
      // Cancel delay and hide the popup
      clearTimeout(myTimeOut);
      popupMessageEl.classList.remove("show");
    });
  });

  // Show Header Menu OnClick
  let openMenuOnClick = (element, openThisContainer, commonClass) => {

    // Reference
    let targetElement = document.querySelector(element);
    let showThisContainerEl = document.querySelector(openThisContainer);
    
    // Error Handling
    if(!targetElement || !showThisContainerEl || !commonClass) return;
    // Event Listner
    targetElement.addEventListener("click", (e) => {
        showThisContainerEl.classList.toggle("active");  
    });
    hideMenuesOnWindowClick(commonClass, showThisContainerEl);
  };

  openMenuOnClick(".header-menu", ".header-menu--section", "h-menu")
  // Calling Function For Render Elements On Header Menu
  renderPostSectionElements(menuCreateData.listOne, ".menu-items_1--container");
  // Second Row
  renderPostSectionElements(menuCreateData.listSecond, ".menu-items_2--container");
};
