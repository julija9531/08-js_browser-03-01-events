export default class GameTable {
  constructor(rows, columns, cycle = true) {
    if (
      Number.isInteger(rows) &&
      Number.isInteger(columns) &&
      rows > 0 &&
      columns > 0
    ) {
      this.rows = rows;
      this.columns = columns;
      this.cycle = cycle;
      this.elems = {};
      this.elemsNum = this.rows * this.columns;
      this.imageSection = Math.floor(Math.random() * this.elemsNum);

      // Создаем поле с заданным количеством секций
      this.createGameTable();

      // Запускаем цикл смены картинкой секции
      if (cycle) {
        this.timerId = setInterval(() => {
          this.mooveImage();
        }, 1000);
      }
    } else {
      throw Error("Введенные данные не являются целыми числами, больше 0!");
    }
  }

  createGameTable() {
    this.table = document.createElement("div");
    this.table.className = "table";
    document.body.append(this.table);

    const elem = document.createElement("div");
    elem.className = "table__section";
    elem.style.width = `${Math.round(90 / this.columns)}%`;
    // elem.style.width = "50px";
    // elem.style.height = "50px";

    for (let i = 0; i < this.elemsNum; i += 1) {
      this.elems[i] = elem.cloneNode(true);
      this.table.appendChild(this.elems[i]);
      this.elems[i].style.height = `${this.elems[i].offsetWidth}px`;
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
