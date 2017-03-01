var AvlTree = require('../index.js');

var count = Math.pow(10,7); // I run oom at 10^8

var tree = new AvlTree();

console.error('---in order insert---');
var startMs = Date.now();
for(var i = 0; i < count; i++) {
	tree.insert(i)
}
var elapsedMs = Date.now() - startMs;
var avgMs = elapsedMs / count;
console.error('elapsedMs:', elapsedMs, 'averageMs', avgMs);

console.error('---in order delete---');
startMs = Date.now();
for(var i = 0; i < count; i++) {
	tree.delete(i);
}
elapsedMs = Date.now() - startMs;
avgMs = elapsedMs / count;
console.error('elapsedMs:', elapsedMs, 'averageMs', avgMs);

console.error('---in order search---');
startMs = Date.now();
for(var i = 0; i < count; i++) {
	tree.search(i);
}
elapsedMs = Date.now() - startMs;
avgMs = elapsedMs / count;
console.error('elapsedMs:', elapsedMs, 'averageMs', avgMs);
