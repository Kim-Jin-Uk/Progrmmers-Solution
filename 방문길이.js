function solution(dirs) {
    const answer = {}
    // 시작점 설정 11X11 사이즈의 테이블의 중앙
    let [x,y] = [5,5]
    for(const char of dirs){
        // 시작점
        const route = [x,y]
        // 각 케이스별 끝점 생성
        if(char === 'U'){
            if(x > 0) x --
            else continue
        }else if(char === 'D'){
            if(x < 10) x ++
            else continue
        }else if(char === 'R'){
            if(y < 10) y ++
            else continue
        }else if(char === 'L'){
            if(y > 0) y --
            else continue
        }
        // 시작 -> 끝, 끝 -> 시작은 모두 같은 케이스임
        answer[route.concat([x,y]).join()] = true
        answer[[x,y].concat(route).join()] = true
    }
    // 양방향으로 설정 하였으므로 2로 나누어줌
    return Object.keys(answer).length/2
}