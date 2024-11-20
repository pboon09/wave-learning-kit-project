// Default values
const defaultNumber = 30;
const defaultTime = 30;

// Variables to track current values
let currentNumber = defaultNumber;
let currentTime = defaultTime;

// Update the display values
function updateDisplay() {
  document.querySelector(".overlap-2 .text-wrapper-3").textContent = currentNumber;
  document.querySelector(".overlap-3 .text-wrapper-3").textContent = currentTime;
}

// Increment and decrement functions
function incrementNumber() {
  currentNumber++;
  updateDisplay();
}

function decrementNumber() {
  if (currentNumber > 0) { // Prevent negative values
    currentNumber--;
    updateDisplay();
  }
}

function incrementTime() {
  currentTime++;
  updateDisplay();
}

function decrementTime() {
  if (currentTime > 0) { // Prevent negative values
    currentTime--;
    updateDisplay();
  }
}

// Reset values to default
function resetNumber() {
  currentNumber = defaultNumber;
  updateDisplay();
}

function resetTime() {
  currentTime = defaultTime;
  updateDisplay();
}

// Event listeners for buttons
document.querySelector(".plus-button-number").addEventListener("click", incrementNumber);
document.querySelector(".div-2").addEventListener("click", decrementNumber);

document.querySelector(".plus-button-time").addEventListener("click", incrementTime);
document.querySelectorAll(".div-2")[1].addEventListener("click", decrementTime); // Second decrement button for time

document.querySelector(".option-number").addEventListener("click", resetNumber);
document.querySelector(".option-time").addEventListener("click", resetTime);

// Initialize the display with default values
updateDisplay();
