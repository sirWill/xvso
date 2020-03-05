// Константы с параметрами игры
/** Размер поля */
const FIELD_SIZE = 3;
/** Длина выигрышной последовательности */
const WINNER_LENGHT = 3;

let field;
let currentPlayerEl = document.getElementById("currentPlayer");

/** Текущий игрок */
let current = "X";
/** Счетчик ходов в игре */
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

/**
 * Функция для расчета хода
 *
 * @param {MouseEvent} e
 */
function makeStep(e) {
  // TODO: обработка хода игрока
  // Делаем ход
  let button = e.target;
  let i = button.getAttribute("row"),
    j = button.getAttribute("col");
  field[i][j] = current;
  button.innerHTML = current;
  button.setAttribute("disabled", true);
  steps++;
  // Проверяем выигрыш, если он возможен
  if (steps >= WINNER_LENGHT * 2 - 1) {
    checkVictory();
    // Ничья?
    if (steps === FIELD_SIZE * FIELD_SIZE) {
      alert("Ничья!");
    }
  }
  // Смена игрока
  if (current === "X") {
    current = "O";
  } else {
    current = "X";
  }
  currentPlayerEl.innerHTML = current;
}

function checkVictory() {
  // TODO: функция для проверки победителя
  // Если нашли победителя - останавливаем игру
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
      button.setAttribute("row", i);
      button.setAttribute("col", j);
      button.addEventListener("click", makeStep);
      fieldElement.append(button);
    }
  }
}

/**
 * перезапуск игры
 */
function resetGame() {
  steps = 0;
  current = "X";
  currentPlayerEl.innerHTML = current;
  makeField();
}
document.getElementById("newGame").addEventListener("click", resetGame);

makeField();
