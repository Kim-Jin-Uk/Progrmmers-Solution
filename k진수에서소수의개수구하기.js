function solution(n, k) {
    let answer = 0
    // k진수로 변환후 0을 기준으로 나눔
    const candidates = n.toString(k).split('0')
    function isPrimeNumber(s){
        // 0이 연속해서 나온경우 , 1 바로 리턴
        if(s === '' || s === '1') return false
        const num = +s
        // 제곱근 까지만 구하면 알수 있다
        for(let div = 2; div <= num**(0.5); div++){
            if(num % div === 0) return false
        }
        return true
    }
    for(const s of candidates){
        if(isPrimeNumber(s)) answer++
    }
    return answer
}