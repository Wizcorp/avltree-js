/* eslint-disable no-console */
'use strict';
var AvlTree = require('../index.js');

var count = Math.pow(10, 7); // I run oom at 10^8

var tree = new AvlTree();

console.warn('---in order insert---');
var startMs = Date.now();
for (var i = 0; i < count; i += 1) {
	tree.insert(i);
}
var elapsedMs = Date.now() - startMs;
var avgMs = elapsedMs / count;
console.warn('elapsedMs:', elapsedMs, 'averageMs', avgMs);

console.warn('---in order delete---');
startMs = Date.now();
for (var j = 0; j < count; j += 1) {
	tree.delete(j);
}
elapsedMs = Date.now() - startMs;
avgMs = elapsedMs / count;
console.warn('elapsedMs:', elapsedMs, 'averageMs', avgMs);

console.warn('---in order search---');
startMs = Date.now();
for (var k = 0; k < count; k += 1) {
	tree.search(k);
}
elapsedMs = Date.now() - startMs;
avgMs = elapsedMs / count;
console.warn('elapsedMs:', elapsedMs, 'averageMs', avgMs);

// not the greatest test, feel free to change this.
