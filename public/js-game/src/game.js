"use strict";

import * as sound from "./sounds.js";
import { Field, ItemType } from "./field.js";

export const Status = Object.freeze({
  win: "win",
  lose: "lose",
  cancel: "cancel",
});

// Builder Pattern
export class GameBuilder {
  gameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }

  carrotCount(num) {
    this.carrotCount = num;
    return this;
  }

  bugCount(num) {
    this.bugCount = num;
    return this;
  }

  build() {
    return new Game(
      this.gameDuration, //
      this.carrotCount,
      this.bugCount
    );
  }
}

export class Game {
  constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.gameTimer = document.querySelector(".game__timer");
    this.gameScore = document.querySelector(".game__score");

    this.gameBtn = document.querySelector(".game__button");
    this.gameBtn.addEventListener("click", () => {
      // console.log("ok");
      if (this.started) {
        this.stop(Status.cancel);
      } else {
        this.start();
      }
    });

    this.gameField = new Field(this.carrotCount, this.bugCount);
    this.gameField.setClickListener(this.onItemClick);

    this.started = false;
    this.score = 0;
    this.timer = undefined;
  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  start() {
    this.started = true;
    this.initGame();
    this.showStopButton();
    this.showTimerAndScore();
    this.startGameTimer();
    sound.playBackground();
  }

  stop(status) {
    this.started = false;
    this.stopGameTimer();
    this.hideGameButton();
    sound.stopBackground();

    this.onGameStop && this.onGameStop(status);
  }

  onItemClick = (item) => {
    if (!this.started) {
      return;
    }
    // console.log("clicked");
    if (item === ItemType.carrot) {
      this.score++;
      this.updateScoreBoard();
      if (this.score === this.carrotCount) {
        this.stop(Status.win);
      }
    } else if (item === ItemType.bug) {
      this.stop(Status.lose);
    }
  };

  initGame() {
    // console.log(fieldRect);
    this.score = 0;
    this.gameScore.innerText = this.carrotCount;
    this.gameField.init();
  }

  showStopButton() {
    const icon = this.gameBtn.querySelector(".fas");
    icon.classList.add("fa-stop");
    this.gameBtn.style.visibility = "visible";
  }

  hideGameButton() {
    this.gameBtn.style.visibility = "hidden";
  }

  showTimerAndScore() {
    this.gameTimer.style.visibility = "visible";
    this.gameScore.style.visibility = "visible";
  }

  startGameTimer() {
    let remainingTime = this.gameDuration;
    this.updateTimerText(remainingTime);

    this.timer = setInterval(() => {
      if (remainingTime <= 0) {
        clearInterval(this.timer);

        if (this.started) {
          this.stop(this.carrotCount === this.score ? Status.win : Status.lose);
        }

        return;
      }
      this.updateTimerText(--remainingTime);
    }, 1000);
  }

  stopGameTimer() {
    clearInterval(this.timer);
  }

  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.gameTimer.innerText = `${minutes}:${seconds}`;
  }

  updateScoreBoard() {
    this.gameScore.innerText = this.carrotCount - this.score;
  }
}
