import fibonacci from './code/fibonacci';
import binaryTreeDfs from './code/binary-tree-dfs';
import binaryTreeBfs from './code/binary-tree-bfs';

export default exampleData = [
    {
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