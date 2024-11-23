import { drawSineWaveGraph } from './sine-wave-generator.js';
// User-controlled red sine wave
let amplitude1 = localStorage.getItem("amplitude1");
let period1 = localStorage.getItem("period1");
let frequency1 = localStorage.getItem("frequency1");
let last_indexQuestion1 = localStorage.getItem("last_indexQuestion1");
let QuestionCount1 = localStorage.getItem("QuestionCount1");

let maxQuestion = parseInt(localStorage.getItem("currentNumber"));

// Fixed black wave parameters from questions.json
let QuestionAmplitude = 1;
let QuestionFrequency = 1;

// Function to fetch initial black wave data
async function fetchQuestions() {
  try {
    const response = await fetch("questions.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const questionData = await response.json();
    const firstQuestion = questionData.questions[last_indexQuestion1];
    QuestionAmplitude = firstQuestion.amplitude;
    QuestionFrequency = firstQuestion.frequency;
  } catch (error) {
    console.error("Error fetching questions.json:", error);
  }
}

// Function to fetch user input data
function setCooldown() {
  const amplitudeValElement = document.getElementById("amplitude-val");
  if (amplitudeValElement) {
    amplitudeValElement.textContent = amplitude1;
  }

  const fValElement = document.getElementById("f-val");
  if (fValElement) {
    fValElement.textContent = frequency1.toFixed(1);;
  }

  const periodValElement = document.getElementById("period-val");
  if (periodValElement) {
    periodValElement.textContent = period1.toFixed(3);;
  }
  
  setTimeout(() => {
    if(QuestionCount1 > maxQuestion){
      localStorage.setItem("user1_status", "done");
      window.location.href = "competitive_result.html";
    }
    else{
      window.location.href = "competitive_mode.html";
    }
  }, 1500);
}

// Initialize black wave and render graph
document.addEventListener('DOMContentLoaded', async () => {
  await fetchQuestions();
  drawSineWaveGraph(
    'sine-wave-canvas',
    { amplitude: QuestionAmplitude, frequency: QuestionFrequency, color: "black" },
    { amplitude: amplitude1, frequency: frequency1, color: "red" }
  );
});

setCooldown();
