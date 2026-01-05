"use strict";

import PopUp from "./popup.js";
import * as sound from "./sounds.js";
import { GameBuilder, Status } from "./game.js";

const gameFinishBanner = new PopUp();

const game = new GameBuilder()
  .gameDuration(15)
  .carrotCount(20)
  .bugCount(20)
  .build();

game.setGameStopListener((status) => {
  // console.log(status);
  let message;
  switch (status) {
    case Status.cancel:
      message = "Replay❓";
      sound.playAlert();
      break;
    case Status.win:
      message = "YOU WON 😁";
      sound.playWin();
      break;
    case Status.lose:
      message = "YOU LOST 😅";
      sound.playBug();
      break;
    default:
      throw new Error("Not valid status!");
  }
  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
  game.start();
});
