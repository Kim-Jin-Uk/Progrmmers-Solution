function solution(board) {
    const n = board.length
    // 세로 가로 dp 생성
    const dp = []
    dp.push(board.map(v => new Array(n).fill(Infinity)))
    dp.push(board.map(v => new Array(n).fill(Infinity)))
    // 세로 가로 visited 생성
    const visited = []
    visited.push(board.map(v => [...v]))
    visited.push(board.map(v => [...v]))
    // dp 초기화
    dp[0][0][0] = 0
    dp[1][0][0] = 0
    // queue 초기화
    const que = [[0,0,0,0],[0,0,0,1]]

    while(que.length > 0){
        const [pX,pY,,pR] = que.shift()
        if(visited[pR][pX][pY]) continue
        visited[pR][pX][pY] = true
        // 한칸 하단
        if(pX < n - 1 && visited[pR][pX+1][pY] === 0){
            const [nX,nY,nP,nR] = [pX+1,pY,pR ? 100 : 600,1]
            dp[nR][nX][nY] = Math.min(dp[nR][nX][nY],dp[pR][pX][pY]+nP)
            if(!visited[pR][nX][nY]) que.push([nX,nY,dp[nR][nX][nY],nR])
        }
        // 한칸 좌단
        if(pY < n - 1 && visited[pR][pX][pY + 1] === 0){
            const [nX,nY,nP,nR] = [pX,pY + 1,pR ? 600 : 100,0]
            dp[nR][nX][nY] = Math.min(dp[nR][nX][nY],dp[pR][pX][pY]+nP)
            if(!visited[pR][nX][nY]) que.push([nX,nY,dp[nR][nX][nY],nR])
        }
        // 한칸 상단
        if(pX > 0 && visited[pR][pX - 1][pY] === 0){
            const [nX,nY,nP,nR] = [pX-1,pY,pR ? 100 : 600,1]
            dp[nR][nX][nY] = Math.min(dp[nR][nX][nY],dp[pR][pX][pY]+nP)
            if(visited[pR][nX][nY] !== 1) que.push([nX,nY,dp[nR][nX][nY],nR])
        }
        // 한칸 우단
        if(pY > 0 && visited[pR][pX][pY - 1] === 0){
            const [nX,nY,nP,nR] = [pX,pY - 1,pR ? 600 : 100,0]
            dp[nR][nX][nY] = Math.min(dp[nR][nX][nY],dp[pR][pX][pY]+nP)
            if(!visited[pR][nX][nY]) que.push([nX,nY,dp[nR][nX][nY],nR])
        }
        // 비용순 정렬
        que.sort(([,,aP,],[,,bP,]) => aP - bP)
    }
    // 세로 가로 dp중 최소값 리턴
    return Math.min(dp[0][n-1][n-1],dp[1][n-1][n-1])
}