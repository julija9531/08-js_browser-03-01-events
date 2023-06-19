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

      // Запускаем цикл смены картинкой секции
      this.mooveImageCycle(cycle);
    } else {
      throw Error("Введенные данные не являются целыми числами, больше 0!");
    }
  }

  createGameTable(_this, player1) {
    this.table = document.createElement("div");
    this.table.className = "table";
    document.body.append(this.table);

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
      this.table.style.height = "95vh";
      elem.style.width = `${Math.round(85 / this.rows)}vh`;
      elem.style.height = `${Math.round(85 / this.rows)}vh`;
    } else {
      // если ограничены шириной окна
      this.table.style.width = "95vw";
      this.table.style.height = `${Math.round(
        (scrWidth / this.columns) * this.rows
      )}px`;
      elem.style.width = `${Math.round(85 / this.columns)}vw`;
      elem.style.height = `${Math.round(85 / this.columns)}vw`;
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
