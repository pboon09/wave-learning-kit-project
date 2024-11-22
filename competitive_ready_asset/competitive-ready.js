const player1Element = document.querySelector(".element-3");
const player2Element = document.querySelector(".element");

let player1Ready = false;
let player2Ready = false;

function markReady(playerElement, textSelector) {
  const textElement = playerElement.querySelector(textSelector);
  textElement.textContent = "พร้อมแล้ว";
  textElement.style.color = "green";
  playerElement.classList.add("grow-shrink");
}

function checkBothReady() {
  const player1Status = localStorage.getItem("player1Status");
  const player2Status = localStorage.getItem("player2Status");
  if (player1Status == "ready") {
    markReady(player1Element, ".text-wrapper-6");
    player1Ready = true;
  }

  if (player2Status == "ready") {
    markReady(player2Element, ".text-wrapper-3");
    player2Ready = true;
  }

  if (player1Ready && player2Ready) {
    setTimeout(() => {
      window.location.href = "competitive_ready_countdown.html";
    }, 2000);
  }
}

checkBothReady();
setInterval(checkBothReady, 500);
