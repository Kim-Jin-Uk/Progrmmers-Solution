function solution(board){
    let answer = 0
    const rows = board.length
    const columns = board[0].length
    // 1,1 을 시작점으로 상, 좌, 좌상의 값을 찾아 값을갱신
    // 자신이 1 이라면 상, 좌, 좌상의 값중 최소+1로 갱신된다
    for(let r = 1; r < rows; r++){
        for(let c = 1; c < columns; c++){
            // 0인경우 스킵
            if(!board[r][c]) continue
            // 값 갱신
            const minSize = Math.min(board[r-1][c-1],board[r][c-1],board[r-1][c])
            board[r][c] = minSize+1
            answer = Math.max(answer,minSize+1)
        }
    }
    // 1,1 부터 시작이므로 해당 부분처리
    // 리턴값이 0 이고 최상단 또는 최좌단ㅇ에 1이 포함되어있다면 1 리턴
    if(answer === 0 && (board[0].includes(1) || board.map((v)=>v[0]).includes(1))) return 1
    return answer**2
}