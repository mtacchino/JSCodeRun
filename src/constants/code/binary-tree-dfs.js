export default
`class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const depthFirstSearch = (root, searchValue) => {
  let stack = [root];
  while (stack.length) {
    const currentNode = stack.pop();
    if (currentNode.value === searchValue) {
      return true;
    }
    if (currentNode.left) {
      stack.push(currentNode.left);
    }
    if (currentNode.right) {
      stack.push(currentNode.right);
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

  console.log(\`Found the value 1? \${depthFirstSearch(root, 4)}\`);
  console.log(\`Found the value 5? \${depthFirstSearch(root, 4)}\`);
  console.log(\`Found the value 8? \${depthFirstSearch(root, 8)}\`);
})();`