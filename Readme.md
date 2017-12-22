# ![AVL Tree](./logo.png)

JavasScript implementation of a traditional AVL tree.

According to [Wikipedia](https://en.wikipedia.org/wiki/AVL_tree)

    In computer science, an AVL tree (named after inventors Adelson-Velsky and Landis) 
    is a self-balancing binary search tree. It was the first such data structure to be 
    invented.[2] In an AVL tree, the heights of the two child subtrees of any node 
    differ by at most one; if at any time they differ by more than one, rebalancing 
    is done to restore this property. Lookup, insertion, and deletion all take 
    O(log n) time in both the average and worst cases, where n is the number of 
    nodes in the tree prior to the operation. Insertions and deletions 
    may require the tree to be rebalanced by one or more tree rotations.

## Installation

```shell
npm install --save avltree-js
```

## Usage

This libary Supports all basic operations and custom sort comparison functions.

### insert

```javascript
tree.insert(2);
```

### delete

```javascript
tree.delete(2);
```

### search

```javascript
// returns the element if it exists.
var element = tree.search(target);
```

### forEach

```javascript
var sum = 0;
tree.forEach(function (element) {
	sum += element;
});
```

### getMin

```javascript
var min = tree.getMin();
```

### getMax

```javascript
var max = tree.getMax();
```

### deleteMax

```javascript
var max = tree.deleteMax();
```

### getElementsAtDepth

```javascript
// returns an array of elements at depth 0 (in this case, the root);
var nodesAtZero = tree.getElementsAtDepth(0);
```
	

### Storing objects in the tree

By using a custom ordering function, you can easily 
store objects in the tree, ordered by some property.

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

This code will output:

```plaintext
1
2
3
4
```

## Acknowledgements

Logo created on [LogoMakr.com](http://logomakr.com) [View logo source](https://logomakr.com/6bf2QV)

## License

MIT. See [License.md](./License.md)
