const iterations = 1000000;
const projects = [
  { id: 'p1', tags: ['a','b','c','d','e'] },
  { id: 'p2', tags: ['a','b'] },
  { id: 'p3', tags: ['a','b','c'] }
];

console.time('Inline map slice');
for(let i=0; i<iterations; i++) {
  const result = projects.map(p => p.tags.slice(0, 4));
}
console.timeEnd('Inline map slice');

const preSlicedMap = new Map(projects.map((p) => [p.id, p.tags.slice(0, 4)]));
console.time('Pre-sliced map lookup');
for(let i=0; i<iterations; i++) {
  const result = projects.map(p => preSlicedMap.get(p.id));
}
console.timeEnd('Pre-sliced map lookup');
