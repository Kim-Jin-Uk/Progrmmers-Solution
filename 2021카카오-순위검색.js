function solution(info, query) {
    const answer = []
    const infos = {}
    // 지원자 정보 디셔너리 형태로 저장
    info.forEach(infoString => { 
        const arr = infoString.split(" ")
        // 정수 정수화
        const score = +arr.pop()
        const key = arr.join(""); 
        // 키는 모든 조건을 더한 문자열
        infos[key] = infos[key] || []
        infos[key].push(score)
    })
    
    for (const key in infos) {
        // 점수순 정렬
        infos[key].sort((a, b) => a - b)
    }
    
    //이진탐색
    function binarySearch(arr, target){
        let left = 0
        let right = arr.length - 1
        let mid = Math.floor((left + right) / 2)

        while(left <= right) {
            if (arr[mid] === target) return mid
            if (arr[mid] < target) left = mid + 1
            else right = mid - 1
            mid = Math.floor((left + right) / 2)
        }

        return mid + 1
    }
    // 해당 쿼리에 맞는 결과 반환
    function getResult(query, score){
        const infosKey = Object.keys(infos)
        return infosKey
            // 키 포함 여부로 필터링
            .filter(key => query.every(v => key.includes(v)))
            .reduce((acc, key) => 
                    acc + infos[key].length - binarySearch(infos[key],score), 0)
    }
    
    query
        // and 제외한 쿼리 배열
        .map(q => q.split(/ and | |-/i).filter(v => v !== ""))
        .forEach(query => {
            const score = query.pop()
            answer.push(getResult(query, score))
        })
    
    return answer
}