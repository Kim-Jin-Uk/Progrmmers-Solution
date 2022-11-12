function solution(k, ranges) {
  const answer = [];
  const sequence = [];
  while (k !== 1) {
    sequence.push(k);
    if (k % 2 === 0) k /= 2;
    else k = k * 3 + 1;
  }
  sequence.push(1);
  const length = sequence.length - 1;
  ranges.forEach(([s, e]) => {
    const [start, end] = [s, length + e];
    answer.push(integral(start, end));
  });
  function integral(s, e) {
    if (s === e) return 0;
    if (s > e) return -1;
    return (sequence[s] + sequence[s + 1]) / 2 + integral(s + 1, e);
  }
  return answer;
}
