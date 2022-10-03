function solution(rows, columns, queries) {
    const answer = []
    const table = []
    let idx = 1
    for(let i = 0; i < rows; i++){
        const row = []
        for(let j=0;j<columns;j++){
            row.push(idx)
            idx ++
        }
        table.push(row)
    }
    function rotation([x1,y1,x2,y2]){
        const values = []
        let prev = table[x1-1][y1-1]
        for(let y = y1; y < y2; y++){
            const prev2 = table[x1-1][y]
            table[x1-1][y] = prev
            values.push(prev)
            prev = prev2
        }
        for(let x = x1; x < x2; x++){
            const prev2 = table[x][y2-1]
            table[x][y2-1] = prev
            values.push(prev)
            prev = prev2
        }
        for(let y = y2; y > y1; y--){
            const prev2 = table[x2-1][y-2]
            table[x2-1][y-2] = prev
            values.push(prev)
            prev = prev2
        }
        for(let x = x2; x > x1; x--){
            const prev2 = table[x-2][y1-1]
            table[x-2][y1-1] = prev
            values.push(prev)
            prev = prev2
        }
        answer.push(Math.min(...values))
    }
    for(const query of queries){
        rotation(query)
    }
    return answer
}