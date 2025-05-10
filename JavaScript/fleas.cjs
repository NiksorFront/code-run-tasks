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
rl.on("line", (line) => {
  if (N === undefined) {
    [N, M, S, T, Q] = line.split(" ").map(Number);
    doska = Array.from(Array(N), () => Array(M).fill(0));
    S -= 1;
    T -= 1;
    doska[S][T] = 1;
  } else {
    let [a, b] = line.split(" ").map(Number);
    fleas.push([a, b]);
    // doska[a - 1][b - 1] = 1;
    // console.log(doska);
  }
  //   console.log(N, M, S, T, Q);
  //   rl.close();
});

let useKletk = [];
rl.on("close", () => {
  //   doska.forEach((i) =>
  //     i.forEach((j) => {
  //       const x = S + j - 1;
  //       const y = T + i - 2;

  //       if (0 <= x && x < N && 0 <= y && y < M) {
  //         console.log(x, y);
  //         // if (doska[S + i - 2][T + j - 1] === 0) {
  //         //   doska[S + i - 2][T + j - 1] += doska[S + i][T + j];
  //         // }
  //       }
  //     })
  //   );
  function hodik(baseX, baseY, limit) {
    let [newX, newY] = [0, 0];
    let [N_2, M_2] = [N - 2, M - 2];
    let [minX, minY] = baseX > 2 && baseY > 2 ? [baseX - 2, baseY - 2] : [0, 0];
    let [maxX, maxY] =
      baseX < N_2 && baseY < M_2 ? [baseX + 3, baseY + 3] : [N, M];
    // let [minX, minY] = [baseX-2, baseY-2];
    // let [maxX, maxY] = [baseX +2, baseY+2];

    //правый верхний угол
    for (let x = baseX; x > 0; x--) {
      for (let y = baseY; y < M; y++) {
        [newX, newY] = [x - 2, y + 1];
        // [minX, minY] = x > 2 && y > 2 ? [x - 2, y - 2] : [minX, minY];
        // [maxX, maxY] = x < N_2 && y < M_2 ? [x + 2, y + 2] : [maxX, maxY];

        if (
          minX <= newX &&
          newX < maxX &&
          minY <= newY &&
          newY < maxY &&
          doska[newX][newY] === limit
        ) {
          doska[newX][newY] += doska[x][y];
          hodik(newX, newY, 1);
        }

        [newX, newY] = [x - 1, y + 2];
        if (
          minX <= newX &&
          newX < maxX &&
          minY <= newY &&
          newY < maxY &&
          doska[newX][newY] === limit
        ) {
          doska[newX][newY] += doska[x][y];
          hodik(newX, newY, 1);
        }
      }
    }

    //правый нижний угол
    for (let x = baseX; x < N; x++) {
      for (let y = baseY; y < M; y++) {
        [newX, newY] = [x + 2, y + 1];
        // [minX, minY] = x > 2 && y > 2 ? [x - 2, y - 2] : [minX, minY];
        // [maxX, maxY] = x < N_2 && y < M_2 ? [x + 2, y + 2] : [maxX, maxY];

        if (
          minX <= newX &&
          newX < maxX &&
          minY <= newY &&
          newY < maxY &&
          doska[newX][newY] === limit
        ) {
          doska[newX][newY] += doska[x][y];
          hodik(newX, newY, 1);
        }

        [newX, newY] = [x + 1, y + 2];
        if (
          minX <= newX &&
          newX < maxX &&
          minY <= newY &&
          newY < maxY &&
          doska[newX][newY] === limit
        ) {
          doska[newX][newY] += doska[x][y];
          hodik(newX, newY, 1);
        }
      }
    }

    //левый нижний угол
    for (let x = baseX; x < N; x++) {
      for (let y = baseY; y > 0; y--) {
        [newX, newY] = [x + 2, y - 1];
        // [minX, minY] = x > 2 && y > 2 ? [x - 2, y - 2] : [minX, minY];
        // [maxX, maxY] = x < N_2 && y < M_2 ? [x + 2, y + 2] : [maxX, maxY];

        if (
          minX <= newX &&
          newX < maxX &&
          minY <= newY &&
          newY < maxY &&
          doska[newX][newY] === limit
        ) {
          doska[newX][newY] += doska[x][y];
          hodik(newX, newY, 1);
        }

        [newX, newY] = [x + 1, y - 2];
        if (
          minX <= newX &&
          newX < maxX &&
          minY <= newY &&
          newY < maxY &&
          doska[newX][newY] === limit
        ) {
          doska[newX][newY] += doska[x][y];
          hodik(newX, newY, 1);
        }
      }
    }

    //левый верхний угол
    for (let x = baseX; x > 0; x--) {
      for (let y = baseY; y > 0; y--) {
        [newX, newY] = [x - 2, y - 1];
        // [minX, minY] = x > 2 && y > 2 ? [x - 2, y - 2] : [minX, minY];
        // [maxX, maxY] = x < N_2 && y < M_2 ? [x + 2, y + 2] : [maxX, maxY];

        if (
          minX <= newX &&
          newX < maxX &&
          minY <= newY &&
          newY < maxY &&
          doska[newX][newY] === limit
        ) {
          doska[newX][newY] += doska[x][y];
          hodik(newX, newY, 1);
        }

        [newX, newY] = [x - 1, y - 2];
        if (
          minX <= newX &&
          newX < maxX &&
          minY <= newY &&
          newY < maxY &&
          doska[newX][newY] === limit
        ) {
          doska[newX][newY] += doska[x][y];
          hodik(newX, newY, 1);
        }
      }
    }
  }
  hodik(S, T, 0);
  //   console.log(useKletk, useKletk.includes([0, 1]));
  //   console.log(fleas);
  //   doska.forEach((arrs) => {
  //     arrs.forEach((j) => process.stdout.write(j + " "));
  //     console.log(" ");
  //   });
  doska.forEach((i) => {
    i.forEach((j) => process.stdout.write(j + " "));
    console.log(" ");
  });
  //   doska.forEach((arr) => console.log(arr));
});
