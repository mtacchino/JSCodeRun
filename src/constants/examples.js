import helloWorld from './code/hello-world';
import fibonacci from './code/fibonacci';
import binaryTreeDfs from './code/binary-tree-dfs';
import binaryTreeBfs from './code/binary-tree-bfs';

export default exampleData = [
    {
        key: 'Hello World!',
        code: helloWorld,
        runtimeComplexity: 'O(1)',
        spaceComplexity: 'O(1)'
    }, {
        key: 'Fibonnaci - Nth number in sequence',
        runtimeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        code: fibonacci
    }, {
        key: 'Binary Tree - Depth-first search (DFS)',
        runtimeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        code: binaryTreeDfs
    }, {
        key: 'Binary Tree - Breadth-first search (BFS)',
        runtimeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        code: binaryTreeBfs
    }
];