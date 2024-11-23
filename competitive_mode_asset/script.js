import { drawSineWaveGraph } from './sine-wave-generator.js';

localStorage.setItem("player1Status", "none");
localStorage.setItem("player2Status", "none");
localStorage.removeItem("currentHoverIndex_compt_read");

let amplitude1 = parseInt(localStorage.getItem("amplitude1"), 10) || 0;
let period1 = parseFloat(localStorage.getItem("period1")) || 1;
let frequency1 = parseFloat(localStorage.getItem("frequency1")) || 1;
let prev_counter = parseInt(localStorage.getItem("prev_counter"), 10) || 0;

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
    const counter = data.counter;

    console.log("prev_counter:", prev_counter, "counter:", counter);

    if (amp1 === 1 && prev_counter !== counter) {
      amplitude1++;
    } else if (amp1 === -1 && prev_counter !== counter) {
      amplitude1--;
    }
    amplitude1 = Math.max(0, Math.min(8, amplitude1)); // Clamp amplitude

    // Update frequency
    if (fre1 === 1 && prev_counter !== counter) {
      frequency1 += 0.5;
    } else if (fre1 === -1 && prev_counter !== counter) {
      frequency1 -= 0.5;
    }
    frequency1 = Math.max(0.1, Math.min(4, frequency1)); // Clamp frequency

    // Update period (inverse of frequency)
    period1 = 1 / frequency1;

    // Adjust period if required and recalculate frequency
    if (ped1 === 1 && prev_counter !== counter) {
      period1 += 0.125;
    } else if (ped1 === -1 && prev_counter !== counter) {
      period1 -= 0.125;
    }
    period1 = Math.max(0.25, Math.min(1, period1)); // Clamp period
    frequency1 = 1 / period1; // Recalculate frequency

    // Save updated values in localStorage
    localStorage.setItem("amplitude1", amplitude1);
    localStorage.setItem("frequency1", frequency1);
    localStorage.setItem("period1", period1);

    // Update UI elements
    const amplitudeValElement = document.getElementById("amplitude-val");
    if (amplitudeValElement) {
      amplitudeValElement.textContent = amplitude1;
    }

    const fValElement = document.getElementById("f-val");
    if (fValElement) {
      fValElement.textContent = frequency1.toFixed(1);
    }

    const periodValElement = document.getElementById("period-val");
    if (periodValElement) {
      periodValElement.textContent = period1.toFixed(3);
    }

    // Re-render sine wave
    drawSineWaveGraph('sine-wave-canvas', amplitude1, frequency1);

    prev_counter = counter;
    localStorage.setItem("prev_counter", counter);

  } catch (error) {
    console.error("Error fetching or processing JSON data:", error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  drawSineWaveGraph('sine-wave-canvas', amplitude1, frequency1);
});

setInterval(fetchData, 500);
