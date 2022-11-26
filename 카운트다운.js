function solution(target) {
  const dp = new Array(300000).fill(null).map((_) => [Infinity, 0]);
  const targetList = new Array(20).fill(null).map((_, idx) => idx + 1);
  dp[0][0] = 0;
  for (let i = 0; i < target; i++) {
    for (let j of targetList) {
      if (dp[i + j * 1][0] >= dp[i][0] + 1) {
        if (dp[i + j * 1][0] === dp[i][0] + 1)
          dp[i + j * 1][1] = Math.max(dp[i + j * 1][1], dp[i][1] + 1);
        else dp[i + j * 1] = [dp[i][0] + 1, dp[i][1] + 1];
      }
      if (dp[i + j * 2][0] >= dp[i][0] + 1) {
        if (dp[i + j * 2][0] === dp[i][0] + 1)
          dp[i + j * 2][1] = Math.max(dp[i + j * 2][1], dp[i][1] + 0);
        else dp[i + j * 2] = [dp[i][0] + 1, dp[i][1] + 0];
      }
      if (dp[i + j * 3][0] >= dp[i][0] + 1) {
        if (dp[i + j * 3][0] === dp[i][0] + 1)
          dp[i + j * 3][1] = Math.max(dp[i + j * 3][1], dp[i][1] + 0);
        else dp[i + j * 3] = [dp[i][0] + 1, dp[i][1] + 0];
      }
    }
    if (dp[i + 50][0] >= dp[i][0] + 1) {
      if (dp[i + 50][0] === dp[i][0] + 1)
        dp[i + 50][1] = Math.max(dp[i + 50][1], dp[i][1] + 1);
      dp[i + 50] = [dp[i][0] + 1, dp[i][1] + 1];
    }
  }
  return dp[target];
}
