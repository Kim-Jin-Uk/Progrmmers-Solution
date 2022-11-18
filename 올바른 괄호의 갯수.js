function solution(n) {
  let answer = 0;
  dfs(1, 1);
  function dfs(prev, idx) {
    if (idx > n) {
      if (prev === 1) answer++;
      return;
    }
    let minus = 0;
    for (let i = 0; i <= idx; i++) {
      if (prev - minus < 0) break;
      dfs(prev - minus + 1, idx + 1);
      minus++;
    }
  }
  return answer;
}
