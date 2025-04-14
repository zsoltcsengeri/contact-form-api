document.addEventListener("DOMContentLoaded", () => {
  const $FORM = document.querySelector("#contactForm");
  const $NAME = document.querySelector("#name");
  const $EMAIL = document.querySelector("#email");
  const $PHONE = document.querySelector("#phone");
  const $WEBSITE = document.querySelector("#website");
  const $MESSAGE = document.querySelector("#message");
  const $STATUS_MESSAGE = document.querySelector("#statusMessage");

  $FORM.addEventListener("submit", async (event) => {
    event.preventDefault(); // Stop the form from reloading
    console.log("🚀 Submitting form...");

    const submittedList = {
      name: $NAME.value,
      email: $EMAIL.value,
      phone: $PHONE.value,
      website: $WEBSITE.value,
      message: $MESSAGE.value,
    };

    console.log("📤 Sending this data:", submittedList);

    try {
      const response = await fetch("http://localhost:8000/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Accept: "application/json;charset=utf-8",
        },
        body: JSON.stringify(submittedList),
      });

      if (!response.ok) {
        throw new Error(`❌ Network error: ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ Success response:", data);

      $FORM.reset();

      $STATUS_MESSAGE.innerText = "Thank you, your message was sent!";
      $STATUS_MESSAGE.classList.remove("error");
      $STATUS_MESSAGE.classList.add("success");
      $STATUS_MESSAGE.style.display = "block";

      setTimeout(() => {
        $STATUS_MESSAGE.style.display = "none";
        $STATUS_MESSAGE.classList.remove("success");
      }, 3000);
    } catch (error) {
      console.error("🔥 FETCH ERROR:", error);

      $STATUS_MESSAGE.innerText = "Oops! Something went wrong.";
      $STATUS_MESSAGE.classList.remove("success");
      $STATUS_MESSAGE.classList.add("error");
      $STATUS_MESSAGE.style.display = "block";

      setTimeout(() => {
        $STATUS_MESSAGE.style.display = "none";
        $STATUS_MESSAGE.classList.remove("error");
      }, 3000);
    }
  });
});
