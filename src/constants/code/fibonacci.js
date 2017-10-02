export default
`function fibonacci(n) {
    let memoizeMap = {
        0: 0,
        1: 0,
        2: 1
    };

    return (function nestedFibonacci(n) {
        if (memoizeMap[n] === undefined) {
            memoizeMap[n] = nestedFibonacci(n-2) + nestedFibonacci(n-1);
        }
        return memoizeMap[n];
    })(n);
}

(function tests() {
    console.log(\`1st Fibonacci number: \${fibonacci(1)}\`);
    console.log(\`4th Fibonacci number: \${fibonacci(4)}\`);
    console.log(\`100th Fibonacci number: \${fibonacci(100)}\`);
})();`