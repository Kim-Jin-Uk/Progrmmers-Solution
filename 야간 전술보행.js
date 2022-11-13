function solution(distance, scope, times) {
  scope = scope
    .map((v, i) => [...v.sort((a, b) => a - b), i])
    .sort((a, b) => a[0] - b[0]);
  let move = 0;
  for (const [l, r, idx] of scope) {
    for (let i = l; i <= r; i++) {
      const length = times[idx][0] + times[idx][1];
      const curr = Math.floor(i % length) || length;
      if (times[idx][0] < curr && curr <= length) move = i;
      else {
        return i;
      }
    }
  }
  return move + 1;
}
