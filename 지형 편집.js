function solution(land, P, Q) {
  const maxH = Math.max(...land.map((v) => Math.max(...v)));
  const answer = new Array(maxH + 1).fill(0);
  const prices = land.map((field) =>
    field.map((el) =>
      new Array(maxH + 1).fill(Infinity).map((v, i) => {
        if (el > i) return (el - i) * Q;
        return (i - el) * P;
      })
    )
  );
  prices.forEach((a) =>
    a.forEach((b) =>
      b.forEach((c, i) => {
        answer[i] += c;
      })
    )
  );
  return answer;
}
