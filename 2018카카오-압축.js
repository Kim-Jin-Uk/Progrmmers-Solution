// 코드 개선
function solution(msg) {
  const answer = [];
  const dict = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").reduce((dict, cur, i) => {
    dict[cur] = i + 1;
    return dict;
  }, {});
  let prevKey = "";
  let prevValue = -1;
  let keyNum = 27;
  // 키를 누산하여 계산
  for (let idx = 0; idx < msg.length; idx++) {
    const key = msg[idx];
    prevKey += key;
    // 키값이 존재하면 키 누산 및 직전 키값 갱신
    if (dict[prevKey]) prevValue = dict[prevKey];
    // 키값이 없다면 직전 키값으로 리턴값 갱신
    // 사전에 키등록, 직전 키 및 직전 키값 갱신
    else {
      answer.push(prevValue);
      dict[prevKey] = keyNum++;
      prevKey = key;
      prevValue = dict[prevKey];
    }
  }
  // 마지막 키값으로 리턴값 갱신
  answer.push(dict[prevKey]);
  return answer;
}
