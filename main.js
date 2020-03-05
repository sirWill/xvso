// Константы с параметрами игры
const FIELD_SIZE = 3;

let field;
let currentPlayerEl = document.getElementById("currentPlayer");

let current = "X";
let steps = 0;

/**
 * Очистка всего поля и инициализация всех клеток поля нулями
 */
function clearField() {
  field = [];
  for (let i = 0; i < FIELD_SIZE; i++) {
    field.push(new Array());
    for (let j = 0; j < FIELD_SIZE; j++) {
      field[i].push(0);
    }
  }
}

function makeStep() {
  // TODO: обработка хода игрока
  // Делаем ход
  // Проверяем выигрыш, если он возможен
  // Ничья?
  // Смена игрока
}

function checkVictory() {
  // TODO: функция для проверки победителя
}

/**
 * Отрисовка чистого игрового поля
 */
function makeField() {
  let i, j;
  clearField();
  let fieldElement = document.getElementById("game");
  fieldElement.innerHTML = "";
  for (i = 0; i < field.length; i++) {
    for (j = 0; j < field[i].length; j++) {
      let button = document.createElement("button");
      button.addEventListener("click", makeStep);
      fieldElement.append(button);
    }
  }
}

function resetGame() {
  // TODO: перезапуск игры
}

makeField();
