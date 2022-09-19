function solution(cacheSize, cities) {
    // 캐시 공간 없을시 바로리턴
    if (cacheSize === 0) return 5 * cities.length
    let answer = 0, cache = []
    cities.forEach(city => {
        // 대소구분 X
        city = city.toLowerCase()
        let idx = cache.indexOf(city)
        // 캐시 존재 O
        if (idx > -1) {
            cache.splice(idx, 1)
            answer += 1
        } 
        // 캐시 존재 X
        else {
            // 제거할 캐시 제거
            if (cache.length >= cacheSize) cache.shift()
            answer += 5
        }
        // 캐시에 넣어주기
        cache.push(city)
    })
    return answer
}

console.log(solution(0,["a", "a",'a']))