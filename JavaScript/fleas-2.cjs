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
rl.on("line", (line) => {
  if (N === undefined) {
    [N, M, S, T, Q] = line.split(" ").map(Number);
    doska = Array.from(Array(N), () => Array(M).fill(0));
    S -= 1;
    T -= 1;
    // doska[S][T] = 1;
  } else {
    let [a, b] = line.split(" ").map(Number);
    fleas.push([a, b]);

    // Когда все Q строк считаны
    if (fleas.length > Q) {
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
    doska.forEach((i) => {
      i.forEach((j) => process.stdout.write(j + " "));
      console.log(" ");
    });
    // doska.forEach((i) => {
    //   i.forEach((j) => (sum += j));
    // });
    // console.log(sum);
    rl.close(); // закрываем интерфейс после вывода
  }, 50); // можно увеличить задержку, если нужно больше итераций
}
