// Константы с параметрами игры
/** Размер поля */
const FIELD_SIZE = 3;
/** Длина выигрышной последовательности */
const WINNER_LENGHT = 3;

let field;
let fieldElement = document.getElementById("game");
let currentPlayerEl = document.getElementById("currentPlayer");

/** Текущий игрок */
let current = "X";
/** Счетчик ходов в игре */
let steps = 0;

let stats = {
  X: 0,
  Y: 0
};

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
    if (checkVictory(i, j)) {
      return;
    }
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

/**
 * Что происходит при завершении игры
 */
function gameWon() {
  // Обойти и заблокировать все клетки поля
  for (let i in field) {
    for (let j in field) {
      i = parseInt(i);
      j = parseInt(j);
      if (field[i][j] === 0) {
        fieldElement.children[i * FIELD_SIZE + j].setAttribute(
          "disabled",
          true
        );
      }
    }
  }
  // Добавить данные в статистику побед
  stats[current]++;
}

/**
 * Функция для проверки победы в игре
 *
 * @param {*} row
 * @param {*} column
 */
function checkVictory(row, column) {
  const DIFFERENCE = WINNER_LENGHT - 1;
  // Вокруг ячейки, где был совершен ход
  // Объект со смещениями по направлениям
  let directions = {
    NW: {
      dx: -1,
      dy: -1,
      current: 0
    },
    N: {
      dx: 0,
      dy: -1,
      current: 0
    },
    NE: {
      dx: 1,
      dy: -1,
      current: 0
    },
    E: {
      dx: 1,
      dy: 0,
      current: 0
    },
    SE: {
      dx: 1,
      dy: 1,
      current: 0
    },
    S: {
      dx: 0,
      dy: 1,
      current: 0
    },
    SW: {
      dx: -1,
      dy: 1,
      current: 0
    },
    W: {
      dx: -1,
      dy: 0,
      current: 0
    }
  };
  // Последовательно проверить по кругу все направления
  let winCounter = 1;
  let dif;
  for (let direction in directions) {
    dif = 0;
    y = parseInt(row);
    x = parseInt(column);
    do {
      // Смещаемся по направлению
      y += directions[direction].dy;
      x += directions[direction].dx;
      dif++;
      // Если вышли за границыы поля - переходим к следующему направлению
      if (y < 0 || x < 0 || y >= FIELD_SIZE || x >= FIELD_SIZE) break;
      // Если символ такой же, как у текущего игрока
      if (field[x][y] === current) {
        // Увеличиваем счётчик данного направления
        directions[direction].current++;
      } else {
        // Иначе выходим из цикла и идем к следующему направлению
        dif = WINNER_LENGHT;
      }
    } while (dif < WINNER_LENGHT);
  }
  // Противоположные направления
  let opposites = [
    ["NW", "SE"],
    ["N", "S"],
    ["NE", "SW"],
    ["E", "W"]
  ];
  // Проверяем суммы противоположных направлений
  for (let one of opposites) {
    if (
      directions[one[0]].current + directions[one[1]].current ===
      DIFFERENCE
    ) {
      // Есть победитель!
      alert("Вы победили! Поздравляем " + current + " с победой!");
      gameWon();
      return true;
    }
  }
  return false;
}

/**
 * Отрисовка чистого игрового поля
 */
function makeField() {
  let i, j;
  clearField();
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
