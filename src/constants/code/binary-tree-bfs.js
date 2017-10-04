export default
`class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const breadthFirstSearch = (root, searchValue) => {
  let queue = [root];
  while (queue.length) {
    const currentNode = queue.shift();
    if (currentNode.value === searchValue) {
      return true;
    }
    if (currentNode.left) {
      queue.push(currentNode.left);
    }
    if (currentNode.right) {
      queue.push(currentNode.right);
    }
  }
  return false;
}

(function tests() {
  /* Create a tree like so:
   *        1
   *     2     3
   *    4 5   6 7
   */
  const root = new Node(1);
  const two = new Node(2);
  const three = new Node(3);
  const four = new Node(4);
  const five = new Node(5);
  const six = new Node(6);
  const seven = new Node(7);
  root.left = two;
  root.right = three;
  two.left = four;
  two.right = five;
  three.left = six;
  three.right = seven;

  console.log(\`Found the value 1? \${breadthFirstSearch(root, 1)}\`);
  console.log(\`Found the value 5? \${breadthFirstSearch(root, 5)}\`);
  console.log(\`Found the value 8? \${breadthFirstSearch(root, 8)}\`);
})();`