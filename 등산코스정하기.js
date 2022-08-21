function solution(n, paths, gates, summits) {
    // 변수 초기화
    const pathMap = {}
    const gateMap = {}
    const summitMap = {}

    summits.sort((a, b) => a - b)
    for(const gate of gates) gateMap[gate] = true
    for(const summit of summits) summitMap[summit] = true

    for(const [i, j, w] of paths) {
        if(!summitMap[i] && !gateMap[j]){
            pathMap[i] = pathMap[i] || []
            pathMap[i].push([j, w])
        }
        if(!summitMap[j] && !gateMap[i]){
            pathMap[j] = pathMap[j] || []
            pathMap[j].push([i, w])
        }
    }
    // bfs 이용
    function bfs(max) {
        const visited = {}
        const q = []
        // 출발 노드 큐에 넣어주기
        for(const gate of gates) {
              visited[gate] = true
              q.push(gate)
        }

        while(q.length) {
            const gate = q.shift()
            // 경로 없으면 스킵
            if(!pathMap[gate]) continue
            for(const [next, w] of pathMap[gate]) {
                // 임계치 이상, 방문한 노드면 스킵
                if(w > max) continue
                if(visited[next]) continue
                visited[next] = true
                q.push(next)
            }
        }

        for(const summit of summits){
            // 봉우리 방문시 리턴
            if(visited[summit]) return summit
        }
        return false
    }

    // w가 가질수있는 최대값은 10000000
    let [start, end, mid, summit] = [1, 10**7, 0,n]
    // 이분 탐색
    while (start <= end) {
        mid = Math.floor((start + end) / 2)
        const result = bfs(mid)
        if(result) {
            end = mid - 1
            summit = result
        }else start = mid + 1
    }

    return [summit, start]
}
console.log(
    solution(
        6,[[1, 2, 3], [2, 3, 5], [2, 4, 2], [2, 5, 4], [3, 4, 4], [4, 5, 3], [4, 6, 1], [5, 6, 1]],
        [1, 3],[5]
    )
)