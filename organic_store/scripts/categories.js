export const renderCategories = (categories) => {
  if(!categories) {
    return;
  }
  // References
  let showCategoryContainer = document.querySelector(".page-category--container");
  let categoryTemplateEl = document.getElementById("page-category--template");
  // render Categories
  categories.forEach(currentCategory => {
    let categoryTemplate = document.importNode(categoryTemplateEl.content, true);
    const {id, image, name} = currentCategory;
    categoryTemplate.querySelector(".page-category").setAttribute("id", `categorynumber${id}`);
    categoryTemplate.querySelector(".image").src = image;
    categoryTemplate.querySelector(".image").alt = name;
    categoryTemplate.querySelector(".category-name").innerText = name;
    showCategoryContainer.append(categoryTemplate);
  });

  // Let Code Function For View All Button
  // Refrence 
  let viewAllBtn = document.getElementById("category-all--btn");
  let condition = false;
  viewAllBtn.addEventListener("click", () => { 
    if(!condition) {
      viewAllBtn.innerText = "View Less"
      condition = true;
      showCategoryContainer.classList.add("active");
    } else {
      viewAllBtn.innerText = "View All";
      condition = false;
      showCategoryContainer.classList.remove("active");
    }
  });
}