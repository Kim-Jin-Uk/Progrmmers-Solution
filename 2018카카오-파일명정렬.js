function solution(files) {
  // 숫자임을 확인할 사전 초기화
  const numbers = {
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
    9: true,
  };
  files = files.map((v, i) => {
    // head, nums, tail 중 tail은 정렬에 사용되지 않으니 제외
    let head = "";
    let num = "";
    let isHead = true;
    for (const char of v) {
      if (char in numbers) {
        num += char;
        isHead = false;
      } else if (isHead) head += char;
      else break;
    }
    // head, nums가 모두 같은 경우 index를 이용해 순서를 보장
    return [v, head.toLowerCase(), +num, i];
  });
  files.sort((a, b) => {
    // head로 정렬
    if (a[1] > b[1]) return 1;
    if (a[1] < b[1]) return -1;
    // head가 같다면
    if (a[1] === b[1]) {
      // nums로 정렬
      if (a[2] !== b[2]) return a[2] - b[2];
      // index로 정렬
      else return a[3] - b[3];
    }
  });
  return files.map((v) => v[0]);
}

function solution(files) {
  const reg = /^([a-zA-Z-\. ]+)([0-9]+)(.*)$/;
  const dict = [];
  files.forEach((entry, idx) => {
    const [fileName, head, num] = entry.match(reg);
    dict.push({ fileName, head: head.toLowerCase(), num: parseInt(num), idx });
  });
  return dict
    .sort((a, b) => {
      if (a.head > b.head) return 1;
      if (a.head < b.head) return -1;
      if (a.num > b.num) return 1;
      if (a.num < b.num) return -1;
      return a.idx - b.idx;
    })
    .map((v) => v.fileName);
}
