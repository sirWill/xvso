// Константы с параметрами игры
const FIELD_SIZE = 3;

let field;
let currentPlayerEl = document.getElementById("currentPlayer");

let current = "X";
let steps = 0;

/**
 * Очистка всего поля и инициализация всех клеток поля нулями
 */
function clearFieldd() {
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

function makeField() {
  // TODO: генерация пустого поля для игры
}

function resetGame() {
  // TODO: перезапуск игры
}
