export const subscribeForm = () => {
  // References
  let nameInputEl = document.querySelector(".subscribe-name--input");
  let nameErrorMessageEl = document.querySelector(".subscribe-name--error");
  let emailInputEl = document.querySelector(".subscribe-email--input");
  let emailErrorMessageEl = document.querySelector(".subscribe-email--error");
  let formEl = document.querySelector(".subscribe-form");
  let buttonErrorMessageEl = document.querySelector(".submit-btn--error");

  // Border Color Changer
  const redGreenBorder = (element, color) => {
    if(color === "red") {
      element.style.border = `2px solid #ff0000`;
    } else if (color === "green") {
      element.style.border = `2px solid #00ff00`;
    }
  };

  // Shaking Effect on Error
  const shakingEffect = (element) => {
    element.style.transition = "all .1s linear";
    let position = 20;
    let shakesTime = 0;
    let interval = setInterval(() => {
      element.style.transform = `translateX(${position}px)`;
      shakesTime++;
      position = -position;
      if(shakesTime > 4) {
        element.style.transform = `translateX(0px)`;
        clearInterval(interval);
      };
    }, 100);
  };

  // change Border Color According To Focus Or Blur
  const focusBlurEvent = (element) => {
    const focus = () => {
      element.addEventListener("focus", () => {
        redGreenBorder(element, "green");
      });
    };
    // For Call Focus Function Only One time
    let condition = false;
    const blur = () => {
      element.addEventListener("blur", () => {
        element.value = element.value.replace(/\s+/g, ' ').trim();
        element.value = element.value.trim();
        if(element.value.length < 1) {
          redGreenBorder(element, "red");
          shakingEffect(element);
        }
        if(!condition) {
          focus();
          condition = true;
        }
      });
    }; blur();
  };
  focusBlurEvent(nameInputEl);
  focusBlurEvent(emailInputEl);

  // Error message changer
  const errorMessage = (element, message) => {
    element.style.color = `#ff0000`;
    element.innerText = message;
  };
  
  // Subscribed Users Data
  let subscribeUsersData = JSON.parse(localStorage.getItem("subscribedUsers")) || [];
  // Create Error Messages According TO Users Input
  // Errors 
  let inputErrors = {
    toShortName: "your name is too short please enter your real name",
    numbersInName: "Numbers (1234567890) & Special Characters (!@#$%^&*) are Not Allowed In name",
    toShortEmail: "your Email Address is too short please enter your Email Address",
    wrongEmail : "Plese Enter Valid Email Address Example. 'Example@gmail.com'",
    emptyEmail: "Please Enter Your Email Address Empty input Field Isn't allowed",
    emptyName: "Please Enter Your Full Name Empty input Field Isn't allowed",
  }
  // Check Condition FOr Submition
  let nameCheck = false;
  let emailCheck = false;
  nameInputEl.addEventListener("input", () => {
    if(nameInputEl.value.length < 1) {
      errorMessage(nameErrorMessageEl, inputErrors.emptyName);
      redGreenBorder(nameInputEl, "red");
      nameCheck = false;
    } else if (/[^a-zA-Z\s]/.test(nameInputEl.value)) {
      errorMessage(nameErrorMessageEl, inputErrors.numbersInName);
      redGreenBorder(nameInputEl, "red");
      nameCheck = false;
    } else if (nameInputEl.value.length < 4) {
      errorMessage(nameErrorMessageEl, inputErrors.toShortName);
      redGreenBorder(nameInputEl, "red");
      nameCheck = false;
    } else {
      errorMessage(nameErrorMessageEl, "Success");
      nameErrorMessageEl.style.color = "#00ff00";
      redGreenBorder(nameInputEl, "green");
      nameCheck = true;
    }
  });
  // Email Input
  emailInputEl.addEventListener("input", () => {
    emailInputEl.value = emailInputEl.value.trim();
    if(emailInputEl.value.length < 1) {
      errorMessage(emailErrorMessageEl, inputErrors.emptyEmail);
      redGreenBorder(emailInputEl, "red");
      emailCheck = false;
    } else if (emailInputEl.value.length < 4) {
      errorMessage(emailErrorMessageEl, inputErrors.toShortEmail);
      redGreenBorder(emailInputEl, "red");
      emailCheck = false;
    } else if (!emailInputEl.value.includes("@")) {
      errorMessage(emailErrorMessageEl, inputErrors.wrongEmail);
      redGreenBorder(emailInputEl, "red");
      emailCheck = false;
    } else if (subscribeUsersData.includes(emailInputEl.value.toLowerCase())) {
      errorMessage(emailErrorMessageEl, "This Email Address Aleardy subscribed Please Try With Other");
      redGreenBorder(emailInputEl, "red");
      emailCheck = false;
    } else {
      errorMessage(emailErrorMessageEl, "Success");
      emailErrorMessageEl.style.color = "#00ff00";
      redGreenBorder(emailInputEl, "green");
      emailCheck = true;
    }
  });

  // Submit Form 
  formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    if(nameCheck && emailCheck) {
      errorMessage(buttonErrorMessageEl, "Subscribed! Please Check Your email Address😁");
      buttonErrorMessageEl.style.color = `#00ff00`;
      subscribeUsersData.push(emailInputEl.value.toLowerCase());
      subscribeUsersData = [... new Set(subscribeUsersData)];
      localStorage.setItem("subscribedUsers", JSON.stringify(subscribeUsersData));
      nameInputEl.value = "";
      emailInputEl.value = "";
      nameErrorMessageEl.innerText = "";
      emailErrorMessageEl.innerText = "";
      emailCheck = false;
      nameCheck = false;
      setTimeout(() => {
      buttonErrorMessageEl.innerText = "";
      }, 10000)
    } else if (!nameCheck && emailCheck) {
      errorMessage(buttonErrorMessageEl, "Something Went Wrong With Your Name");
      shakingEffect(nameInputEl);
      redGreenBorder(nameInputEl, "red");
    } else if (nameCheck && !emailCheck) {
      errorMessage(buttonErrorMessageEl, "Something Went Wrong With Your Email Address");
      shakingEffect(emailInputEl);
      redGreenBorder(emailInputEl, "red");
    } else {
      errorMessage(buttonErrorMessageEl, "Something Went Wrong With Your Name & Email Address");
      shakingEffect(emailInputEl);
      redGreenBorder(nameInputEl, "red");
      shakingEffect(nameInputEl);
      redGreenBorder(emailInputEl, "red");
    }
  });


};