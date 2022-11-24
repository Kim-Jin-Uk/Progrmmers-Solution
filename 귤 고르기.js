function solution(k, tangerine) {
  let answer = 0;
  const tangerineDict = {};
  tangerine.forEach((t) => {
    tangerineDict[t] = (tangerineDict[t] || 0) + 1;
  });
  const tangerineArr = [];
  for (const key of Object.keys(tangerineDict)) {
    tangerineArr.push(tangerineDict[key]);
  }
  tangerineArr.sort((a, b) => b - a);
  for (const t of tangerineArr) {
    answer++;
    if (k > t) k -= t;
    else break;
  }
  return answer;
}
