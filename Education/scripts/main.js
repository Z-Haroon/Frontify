// Change The navbar Color On Scroll
window.addEventListener("scroll", () => {
  document.querySelector("nav").classList.toggle('window-scroll', window.scrollY > 20);
});

// Show/hide Faq Answers
const faqs = document.querySelectorAll(".faq");
faqs.forEach(currentElements => {
  currentElements.addEventListener("click", () => {
    currentElements.classList.toggle("open");

    // Change icon
    const icon = currentElements.querySelector(".faq__icon i");
    if(icon.className === "uil uil-plus") {
      icon.className = "uil uil-minus"
    } else {
      icon.className = "uil uil-plus"
    }
  });
});

// NAVBAR Show
const menu = document.querySelector(".nav__menu");
const menuBtn = document.querySelector("#open-menu--btn");
const closeBtn = document.querySelector("#close-menu--btn");

menuBtn.addEventListener("click", () => {
  menu.style.display = "flex";
  closeBtn.style.display = "inline-block";
  menuBtn.style.display = "none";
});
closeBtn.addEventListener("click", () => {
  menu.style.display = "none";
  closeBtn.style.display = "none";
  menuBtn.style.display = "inline-block";
});