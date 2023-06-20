export default class GameTable {
  constructor(player1, rows, columns, cycle = true) {
    if (
      Number.isInteger(rows) &&
      Number.isInteger(columns) &&
      rows > 0 &&
      columns > 0
    ) {
      // Параметры GameTable:
      this.rows = rows;
      this.columns = columns;
      this.cycle = cycle;
      this.elems = {};
      this.elemsNum = this.rows * this.columns;
      this.imageSection = Math.floor(Math.random() * this.elemsNum);

      // Параметры игры:
      this.vin = 10;
      this.fail = 5;

      // Создаем поле с заданным количеством секций
      this.createGameTable(this, player1);

      // Создаем поле со счётом
      this.createScoreboard(this, player1);

      // Запускаем цикл смены картинкой секции
      this.mooveImageCycle(cycle);
    } else {
      throw Error("Введенные данные не являются целыми числами, больше 0!");
    }
  }

  createGameTable(_this, player1) {
    this.game = document.createElement("div");
    this.game.className = "game";
    document.body.append(this.game);

    this.table = document.createElement("div");
    this.table.className = "table";
    this.game.appendChild(this.table);

    const elem = document.createElement("div");
    elem.className = "table__section";

    // задаем размеры стола:
    const scrWidth = window.screen.width;
    const scrHeight = window.screen.height;
    // если ограничены высотой окна
    if (scrWidth / scrHeight > this.columns / this.rows) {
      this.table.style.width = `${Math.round(
        (100 * this.columns) / this.rows
      )}vh`;
      this.table.style.height = "90vh";
      elem.style.width = `${Math.round(80 / this.rows)}vh`;
      elem.style.height = `${Math.round(80 / this.rows)}vh`;
    } else {
      // если ограничены шириной окна
      this.table.style.width = "90vw";
      this.table.style.height = `${Math.round(
        (scrWidth / this.columns) * this.rows
      )}px`;
      elem.style.width = `${Math.round(80 / this.columns)}vw`;
      elem.style.height = `${Math.round(80 / this.columns)}vw`;
    }

    for (let i = 0; i < this.elemsNum; i += 1) {
      this.elems[i] = elem.cloneNode(true);
      // this.elems[i].textContent = i;
      this.table.appendChild(this.elems[i]);

      // Нажатие на элемент:
      this.elems[i].onclick = function () {
        player1.hitTest(_this, i);
      };
    }
  }

  createScoreboard(_this, player1) {
    _this.scoreboard = document.createElement("div");
    _this.scoreboard.className = "scoreboard";
    _this.game.appendChild(_this.scoreboard);

    _this.scoreboard__score = document.createElement("div");
    _this.scoreboard__score.className = "scoreboard__score";
    _this.scoreboard.appendChild(_this.scoreboard__score);
    _this.scoreboard__score.textContent = `Попадания: ${player1.score}/${_this.vin};`;

    _this.scoreboard__fail = document.createElement("div");
    _this.scoreboard__fail.className = "scoreboard__fail";
    _this.scoreboard.appendChild(_this.scoreboard__fail);
    _this.scoreboard__fail.textContent = `Промахи: ${player1.fail}/${_this.fail}`;
    _this.scoreboard__fail.style.paddingLeft = "5px";
  }

  mooveImageCycle(cycle) {
    if (cycle) {
      this.mooveImage();
      this.timerId = setInterval(() => {
        this.mooveImage();
      }, 1000);
    }
  }

  mooveImage() {
    this.elems[this.imageSection].className = "table__section";
    let num = Math.floor(Math.random() * this.elemsNum);
    while (num === this.imageSection) {
      num = Math.floor(Math.random() * this.elemsNum);
    }
    this.imageSection = num;
    this.elems[this.imageSection].className = "table__section__image";
  }
}
