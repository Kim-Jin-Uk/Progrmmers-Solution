function solution(n, wires) {
    let answer = Number.MAX_VALUE
    // 전력망을 담을 그래프
    const wireObj = {}
    // 전력망 넣어주기
    for(const [start, end] of wires){
        wireObj[start] = wireObj[start] || []
        wireObj[start].push(end)
        wireObj[end] = wireObj[end] || []
        wireObj[end].push(start)
    }
    // 각 전선들을 끊어가며 리턴값 갱신
    for(const [id1,id2] of wires){
        const len = breakWire(id1,id2)
        const other = n - len
        if(len-other>0) answer = Math.min(answer,len-other)
        else answer = Math.min(answer,-(len-other))
    }
    // 전선 끊기
    function breakWire(id1,id2){
        // 객체 깊은복사
        const breakedObj = Object.assign({}, wireObj)
        // 전선을 끊어줌
        breakedObj[id1] = breakedObj[id1].filter((v)=>v!==id2)
        breakedObj[id2] = breakedObj[id2].filter((v)=>v!==id1)
        // 하나의 길이만 알면됨 - 초기엔 모두 연결이므로 n-len이 다른 길이
        const len = getLength(breakedObj,id1,[id1])
        return len
    }
    // 길이 구하기
    function getLength(obj,prev,visited){
        const nexts = obj[prev]
        // 순회
        for(const next of nexts){
            if(visited.includes(next)) continue
            visited.push(next)
            getLength(obj,next,visited)
        }
        // 거친 너드의 수 반환
        return visited.length
    }
    return answer
}
console.log(solution(
    9,	[[1,3],[2,3],[3,4],[4,5],[4,6],[4,7],[7,8],[7,9]]
))
console.log(solution(
    4,	[[1,2],[2,3],[3,4]]
))
console.log(solution(
    7,	[[1,2],[2,7],[3,7],[3,4],[4,5],[6,7]]
))