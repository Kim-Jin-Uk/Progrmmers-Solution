function solution(numbers) {
  let answer = Infinity;
  let time = Infinity;
  const wDict = {
    1: 0,
    2: 1,
    3: 2,
    4: 0,
    5: 1,
    6: 2,
    7: 0,
    8: 1,
    9: 2,
    0: 1,
  };
  const hDict = {
    1: 0,
    2: 0,
    3: 0,
    4: 1,
    5: 1,
    6: 1,
    7: 2,
    8: 2,
    9: 2,
    0: 3,
  };
  dfs(-1, 0, 0, "4", "6");
  function dfs(idx, pA, pT, left, right) {
    if (idx === numbers.length - 1) {
      if (time >= pT) {
        time = pT;
        answer = Math.min(answer, pA);
      }
      return;
    }
    const i = idx + 1;
    const [lP, lT] = calcPriority(left, numbers[i]);
    const [rP, rT] = calcPriority(right, numbers[i]);
    if (lP > rP) dfs(i, pA + rP, pT + rT, left, numbers[i]);
    else if (lP < rP) dfs(i, pA + lP, pT + lT, numbers[i], right);
    else {
      dfs(i, pA + rP, pT + rT, left, numbers[i]);
      dfs(i, pA + lP, pT + lT, numbers[i], right);
    }
  }

  function calcPriority(start, target) {
    let rA = 0;
    let rT = 0;
    let sW = wDict[start];
    let sH = hDict[start];
    const tW = wDict[target];
    const tH = hDict[target];
    while (!(sW === tW && sH === tH)) {
      rA++;
      if (sW < tW) {
        sW++;
        rA++;
        rT++;
      } else if (sW > tW) {
        sW--;
        rA++;
        rT++;
      }
      if (sH < tH) {
        sH++;
        rA++;
        rT++;
      } else if (sH > tH) {
        sH--;
        rA++;
        rT++;
      }
    }
    return [rA ? rA : 1, rT];
  }
  return answer;
}
