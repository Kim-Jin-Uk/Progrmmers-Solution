function solution(strs, t) {
  var len = t.length;
  var limit = len + 1;
  var dp = new Array(len + 1).fill(limit);

  //초기화
  dp[len] = 0;

  for (var i = len - 1; i >= 0; --i) {
    var temp = "";
    for (var j = 0; j + i < len && j < 5; j++) {
      temp += t[i + j];
      if (strs.indexOf(temp) > -1 && dp[i + j + 1] != limit) {
        dp[i] = Math.min(dp[i], dp[i + j + 1] + 1);
      }
    }
  }

  if (dp[0] == limit) {
    return -1;
  }
  return dp[0];
}
