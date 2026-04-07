const iterations = 1000000;
console.time('Inline Slice');
for(let i=0; i<iterations; i++) {
  const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
  const res = arr.slice(0, 4);
}
console.timeEnd('Inline Slice');

const arr2 = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
const preSliced = arr2.slice(0, 4);
console.time('Pre-sliced');
for(let i=0; i<iterations; i++) {
  const res = preSliced;
}
console.timeEnd('Pre-sliced');
