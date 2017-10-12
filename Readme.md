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

* Storing objects in the tree
	by using a custom ordering function, you can easily store objects in the tree, ordered by some property.
```javascript
			// Create a custom sorting function that will order people by age.
			var personSortingFunction = function (personA, personB) {
				if (personA.age < personB.age) {
					return -1
				} else if (personA.age > personB.age) {
					return 1;
				}
				return 0;
			};

			// pass in the custom sorting function the the tree's constructor
			var personTree = new AvlTree(personSortingFunction);

			// create some test people to add to the tree
			var person1 = { age: 1 };
			var person2 = { age: 2 };
			var person3 = { age: 3 };
			var person4 = { age: 4 };

			// add the people to the tree in any order
			personTree.insert(person2);
			personTree.insert(person1);
			personTree.insert(person4);
			personTree.insert(person3);

			personTree.forEach(function (person) {
				console.log(person.age);
			});
```
output
1
2
3
4



Tests are run using mocha in the test directory.

npm install -g mocha

npm test

If you wish to help improve the speed there are some benchmarks in the speedTest directory.

npm run speedTest

does not support duplicate values at this time.