function solution(N, road, K) {
  let answer = 0;
  // 그래프를 담을 맵생성
  let map = new Map();
  // 문제의 인덱스를 그대로 사용하기 위해 한사이즈 크게 설정
  let dp = new Array(N + 1).fill(Number.MAX_VALUE);
  // 방문노드 초기화
  let visited = new Array(N + 1).fill(0);
  // dp초기화 - 한사이즈 크게만들었으니 0, 1번노드가 시작점이니 1 초기화
  dp[0] = 0;
  dp[1] = 0;
  // 그래프 담아주기 - 양방향 그래프이므로 a,b 두개 모두 담아주기
  for (let [a, b, time] of road) {
    if (map.has(a)) {
      map.get(a).push([b, time]);
    } else {
      map.set(a, [[b, time]]);
    }
    if (map.has(b)) {
      map.get(b).push([a, time]);
    } else {
      map.set(b, [[a, time]]);
    }
  }
  // 시작 노드로 큐 초기화
  let que = [[1, 0]];

  while (que.length > 0) {
    const [prev, prevTime] = que.shift();
    // 방문노드면 스킵
    if (visited[prev] > 0) continue;
    // 방문처리
    visited[prev] = 1;
    // 간선이 없다면 스킵
    if (!map.has(prev)) continue;
    // 기존 시간보다 새로 계산된 시간이 작으면 갱신
    for (let [next, nextTime] of map.get(prev)) {
      dp[next] = Math.min(dp[next], nextTime + dp[prev]);
      if (visited[next] > 0) continue;
      que.push([next, dp[next]]);
    }
    // 큐를 힙처럼 사용하기위해 정렬
    que.sort((a, b) => a[1] - b[1]);
  }
  // 1번노드부터 끝노드까지 거리에따라 리턴값 갱신
  for (let idx = 1; idx < N + 1; idx++) {
    if (dp[idx] <= K) answer++;
  }
  return answer;
}

function solution(N, road, K) {
  const dp = new Array(N + 1).fill(Infinity);
  const map = new Array(N + 1).fill(false).map((_) => []);

  // 객체를 통해 맵의 형태 구현
  road.forEach(([a, b, c]) => {
    map[a].push({ to: b, val: c });
    map[b].push({ to: a, val: c });
  });
  const queue = [{ to: 1, val: 0 }];
  dp[1] = 0;
  while (queue.length) {
    const { to } = queue.pop();
    map[to].forEach((step) => {
      if (dp[step.to] > dp[to] + step.val) {
        dp[step.to] = dp[to] + step.val;
        queue.push(step);
      }
    });
  }
  return dp.filter((val) => val <= K).length;
}
