// Select the form and the inputs
const $FORM = document.querySelector("#contactForm");
const $NAME = document.querySelector("#name");
const $EMAIL = document.querySelector("#email");
const $PHONE = document.querySelector("#phone");
const $WEBSITE = document.querySelector("#website");
const $MESSAGE = document.querySelector("#message");

//Add the event listener
$FORM.addEventListener("submit", (event) => {
  event.preventDefault();

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
  fetch("http://127.0.0.1:8000/submit", {
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
    .then((data) => console.log("Success:", data))

    //If something fails (bad URL, server offline, CORS issue, JSON parse error, etc)
    //It catches the error and logs it, so your app doesn’t crash
    .catch((error) => console.error("Error:", error));
});
