export default class Cursor {
  constructor() {
    document.querySelector("body").style.cursor = 'none'; // скрываем настоящий курсор

    // Создаём курсор
    const cursor = document.createElement("div");
    cursor.className = "cursor";
    document.body.append(cursor);

    // Движение курсора
    const mouseMove = function (event) {
        let x = event.clientX;
        let y = event.clientY;
        cursor.style.left = x + "px";
        cursor.style.top = y + "px";
      }
    
      // Нажатие курсора
      const pressDown = function (event) {
        cursor.className = "cursor__press";
      }
      const pressUp = function (event) {
        cursor.className = "cursor";
      }
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mousedown", pressDown);
    document.addEventListener("mouseup", pressUp);
    
  }

  
}
