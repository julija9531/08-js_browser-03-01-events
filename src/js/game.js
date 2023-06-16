import GameTable from "./gametable.js";
import Player from "./player.js";
import Cursor from "./cursor.js";

export default class Game {
  constructor() {
    this.startGame = confirm("Запуск игры!");
    if (this.startGame) {
      this.start(3, 5);
    }
  }

  start(rows, columns) {
    // создаём игрока:
    let player1 = new Player();

    // Создаём игровое поле
    new GameTable(player1, rows, columns);

    // Меняем курсор
    new Cursor();
  }
}
