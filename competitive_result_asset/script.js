let maxQuestion = localStorage.getItem("currentNumber")
let user1_score = localStorage.getItem("user1_score");
let user2_score = localStorage.getItem("user2_score");

async function fetchData(){
  console.log(maxQuestion, user1_score, user2_score);
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
    blue_score.textContent = user2_score;
  }

  setTimeout(() => {
    if(user1_score > user2_score){
      window.location.href = "competitive_win_red.html";
    } else if(user1_score < user2_score){
      window.location.href = "competitive_win_blue.html";
    }
    else{
      window.location.href = "competitive_win_tie.html";
    }
  }, 5000);
}

setInterval(fetchData, 100);