function solution(sticker) {
  const dp1 = [];
  const dp2 = [];
  const len = sticker.length;

  if (len < 3) return Math.max(...sticker);

  dp1[0] = sticker[0];
  dp1[1] = dp1[0];
  for (let i = 2; i < len - 1; i++)
    dp1[i] = Math.max(dp1[i - 1], dp1[i - 2] + sticker[i]);
  dp2[0] = 0;
  dp2[1] = sticker[1];
  for (let i = 2; i < len; i++)
    dp2[i] = Math.max(dp2[i - 1], dp2[i - 2] + sticker[i]);
  return Math.max(dp1[len - 2], dp2[len - 1]);
}
