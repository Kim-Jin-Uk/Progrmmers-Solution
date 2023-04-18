function solution(arrayA, arrayB) {
  arrayA.sort((a, b) => a - b);
  arrayB.sort((a, b) => a - b);
  // curr은 모두 나누고 target은 모두 나눌 수 없는 최대값을 도출하는 함수 입니다
  const findA = (curr, target) => {
    for (let i = curr[0]; i > 0; i--) {
      if (curr.every((v) => v % i === 0) && !target.some((v) => v % i === 0))
        return i;
    }
    return 0;
  };
  return Math.max(findA(arrayA, arrayB), findA(arrayB, arrayA));
}
