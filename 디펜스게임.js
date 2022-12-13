function solution(n, k, enemy) {
  let left = 0;
  let right = enemy.length;

  const check = (n, k, mid, enemy) => {
    if (mid <= k) return true;
    const slice = enemy.slice(0, mid).sort((a, b) => b - a);
    let sum = 0;
    for (let i = k; i < slice.length; i++) {
      sum += t[i];
      if (sum > n) return false;
    }
    return true;
  };

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (check(n, k, mid, enemy)) left = mid + 1;
    else right = mid - 1;
  }

  return left - 1;
}
