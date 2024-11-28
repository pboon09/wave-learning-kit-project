import { drawSineWaveGraph } from './sine-wave-generator.js';

const boxes = [
  document.getElementById("back"),
  document.getElementById("home")
];

const urls = [
  "learning_select_page.html",
  "home_page.html"
];

localStorage.removeItem("currentHoverIndex_Learning_Select");

let currentHoverIndex_Anatomy = parseInt(localStorage.getItem("currentHoverIndex_Anatomy"), 10);
if (isNaN(currentHoverIndex_Anatomy)) {
  currentHoverIndex_Anatomy = -1;
}

let amplitude1 = parseInt(localStorage.getItem("amplitude1"), 10) || 1;
let period1 = parseFloat(localStorage.getItem("period1")) || 1;
let frequency1 = parseFloat(localStorage.getItem("frequency1")) || 1;
let velocity1 = parseInt(localStorage.getItem("velocity1"), 10) || 1;

let prev_counter = parseInt(localStorage.getItem("prev_counter"), 10) || 0;

let QuestionAmplitude = 1;
let QuestionFrequency = 1;

function snapToStep(value, step) {
  return Math.round(value / step) * step;
}

// Function to fetch user input data
async function fetchData() {
  try {
    const response = await fetch("input.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    const amp1 = data.data[2];
    const fre1 = data.data[4];
    const ped1 = data.data[5];
    const vel1 = data.data[7];
    const button1 = data.data[1];
    const counter = data.counter;

    if (amp1 === 1 && prev_counter !== counter) {
      amplitude1++;
    } else if (amp1 === -1 && prev_counter !== counter) {
      amplitude1--;
    }
    amplitude1 = Math.max(0, Math.min(8, amplitude1));

    if (ped1 === 1 && prev_counter !== counter) {
      period1 += 0.125;
      period1 = Math.max(0.25, Math.min(1, snapToStep(period1, 0.125)));
      frequency1 = 1 / period1;
    } else if (ped1 === -1 && prev_counter !== counter) {
      period1 -= 0.125;
      period1 = Math.max(0.25, Math.min(1, snapToStep(period1, 0.125)));
      frequency1 = 1 / period1;
    }

    if (fre1 === 1 && prev_counter !== counter) {
      frequency1 += 0.5;
      frequency1 = Math.max(0.5, Math.min(4, snapToStep(frequency1, 0.5)));
      period1 = 1 / frequency1;
    } else if (fre1 === -1 && prev_counter !== counter) {
      frequency1 -= 0.5;
      frequency1 = Math.max(0.5, Math.min(4, snapToStep(frequency1, 0.5)));
      period1 = 1 / frequency1;
    }

    if (vel1 === 1 && prev_counter !== counter) {
      velocity1 += 0.5;
    } else if (vel1 === -1 && prev_counter !== counter) {
      velocity1 -= 0.5;
    }
    velocity1 = Math.max(0.5, Math.min(4, velocity1));

    localStorage.setItem("amplitude1", amplitude1);
    localStorage.setItem("frequency1", frequency1);
    localStorage.setItem("period1", period1);
    localStorage.setItem("velocity1", velocity1);

    const amplitudeValElement_red = document.getElementById("amplitude-red");
    if (amplitudeValElement_red) {
      amplitudeValElement_red.textContent = amplitude1;
    }

    const fValElement_red = document.getElementById("f-red");
    if (fValElement_red) {
      fValElement_red.textContent = frequency1.toFixed(1);
    }

    const periodValElement_red = document.getElementById("period-red");
    if (periodValElement_red) {
      periodValElement_red.textContent = period1.toFixed(3);
    }

    const velocityElement_red = document.getElementById("vel-red");
    if (velocityElement_red) {
      velocityElement_red   .textContent = period1.toFixed(1);
    }

    if(button1 == 0 && prev_counter != counter){
      if (currentHoverIndex_Anatomy >= 0 && currentHoverIndex_Anatomy < boxes.length) {
        const targetUrl = urls[currentHoverIndex_Anatomy];
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

// Initialize black wave and render graph
document.addEventListener('DOMContentLoaded', async () => {
  drawSineWaveGraph(
    'sine-wave-canvas',
    { amplitude: amplitude1, frequency: frequency1, color: "black", velocity: velocity1},
  );
});

setInterval(fetchData, 100);
