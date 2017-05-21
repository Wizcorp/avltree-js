# AVL Tree
## Javascript impl of a traditional avl tree
Supports all basic operations and custom sort comparison functions.

* insert
```javascript
	tree.insert(2);
```
* delete
```javascript
	tree.delete(2);
```
* search
```javascript
	var element = tree.search(target);
	returns the element if it exists.
```
* forEach
```javascript
	var sum = 0;
	tree.forEach(function (element) {
		sum += element;
	});
```
* getMin
```javascript
	var min = tree.getMin();
```
* getMax
```javascript
	var max = tree.getMax();
```
* deleteMax
```javascript
	var max = tree.deleteMax();
```
* getElementsAtDepth
```javascript
	var nodesAtZero = tree.getElementsAtDepth(0);
```
	returns an array of elements at depth 0 (in this case, the root);

Tests are run using mocha in the test directory.

npm install -g mocha

npm test

If you wish to help improve the speed there are some benchmarks in the speedTest directory.

npm run speedTest

does not support duplicate values at this time.