function solution(cacheSize, cities) {
    let answer = 0
    // 캐시를 담을 큐 생성
    let cache = []
    for(const c of cities){
        // 대소문자 구분을 안함
        const city = c.toLowerCase()
        // 캐시에 여유가 있을때
        if(cache.length < cacheSize){
            // 포함일때
            if(cache.includes(city)){
                answer ++
                // 우선순위 조정
                cache = cache.filter(v=>v!==city)
                if(cache.length < cacheSize) cache.push(city)
            }
            // 미포함일때
            else{
                answer += 5
                cache.push(city) 
            }
        }
        // 캐시가 꽉 찻을때
        else{
            // 포함일때
            if(cache.includes(city)){
                answer ++
                // 우선순위 조정
                cache = cache.filter(v=>v!==city)
                // 캐시 최대길이 0일때 처리
                if(cache.length < cacheSize) cache.push(city)
            }
            // 미포함일때
            else{
                answer += 5
                // 큐에서 빼내고 새로 추가
                cache.shift()
                // 캐시 최대길이 0일때 처리
                if(cache.length < cacheSize)cache.push(city)
            }
        }
    }
    return answer
}

console.log(solution(0,["a", "a",'a']))