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

// * Dropdown Header Category Section
const dropdownHeaderCategory = () => {
  // Elements
  let headerCategoryContainerEl = document.querySelector(".dropdown-category");
  let dropdownCategoryEl = document.querySelector(".dropdown-container");
  let dropdownOptionsEl = document.querySelectorAll(".dropdown-category--inner li");
  let dropdownHeadingEl = document.querySelector(".dropdown-heading")
  
  // Change Heading Inner Text On user selection
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


(() => {

  window.addEventListener("load", hideloadingScreen);
  dropdownHeaderCategory();
})();