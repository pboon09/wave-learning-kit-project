const boxes = [
  document.getElementById("back"),
  document.getElementById("home")
];

const urls = [
  "option_page.html",
  "home_page.html"
];

localStorage.removeItem("currentHoverIndex_option");
let currentHoverIndex_compt_read = parseInt(localStorage.getItem("currentHoverIndex_compt_read"), 10);
if (isNaN(currentHoverIndex_compt_read)) {
  currentHoverIndex_compt_read = -1;
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
    const button1 = data.data[1];
    const button2 = data.data[9];
    const counter = data.counter;

    console.log("prev_counter:", prev_counter, "counter:", counter);

    if (hoverStep === 1 && prev_counter !== counter) {
      currentHoverIndex_compt_read++;
    } else if (hoverStep === -1 && prev_counter !== counter) {
      currentHoverIndex_compt_read--;
    }

    if (currentHoverIndex_compt_read >= boxes.length) {
      currentHoverIndex_compt_read = -1;
    } else if (currentHoverIndex_compt_read < -1) {
      currentHoverIndex_compt_read = boxes.length - 1;
    }

    applyHover(currentHoverIndex_compt_read);

    console.log("currentHoverIndex_compt_read:", currentHoverIndex_compt_read);

    localStorage.setItem("currentHoverIndex_compt_read", currentHoverIndex_compt_read);

    if (button1 === 0 && prev_counter !== counter && currentHoverIndex_compt_read === -1) {
      localStorage.setItem("player1Status", "ready");
    } else if (button2 === 0 && prev_counter !== counter && currentHoverIndex_compt_read === -1) {
      localStorage.setItem("player2Status", "ready");
    }

    if (button1 === 0 && prev_counter !== counter) {
      const urlIndex = currentHoverIndex_compt_read;
      if (urlIndex >= 0 && urlIndex < urls.length) {
        const targetUrl = urls[urlIndex];
        console.log("Navigating to:", targetUrl);
        window.location.href = targetUrl;
      }
    }

    prev_counter = counter;
    localStorage.setItem("prev_counter", counter);

  } catch (error) {
    console.error("Error fetching or processing JSON data:", error);
  }
}

applyHover(currentHoverIndex_compt_read);
fetchData();
setInterval(fetchData, 500);
