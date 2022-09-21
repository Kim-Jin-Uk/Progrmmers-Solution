function solution(brown, yellow) {
    for(let i = 3; i < (brown+yellow)/2 +1;i++){
        if((brown+yellow)%i === 0){
            if((i-2)*((brown+yellow)/i-2) === yellow){
                if(i > (brown+yellow)/i) return [i,(brown+yellow)/i]
                else return [(brown+yellow)/i,i]
            }
        }
    }
}