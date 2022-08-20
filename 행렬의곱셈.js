function solution(arr1, arr2) {
    let answer = []
    // 3중 포문으로 계산
    for(let i = 0; i < arr1.length; i++) {
        const row = []
        for(let j = 0; j < arr2[0].length; j++) {
            row.push(arr2.reduce((acc,cur,k)=>acc+arr1[i][k]*arr2[k][j],0))
        }
        answer.push(row)
    }
    return answer
}