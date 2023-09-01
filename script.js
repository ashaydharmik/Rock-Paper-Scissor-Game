// rule button script

const ruleBtn = document.getElementById("rule-btn");
const ruleBox = document.querySelector(".rule-container");
const cancelBtn = document.getElementById("cancel");

ruleBtn.addEventListener("click", () => {
  ruleBox.style.display = "flex";
});

cancelBtn.addEventListener("click", () => {
  ruleBox.style.display = "none";
});


// game-container logic

const userChoiceDisplay = document.querySelector(".btn-left");
const computerChoiceDisplay = document.querySelector(".btn-right");
const resultDisplay = document.querySelector("#result");
const possibleChoices = document.querySelectorAll(".userBtn");
const gameBox = document.querySelector(".game-container");
const winBox = document.querySelector(".win-container");
const nextBtn = document.getElementById("next-btn");
const u_score = JSON.parse(localStorage.getItem("userScore"));
const c_score = JSON.parse(localStorage.getItem("computerScore"));
const userScoreNum = document.getElementById("userScore");
const computerScoreNum = document.getElementById("computerScore");
const pcLine = document.getElementById("againstPc");
const playAgainBtn = document.getElementById("btn-change");

if (u_score) {
  userScoreNum.innerText = u_score;
}
if (c_score) {
  computerScoreNum.innerText = c_score;
}
let userCount = 0;
let computerCount = 0;

let userChoice;
let computerChoice;
let result;

let resultShown = false;

//for making buttons un-functional after getting result
const makeBtnStatic = () => {
  possibleChoices.forEach((button) => {
    button.disabled = true;
  });
};

//taking user choice
possibleChoices.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (resultShown) {
      return;
    }
    userChoice = e.currentTarget;

    gameBox.style.display = "none";
    winBox.style.display = "flex";

    userChoiceDisplay.innerHTML = "";
    userChoiceDisplay.appendChild(userChoice);

    generateComputerChoice();

    getResult();

    makeBtnStatic();
  });
});

//taking computer choice
const generateComputerChoice = () => {
const randomNumber = Math.floor(Math.random() * possibleChoices.length);
computerChoice = possibleChoices[randomNumber];
computerChoiceDisplay.innerHTML = "";
computerChoiceDisplay.appendChild(computerChoice);
};

//attaching winners outer circle layer
const removeWinnerStyle = () => {
  possibleChoices.forEach((button) => {
    button.classList.remove("winner-style");
  });
};

//getting result of the game
const getResult = () => {
  const userId = userChoice.id;
  const computerId = computerChoice.id;

  if (userId === computerId) {
    resultDisplay.innerHTML = "TIE UP";
    userChoiceDisplay.appendChild(userChoice.cloneNode(true));
    pcLine.style.display = "none";
    playAgainBtn.innerText = "REPLAY";
  } else if (
    (userId === "rock-bg" && computerId === "scissor-bg") ||
    (userId === "paper-bg" && computerId === "rock-bg") ||
    (userId === "scissor-bg" && computerId === "paper-bg")
  ) {
    resultDisplay.innerHTML = "YOU WIN";
    userChoice.classList.add("winner-style");
    nextBtn.style.display = "inline-block";
    userCount = u_score;
    userCount++;
    userScoreNum.innerText = userCount;
    localStorage.setItem("userScore", JSON.stringify(userCount));
  } else {
    resultDisplay.innerHTML = "YOU LOST";
    computerChoice.classList.add("winner-style");
    ruleBox.style.right = 0;
    computerCount = c_score;
    computerCount++;
    computerScoreNum.innerText = computerCount;
    localStorage.setItem("computerScore", JSON.stringify(computerCount));
  }
};
