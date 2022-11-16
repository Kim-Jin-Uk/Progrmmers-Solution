function solution(CH) {
  let answer = 0;
  const len = CH.length;
  dfs(
    CH.map((v) => [...v]),
    -1
  );
  function dfs(CH, yIdx) {
    if (yIdx + 1 === len) {
      const result = turnPlusSign(0, CH);
      if (CH.reduce((a, b) => a + b.reduce((c, d) => c + d, 0), 0) === 0)
        console.log(result);
      return;
    }
    for (let y = yIdx + 1; y < len; y++) {
      dfs(CH, y);
      const right = CH.map((v) => [...v]);
      turnRight(0, y, right);
      dfs(right, y);
      const left = CH.map((v) => [...v]);
      turnLeft(0, y, left);
      dfs(left, y);
      const double = CH.map((v) => [...v]);
      turnLeft(0, y, double);
      turnLeft(0, y, double);
      dfs(double, y);
    }
  }
  function turnPlusSign(result, CH) {
    for (let x = 0; x < len; x++) {
      for (let y = 0; y < len; y++) {
        // turn right
        if (
          [2, 3].includes(CH[x][y]) &&
          (x === 0 || [2, 3].includes(CH[x - 1][y])) &&
          (y === 0 || [2, 3].includes(CH[x][y - 1])) &&
          (x === len - 1 || [2, 3].includes(CH[x + 1][y])) &&
          (y === len - 1 || [2, 3].includes(CH[x][y + 1]))
        ) {
          turnRight(x, y, CH);
          result++;
        }
        // turn left
        if (
          [1, 2].includes(CH[x][y]) &&
          (x === 0 || [1, 2].includes(CH[x - 1][y])) &&
          (y === 0 || [1, 2].includes(CH[x][y - 1])) &&
          (x === len - 1 || [1, 2].includes(CH[x + 1][y])) &&
          (y === len - 1 || [1, 2].includes(CH[x][y + 1]))
        ) {
          turnLeft(x, y, CH);
          result++;
        }
      }
    }
    return result;
  }
  function turnLeft(x, y, CH) {
    const candidates = [
      [x, y],
      [x - 1, y],
      [x, y - 1],
      [x + 1, y],
      [x, y + 1],
    ];
    candidates.forEach(([x, y]) => {
      if (x > -1 && x < len && y > -1 && y < len) {
        CH[x][y] = CH[x][y] === 1 ? 0 : 1;
      }
    });
  }
  function turnRight(x, y, CH) {
    const candidates = [
      [x, y],
      [x - 1, y],
      [x, y - 1],
      [x + 1, y],
      [x, y + 1],
    ];
    candidates.forEach(([x, y]) => {
      if (x > -1 && x < len && y > -1 && y < len) {
        CH[x][y] = CH[x][y] === 3 ? 0 : 3;
      }
    });
  }
  return answer;
}
solution([
  [0, 1, 3, 0],
  [1, 2, 0, 0],
  [3, 0, 2, 2],
  [0, 2, 0, 0],
]);
