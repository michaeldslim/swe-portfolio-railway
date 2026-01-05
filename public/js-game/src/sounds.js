"use strict";

const carrotSound = new Audio("./sound/carrot_pull.mp3");
const alertSound = new Audio("./sound/game_alert.mp3");
const bugSound = new Audio("./sound/game_lost.mp3");
const winSound = new Audio("./sound/game_win.mp3");
const bgSound = new Audio("./sound/game_play.mp3");

export function playCarrot() {
  playSound(carrotSound);
}

export function playBug() {
  playSound(bugSound);
}

export function playAlert() {
  playSound(alertSound);
}

export function playWin() {
  playSound(winSound);
}

export function playBackground() {
  playSound(bgSound);
}

export function stopBackground() {
  stopSound(bgSound);
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}
