function solution(lines) {
    let answer = 0
    // 기준점 배열 - 딜레이 시작, 끝시간
    const standards = []
    // 불필요한 재연산 방지를 위한 트래픽 시간 배열 생성
    const times = []
    lines.forEach((logTime)=>{
        // 원하는 타입으로 변환 및 배열 갱신
        const [,start,delay] = logTime.split(' ')
        const [h,m,s] = start.split(':')
        const endTime = +h*60*60 + +m*60 + +s
        const delayTime = +delay.replace('s','') - 0.001
        standards.push(endTime)
        standards.push(endTime-delayTime)
        times.push([endTime-delayTime,endTime])
    })
    // 트래픽 횟수 구하기
    function makeDelayCount(standard){
        let delayCount = 0
        for(let i = 0; i < times.length; i++){
            const [startTime,endTime] = times[i]
            if(standard + 1 <= startTime || standard > endTime)continue
            delayCount ++
        }
        return delayCount
    }
    // 각 기준별로 트래픽 수 구하고 리턴값 갱신
    standards.forEach((standard)=>{
        answer = Math.max(makeDelayCount(standard),answer)
    })
    return answer
}