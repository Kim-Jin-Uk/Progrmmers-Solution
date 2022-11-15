function solution(s) {
  const answer = [];
  for (let i = 0; i < s.length; i++) {
    let [x, stack, cnt] = [s[i], [], 0];
    for (let j = 0; j < x.length; j++) {
      if (stack.length < 2) stack.push(x[j]);
      else {
        if (x[j] === "0") {
          if (
            stack[stack.length - 1] === "1" &&
            stack[stack.length - 2] === "1"
          ) {
            stack.pop();
            stack.pop();
            cnt++;
          } else stack.push(x[j]);
        } else stack.push(x[j]);
      }
    }
    let target = stack.length;
    for (let i = stack.length - 1; i >= 0; i--) {
      if (stack[i] === "1") {
        target = i;
        continue;
      }
      break;
    }
    let res = "";
    for (let i = 0; i < target; i++) res += stack[i];
    while (cnt--) res += "110";
    for (let i = target; i < stack.length; i++) res += stack[i];
    answer.push(res);
  }
  return answer;
}
