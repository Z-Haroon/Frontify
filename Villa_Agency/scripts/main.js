(() => {
  // References
  const loadingScreenEl = document.querySelector(".loading");
  const headerEl = document.getElementById("header");
  const upperHeaderEl = document.querySelector(".upper-header--container");
  const upperHeaderDividerEl = document.querySelector(".upper-header--divider");

  // Loading Screen Remover
  const loadingCompleted = () => {
    loadingScreenEl.classList.add("completed");
  };
  window.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  // Scroll Function
  const hasScrolled = () => {
    let scrollThreshold = 60;
    let isScrolled = window.scrollY > scrollThreshold;

    headerEl.classList.toggle("scroll", isScrolled);
    upperHeaderDividerEl.classList.toggle("scroll", isScrolled);
    upperHeaderEl.classList.toggle("scroll", isScrolled);
  };

  // Window Event Listeners
  window.addEventListener("load", loadingCompleted);
  window.addEventListener("scroll", hasScrolled);

  let slideCount = 0;
  // Data Changer
  const dataChanger = () => {
    let data = [
      {space: "185 m2", floor: "26th", parking: "4", payment: "Bank"},
      {space: "259 m3", floor: "17th", parking: "No Parking", payment: "Cash"},
      {space: "75 m1", floor: "2nd", parking: "1", payment: "Installments"}
    ]
    const dataContainerEl = document.querySelector(".best-details");
    dataContainerEl.querySelector(".space").innerText = `${data[slideCount].space}`;
    dataContainerEl.querySelector(".floorNo").innerText = `${data[slideCount].floor}`;;
    dataContainerEl.querySelector(".parking").innerText = `${data[slideCount].parking}`;;
    document.querySelector(".payment").innerText = `${data[slideCount].payment}`;;
  };
  //  Hero Banner Section
  const slider = (bannersEl, leftArrowEl, rightArrowEl) => {
    bannersEl.forEach((curBan, index) => {
      curBan.style.left = `${index * 100}%`;
    });

    const nextSlide = () => {
      if (slideCount < bannersEl.length - 1) {
        slideCount++;
        dataChanger();
      } else {
        slideCount = 0;
        dataChanger();
      }
      bannersEl.forEach((curEl) => {
        curEl.style.transform = `translateX(-${slideCount * 100}%)`;
      });
    };

    const prevSlide = () => {
      if (slideCount > 0) {
        slideCount--;
        dataChanger();
      } else {
        slideCount = bannersEl.length - 1;
        dataChanger();
      }
      bannersEl.forEach((curEl) => {
        curEl.style.transform = `translateX(-${slideCount * 100}%)`;
      });
    };

    document.querySelector(`.${leftArrowEl}`).addEventListener("click", nextSlide);
    document.querySelector(`.${rightArrowEl}`).addEventListener("click", prevSlide);

    setInterval(() => {
      nextSlide();
    }, 6000);
  };
  const heroBannersEl = document.querySelectorAll(".hero-banner");
  slider(heroBannersEl, "left-arrow", "right-arrow");

  // Best Section
  const bestBannersContainerEl = document.querySelector(".best-img--container");
  const arrowContainerEl = document.querySelector(".arrow-btns--container");
  const bestSlidesEl = document.querySelectorAll(".slide");
  bestBannersContainerEl.addEventListener("mouseover", () => {
    arrowContainerEl.classList.add("active");
  });
  bestBannersContainerEl.addEventListener("mouseout", () => {
    arrowContainerEl.classList.remove("active");
  });

  slider(bestSlidesEl, "best-left--arrow", "best-right--arrow");
  // Feature Section DropDown
  let featureContainers = document.querySelectorAll(".feature-more--details");

  featureContainers.forEach((container) => {
    let headings = container.querySelectorAll(".heading");
    let paragraphs = container.querySelectorAll(".details");
    headings.forEach((heading, index) => {
      heading.addEventListener("click", () => {
        paragraphs[index].classList.toggle("active");
        heading.classList.toggle("active");
      });
    });
  });


  // Products Section

  const homePageProperties = async () => {
    try {
      const response = await fetch("./assets/api/products.json");
      if(!response.ok) {
        throw new Error("Products Cannot Found The Product File Will Be Remove Or Replaced");
      }
      const productsData = await response.json();

      const productTemplateEl = document.getElementById("product-template");
      const productsContainerEl = document.querySelector(".properties-container");
      productsData.forEach((curProd) => {
        const productTemplate = document.importNode(productTemplateEl.content, true);
        const {id, img, type, title, price, noOfBed, noOfBath, area, floor, parking} = curProd;
        productTemplate.querySelector(".property-container").setAttribute("id", id);
        productTemplate.querySelector(".prod-img").src = img;
        productTemplate.querySelector(".prod-img").alt = title;
        productTemplate.querySelector(".type").innerText = type;
        productTemplate.querySelector(".price").innerText = price;
        productTemplate.querySelector(".title").innerText = title;
        productTemplate.querySelector(".noOfBedrooms").innerText = noOfBed;
        productTemplate.querySelector(".noOfBathrooms").innerText = noOfBath;
        productTemplate.querySelector(".noOfArea").innerText = area;
        productTemplate.querySelector(".noOfFloor").innerText = floor;
        productTemplate.querySelector(".noOfParking").innerText = parking;
        productsContainerEl.append(productTemplate);
      });
    } catch (error) {
      console.log(error)
    }
  }; homePageProperties();
})();
