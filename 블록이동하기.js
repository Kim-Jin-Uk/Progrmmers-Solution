function solution(board) {
  const n = board.length;
  let minCount = n * n;
  let queue = [];
  queue.push([0, 0, 0, 1, 0]);
  let visit = [];
  const checkVisit = (visit, _j1, _i1, _j2, _i2) => {
    return visit.some(
      ({ j1, i1, j2, i2 }) =>
        j1 === _j1 && i1 === _i1 && _j2 === j2 && _i2 === i2
    );
  };
  while (queue.length > 0) {
    const tempItem = queue.shift();
    let [j1, i1, j2, i2, count] = tempItem;
    if (
      j1 < 0 ||
      j1 >= n ||
      i1 < 0 ||
      i1 >= n ||
      j2 < 0 ||
      j2 >= n ||
      i2 < 0 ||
      i2 >= n ||
      checkVisit(visit, j1, i1, j2, i2) ||
      board[j1][i1] === 1 ||
      board[j2][i2] === 1
    )
      continue;
    else if ((j1 === n - 1 && i1 === n - 1) || (j2 === n - 1 && i2 === n - 1)) {
      minCount = Math.min(count, minCount);
      break;
    } else {
      visit.push({ j1, i1, j2, i2 });
      //오른쪽
      queue.push([j1, i1 + 1, j2, i2 + 1, count + 1]);
      //위
      queue.push([j1 - 1, i1, j2 - 1, i2, count + 1]);
      //왼쪽
      queue.push([j1, i1 - 1, j2, i2 - 1, count + 1]);
      //아래
      queue.push([j1 + 1, i1, j2 + 1, i2, count + 1]);
      //가로인데 아래로 회전 가능
      if (j1 === j2 && j1 < n - 1 && j2 < n - 1) {
        if (board[j1 + 1][i1] === 0 && board[j2 + 1][i2] === 0) {
          queue.push([j2, i2, j2 + 1, i2, count + 1]);
          queue.push([j1, i1, j1 + 1, i1, count + 1]);
        }
      }
      //가로인데 위로 회전 가능
      if (j1 === j2 && j1 > 0 && j2 > 0) {
        if (board[j1 - 1][i1] === 0 && board[j2 - 1][i2] === 0) {
          queue.push([j2, i2, j2 - 1, i2, count + 1]);
          queue.push([j1, i1, j1 - 1, i1, count + 1]);
        }
      }
      //세로인데 오른쪽으로 회전 가능
      if (i1 === i2 && i1 < n - 1 && i2 < n - 1) {
        if (board[j1][i1 + 1] === 0 && board[j2][i2 + 1] === 0) {
          queue.push([j1, i1, j1, i1 + 1, count + 1]);
          queue.push([j2, i2, j2, i2 + 1, count + 1]);
        }
      }
      //세로인데 왼쪽으로 회전 가능
      if (i1 === i2 && i1 > 0 && i2 > 0) {
        if (board[j1][i1 - 1] === 0 && board[j2][i2 - 1] === 0) {
          queue.push([j1, i1, j1, i1 - 1, count + 1]);
          queue.push([j2, i2, j2, i2 - 1, count + 1]);
        }
      }
    }
  }
  return minCount;
}
