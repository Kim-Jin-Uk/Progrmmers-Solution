function solution(n) {
    // 원본 1의 개수
    const ones = n.toString(2).split("1").length
    while (true) {
        // 1씩 증가하면서 원본 1의개수와 동일하면 리턴
        n++
        if (n.toString(2).split("1").length === ones) return n
    }
}