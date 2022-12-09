function solution(food_times, k) {
  let total = 0;
  // 정렬을 위해 새로운 배열 생성
  let foods = food_times.map((v, i) => {
    total += v;
    return { val: v, index: i + 1 };
  });
  // 총합이 지연시간보다 작다면 -1 리턴
  if (total <= k) return -1;
  // 낮은 음식 순 정렬
  foods.sort((a, b) => a.val - b.val);

  let time = 0;
  let minus = 0;
  // 지연시간을 넘지않는 선에서 한번씩 순회
  for (let i = 0; i < foods.length; i++) {
    const len = foods.length;
    minus = (foods[i].val - time) * (len - i);
    if (k - minus >= 0) {
      time += foods[i].val - time;
      k -= minus;
    } else {
      const tmp = Math.floor(k / (len - i));
      k -= tmp * (len - i);
      time += tmp;
      break;
    }
  }
  // 이미 다먹은 음식 제거, 인덱스 순 정렬
  foods = foods.filter((v) => v.val - time > 0);
  foods.sort((a, b) => a.index - b.index);

  return foods[k].index;
}

function solution(food_times, k) {
  let copy = [];
  let total = 0;
  for (let i = 0; i < food_times.length; i++) {
    total += food_times[i];
    copy[i] = { val: food_times[i], index: i + 1 };
  }

  if (total <= k) return -1;

  copy.sort((a, b) => {
    if (a.val === b.val) a.index - b.index;
    return a.val - b.val;
  });

  let sum = 0;
  let sub = 0;

  for (let i = 0; i < copy.length; i++) {
    sub = (copy[i].val - sum) * (copy.length - i);
    if (k - sub >= 0) {
      sum += copy[i].val - sum;
      k -= sub;
    } else {
      let temp = Math.floor(k / (copy.length - i));
      k -= temp * (copy.length - i);
      sum += temp;
      break;
    }
  }

  copy = copy.filter((item) => item.val - sum > 0);
  copy.sort((a, b) => {
    return a.index - b.index;
  });

  return copy[k].index;
}
