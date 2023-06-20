import Game from "./game.js";

export default class Player {
  constructor(name = "Pl_1") {
    this.name = name;
    this.score = 0;
    this.fail = 0;
  }

  // Проверка попадания
  hitTest(gT, i) {
    if (gT.imageSection === i) {
      console.log("Попал!");
      this.score = this.score + 1;
      gT.scoreboard__score.textContent = `Попадания: ${this.score}/${gT.vin};`;
    } else {
      console.log("Мимо!");
      this.fail = this.fail + 1;
      gT.scoreboard__fail.textContent = `Промахи: ${this.fail}/${gT.fail}`;
    }
    this.lastClick = i;
    clearInterval(gT.timerId);
    gT.mooveImageCycle(true);

    if (this.score >= gT.vin) {
      alert("Поздравляем! Вы победили!!!");
      document.body.innerHTML = "";
      new Game();
    }
    if (this.fail >= gT.fail) {
      alert("Вы проиграли!!!");
      document.body.innerHTML = "";
      new Game();
    }
  }
}
