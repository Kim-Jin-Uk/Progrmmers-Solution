function solution(board, skill) {
    let answer = board.length * board[0].length
    let damgeTable = new Array(board.length+1).fill(0).map((v)=>new Array(board[0].length+1).fill(0))

    // 누산합 설정 함수
    function change(skill){
        let damage = skill[5]
        if(skill[0] === 1) damage *= -1
        damgeTable[skill[1]][skill[2]] += damage
        damgeTable[skill[1]][skill[4]+1] -= damage
        damgeTable[skill[3]+1][skill[2]] -= damage
        damgeTable[skill[3]+1][skill[4]+1] += damage
    }
    for(let i of skill) change(i)

    // 누산합 계산 x축
    for(let x = 0; x < damgeTable.length-1; x++){
        for(let y = 0; y < damgeTable[0].length; y++){
            damgeTable[x+1][y] += damgeTable[x][y]
        }
    }
    // 누산합 계산 y축
    for(let x = 0; x < damgeTable.length; x++){
        for(let y = 0;y < damgeTable[0].length-1; y++){
            damgeTable[x][y+1] += damgeTable[x][y]
        }
    }
    // 파괴되지 않은 건물 계산
    for(let x = 0; x < damgeTable.length-1; x++){
        for(let y = 0;y < damgeTable[0].length-1; y++){
            if(board[x][y] + damgeTable[x][y] <= 0) answer--
        }
    }
    return answer
}