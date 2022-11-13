function solution(arrayA, arrayB) {
  arrayA.sort((a, b) => a - b);
  arrayB.sort((a, b) => a - b);
  return Math.max(result(arrayA, arrayB), result(arrayB, arrayA));
}
function result(A, B) {
  for (let i = A[0]; i > 1; i--) {
    // A는 모두 나누고 B는 모두 나눌 수 없는 케이스
    if (A.every((a) => a % i === 0) && !B.some((b) => b % i === 0)) return i;
  }
  return 0;
}
