function solution(places) {
    const answer = new Array(places.length).fill(1)
    let table = []
    for(const placeIdx in places){
        table = []
        for(const place of places[+placeIdx]){
            table.push(place.split(''))    
        }
        for(let x = 0; x < 5; x++){
            for(let y = 0; y < 5; y++){
                if(table[x][y] === 'P'){
                    PtoP(x,y,0,table.map((v) => [...v]),+placeIdx)
                }
            }   
        }
    }
    
    function PtoP(prevX,prevY,distance,table,idx){  
      if(distance === 2) return
        table[prevX][prevY] = 'X'
        const placeCandidates = [
            [prevX+1,prevY],
            [prevX-1,prevY],
            [prevX,prevY+1],
            [prevX,prevY-1],
        ]
        for(const [x,y] of placeCandidates){
            if(0 <= x && x < 5 && 0 <= y && y < 5){
                if(table[x][y] === 'X') continue
                if (table[x][y] === 'P'){
                    answer[idx] = 0
                    return
                }else PtoP(x,y,distance+1,table,idx) 
            }
        }
    }
    return answer
}