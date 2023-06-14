import GameTable from "../app.js";

// 01. class GameTable/constructor: Ввод некорректных данных(не целых чисел)
test.each([
  [1.5, 2, Error, "Введенные данные не являются целыми числами, больше 0!"],
  ["5", "3", Error, "Введенные данные не являются целыми числами, больше 0!"],
  [
    "arh",
    "hdfv",
    Error,
    "Введенные данные не являются целыми числами, больше 0!",
  ],
  [0, 5, Error, "Введенные данные не являются целыми числами, больше 0!"],
  [-2, 5, Error, "Введенные данные не являются целыми числами, больше 0!"],
])(
  "01. class GameTable/constructor: Ввод некорректных данных(не целых чисел)",
  (rows, columns, errorType, errorText) => {
    function result() {
      /* eslint-disable no-new */
      new GameTable(rows, columns);
    }

    expect(result).toThrow(errorType); // Проверка типа ошибки
    expect(result).toThrow(errorText); // Проверка текста ошибки
  }
);

// 02. class GameTable/constructor: Ввод некорректных данных(без данных)
test("02. class GameTable/constructor: Ввод некорректных данных(без данных)", () => {
  function result() {
    /* eslint-disable no-new */
    new GameTable();
  }

  expect(result).toThrow(Error); // Проверка типа ошибки
  expect(result).toThrow(
    "Введенные данные не являются целыми числами, больше 0!"
  ); // Проверка текста ошибки
});

// 03. class GameTable/constructor, createGameTable: Проверка свойств класса:
test("03. class GameTable/constructor, createGameTable: Проверка свойств класса:", () => {
  const result = new GameTable(3, 5, false);

  expect(result.rows).toBe(3);
  expect(result.columns).toBe(5);
  expect(result.cycle).toBe(false);
  expect(result.elemsNum).toBe(15);
  const d = result.imageSection >= 0 && result.imageSection < 15;
  expect(d).toBe(true);

  const table = document.createElement("div");
  table.className = "table";

  const elem = document.createElement("div");
  elem.className = "table__section";
  elem.style.width = "18%";
  elem.style.height = "0px";

  const elems = {};
  for (let i = 0; i < 15; i += 1) {
    elems[i] = elem.cloneNode(true);
    table.appendChild(elems[i]);
  }
  expect(result.table).toEqual(table);
  expect(result.elems).toEqual(elems);
});

// 04. class GameTable/mooveImage: Проверка свойств класса:
test("04. class GameTable/mooveImage: Проверка свойств класса:", () => {
  const result = new GameTable(2, 3, true);
  result.mooveImage();

  let imagNum = 0;
  let imageS = 0;
  for (let i = 0; i < 6; i += 1) {
    if (result.elems[i].className === "table__section__image") {
      imagNum += 1;
      imageS = i;
    }
  }
  expect(result.imageSection).toBe(imageS);
  expect(imagNum).toBe(1);
});
