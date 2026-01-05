"use strict";

const CARROT_SIZE = 100;
const CARROT_COUNT = 20;
const BUG_COUNT = 20;
const GAME_DURATION = 15;

const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector(".game__button");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");
const popUp = document.querySelector(".pop-up");
const popUpText = document.querySelector(".pop-up__message");
const popUpRefresh = document.querySelector(".pop-up__refresh");

const carrotSound = new Audio("./sound/carrot_pull.mp3");
const alertSound = new Audio("./sound/alert.wav");
const failSound = new Audio("./sound/bug_pull.mp3");
const winSound = new Audio("./sound/game_win.mp3");
const bgSound = new Audio("./sound/bg.mp3");

let started = false;
let score;
let timer = undefined;

gameBtn.addEventListener("click", () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

popUpRefresh.addEventListener("click", () => {
  startGame();
  hidePopUp();
});

function startGame() {
  started = true;
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
  playSound(bgSound);
}

function stopGame() {
  started = false;
  stopGameTimer();
  hideGameButton();
  showPopupText("Replay");
  score = 0;
  playSound(alertSound);
  stopSound(bgSound);
}

function finishGame(win) {
  started = false;
  hideGameButton();

  if (win) {
    playSound(winSound);
  } else {
    playSound(failSound);
  }
  stopGameTimer();
  stopSound(bgSound);
  showPopupText(win ? "YOU WON!" : "YOU LOST!");
}

function initGame() {
  score = 0;
  field.innerHTML = "";
  gameScore.innerText = CARROT_COUNT;

  addItem("carrot", CARROT_COUNT, "img/carrot.png");
  addItem("bug", BUG_COUNT, "img/bug.png");
  field.addEventListener("click", (event) => onFieldClick(event));
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - CARROT_SIZE;
  const y2 = fieldRect.height - CARROT_SIZE;
  for (let i = 0; i < count; i++) {
    const item = document.createElement("img");
    item.setAttribute("class", className);
    item.setAttribute("src", imgPath);
    item.style.position = "absolute";
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
}

function onFieldClick() {
  if (!started) {
    return;
  }

  const target = event.target;
  if (target.matches(".carrot")) {
    playSound(carrotSound);
    target.remove();
    score++;
    updateScoreBoard();

    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (target.matches(".bug")) {
    playSound(failSound);
    stopGameTimer();
    finishGame(false);
  }
}

function updateScoreBoard() {
  console.log(`score ${score}`);
  gameScore.innerText = CARROT_COUNT - score;
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerText = `${minutes}:${seconds}`;
}

function startGameTimer() {
  let remainingTime = GAME_DURATION;
  updateTimerText(remainingTime);

  timer = setInterval(() => {
    if (remainingTime <= 0) {
      clearInterval(timer);

      if (started) {
        finishGame(CARROT_COUNT === score);
      }
      return;
    }
    updateTimerText(--remainingTime);
  }, 1000);
}

function showStopButton() {
  const icon = gameBtn.querySelector(".fas");
  icon.classList.add("fa-stop");
  gameBtn.style.visibility = "visible";
}

function hideGameButton() {
  gameBtn.style.visibility = "hidden";
}

function showTimerAndScore() {
  gameTimer.style.visibility = "visible";
  gameScore.style.visibility = "visible";
}

function stopGameTimer() {
  clearInterval(timer);
}

function showPopupText(text) {
  popUpText.innerText = text;
  popUp.classList.remove("pop-up__hide");
}

function hidePopUp() {
  popUp.classList.add("pop-up__hide");
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}
