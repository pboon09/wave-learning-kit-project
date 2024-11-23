import { drawSineWaveGraph } from './sine-wave-generator.js';

localStorage.setItem("player1Status", "none");
localStorage.setItem("player2Status", "none");
localStorage.removeItem("currentHoverIndex_compt_read");

// User-controlled red sine wave
let amplitude1 = parseInt(localStorage.getItem("amplitude1"), 10) || 0;
let period1 = parseFloat(localStorage.getItem("period1")) || 1;
let frequency1 = parseFloat(localStorage.getItem("frequency1")) || 1;
let indexQuestion1 = parseInt(localStorage.getItem("indexQuestion1"), 10) || 0;
let last_indexQuestion1 = parseInt(localStorage.getItem("last_indexQuestion1"), 10) || 0;
let QuestionCount1 = parseInt(localStorage.getItem("QuestionCount1"), 10) || 1;
let user1_score = parseInt(localStorage.getItem("user1_score"), 10) || 0;

let maxQuestion = parseInt(localStorage.getItem("currentNumber"));
let prev_counter = parseInt(localStorage.getItem("prev_counter"), 10) || 0;

// Fixed black wave parameters from questions.json
let QuestionAmplitude = 1;
let QuestionFrequency = 1;
let UserAmplitude = 1;
let UserFrequency = 1;

// Helper function to snap to step
function snapToStep(value, step) {
  return Math.round(value / step) * step;
}

// Function to fetch initial black wave data
async function fetchQuestions() {
  try {
    const response = await fetch("questions.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const questionData = await response.json();
    const firstQuestion = questionData.questions[indexQuestion1];
    QuestionAmplitude = firstQuestion.amplitude;
    QuestionFrequency = firstQuestion.frequency;
  } catch (error) {
    console.error("Error fetching questions.json:", error);
  }
}

async function fetchAns() {
  try {
    const response = await fetch("random_ans.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const random_ans = await response.json();
    const rand = random_ans.random_ans[indexQuestion1];
    UserAmplitude = rand.amplitude;
    UserFrequency = rand.frequency;
  } catch (error) {
    console.error("Error fetching random_ans.json:", error);
  }
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
    const button1 = data.data[1];
    const counter = data.counter;

    // console.log("prev_counter:", prev_counter, "counter:", counter);
    // console.log("amp:", amplitude1, "freq:", frequency1.toFixed(1), "period:", period1.toFixed(3));
    console.log(user1_score, indexQuestion1, maxQuestion, QuestionCount1);

    if (amp1 === 1 && prev_counter !== counter) {
      amplitude1++;
    } else if (amp1 === -1 && prev_counter !== counter) {
      amplitude1--;
    }
    amplitude1 = Math.max(0, Math.min(8, amplitude1)); // Clamp amplitude

    // Check if the user adjusts the period
    if (ped1 === 1 && prev_counter !== counter) {
      period1 += 0.125; // Increment period
      period1 = Math.max(0.25, Math.min(1, snapToStep(period1, 0.125))); // Snap period to step
      frequency1 = 1 / period1; // Recalculate frequency dynamically
    } else if (ped1 === -1 && prev_counter !== counter) {
      period1 -= 0.125; // Decrement period
      period1 = Math.max(0.25, Math.min(1, snapToStep(period1, 0.125))); // Snap period to step
      frequency1 = 1 / period1; // Recalculate frequency dynamically
    }

    // Check if the user adjusts the frequency
    if (fre1 === 1 && prev_counter !== counter) {
      frequency1 += 0.5; // Increment frequency
      frequency1 = Math.max(0.5, Math.min(4, snapToStep(frequency1, 0.5))); // Snap frequency to step
      period1 = 1 / frequency1; // Recalculate period dynamically
    } else if (fre1 === -1 && prev_counter !== counter) {
      frequency1 -= 0.5; // Decrement frequency
      frequency1 = Math.max(0.5, Math.min(4, snapToStep(frequency1, 0.5))); // Snap frequency to step
      period1 = 1 / frequency1; // Recalculate period dynamically
    }

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

    if(button1 == 0 && prev_counter != counter){
      if(QuestionAmplitude == amplitude1 && QuestionFrequency == frequency1.toFixed(1)){
        user1_score++;
      }
      last_indexQuestion1 = indexQuestion1;
      indexQuestion1 = Math.floor(Math.random() * 200);
      QuestionCount1++;
      // if(QuestionCount1 > maxQuestion){
      //   localStorage.setItem("user1_status", "done");
      //   window.location.href = "competitive_result.html";
      // }
      window.location.href = "competitive_show_ans.html";
    }

    prev_counter = counter;
    localStorage.setItem("prev_counter", counter);
    localStorage.setItem("indexQuestion1", indexQuestion1);
    localStorage.setItem("last_indexQuestion1", last_indexQuestion1);
    localStorage.setItem("QuestionCount1", QuestionCount1);
    localStorage.setItem("user1_score", user1_score);

  } catch (error) {
    console.error("Error fetching or processing JSON data:", error);
  }
}

// Initialize black wave and render graph
document.addEventListener('DOMContentLoaded', async () => {
  await fetchQuestions();
  await fetchAns();
  drawSineWaveGraph(
    'sine-wave-canvas',
    { amplitude: QuestionAmplitude, frequency: QuestionFrequency, color: "black" }
  );
});

setInterval(fetchData, 100);
