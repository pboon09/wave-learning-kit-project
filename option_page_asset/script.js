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
let currentHoverIndex_option = parseInt(localStorage.getItem("currentHoverIndex_option"), 10);
if (isNaN(currentHoverIndex_option)) {
  currentHoverIndex_option = -1;
}

let prev_hoverstep = 0;
let prev_button = null;

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

    if (hoverStep === 1 && prev_hoverstep === 0) {
      currentHoverIndex_option++;
    } else if (hoverStep === -1 && prev_hoverstep === 0) {
      currentHoverIndex_option--;
    }

    if (currentHoverIndex_option >= boxes.length) {
      currentHoverIndex_option = -1;
    }
    if (currentHoverIndex_option < -1) {
      currentHoverIndex_option = boxes.length - 1;
    }

    prev_hoverstep = hoverStep;

    applyHover(currentHoverIndex_option);

    console.log("currentHoverIndex_option:", currentHoverIndex_option);

    localStorage.setItem("currentHoverIndex_option", currentHoverIndex_option);

    if (button === 0 && prev_button !== 0) {
      const urlIndex = currentHoverIndex_option - 6;
      if (urlIndex >= 0 && urlIndex < urls.length) {
        const targetUrl = urls[urlIndex];
        prev_button = button;
        console.log(`Navigating to ${targetUrl}`);
        window.location.href = targetUrl;
      }
    }

  } catch (error) {
    console.error("Error fetching or processing JSON data:", error);
  }
}

applyHover(currentHoverIndex_option);
fetchData();
setInterval(fetchData, 500);
