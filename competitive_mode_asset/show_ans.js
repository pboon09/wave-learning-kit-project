import { drawSineWaveGraph } from './sine-wave-generator.js';

localStorage.removeItem('time_limit');

let amplitude1 = localStorage.getItem("amplitude1");
let frequency1 = localStorage.getItem("frequency1");

let amplitude2 = localStorage.getItem("amplitude2");
let frequency2 = localStorage.getItem("frequency2");

let maxQuestion = parseInt(localStorage.getItem("currentNumber"));
let last_indexQuestion = localStorage.getItem("last_indexQuestion");
let QuestionCount = localStorage.getItem("QuestionCount");

let QuestionAmplitude = 1;
let QuestionFrequency = 1;
let QuestionPeriod = 1;

async function fetchQuestions() {
  try {
    const response = await fetch("questions.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const questionData = await response.json();
    const firstQuestion = questionData.questions[last_indexQuestion];
    QuestionAmplitude = firstQuestion.amplitude;
    QuestionFrequency = firstQuestion.frequency;
    QuestionPeriod = 1/QuestionFrequency;
  } catch (error) {
    console.error("Error fetching questions.json:", error);
  }
}

async function setCooldown() {
  await fetchQuestions();
  const amplitudeValElement_red = document.getElementById("amplitude-red");
  if (amplitudeValElement_red) {
    amplitudeValElement_red.textContent = QuestionAmplitude;
  }

  const fValElement_red = document.getElementById("f-red");
  if (fValElement_red) {
    fValElement_red.textContent = QuestionFrequency.toFixed(1);
  }

  const periodValElement_red = document.getElementById("period-red");
  if (periodValElement_red) {
    periodValElement_red.textContent = QuestionPeriod.toFixed(3);
  }

  const amplitudeValElement_blue = document.getElementById("amplitude-blue");
  if (amplitudeValElement_blue) {
    amplitudeValElement_blue.textContent = QuestionAmplitude;
  }

  const fValElement_blue = document.getElementById("f-blue");
  if (fValElement_blue) {
    fValElement_blue.textContent = QuestionFrequency.toFixed(1);
  }

  const periodValElement_blue = document.getElementById("period-blue");
  if (periodValElement_blue) {
    periodValElement_blue.textContent = QuestionPeriod.toFixed(3);
  }
  
  setTimeout(() => {
    if(QuestionCount > maxQuestion){
      window.location.href = "competitive_result.html";
    }
    else{
      localStorage.setItem("user1_status", "none");
      localStorage.setItem("user2_status", "none");
      window.location.href = "competitive_mode.html";
    }
  }, 1500);
}

document.addEventListener('DOMContentLoaded', async () => {
  await fetchQuestions();
  drawSineWaveGraph(
    'sine-wave-canvas',
    { amplitude: QuestionAmplitude, frequency: QuestionFrequency, color: "black" },
    { amplitude: amplitude1, frequency: frequency1, color: "red" },
    { amplitude: amplitude2, frequency: frequency2, color: "blue" }
  );
});

setCooldown();
