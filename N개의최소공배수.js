function solution(arr) {
    let answer = 1
    // 인수분해값을 담을 객체
    const numObj = {}
    // 인수분해
    function factorization(num,obj){
        for(let div = 2; div <= num**(0.5); div++){
            if(num%div === 0){
                obj[div] = (obj[div] || 0) + 1
                return factorization(num/div,obj)
            }
        }
        obj[num] = (obj[num] || 0) + 1
        return obj
    }
    // 인수분해한 객체로 갱신
    for(const num of arr){
        const obj = factorization(num,{})
        for(const key in obj){
            numObj[key] = Math.max(numObj[key] || 0, obj[key])
        }
    }
    for(const key in numObj){
        answer *= (+key)**numObj[key]
    }
    return answer;
}