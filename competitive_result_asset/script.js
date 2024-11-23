localStorage.removeItem("amplitude1");
localStorage.removeItem("period1");
localStorage.removeItem("frequency1");
localStorage.removeItem("indexQuestion1");
localStorage.removeItem("QuestionCount1");

let maxQuestion = parseInt(localStorage.getItem("currentNumber"));
let user1_score = parseInt(localStorage.getItem("user1_score"));
let user1_status = localStorage.getItem("user1_status");

async function fetchData(){
  console.log(maxQuestion, user1_score, user1_status);
  const total_question = document.getElementById("total-question");
  if (total_question) {
    total_question.textContent = maxQuestion;
  }
  
  const red_score = document.getElementById("red-score");
  if (red_score) {
    red_score.textContent = user1_score;
  }
  
  const blue_score = document.getElementById("blue-score");
  if (blue_score) {
    blue_score.textContent = 14;
  }

  if(user1_status == "done") {
    setTimeout(() => {
      window.location.href = "competitive_win_red.html";
    }, 5000);
  }
}

setInterval(fetchData, 100);