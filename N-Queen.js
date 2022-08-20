function solution(n) {
    // 중복을 방지하기위해 해시맵 생성
    const logs = {}
    function dfs(visited,qNum){
        // 퀸을 모두 채웠다면 리턴
        if(qNum === n) return logs[visited.join()]=true
        const startIdx = qNum*n
        // 불가능한 인덱스
        const visitedIdx = {}
        visited.forEach((v)=>{
            const share = Math.floor(v/n)
            const rest = v%n
            // 방문 퀸의 수직, 대각선 인덱스
            visitedIdx[rest] = true
            visitedIdx[rest+qNum-share] = true
            visitedIdx[rest-qNum+share] = true
        })
        for(let i = 0; i < n; i++){
            // 가능한 인덱스라면 넣어주기
            if(!visitedIdx[i]) dfs(visited.concat([i+startIdx]),qNum+1)
        }
    }
    dfs([],0)
    return Object.keys(logs).length
}