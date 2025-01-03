// Header Menu Right Hand Section Elements
let headerMenuRightHandData = {
  listOne: [
    {imgPath: "./assets/edit.png", title: "Post"},
    {imgPath: "./assets/book.png", title: "Story"},
    {imgPath: "./assets/reel.png", title: "Reel"},
    {imgPath: "./assets/star.png", title: "Life Event"},
  ],
  listTwo: [
    {imgPath: "./assets/flag.png", title: "Page"},
    {imgPath: "./assets/megaphone.png", title: "Ad"},
    {imgPath: "./assets/menu-group.png", title: "Group"},
    {imgPath: "./assets/event.png", title: "Event"},
    {imgPath: "./assets/store.png", title: "Marketplace Listing"},
  ],
};

// Render Header Menu right Hand Element
const renderHeaderMenuRightHandElements = (appendContainer, loopName) => {
  // Reference
  let elementTemplate = document.querySelector("#header-menu--right-item");
  let showElementOnThisContainerEl = document.querySelector(appendContainer);

  // Error Handling 
  if(!showElementOnThisContainerEl || !loopName || !elementTemplate) return;

  // Lets Show Elements 
  loopName.forEach(currentElement => {
    let templateEl = document.importNode(elementTemplate.content, true);
    
    // Changing Template Details According To Data
    console.log(currentElement.title)
    templateEl.querySelector(".name").textContent = currentElement.title;
    templateEl.querySelector(".img").src = currentElement.imgPath;
    templateEl.querySelector(".img").alt = currentElement.title;
    showElementOnThisContainerEl.append(templateEl);
  });
};

export const headerManager = () => {
  // Show Hidden Menus
  const showHiddenMenuOnClick = (commonClass, hiddenContainer, iconEl) => {
    // References 
    let showThisContainerEl = document.querySelector(hiddenContainer);
    let targetIconEl = document.querySelector(iconEl);
    let imageEl = targetIconEl.querySelector(".img");
    // Condition For Check menu opened Or close
    let chk = false;

    // Error Handling 
    if(!commonClass || !showThisContainerEl || !targetIconEl || !imageEl) return;

    // Hide Element On Window Click
    let hideContainerOnWindowClick = (e) => {
      if(!e.target.classList.contains(commonClass)) {
        showThisContainerEl.classList.remove("active");
        targetIconEl.classList.remove("active");
        chk = false;
        // Change Image
        imageEl.src = imageEl.src.replace("-active.png", ".png" );
      };      
    };

    // Calling Function On Event Listner
    window.addEventListener("click", hideContainerOnWindowClick);

    // Let's Show Hidden Container and change the img icon
    const showMenu = () => {
      if(!chk) {
        showThisContainerEl.classList.add("active");
        targetIconEl.classList.add("active");
        imageEl.src = imageEl.src.replace(".png", "-active.png");
        chk = true;
      } else {
        showThisContainerEl.classList.remove("active");
        targetIconEl.classList.remove("active");
        imageEl.src = imageEl.src.replace("-active.png", ".png" );
        chk = false;
      }
    };

    // Click Event
    targetIconEl.addEventListener("click", showMenu);
  };

  // Calling Function
  showHiddenMenuOnClick("h-menu", ".header-menu--section", ".header-menu");

  // Render Elements
  renderHeaderMenuRightHandElements(".menu-items_1--container", headerMenuRightHandData.listOne);
  renderHeaderMenuRightHandElements(".menu-items_2--container", headerMenuRightHandData.listTwo);
};