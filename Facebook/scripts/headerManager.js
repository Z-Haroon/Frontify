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
};
