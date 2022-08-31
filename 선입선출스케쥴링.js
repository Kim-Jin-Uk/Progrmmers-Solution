function solution(n, cores) {
    let rest = n - cores.length // 남은 처리개수
    // 이분 탐색 수행 > 프로세스 처리 시간 도출
    let maxTime = Math.max(...cores) * rest / cores.length
    let minTime = 1
    while(minTime < maxTime){
        const midTime = (maxTime+minTime) / 2 >> 0
        const process = cores.reduce((sum,time)=>sum + midTime / time >> 0,0)
        if(process >= rest) maxTime = midTime
        else minTime = midTime+1
    }
    // 남은 처리개수 갱신
    for(const core of cores) rest -= (maxTime-1) / core >> 0
    // 추가 처리하며 갱신
    for(let i = 0; i < cores.length; i++) {
        if(maxTime % cores[i] === 0) {
            rest --
            if(!rest) return i + 1
        }
    }
}