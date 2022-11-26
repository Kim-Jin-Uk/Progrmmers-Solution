function solution(target) {
  const dp = new Array(target + 1).fill(0).map((_) => [Infinity, 0]);
  const targetList = new Array(20).fill(0).map((_, idx) => idx + 1);
  dp[0][0] = 0;
  for (let i = 0; i < target; i++) {
    for (let j of targetList) {
      setNext(i, j, 1);
      setNext(i, j * 2, 0);
      setNext(i, j * 3, 0);
      setNext(i, 50, 1);
    }
  }
  function setNext(i, score, add) {
    if (i + score > target) return;
    if (dp[i + score][0] >= dp[i][0] + 1) {
      if (dp[i + score][0] === dp[i][0] + 1)
        dp[i + score][1] = Math.max(dp[i + score][1], dp[i][1] + add);
      else dp[i + score] = [dp[i][0] + 1, dp[i][1] + add];
    }
  }
  return dp[target];
}
