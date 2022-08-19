function solution(n) {
    function move(n, start, mid, end) {
        // 길이가 1이면 리턴
        if(n == 1) return [[start,end]]
        // 재귀로 풀이
        return [
            ...move(n - 1, start, end, mid),
            [start, end],
            ...move(n - 1, mid, start, end)
        ]
    }
    return move(n,1,2,3)
}
const s = solution(2)
for(const a of s){
    console.log(a)
}