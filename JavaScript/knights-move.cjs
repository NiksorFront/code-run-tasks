//Задание - https://coderun.yandex.ru/problem/knight-move

// Для чтения входных данных в Node.js необходимо использовать
// модуль readline, который работает с потоком ввода-вывода
// (stdin/stdout) и позволяет читать строки.
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Считывание данных из нескольких строк в переменную
let input = [];
rl.on("line", (line) => {
  input.push(line);
});

// Код решения можно писать внутри функции закрытия потока ввода
rl.on("close", () => {
  //   console.log(input.split(" "));
  const [N, M] = input[0].split(" ").map((num) => parseInt(num));
  const doska = Array.from(Array(N), () => Array(M).fill(0));

  doska[0][0] = 1;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (i + 2 < N && j + 1 < M) {
        doska[i + 2][j + 1] += doska[i][j];
      }
      if (i + 1 < N && j + 2 < M) {
        doska[i + 1][j + 2] += doska[i][j];
      }
    }
  }

  console.log(doska[N - 1][M - 1]);
  //   doska.forEach((i) => {
  //     i.forEach((j) => process.stdout.write(j + " "));
  //     console.log(" ");
  //   });

  // Чтобы вывести результат в поток вывода (stdout),
  // можно использовать метод console.log().
});
