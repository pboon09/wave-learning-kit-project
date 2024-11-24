const boxes = [
  document.getElementById("no_plus"),
  document.getElementById("no_minus"),
  document.getElementById("no_reset"),
  document.getElementById("time_plus"),
  document.getElementById("time_minus"),
  document.getElementById("time_reset"),
  document.getElementById("next"),
  document.getElementById("back"),
  document.getElementById("home")
];

const urls = [
  "competitive_ready.html",
  "home_page.html",
  "home_page.html"
];

localStorage.removeItem("currentHoverIndex");
localStorage.removeItem("currentHoverIndex_compt_read");
localStorage.setItem("player1Status", "none");
localStorage.setItem("player2Status", "none");

let currentHoverIndex_option = parseInt(localStorage.getItem("currentHoverIndex_option"), 10);
if (isNaN(currentHoverIndex_option)) {
  currentHoverIndex_option = -1;
}

let prev_counter = parseInt(localStorage.getItem("prev_counter"), 10);
if (isNaN(prev_counter)) {
  prev_counter = 0;
}

const defaultNumber = 15;
const defaultTime = 60; // Default time in seconds (1 minute)

let currentNumber = parseInt(localStorage.getItem("currentNumber"), 10) || defaultNumber;
let currentTime = parseInt(localStorage.getItem("currentTime"), 10) || defaultTime;

function updateDisplay() {
  const timeDisplay = document.querySelector(".overlap-3 .text-wrapper-3");
  const timeUnit = document.getElementById("time");

  if (currentTime < 60) {
    timeDisplay.textContent = currentTime;
    timeUnit.textContent = "วินาที";
  } else {
    timeDisplay.textContent = Math.floor(currentTime / 60);
    timeUnit.textContent = "นาที";
  }

  document.querySelector(".overlap-2 .text-wrapper-3").textContent = currentNumber;
  localStorage.setItem("currentNumber", currentNumber);
  localStorage.setItem("currentTime", currentTime);
}

function incrementNumber() {
  currentNumber++;
  updateDisplay();
}

function decrementNumber() {
  if (currentNumber > 0) {
    currentNumber--;
    updateDisplay();
  }
}

function incrementTime() {
  if (currentTime < 60) {
    currentTime += 10;
  } else {
    currentTime += 60;
  }
  updateDisplay();
}

function decrementTime() {
  if (currentTime <= 60 && currentTime > 10) {
    currentTime -= 10;
  } else if (currentTime > 60) {
    currentTime -= 60;
  } else if (currentTime <= 10) {
    currentTime = 10;
  }
  updateDisplay();
}


function resetTime() {
  currentTime = defaultTime;
  updateDisplay();
}


function applyHover(index) {
  boxes.forEach((box) => box.classList.remove("hover", "hover-b"));

  if (boxes.length > 0) {
    if (index >= 0 && index < boxes.length - 2) {
      boxes[index].classList.add("hover-b");
    } else if (index >= boxes.length - 2 && index < boxes.length) {
      boxes[index].classList.add("hover");
    }
  }
}

async function fetchData() {
  try {
    const response = await fetch("input.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    const hoverStep = data.data[0];
    const button = data.data[1];
    const counter = data.counter;

    console.log("prev_counter:", prev_counter, "counter:", counter);

    if (hoverStep === 1 && prev_counter !== counter) {
      currentHoverIndex_option++;
    } else if (hoverStep === -1 && prev_counter !== counter) {
      currentHoverIndex_option--;
    }

    if (currentHoverIndex_option >= boxes.length) {
      currentHoverIndex_option = -1;
    }
    if (currentHoverIndex_option < -1) {
      currentHoverIndex_option = boxes.length - 1;
    }

    applyHover(currentHoverIndex_option);

    console.log("currentHoverIndex_option:", currentHoverIndex_option);

    localStorage.setItem("currentHoverIndex_option", currentHoverIndex_option);

    if (button === 0 && prev_counter !== counter) {
      switch (currentHoverIndex_option) {
        case 0:
          incrementNumber();
          break;
        case 1:
          decrementNumber();
          break;
        case 2:
          resetNumber();
          break;
        case 3:
          incrementTime();
          break;
        case 4:
          decrementTime();
          break;
        case 5:
          resetTime();
          break;
        case 6:
          window.location.href = urls[0];
          break;
        case 7:
          window.location.href = urls[1];
          break;
        case 8:
          window.location.href = urls[2];
          break;
        default:
          break;
      }
    }

    prev_counter = counter;
    localStorage.setItem("prev_counter", counter);

  } catch (error) {
    console.error("Error fetching or processing JSON data:", error);
  }
}

updateDisplay();

applyHover(currentHoverIndex_option);

fetchData();
setInterval(fetchData, 100);
