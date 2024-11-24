const boxes = [
  document.getElementById("box1"),
  document.getElementById("box2"),
  document.getElementById("box3"),
  document.getElementById("box4"),
  document.getElementById("box5"),
  document.getElementById("back"),
  document.getElementById("home"),
];

const urls = [
  "learning_anatomy.html",
  "dev.html",
  "dev.html",
  "dev.html",
  "dev.html",
  "home_page.html",
  "home_page.html",
];

localStorage.removeItem("currentHoverIndex");

let currentHoverIndex_Learning_Select = parseInt(localStorage.getItem("currentHoverIndex_Learning_Select"), 10);
if (isNaN(currentHoverIndex_Learning_Select)) {
  currentHoverIndex_Learning_Select = -1;
}

let prev_counter = parseInt(localStorage.getItem("prev_counter"), 10);
if (isNaN(prev_counter)) {
  prev_counter = 0;
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
      currentHoverIndex_Learning_Select++;
    } else if (hoverStep === -1 && prev_counter !== counter) {
      currentHoverIndex_Learning_Select--;
    }

    if (currentHoverIndex_Learning_Select >= boxes.length) {
      currentHoverIndex_Learning_Select = -1;
    }
    if (currentHoverIndex_Learning_Select < -1) {
      currentHoverIndex_Learning_Select = boxes.length - 1;
    }

    applyHover(currentHoverIndex_Learning_Select);

    console.log("currentHoverIndex_Learning_Select:", currentHoverIndex_Learning_Select);

    localStorage.setItem("currentHoverIndex_Learning_Select", currentHoverIndex_Learning_Select);

    if (button === 0 && prev_counter !== counter) {
      if (currentHoverIndex_Learning_Select >= 0 && currentHoverIndex_Learning_Select < boxes.length) {
        const targetUrl = urls[currentHoverIndex_Learning_Select];
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

applyHover(currentHoverIndex_Learning_Select);
fetchData();
setInterval(fetchData, 100);
