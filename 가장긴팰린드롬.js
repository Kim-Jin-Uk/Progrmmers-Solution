function solution(s){
    let len = 0
    // 팰린드롬 확장하며 확인
    function checker(l, r){
        while(l >= 0 && r < s.length && s[l] === s[r]){
            l --
            r ++
        }
        return [l+1,r]
    }
    // 원본이 팰린드롬이라면 리턴
    if(s.length === 1 || s === s.split('').reverse().join('')) return s.length
    for(let idx = 0; idx < s.length; idx ++){
        // 길이가 짝수, 홀수인 최대 팰린드롬 확인
        const [l1,r1,l2,r2] = [...checker(idx,idx+1),...checker(idx,idx+2)]
        // 최대 길이 갱신
        len = Math.max(len,r1-l1,r2-l2)
    }
    return len
}