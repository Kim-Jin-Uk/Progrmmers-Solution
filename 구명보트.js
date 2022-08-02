function solution(people, limit) {
    let answer = 0
    // 무게 높은순으로 정렬
    people.sort((a, b) => b - a)
    let start = 0
    let end = people.length - 1
    // 두명만 탈수 있으므로 효율적으로 탑승시키지 않는다 -> 무게 50, limit 100 인경우 50이하라면 그냥 탑승시킨다
    while (start <= end) {
        // 혼자 타는 경우
        if (people[start] + people[end] > limit) {
            start ++
            answer++
        } 
        // 둘이 타는 경우
        else {
            start ++
            end --
            answer++
        }
    }

    return answer
}