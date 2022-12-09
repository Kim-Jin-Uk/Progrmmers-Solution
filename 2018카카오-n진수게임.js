function solution(n, t, m, p) {
  let answer = "";
  // 한글자씩 말하므로 n진수를 배열로 저장
  let word = [];
  let num = 0;
  for (let i = 0; i < t * m; i++) {
    if (word.length === 0) {
      // 배열이 비었다면 새글자로 갱신
      word = num.toString(n).split("");
      num++;
    }
    // 대문자로 출력해야 하므로 upper case 처리
    const char = word.shift().toUpperCase();
    // 매 p번째마다 결과 갱신
    if (i % m === p - 1) answer += char;
  }
  return answer;
}
function solution(n, t, m, p) {
  var tubeT = Array.apply(null, Array(t)).map((a, i) => i * m + p - 1);
  var line = "";
  var max = m * t + p;
  for (var i = 0; line.length <= max; i++) {
    line += i.toString(n);
  }
  return tubeT
    .map((a) => line[a])
    .join("")
    .toUpperCase();
}
