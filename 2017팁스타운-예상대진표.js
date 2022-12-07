function solution(n, a, b) {
  // 경기를 반으로 계속 좁혀가며 구하기
  // 전체 게임수 먼저 구하기
  const games = n.toString(2).length - 1;
  // 리턴값 전체게임수로 초기화
  let answer = games;
  // 왼쪽일땐 문제없으나 오른쪽으로 갈때 문제 -> 오른쪽 게임인경우 인덱스를 늘려줌
  let right = 0;
  for (let game = games - 1; game >= 0; game--) {
    // 왼쪽 게임에 둘다 있을때
    if (a <= 2 ** game + right && b <= 2 ** game + right) {
      answer--;
    }
    // 오른쪽 게임에 둘다 있을때
    else if (a > 2 ** game + right && b > 2 ** game + right) {
      answer--;
      right += 2 ** game;
    }
    // 얀쪽으로 나뉘었다면 리턴
    else break;
  }

  return answer;
}

function solution(n, a, b) {
  let answer = 0;
  // 이진 탐색
  while (a !== b) {
    a = Math.ceil(a / 2);
    b = Math.ceil(b / 2);
    answer++;
  }
  return answer;
}
