function solution(m, n, board) {
  let answer = 0;
  // 1차원 배열을 2차원 테이블로 확장
  const table = board.map((v) => v.split(""));
  // 제거할 원소를 담을 리스트
  let removeIdx = [];
  while (true) {
    for (let x = 0; x < m - 1; x++) {
      for (let y = 0; y < n - 1; y++) {
        if (table[x][y] !== "0") {
          check(x, y, table[x][y]);
        }
      }
    }
    // 삭제할 원소가 없다면 리턴을 위해 종료
    if (removeIdx.length === 0) break;
    // 중복 원소가 존재할 수 있으므로 Set을 이용해 중복 제거
    removeIdx = [...new Set(removeIdx)];
    for (const r of removeIdx) {
      const [x, y] = r.split(",");
      remove(x, y);
    }
    removeIdx = [];
  }
  // 해당 원소를 삭제하는 함수
  function remove(x, y) {
    // 세로로 한칸씩 밀어주기
    for (let i = x; i > 0; i--) {
      table[i][y] = table[i - 1][y];
    }
    // 가장 상위원소는 빈칸으로 처리하기
    table[0][y] = "0";
    // 리턴값 갱신
    answer++;
  }

  function check(x, y, key) {
    // 원래 원소, 우측, 하측, 우하측을 후보군으로 묶어줌
    const candids = [
      [x, y],
      [x + 1, y],
      [x, y + 1],
      [x + 1, y + 1],
    ];

    let check = true;
    // 모든 원소가 테이블의 범위내에 존재하고, 키값이 동일하면 처리
    for (const [nX, nY] of candids) {
      if (nX > -1 && nX < m && nY > -1 && nY < n && table[nX][nY] === key)
        continue;
      check = false;
      break;
    }
    if (check) {
      // 후보군을 모두 삭제리스트에 넣어주기
      for (const candid of candids) {
        // 중복 제거를 위해 문자열로 처리
        removeIdx.push(candid.join());
      }
    }
  }
  return answer;
}

function solution(m, n, board) {
  board = board.map((v) => v.split(""));
  while (true) {
    const founded = [];
    for (let i = 1; i < m; i++) {
      for (let j = 1; j < n; j++) {
        if (
          board[i][j] &&
          board[i][j] === board[i][j - 1] &&
          board[i][j] === board[i - 1][j - 1] &&
          board[i][j] === board[i - 1][j]
        )
          founded.push([i, j]);
      }
    }
    if (!founded.length) return [].concat(...board).filter((v) => !v).length;
    founded.forEach((a) => {
      board[a[0]][a[1]] = 0;
      board[a[0]][a[1] - 1] = 0;
      board[a[0] - 1][a[1] - 1] = 0;
      board[a[0] - 1][a[1]] = 0;
    });
    for (let i = m - 1; i > 0; i--) {
      if (!board[i].some((v) => !v)) continue;
      for (let j = 0; j < n; j++) {
        for (let k = i - 1; k >= 0 && !board[i][j]; k--) {
          if (board[k][j]) {
            board[i][j] = board[k][j];
            board[k][j] = 0;
            break;
          }
        }
      }
    }
  }
}
