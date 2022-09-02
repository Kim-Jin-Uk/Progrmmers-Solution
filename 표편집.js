function solution(n, k, cmd) {
    // 양방향 연결 링크드 리스트 구현을 위한 노드 선언
    class Node{
        constructor(value,prev){
            this.prev = prev
            this.value = value
            this.next = null
        }
    }
    // 초기는 다 들어있다
    const answer = new Array(n).fill('O')
    // 양방향 링크드 리스트 초기화
    let root = new Node(0)
    let curNode = root
    let prevNode = root
    for(let i = 1; i < n; i++){
        const newNode = new Node(i, prevNode)
        prevNode.next = newNode
        prevNode = newNode
        if(i === k) curNode = newNode
    }
    // Z 키워드를 위한 스택
    const stack = []
    cmd.forEach((command) => {
        const [c, num] = command.split(' ');
        // U, D 키워드는 위치만 이동해주면 된다
        if(c === 'U') for(let i = 0; i < num; i++) curNode = curNode.prev
        else if(c === 'D') for(let i = 0; i < num; i++) curNode = curNode.next
        // C 키워드 해당 노드를 삭제하고 다시연결, 기준 노드 위치 갱신
        if(c === 'C'){
            stack.push(curNode)
            const [prev,next] = [curNode.prev,curNode.next]
            if(prev && next) [prev.next,next.prev,curNode] = [next,prev,next]
            else if(prev) [prev.next,curNode] = [null,prev]
            else if(next) [next.prev,curNode] = [null,next]
        }
        // Z 키워드 스택에서 팝하여 다시 연결시켜준다
        if(c === 'Z'){
            const node = stack.pop()
            const [prev,next] = [node.prev,node.next]
            if(prev) prev.next = node
            if(next) next.prev = node 
        }
    })
    // 스택에 들어있는 노드는 지워진 노드
    stack.forEach((node) => answer[node.value] = 'X')
    return answer.join('')
}