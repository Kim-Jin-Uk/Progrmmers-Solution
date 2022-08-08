function solution(arr) {
    let answer = [0,0]
    function quadTree(table){
        const element = table[0][0]
        // table의 길이가 1이면 바로 리턴
        if(table.length === 1) return answer[element] ++
        // 배열을 순회하며 조건 만족여부 판별
        let check = true
        outer:for(const row of table){
            for(const cell of row){
                if(cell !== element){
                    check = false
                    break outer
                }
            }
        }
        // 만족한다면 바로리턴
        if(check) return answer[element] ++
        // 4개의 사분면으로 잘라서 다시 계산
        const len = table.length/2
        // 1사분면
        quadTree(table.slice(0,len).map((v)=>v.slice(0,len)))
        // 2사분면
        quadTree(table.slice(0,len).map((v)=>v.slice(len,2*len)))
        // 3사분면
        quadTree(table.slice(len,2*len).map((v)=>v.slice(0,len)))
        // 4사분면
        quadTree(table.slice(len,2*len).map((v)=>v.slice(len,2*len)))
    }
    quadTree(arr)
    return answer
}