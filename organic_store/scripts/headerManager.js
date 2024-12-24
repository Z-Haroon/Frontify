//? Filter Search Results
const filterSearchResult = products => {
  if(!products) {
    return;
  }
  // References
  let searchResultContainerEl = document.querySelector(".search-result--container")
  let showResultContainerEl = document.querySelector(".results-found--container");
  let searchInputEl = document.getElementById("sarch-input");

  // Filter Products According To User Input
  const filterAccordingToUserInput = (userSearchedValue) => {
    showResultContainerEl.innerHTML = ``;
    let foundResults = products.filter(currentElement => {
      if(currentElement.name.toLowerCase().includes(userSearchedValue.toLowerCase())) {
        let createHeading3 = document.createElement("h3");
        createHeading3.innerText = currentElement.name;
        createHeading3.classList.add("foundedResult");
        showResultContainerEl.appendChild(createHeading3);
        return currentElement;
      }
    });
    if(foundResults.length === 0) {
        showResultContainerEl.innerHTML = `<p class="noproductsfound">No Products Found</p>`;
    }
    document.querySelector(".countOfResult").innerText = `[ ${foundResults.length} ]`;
  };

  // Get Value From User 
  searchInputEl.addEventListener("input", () => {
    let userSearchedValue = searchInputEl.value.trim();
    if(userSearchedValue.length > 2) {
      searchResultContainerEl.classList.add("active");
      filterAccordingToUserInput(userSearchedValue);
    } else {
      searchResultContainerEl.classList.remove("active");
    }
  });

};

// Header Category DropDown menu
// Categroies
const headerCategories = ["All Categories","grocries", "Drinks", "Chocolates"];
  // Function
const dropDownMenu = () => {
  // Refrences
  let dropDownMenuContainerEl = document.querySelector(".dropdown-category");
  let showDropDownContainerEl = document.querySelector(".dropdown-container")
  let dropDownItemsContainerEl = document.querySelector(".dropdown-category--inner");

  // Stop Closing
  const closeDropdownMenuOnWindowClick = (element, givenClass) => {
    window.addEventListener("click", (e) => {
      if(!e.target.classList.contains(givenClass)) {
        element.classList.remove("active");
      }
    });
  };

  // Let's Show dropdown Menu On User Click
  const fixToggleClosingBug = (e, element, givenClass) => {
    if(e.target.classList.contains(givenClass)) {
      element.classList.add("active");
    }
  };
  dropDownMenuContainerEl.addEventListener("click", (e) => {
    showDropDownContainerEl.classList.toggle("active");
    fixToggleClosingBug(e, showDropDownContainerEl ,"dropdown-container");
    fixToggleClosingBug(e, showDropDownContainerEl,"dropdown-category--inner");
  });
  closeDropdownMenuOnWindowClick(showDropDownContainerEl, "dropCategory");

  // Render Categories
  const renderCategories = () => {
    headerCategories.forEach(currentElement => {
      let createListItem = document.createElement("li");
      createListItem.innerText = currentElement;
      dropDownItemsContainerEl.append(createListItem);
    });
  }; renderCategories();

  // let Change Heading According To user Click
  const changeHeadingAccordongToUserClick = () => {
    let dropDownOptionEl = dropDownItemsContainerEl.querySelectorAll("li");
    let headingEl = document.querySelector(".dropdown-heading");

    // Check Which Option User Aleardy Choosed
    const userSelection = () => {
      dropDownOptionEl.forEach(currentElement => {
        if(currentElement.innerText === headingEl.innerText) {
          currentElement.classList.add("active");
        } else {
          currentElement.classList.remove("active");
        }
      });
    }
    dropDownOptionEl.forEach(currentElement => {
      userSelection();
      currentElement.addEventListener("click", () => {
        headingEl.innerText = currentElement.innerText;
        userSelection();
      });
    });

  }; changeHeadingAccordongToUserClick();
};

export const headerManager = (products) => {
  filterSearchResult(products);
  dropDownMenu();
};