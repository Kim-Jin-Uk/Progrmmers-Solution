function solution(n, m, x, y, queries) {
  let curr = [[x, y, x, y]];
  for (const q of queries.reverse()) {
    const prev = [];
    for (const c of curr) {
      const point = getBeforeCoords(q, c, n, m);
      if (!point) return 0;
      prev.push(point);
    }
    curr = prev;
  }
  const coord = curr[0];
  return BigInt(coord[2] - coord[0] + 1) * BigInt(coord[3] - coord[1] + 1);
}
function getBeforeCoords([dir, dx], [x, y, x2, y2], n, m) {
  if (dir == 0) {
    if (y == 0) return [x, y, x2, Math.min(m - 1, y2 + dx)];
    else if (y + dx <= m - 1) return [x, y + dx, x2, Math.min(m - 1, y2 + dx)];
  } else if (dir == 1) {
    if (y2 == m - 1) return [x, Math.max(0, y - dx), x2, y2];
    else if (y2 - dx >= 0) return [x, Math.max(0, y - dx), x2, y2 - dx];
  } else if (dir == 2) {
    if (x == 0) return [x, y, Math.min(n - 1, x2 + dx), y2];
    else if (x + dx <= n - 1) return [x + dx, y, Math.min(n - 1, x2 + dx), y2];
  } else if (dir == 3) {
    if (x2 == n - 1) return [Math.max(0, x - dx), y, x2, y2];
    else if (x2 - dx >= 0) return [Math.max(0, x - dx), y, x2 - dx, y2];
  }
  return false;
}
