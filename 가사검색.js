class Trie {
  constructor() {
    this.child = {};
    this.sum = 0; // 메모이제이션 사용 총 개수를 갱신하여 저장한다
  }
  insert(word) {
    let curr = this;
    this.sum++;
    for (const char of word) {
      if (!curr.child[char]) curr.child[char] = new Trie();
      curr = curr.child[char];
      curr.sum++;
    }
  }
  find(query) {
    let curr = this;
    for (const char of query) {
      if (char === "?") return curr.sum;
      else if (!curr.child[char]) return 0;
      curr = curr.child[char];
    }
  }
}
function solution(words, queries) {
  const trie = {};
  // 첫 시작이 ?인 경우처리
  const reverse = {};
  for (const word of words) {
    const length = word.length;
    if (!trie[length]) {
      trie[length] = new Trie();
      reverse[length] = new Trie();
    }
    trie[length].insert(word);
    reverse[length].insert([...word].reverse().join(""));
  }
  return queries.map((query) => {
    const length = query.length;
    if (!trie[length]) return 0;
    if (query[0] === "?")
      return reverse[length].find([...query].reverse().join(""));
    return trie[length].find(query);
  });
}
