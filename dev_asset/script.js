const boxes = [
  document.getElementById("back"),
  document.getElementById("home")
];

const urls = [
  "home_page.html",
  "home_page.html"
];

localStorage.removeItem("currentHoverIndex");
let currentHoverIndex_dev = parseInt(localStorage.getItem("currentHoverIndex_dev"), 10);
if (isNaN(currentHoverIndex_dev)) {
  currentHoverIndex_dev = -1;
}

let prev_hoverstep = 0;
let prev_button = null;

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

    if (hoverStep === 1 && prev_hoverstep === 0) {
      currentHoverIndex_dev++;
    } else if (hoverStep === -1 && prev_hoverstep === 0) {
      currentHoverIndex_dev--;
    }

    if (currentHoverIndex_dev >= boxes.length) {
      currentHoverIndex_dev = -1;
    }
    if (currentHoverIndex_dev < -1) {
      currentHoverIndex_dev = boxes.length - 1;
    }

    prev_hoverstep = hoverStep;

    applyHover(currentHoverIndex_dev);

    console.log("currentHoverIndex_dev:", currentHoverIndex_dev);

    localStorage.setItem("currentHoverIndex_dev", currentHoverIndex_dev);

    if (button === 0 && prev_button !== 0) {
      const urlIndex = currentHoverIndex_dev;
      currentHoverIndex_dev = -1;
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

applyHover(currentHoverIndex_dev);
fetchData();
setInterval(fetchData, 500);
