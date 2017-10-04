export default
`const fibonacci = (n) => {
  let memoizeMap = {
    0: 0,
    1: 1
  };

  return (recurseFib = (n) => {
    if (memoizeMap[n] === undefined) {
      memoizeMap[n] = recurseFib(n-2) + recurseFib(n-1);
    }
      return memoizeMap[n];
  })(n);
}

(function tests() {
  console.log(\`1st Fibonacci number: \${fibonacci(1)}\`);
  console.log(\`4th Fibonacci number: \${fibonacci(4)}\`);
  console.log(\`100th Fibonacci number: \${fibonacci(100)}\`);
})();`