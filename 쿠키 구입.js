function solution(cookie) {
  let answer = 0;
  for (let i = 1; i < cookie.length; i++) {
    cookie[i] += cookie[i - 1];
  }
  let start = -1;
  while (start < cookie.length - 1) {
    const minus = start === -1 ? 0 : cookie[start];
    for (let i = cookie.length - 2; i > start; i--) {
      if (2 * (cookie[i] - minus) > cookie[cookie.length - 1]) continue;
      if (answer >= cookie[i] - minus) break;
      for (let j = cookie.length - 1; j > i; j--) {
        if (cookie[i] - minus === cookie[j] - cookie[i]) {
          answer = cookie[i] - minus;
          break;
        }
      }
    }
    start++;
  }
  return answer;
}
