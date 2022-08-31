function solution(n, works){
    // 모두 감소시킬수 있다면 0 리턴
    if(works.reduce((a,b) => a+b) <= n) return 0
    const sorted = works.sort((a, b) => a-b)
    const len = works.length
    while(n){
        const max = sorted[len-1]
        for(let i = len-1; i >= 0; i--){
            if(sorted[i] >= max) {
                sorted[i]--
                n--
            }
            if(!n) break
        }
    }
    // 리턴
    return works.reduce((a, b) => a + b**2, 0)
}