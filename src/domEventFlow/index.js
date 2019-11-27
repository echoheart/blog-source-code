function fn(res) {
  res(100);
}

let x1 = new Promise(fn);

let x2 = x1.then((value) => {
  // const x2 = new Promise((res) => {
  //   res(value + 1)
  // });
  const x2 = 1000;
  console.log(x2, 'x22')
  // return x2;
})

console.log(x2, 'x2外面');
x2.then((value) => {
  console.log(value, 'value');
})