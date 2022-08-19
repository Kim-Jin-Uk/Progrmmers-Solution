function solution(s) {
    let [prev,min,max] = ['',Number.MAX_VALUE,-Number.MAX_VALUE]
    s.split('').forEach((char)=>{
        if(char === ' '){
            const num = +prev
            prev = ''
            min = Math.min(min,num)
            max = Math.max(max,num)
        }
        // 2자리 이상의 숫자일수 있음
        else prev += char
    })
    // 마지막 글자가 한자리 숫자일 수 있음
    if(prev){
        const num = +prev
            prev = ''
            min = Math.min(min,num)
            max = Math.max(max,num)
    }
    return min + ' ' + max
}