const boxes = [
  document.getElementById("box1"),
  document.getElementById("box2"),
  document.getElementById("box3"),
];

const urls = [
  "dev.html",
  "option_page.html",
  "dev.html",
];

localStorage.setItem("player1Status", "none");
localStorage.setItem("player2Status", "none");
localStorage.removeItem("currentHoverIndex_option");
localStorage.removeItem("currentHoverIndex_dev");
localStorage.removeItem("currentHoverIndex_compt_read");
localStorage.removeItem("amplitude1");
localStorage.removeItem("period1");
localStorage.removeItem("frequency1");
let currentHoverIndex = parseInt(localStorage.getItem("currentHoverIndex"), 10);
if (isNaN(currentHoverIndex)) {
  currentHoverIndex = -1;
}

let prev_counter = parseInt(localStorage.getItem("prev_counter"), 10);
if (isNaN(prev_counter)) {
  prev_counter = 0;
}

function applyHover(index) {
  boxes.forEach((box) => box.classList.remove("hover"));

  if (index >= 0 && index < boxes.length) {
    boxes[index].classList.add("hover");
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
      currentHoverIndex++;
    } else if (hoverStep === -1 && prev_counter !== counter) {
      currentHoverIndex--;
    }

    if (currentHoverIndex >= boxes.length) {
      currentHoverIndex = -1;
    }
    if (currentHoverIndex < -1) {
      currentHoverIndex = boxes.length - 1;
    }

    applyHover(currentHoverIndex);

    console.log("currentHoverIndex:", currentHoverIndex);

    localStorage.setItem("currentHoverIndex", currentHoverIndex);

    if (button === 0 && prev_counter !== counter) {
      if (currentHoverIndex >= 0 && currentHoverIndex < boxes.length) {
        const targetUrl = urls[currentHoverIndex];
        console.log(`Navigating to ${targetUrl}`);
        window.location.href = targetUrl;
      }
    }

    prev_counter = counter;
    localStorage.setItem("prev_counter", counter);

  } catch (error) {
    console.error("Error fetching or processing JSON data:", error);
  }
}

applyHover(currentHoverIndex);
fetchData();
setInterval(fetchData, 100);
