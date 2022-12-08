function solution(words) {
  let answer = 0;
  // 좌우만 확인하기 위한 정렬
  words.sort();
  function isMatch(i) {
    // 좌측 확인
    let result1 = i + 1 < words.length ? getMatchCountFor(i, i + 1) : 0;
    // 우측 확인
    let result2 = i - 1 >= 0 ? getMatchCountFor(i, i - 1) : 0;
    // 문자열 길이를 넘지않는 리턴값 반환
    return Math.min(words[i].length, Math.max(result1, result2));
  }
  function getMatchCountFor(i, j) {
    let result = 0;
    for (let idx = 0; idx < Math.min(words[i].length, words[j].length); idx++) {
      // 만약 같다면 결과값 갱신
      if (words[i][idx] === words[j][idx]) result++;
      else break;
    }
    return ++result;
  }
  words.forEach((v, i) => {
    answer += isMatch(i);
  });
  return answer;
}
function solution(words) {
  words.sort();
  let [answer, a] = [0];
  words.forEach((w, i) => {
    const right = words[i + 1] || words[i - 1];
    const left = words[i - 1] || words[i + 1];
    for (let i = 1, l = w.length; i <= l; i++) {
      answer++;
      a = w.substring(0, i);
      if (a != left.substring(0, i) && a != right.substring(0, i)) return;
    }
  });
  return answer;
}
