// Select both player elements
const player1Element = document.querySelector(".element");
const player2Element = document.querySelector(".element-3");

// Track readiness of players
let player1Ready = false;
let player2Ready = false;

// Update the text, apply styling, and add animation
function markReady(playerElement, textSelector) {
  const textElement = playerElement.querySelector(textSelector);
  textElement.textContent = "พร้อมแล้ว"; // Change text to "พร้อมแล้ว"
  textElement.style.color = "green"; // Change text color to green
  playerElement.classList.add("grow-shrink"); // Add grow-shrink animation class
}

// Check if both players are ready
function checkBothReady() {
  if (player1Ready && player2Ready) {
    setTimeout(() => {
      window.location.href = "competitive_ready_countdown.html"; // Redirect to countdown.html after 2 seconds
    }, 2000);
  }
}

// Add click event listener for Player 1
player1Element.addEventListener("click", () => {
  if (!player1Ready) {
    markReady(player1Element, ".text-wrapper-3");
    player1Ready = true;
    checkBothReady();
  }
});

// Add click event listener for Player 2
player2Element.addEventListener("click", () => {
  if (!player2Ready) {
    markReady(player2Element, ".text-wrapper-6");
    player2Ready = true;
    checkBothReady();
  }
});
