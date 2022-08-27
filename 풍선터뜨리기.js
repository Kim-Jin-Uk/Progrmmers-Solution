function solution(a) {
    let answer = a.length
    // 불가능 후보군 제거
    while(true){
        const removes = {}
        // 양측이 모두 작다면 불가능 후보군
        for(let idx = 1; idx < a.length-1; idx++){
            if(a[idx-1] < a[idx] && a[idx+1] < a[idx]){
                removes[idx] = true
            }
        }
        if(!Object.keys(removes).length) break
        answer -= Object.keys(removes).length
        a = a.filter((v,i)=>!removes[i])
    }
    
    return answer
}