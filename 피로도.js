function solution(k, dungeons) {
    let answer = 0
    //  방문배열 초기화
    const visited = new Array(dungeons.length).fill(0)
    
    clear(k,visited,0)
    
    function clear(k,visited,count){
        dungeons.forEach(([min,minus],idx) => {
            // 탐험하지 않은 던전, 최소피로도 만족하는 던전 탐험
            if(visited[idx] !== 1 && k >= min){
                const visit = [...visited]
                // 탐험 처리
                visit[idx] = 1
                clear(k-minus,visit,count+1)
            }
        })
        // 최대값 갱신
        answer = Math.max(answer,count)
    }
    
    return answer
}