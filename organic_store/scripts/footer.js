let footerLinksData = {
  organic: [
    { path: "#", name: "About us"},
    { path: "#", name: "Conditions"},
    { path: "#", name: "Out Journals"},
    { path: "#", name: "Careers"},
    { path: "#", name: "Affiliate Programme"},
    { path: "#", name: "Ultras Press"},
  ],
  quickLinks: [
    { path: "#", name: "Offers" },
    { path: "#", name: "Discount Coupons" },
    { path: "#", name: "Stores" },
    { path: "#", name: "Track Order" },
    { path: "#", name: "Shop" },
    { path: "#", name: "Info" }
  ],
  cs: [
    { path: "#", name: "FAQ" },
    { path: "#", name: "Contact" },
    { path: "#", name: "Privacy Policy" },
    { path: "#", name: "Returns & Reefunds" },
    { path: "#", name: "Cookie Guidelines" },
    { path: "#", name: "Delivery Information" }
  ],
};
export const footerManager = () => {
  const renderFooterLinks = (appendContainerElement, loopName) => {
    let containerEl = document.querySelector(appendContainerElement);
    loopName.forEach(currentlink => {
      let createListItem = document.createElement("li");
      createListItem.innerHTML = `<a href="${currentlink.path}">${currentlink.name}</a>`;
      containerEl.appendChild(createListItem);
    });
  };
  renderFooterLinks(".organic-container", footerLinksData.organic);
  renderFooterLinks(".quick-links", footerLinksData.quickLinks);
  renderFooterLinks(".customer-service", footerLinksData.cs);
};