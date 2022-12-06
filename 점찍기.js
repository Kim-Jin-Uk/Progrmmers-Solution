function solution(k, d) {
  let answer = 0;
  for (let x = 0; x <= d; x += k) {
    // x값을 통해 y의 최대값 도출
    const maxY = (d ** 2 - x ** 2) ** 0.5;
    // maxY가 k로 딱 나누어 떨어지면 1을 더해준다
    answer += Math.ceil(maxY / k) + (maxY % k === 0 ? 1 : 0);
  }
  return answer;
}
