//Задание - https://coderun.yandex.ru/problem/fleas

// Для чтения входных данных в Node.js необходимо использовать
// модуль readline, который работает с потоком ввода-вывода
// (stdin/stdout) и позволяет читать строки.
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Данные во входном потоке могут состоять из нескольких строк.
// Чтобы прочитать их, можно использовать метод rl.on(),
// который вызывается каждый раз при появлении новой строки
// в потоке ввода.
// Чтобы вывести результат в поток вывода (stdout),
// можно использовать метод console.log().
// Пример:
// console.log('Результат:', result);

// Пример решения задачи "Вычислите сумму A+B":
let N, M, S, T, Q;
let doska = [];
let fleas = [];
let lineCount = 0;
let kostil = false; //Чтобы считать есть ли совпдающие клетки
let i = 0;
rl.on("line", (line) => {
  if (N === undefined) {
    [N, M, S, T, Q] = line.split(" ").map(Number);
    doska = Array.from(Array(N), () => Array(M).fill(0));
    S -= 1;
    T -= 1;
    // doska[S][T] = 1;
  } else {
    let [a, b] = line.split(" ").map(Number);
    a -= 1;
    b -= 1;
    kostil = S === a && T === b;
    // console.log(N, M, a, b);
    if (N > a && M > b) {
      fleas.push([a, b]);
    }
    i++;
    // Когда все Q строк считаны
    if (i >= Q) {
      processInput();
    }
  }
  lineCount++;
  //   console.log(N, M, S, T, Q);
  //   rl.close();
});
function processInput() {
  function hodik(baseX, baseY, hod) {
    let [N_2, M_2] = [N - 2, M - 2];
    let [minX, minY] = baseX > 2 && baseY > 2 ? [baseX - 2, baseY - 2] : [0, 0];
    let [maxX, maxY] =
      baseX < N_2 && baseY < M_2 ? [baseX + 3, baseY + 3] : [N, M];

    const zamena = (newX, newY) => {
      if (
        minX <= newX &&
        newX < maxX &&
        minY <= newY &&
        newY < maxY &&
        doska[newX][newY] === 0
      ) {
        doska[newX][newY] += hod;
        setTimeout(() => hodik(newX, newY, hod + 1), 0);
      }
    };

    const moves = [
      [-2, 1],
      [-1, 2],
      [2, 1],
      [1, 2],
      [2, -1],
      [1, -2],
      [-2, -1],
      [-1, -2],
    ];

    for (let i = 0; i < moves.length; i++) {
      const [dx, dy] = moves[i];
      const newX = baseX + dx;
      const newY = baseY + dy;
      zamena(newX, newY);
    }
  }

  hodik(S, T, 1);

  // Даем немного времени асинхронным вызовам завершиться
  setTimeout(() => {
    doska[S][T] = 0;

    let sum = 0;
    if (Q > 0) {
      for (let i = 0; i < fleas.length; i++) {
        const [x, y] = [fleas[i][0], fleas[i][1]];

        function isSameCoord(a, b) {
          return a[0] === b[0] && a[1] === b[1];
        }

        // console.log(x !== S, y !== T, doska[x][y] === 0);
        // if ((x !== S || y !== T) && doska[x][y] === 0) {
        if (!isSameCoord([x, y], [S, T]) && doska[x][y] === 0) {
          // console.log(doska[x][y]);
          sum = 0;
          break;
        } else {
          sum += doska[x][y];
        }
      }
      // fleas.forEach((pos) => {
      //   const chislo = doska[pos[0]][pos[1]];
      //   if (chislo === 0) {
      //     sum = 0;
      //     throw;
      //   } else {
      //     sum += chislo;
      //   }
      // });
    }

    console.log(kostil ? sum : sum ? sum : -1);

    // doska.forEach((i) => {
    //   i.forEach((j) => process.stdout.write(j + " "));
    //   console.log(" ");
    // });
    rl.close(); // закрываем интерфейс после вывода
  }, 150); //500 для ОЧЕНЬ больших переборов // можно увеличить задержку, если нужно больше итераций
}
