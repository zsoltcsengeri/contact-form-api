// Select the form and the inputs
const $FORM = document.querySelector("#contactForm");
const $NAME = document.querySelector("#name");
const $EMAIL = document.querySelector("#email");
const $PHONE = document.querySelector("#phone");
const $WEBSITE = document.querySelector("#website");
const $MESSAGE = document.querySelector("#message");
const $STATUS_MESSAGE = document.querySelector("#statusMessage");
const $BUTTON = document.querySelector(".btn-low");
//Add the event listener
$BUTTON.addEventListener("click", (event) => {
  event.preventDefault();
  alert("Form submitted but not reloaded!");

  //Create a JavaScript object from the input values
  const submittedList = {
    name: $NAME.value,
    email: $EMAIL.value,
    phone: $PHONE.value,
    website: $WEBSITE.value,
    message: $MESSAGE.value,
  };
  console.log(submittedList);

  //Send the data to the backend
  fetch("http://localhost:8000/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Accept: "application/json;charset=utf-8",
    },
    body: JSON.stringify(submittedList),
  })
    //Handle the response
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Parse the JSON from the response
      // Method to read the response body and turn it into a usable JS object
    })
    .then((data) => {
      console.log("Success:", data);

      // Reset the form after successful submission
      $FORM.reset();

      // Show success message
      $STATUS_MESSAGE.style.display = "block";
      $STATUS_MESSAGE.style.opacity = "1";
      $STATUS_MESSAGE.classList.remove("error"); // remove error class if previously shown
      $STATUS_MESSAGE.classList.add("success"); // add success class
      $STATUS_MESSAGE.innerText = "Thank you, your message was sent!";

      // Optional: fade out after 3s
      setTimeout(() => {
        $STATUS_MESSAGE.style.opacity = "0"; // fade visually
        setTimeout(() => {
          $STATUS_MESSAGE.style.display = "none"; // hide after fade
          $STATUS_MESSAGE.classList.remove("success");
        }, 500); // wait for fade animation
      }, 3000);
    })
    //If something fails (bad URL, server offline, CORS issue, JSON parse error, etc)
    //It catches the error and logs it, so your app doesn’t crash
    .catch((error) => {
      console.error("Error:", error);
      $STATUS_MESSAGE.style.display = "block";
      $STATUS_MESSAGE.classList.remove("success");
      $STATUS_MESSAGE.classList.add("error");
      $STATUS_MESSAGE.innerText = "Oops! Something went wrong.";

      setTimeout(() => {
        $STATUS_MESSAGE.style.display = "none";
        $STATUS_MESSAGE.classList.remove("error");
      }, 3000);
    });
});
