/**
 * "Класс" игры
 */
function Game() {
  // Константы с параметрами игры
  let settings = {
    /** Размер поля */
    fieldSize: 10,
    /** Размер клетки поля в px */
    cellSize: 50,
    /** Длина выигрышной последовательности */
    winnerLength: 5
  };

  let fieldElement = document.getElementById("field"),
    currentPlayerEl = document.getElementById("currentPlayer"),
    sizeSettingsEl = document.querySelector('input[name="size"]'),
    winnerSettingsEl = document.querySelector('input[name="winner"]');

  /** Массив с массивами для хранения поля */
  let field;
  /** Текущий игрок */
  let current = "X";
  /** Счетчик ходов в игре */
  let steps = 0;

  /** Объект для хранения статистики */
  let stats = {
    X: 0,
    O: 0
  };

  /**
   * Очистка всего поля и инициализация всех клеток поля нулями
   */
  function clearField() {
    field = [];
    for (let i = 0; i < settings.fieldSize; i++) {
      field.push(new Array());
      for (let j = 0; j < settings.fieldSize; j++) {
        field[i].push(0);
      }
    }
  }

  /**
   * Вывод статистики игр
   */
  function showStats() {
    let elementPrefix = "winner";
    for (let one in stats) {
      let el = document.getElementById(elementPrefix + one);
      if (el) {
        el.innerHTML = stats[one];
      }
    }
  }

  /**
   * Функция для расчета хода
   *
   * @param {MouseEvent} e
   */
  function makeStep(e) {
    // Делаем ход
    let button = e.target;
    let i = button.getAttribute("row"),
      j = button.getAttribute("col");
    field[i][j] = current;
    button.innerHTML = current;
    button.setAttribute("disabled", true);
    button.classList.add("-" + current.toLowerCase());
    steps++;
    // Проверяем выигрыш, если он возможен
    if (steps >= settings.winnerLength * 2 - 1) {
      if (checkVictory(i, j)) {
        return;
      }
      // Ничья?
      if (steps === settings.fieldSize * settings.fieldSize) {
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
          fieldElement.children[i * settings.fieldSize + j].setAttribute(
            "disabled",
            true
          );
        }
      }
    }
    // Добавить данные в статистику побед
    stats[current]++;
    window.localStorage.setItem("stats", JSON.stringify(stats));
    showStats();
  }

  /**
   * Функция для проверки победы в игре
   *
   * @param {*} row
   * @param {*} column
   */
  function checkVictory(row, column) {
    const DIFFERENCE = settings.winnerLength - 1;
    const X = parseInt(row),
      Y = parseInt(column);
    // Вокруг ячейки, где был совершен ход
    // Объект со смещениями по направлениям
    let directions = {
      NW: {
        dx: -1,
        dy: -1,
        sum: 0
      },
      N: {
        dx: 0,
        dy: -1,
        sum: 0
      },
      NE: {
        dx: 1,
        dy: -1,
        sum: 0
      },
      E: {
        dx: 1,
        dy: 0,
        sum: 0
      },
      SE: {
        dx: 1,
        dy: 1,
        sum: 0
      },
      S: {
        dx: 0,
        dy: 1,
        sum: 0
      },
      SW: {
        dx: -1,
        dy: 1,
        sum: 0
      },
      W: {
        dx: -1,
        dy: 0,
        sum: 0
      }
    };
    let dx, dy, tx, ty;
    for (let one in directions) {
      dx = directions[one].dx;
      dy = directions[one].dy;
      for (let t = 1; t <= DIFFERENCE; t++) {
        tx = X + dx * t;
        ty = Y + dy * t;
        if (
          tx < 0 ||
          tx > settings.fieldSize ||
          ty < 0 ||
          ty > settings.fieldSize
        )
          break;
        if (field[tx][ty] === field[X][Y]) {
          directions[one].sum++;
        } else {
          break;
        }
      }
    }
    // Противоположные направления
    let opposites = [
      ["NW", "SE"],
      ["N", "S"],
      ["NE", "SW"],
      ["E", "W"]
    ];
    for (let one of opposites) {
      if (directions[one[0]].sum + directions[one[1]].sum >= DIFFERENCE) {
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
    fieldElement.style.width = fieldElement.style.height =
      settings.fieldSize * settings.cellSize + "px";

    for (i = 0; i < field.length; i++) {
      for (j = 0; j < field[i].length; j++) {
        let button = document.createElement("button");
        button.setAttribute("row", i);
        button.setAttribute("col", j);
        button.style.width = settings.cellSize + "px";
        button.style.height = settings.cellSize + "px";
        button.style.fontSize = settings.cellSize * 0.8 + "px";
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

  /**
   * Сброс статистики игр
   */
  function resetStat() {
    stats = {
      X: 0,
      O: 0
    };
    window.localStorage.setItem("stats", JSON.stringify(stats));
    showStats();
  }

  /**
   * Отслеживаем изменение параметров
   *
   * @param {Event} e
   */
  function settingsListener(e) {
    let fieldSize = parseInt(sizeSettingsEl.value);
    let winnerLength = parseInt(winnerSettingsEl.value);
    if (fieldSize > 150) {
      fieldSize = 150;
    } else if (fieldSize < 3) {
      fieldSize = 3;
    } else if (isNaN(fieldSize)) {
      fieldSize = 10;
    }
    if (winnerLength > 5) {
      winnerLength = 5;
    } else if (winnerLength < 3) {
      winnerLength = 3;
    } else if (isNaN(winnerLength)) {
      winnerLength = 5;
    }
    if (fieldSize < winnerLength) {
      fieldSize = winnerLength;
    }
    sizeSettingsEl.value = fieldSize;
    winnerSettingsEl.value = winnerLength;
    settings.fieldSize = fieldSize;
    settings.winnerLength = winnerLength;
  }

  function init() {
    // Устанавливаем прослушивателей событий
    document.getElementById("newGame").addEventListener("click", resetGame);
    document.getElementById("resetStat").addEventListener("click", resetStat);

    sizeSettingsEl.addEventListener("change", settingsListener);
    winnerSettingsEl.addEventListener("change", settingsListener);
    sizeSettingsEl.addEventListener("blur", settingsListener);
    winnerSettingsEl.addEventListener("blur", settingsListener);

    // Загружаем текущую статистику
    let stat = window.localStorage.getItem("stats");
    if (typeof stat === "string") {
      stats = JSON.parse(stat);
    }
    showStats();

    // Стартуем игру
    resetGame();
  }

  // Инициализируем игру
  init();
}

export default Game;
