function solution(n, edge) {
    let visited = new Array(n+1).fill(0)
    let dp = new Array(n+1).fill(0)

    let queue = [1]
    visited[1] = 1
    
    while(queue.length){
        let prev = queue.shift()
        let distance = dp[prev] +1
        edge.forEach((edgeItem)=>{
            if(edgeItem[0] === prev && visited[edgeItem[1]] !== 1){
                visited[edgeItem[1]] = 1
                queue.push(edgeItem[1])
                dp[edgeItem[1]] = distance
                return
            }
            if(edgeItem[1] === prev && visited[edgeItem[0]] !== 1){
                visited[edgeItem[0]] = 1
                queue.push(edgeItem[0])
                dp[edgeItem[0]] = distance
            }
        })
    }

    const maxValue = Math.max(...dp)
    return dp.filter((v) => v === maxValue && v !== Number.MAX_VALUE).length
}