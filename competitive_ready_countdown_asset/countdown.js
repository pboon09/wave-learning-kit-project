// Select the element where the countdown will be displayed
const countdownElement = document.querySelector(".element .text-wrapper");

// Countdown values
const countdownValues = ["3", "2", "1", "เริ่ม!"];
let currentIndex = 0;

// Function to update the countdown text
function updateCountdown() {
  if (currentIndex < countdownValues.length) {
    countdownElement.textContent = countdownValues[currentIndex];
    currentIndex++;
    setTimeout(updateCountdown, 1000); // Update every second
  } else {
    redirectToNextPage();
  }
}

// Redirect to the next page after the countdown
function redirectToNextPage() {
  window.location.href = "next_page.html"; // Replace with your target page
}

// Start the countdown
updateCountdown();
