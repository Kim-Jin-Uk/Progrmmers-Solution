function solution(n) {
    let result = []
    // 결과값 피라미드 형태의 배열로 초기화 
    for(let i = 0; i < n; i++) result.push(new Array(i+1).fill(0))
    // size를 3씩 줄여서 재귀적으로 계산
    function move(start,height,size){
        // 1,0,-1 처리
        if(size === 1) return result[height][height/2] = start
        if(size <= 0) return
        let lastH = height
        // 좌측
        for(let i = 0; i < size; i++){
            result[lastH++][height/2] = start++
        }
        // 한번더 증가한것 처리
        lastH--
        //하단
        for(let i = 1; i < size; i++){
            result[lastH][height/2 + i] = start++
        }
        //우측
        for(let i = 2; i < size; i++){
            const idx = --lastH
            result[idx][result[idx].length - height/2 - 1] = start++
        }
        // 시작 위치 2칸 내려주고 size 3줄여주기
        move(start,height+2,size-3)
    }

    move(1,0,n)
    // 문제에서 원하는 반환값은 1차원 배열 이므로 1차원으로 축소
    let answer = []
    for(const r of result){
        answer = answer.concat(r)
    }
    return answer
}

console.log(solution(4,	[1,2,9,3,10,8,4,5,6,7]))