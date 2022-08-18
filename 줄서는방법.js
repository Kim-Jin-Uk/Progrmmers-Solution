// 속도개선을 위해 객체로 저장
const mFactorial = {
    0: 1,
    1: 1
}
// 팩토리얼 함수
function factorial(n) {
    if (mFactorial[n] === undefined) mFactorial[n] = n * factorial(n - 1)
    return mFactorial[n]
}

function solution(n, k) {
    const arrNum = []
    // 기본 배열 초기화
    for (var i = 1; i <= n; i++) arrNum.push(i)
    const answer = []
    k--
    while (arrNum.length > 0) {
        // 몫 구하기
        const i = Math.floor(k / factorial(n - 1))
        // 나머지 할당
        k %= factorial(n - 1)
        n--
        answer.push(arrNum[i])
        arrNum.splice(i, 1)
    }
    return answer
}