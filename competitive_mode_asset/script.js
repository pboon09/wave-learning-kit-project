import { drawSineWaveGraph } from './sine-wave-generator.js';

localStorage.setItem("player1Status", "none");
localStorage.setItem("player2Status", "none");
localStorage.removeItem("currentHoverIndex_compt_read");

let amplitude1 = parseInt(localStorage.getItem("amplitude1"), 10) || 0;
let period1 = parseFloat(localStorage.getItem("period1")) || 1;
let frequency1 = parseFloat(localStorage.getItem("frequency1")) || 1;
let user1_score = parseInt(localStorage.getItem("user1_score"), 10) || 0;

let amplitude2 = parseInt(localStorage.getItem("amplitude2"), 10) || 0;
let period2 = parseFloat(localStorage.getItem("period2")) || 1;
let frequency2 = parseFloat(localStorage.getItem("frequency2")) || 1;
let user2_score = parseInt(localStorage.getItem("user2_score"), 10) || 0;

let user1_status = localStorage.getItem("user1_status") || "none";
let user2_status = localStorage.getItem("user2_status") || "none";

let indexQuestion = parseInt(localStorage.getItem("indexQuestion"), 10) || Math.floor(Math.random() * 200);
let last_indexQuestion = parseInt(localStorage.getItem("last_indexQuestion"), 10) || 0;
let QuestionCount = parseInt(localStorage.getItem("QuestionCount"), 10) || 1;

let maxQuestion = parseInt(localStorage.getItem("currentNumber"));
let default_time = parseInt(localStorage.getItem("currentTime"));
let time_limit = parseInt(localStorage.getItem("time_limit"),10) || default_time;
let prev_counter = parseInt(localStorage.getItem("prev_counter"), 10) || 0;

let QuestionAmplitude = 1;
let QuestionFrequency = 1;

let countdownInterval;

function startCountdown() {
  clearInterval(countdownInterval);
  countdownInterval = setInterval(() => {
    if (time_limit > 0) {
      time_limit--;
      localStorage.setItem("time_limit", time_limit);
    }
    else if (time_limit <= 0){
      clearInterval(countdownInterval);
    }
  }, 1000);
}

function snapToStep(value, step) {
  return Math.round(value / step) * step;
}

async function fetchQuestions() {
  try {
    const response = await fetch("questions.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const questionData = await response.json();
    const firstQuestion = questionData.questions[indexQuestion];
    QuestionAmplitude = firstQuestion.amplitude;
    QuestionFrequency = firstQuestion.frequency;
  } catch (error) {
    console.error("Error fetching questions.json:", error);
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

    const amp2 = data.data[10];
    const fre2 = data.data[12];
    const ped2 = data.data[13];
    const button2 = data.data[9];

    const counter = data.counter;

    // console.log("prev_counter:", prev_counter, "counter:", counter);
    // console.log("amp:", amplitude1, "freq:", frequency1.toFixed(1), "period:", period1.toFixed(3));

    console.log(user1_score, user2_score, indexQuestion, maxQuestion, QuestionCount, user1_status, user2_status, time_limit);

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

    localStorage.setItem("amplitude1", amplitude1);
    localStorage.setItem("frequency1", frequency1);
    localStorage.setItem("period1", period1);

    ///////////

    if (amp2 === 1 && prev_counter !== counter) {
      amplitude2++;
    } else if (amp2 === -1 && prev_counter !== counter) {
      amplitude2--;
    }
    amplitude2 = Math.max(0, Math.min(8, amplitude2));

    if (ped2 === 1 && prev_counter !== counter) {
      period2 += 0.125;
      period2 = Math.max(0.25, Math.min(1, snapToStep(period2, 0.125)));
      frequency2 = 1 / period2;
    } else if (ped2 === -1 && prev_counter !== counter) {
      period2 -= 0.125;
      period2 = Math.max(0.25, Math.min(1, snapToStep(period2, 0.125)));
      frequency2 = 1 / period2;
    }

    if (fre2 === 1 && prev_counter !== counter) {
      frequency2 += 0.5;
      frequency2 = Math.max(0.5, Math.min(4, snapToStep(frequency2, 0.5)));
      period2 = 1 / frequency2;
    } else if (fre2 === -1 && prev_counter !== counter) {
      frequency2 -= 0.5;
      frequency2 = Math.max(0.5, Math.min(4, snapToStep(frequency2, 0.5)));
      period2 = 1 / frequency2;
    }

    localStorage.setItem("amplitude2", amplitude2);
    localStorage.setItem("frequency2", frequency2);
    localStorage.setItem("period2", period2);

    ///////////

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

    ///////////

    const amplitudeValElement_blue = document.getElementById("amplitude-blue");
    if (amplitudeValElement_blue) {
      amplitudeValElement_blue.textContent = amplitude2;
    }

    const fValElement_blue = document.getElementById("f-blue");
    if (fValElement_blue) {
      fValElement_blue.textContent = frequency2.toFixed(1);
    }

    const periodValElement_blue = document.getElementById("period-blue");
    if (periodValElement_blue) {
      periodValElement_blue.textContent = period2.toFixed(3);
    }

    if(button1 == 0 && prev_counter != counter){
      if(QuestionAmplitude == amplitude1 && QuestionFrequency == frequency1.toFixed(1)){
        last_indexQuestion = indexQuestion;
        indexQuestion = Math.floor(Math.random() * 200);
        QuestionCount++;
        user1_score++;
        window.location.href = "competitive_show_ans.html";
      }
      else{
        localStorage.setItem("user1_status", "wait");
      }
    }

    if(button2 == 0 && prev_counter != counter){
      if(QuestionAmplitude == amplitude2 && QuestionFrequency == frequency2.toFixed(1)){
        last_indexQuestion = indexQuestion;
        indexQuestion = Math.floor(Math.random() * 200);
        QuestionCount++;
        user2_score++;
        window.location.href = "competitive_show_ans.html";
      }
      else{
        localStorage.setItem("user2_status", "wait");
      }
    }

    if(user1_status == "wait"){
      document.getElementById("display-bar").classList.add("ans");
    }
    else if(user2_status == "wait"){
      document.getElementById("display-bar-2").classList.add("ans");
    }

    if(user1_status == "none"){
      document.getElementById("display-bar").classList.remove("ans");
    }
    else if(user2_status == "none"){
      document.getElementById("display-bar-2").classList.remove("ans");
    }

    if((user1_status == "wait" && user2_status == "wait") || time_limit <= 0){
      last_indexQuestion = indexQuestion;
      indexQuestion = Math.floor(Math.random() * 200);
      QuestionCount++;
      window.location.href = "competitive_show_ans.html";
    }

    prev_counter = counter;
    localStorage.setItem("prev_counter", counter);
    localStorage.setItem("indexQuestion", indexQuestion);
    localStorage.setItem("last_indexQuestion", last_indexQuestion);
    localStorage.setItem("QuestionCount", QuestionCount);

    localStorage.setItem("user1_score", user1_score);
    localStorage.setItem("user2_score", user2_score);

  } catch (error) {
    console.error("Error fetching or processing JSON data:", error);
  }
}

// Initialize black wave and render graph
document.addEventListener('DOMContentLoaded', async () => {
  await fetchQuestions();
  drawSineWaveGraph(
    'sine-wave-canvas',
    { amplitude: QuestionAmplitude, frequency: QuestionFrequency, color: "black" }
  );
  startCountdown();
});

setInterval(fetchData, 100);
