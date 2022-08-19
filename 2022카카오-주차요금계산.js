function solution(fees, records) {
    const answer = []
    const recordObj = {}
    const deadLine = 23*60+59 // 최종 출차시간
    const [baseTime,baseFee,overTime,overFee] = fees // 요금 계산 변수
    function calc(time){
        // 기본시간 이하는 기본요금
        if(time <= baseTime) return baseFee
        // 기본시간 초과는 초과비용 계산
        const calcTime = time - baseTime
        return baseFee + Math.ceil(calcTime / overTime)*overFee
    }
    records.forEach((record)=>{
        const [timeS, id, type] = record.split(' ')
        const time = +timeS.split(':')[0]*60 + +timeS.split(':')[1]
        if(type === 'IN'){
            // 객체의 프로퍼티로 저장 in:입차 시간,total:총 주차 시간,type:출차여부
            recordObj[id] = recordObj[id] || {in:0,total:0,type:true}
            recordObj[id].in = time
            recordObj[id].type = false
        }else{
            // 데이터 갱신
            recordObj[id].total += time - recordObj[id].in
            recordObj[id].type = true
        }
    })
    const ids = Object.keys(recordObj)
    // 작은 번호순 정렬
    ids.sort((a,b)=>+a - +b)
    for(const id of ids){
        // 출차처리가 안되있다면 요금 갱신
        if(!recordObj[id].type) recordObj[id].total += deadLine - recordObj[id].in
        answer.push(calc(recordObj[id].total))
    }
    return answer
}