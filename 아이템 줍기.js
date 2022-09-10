function solution(rectangle, characterX, characterY, itemX, itemY) {
    let answer = Number.MAX_VALUE
    const low = new Array(101).fill(0)
    const field = low.map((v) => [...low])

    for(const box of rectangle){
        field[box[1]*2] = field[box[1]*2].map((v,i) => v + ((box[0]*2 <= i && i <= box[2]*2) ? 1 : 0))
        field[box[3]*2] = field[box[3]*2].map((v,i) => v + ((box[0]*2 <= i && i <= box[2]*2) ? 1 : 0))
        for(let yIndex = box[1]*2 + 1; yIndex < box[3]*2; yIndex++){
            field[yIndex][box[0]*2] += 1
            field[yIndex][box[2]*2] += 1
        } 
    }

    for(const box of rectangle){
        for(let yIndex = box[1]*2 + 1; yIndex < box[3]*2; yIndex++){ 
            field[yIndex] = field[yIndex].map((v,i) => ((box[0]*2 + 1 <= i && i <= box[2]*2 - 1) ? 0 : v))
        } 
    }
    function move(prevX,prevY,length,visited){
        if(prevX === itemX*2 && prevY === itemY*2) {
            return answer = Math.min(answer,length)
        }
        visited[prevY][prevX] = 0
        if(prevX < visited.length - 1 && visited[prevY][prevX + 1] > 0){
            move(prevX + 1,prevY,length+1,visited.map(v => [...v]))
        }
        if(prevX > 0 && visited[prevY][prevX - 1] > 0){
            move(prevX - 1,prevY,length+1,visited.map(v => [...v]))
        }
        if(prevY < visited.length - 1 && visited[prevY + 1][prevX] > 0){
            move(prevX,prevY + 1,length+1,visited.map(v => [...v]))
        }
        if(prevY > 0 && visited[prevY - 1][prevX] > 0){
            move(prevX,prevY - 1,length+1,visited.map(v => [...v]))
        }
    }
    move(characterX*2,characterY*2,0,field.map(v => [...v]))
    return answer / 2
}