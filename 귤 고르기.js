function solution(k, tangerine) {
  let answer = 0;
  const tDict = {};
  // 귤 객체를 초기화 해줍니다
  tangerine.forEach((t) => (tDict[t] = (tDict[t] || 0) + 1));
  // 값만을 도출하여 내림차순으로 정렬해 줍니다 - 키는 모두 다르기에
  const tArr = Object.values(tDict).sort((a, b) => b - a);
  // 필요한 귤만큼 가짓수를 더해줍니다
  for (const t of tArr) {
    answer++;
    if (k > t) k -= t;
    else break;
  }
  return answer;
}
