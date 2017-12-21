function AvlTree(comparisonFunc) {
	if (typeof comparisonFunc !== 'function') {
		this._compare = sortLeftToRight;
	} else {
		this._compare = comparisonFunc;
	}
	this._root = null;
}
module.exports = AvlTree;

// TODO: put data on the node.
AvlTree.prototype.search = function (element) {
	var node = this._search(element, this._root);
	return node ? node.element : null;
};

AvlTree.prototype._search = function (element, node) {
	if (node === null) {
		return null;
	}
	var direction = this._compare(element, node.element);
	if (direction < 0) {
		return this._search(element, node.left);
	} else if (direction > 0) {
		return this._search(element, node.right);
	} else {
		return node;
	}
};

AvlTree.prototype.insert = function (element) {
	this._root = this._insert(element, this._root);
};

//TODO: allow duplicates
AvlTree.prototype._insert = function (element, node) {
	if (node === null) {
		return new Node(element);
	}
	var direction = this._compare(element, node.element);
	if (direction < 0) {
		node.left = this._insert(element, node.left);
	} else if (direction > 0) {
		node.right = this._insert(element, node.right);
	}
	node.height = Math.max(getHeight(node.left), getHeight(node.right)) + 1;

	var balance = getBalance(node);

	if (balance < -1) {
		var subLeftDirection = this._compare(element, node.left.element);
		if (subLeftDirection < 0) {
			return this._rightRotate(node);
		} else if (subLeftDirection > 0) {
			node.left = this._leftRotate(node.left);
			return this._rightRotate(node);
		}
	} else if (balance > 1) {
		var subRightDirection = this._compare(element, node.right.element);
		if (subRightDirection > 0) {
			return this._leftRotate(node);
		} else if (subRightDirection < 0) {
			node.right = this._rightRotate(node.right);
			return this._leftRotate(node);
		}
	}
	return node;
};

AvlTree.prototype._rightRotate = function (node) {
	var l = node.left;
	var lr = l.right;
	l.right = node;
	node.left = lr;
	node.height = Math.max(getHeight(node.left), getHeight(node.right)) + 1;
	l.height = Math.max(getHeight(l.left), getHeight(l.right)) + 1;
	return l;
};

AvlTree.prototype._leftRotate = function (node) {
	var r = node.right;
	var rl = r.left;
	r.left = node;
	node.right = rl;
	node.height = Math.max(getHeight(node.left), getHeight(node.right)) + 1;
	r.height = Math.max(getHeight(r.left), getHeight(r.right)) + 1;
	return r;
};

AvlTree.prototype.delete = function (element) {
	if (this._root !== null) {
		this._root = this._delete(element, this._root, null);
	}
};

AvlTree.prototype._delete = function (element, node, parent) {
	if (node === null) {
		return null;
	}
	var direction = this._compare(element, node.element);
	if (direction < 0) { // go left
		this._delete(element, node.left, node);
	} else if (direction > 0) { // go right
		this._delete(element, node.right, node);
	} else { // found our target element
		if (node.left !== null && node.right !== null) {
			var detachedMax = this._deleteMax(node.left, node);
			node.element = detachedMax.element; // TODO: if we end up adding data to nodes, copy it here
		} else if (node.left !== null) { // only has left
			if (parent === null) {
				return node.left;
			} else {
				if (parent.right === node) {
					parent.right = node.left;
				} else {
					parent.left = node.left;
				}
			}
			node.left = null;
		} else if (node.right !== null) { // only has right
			if (parent === null) {
				return node.right;
			} else {
				if (parent.right === node) {
					parent.right = node.right;
				} else {
					parent.left = node.right;
				}
			}
			node.right = null;
		} else { // both children are empty
			if (parent === null) {
				return null;
			} else {
				if (parent.right === node) {
					parent.right = null;
				} else {
					parent.left = null;
				}
			}
		}
	}
	return this._balance(node, parent); // backtrack and balance everyone
};

AvlTree.prototype.deleteMax = function () {
	return this._deleteMax(this._root, null).element;
};

AvlTree.prototype._deleteMax = function (node, parent) {
	if (node.right === null) { // max found
		var max = this._delete(node.element, node, parent);
		this._balance(node, parent);
		return max;
	} else { // not yet at max, keep going
		var max = this._deleteMax(node.right, node);
		this._balance(node, parent);  // backtrack and balance everyone in the left sub tree
		return max;
	}
};

AvlTree.prototype.getMin = function (node) {
	if (node.left === null) {
		return node;
	} else {
		return this.getMin(node.left)
	}
};

AvlTree.prototype.getMax = function (node) {
	if (node.right === null) {
		return node;
	} else {
		return this.getMax(node.right);
	}
};

AvlTree.prototype._balance = function (node, parent) {
	updateHeight(node);
	var balance = getBalance(node);
	if (balance < -1) {
		var z = node;
		var y = node.left;
		var x = this._getTallestSubtree(y);
		var newRoot = this._triNodeRestructure(x, y, z, parent);
		updateHeight(z);
		updateHeight(x);
		updateHeight(y);
		return newRoot;
	} else if (balance > 1) {
		var z = node;
		var y = node.right;
		var x = this._getTallestSubtree(y);
		var newRoot = this._triNodeRestructure(x, y, z, parent);
		updateHeight(z);
		updateHeight(x);
		updateHeight(y);
		return newRoot;
	}
	updateHeight(node);
	return node;
};

AvlTree.prototype._getTallestSubtree = function (node) {
	var balance = getBalance(node);
	if (balance < 0) {
		return node.left;
	} else {
		return node.right;
	}
};

AvlTree.prototype._triNodeRestructure = function (x, y, z, parent) {
	var a, b, c;
	if (z.right === y && y.left === x) {
		a = z;
		b = x;
		c = y;
	}
	if (z.right === y && y.right === x) {
		a = z;
		b = y;
		c = x;
	}
	if (z.left === y && y.left === x) {
		a = x;
		b = y;
		c = z;
	}
	if (z.left === y && y.right === x) {
		a = y;
		b = x;
		c = z;
	}
	if (z === this._root) {
		this._root = b;
	} else {
		// add null checking for parent
		if (parent !== null) {
			if (parent.left === z) {
				parent.left = b;
			} else {
				parent.right = b;
			}
		}
	}
	if (b.left !== x && b.left !== y && b.left !== z) {
		a.right = b.left;
	}
	if (b.right !== x && b.right !== y && b.right !== z) {
		c.left = b.right;
	}
	b.left = a;
	b.right = c;
	return b;
};

AvlTree.prototype.forEach = function (func) {
	this._forEach(this._root, func);
};

AvlTree.prototype._forEach = function (node, func) {
	if (node !== null) {
		this._forEach(node.left, func);
		func(node.element);
		this._forEach(node.right, func);
	}
};

AvlTree.prototype.getElementsAtDepth = function (targetDepth) {
	var foundNodes = [];
	this._getElementsAtDepth(targetDepth, 0, this._root, foundNodes);
	return foundNodes;
};

AvlTree.prototype._getElementsAtDepth = function (targetDepth, current, node, foundNodes) {
	if (node === null) {
		return;
	}
	if (targetDepth === current) {
		foundNodes.push(node.element);
		return;
	}
	this._getElementsAtDepth(targetDepth, current + 1, node.left, foundNodes);
	this._getElementsAtDepth(targetDepth, current + 1, node.right, foundNodes);
};

function Node(element) {
	this.element = element;
	this.height = 1;
	this.left   = null;
	this.right  = null;
}

Node.prototype.copy = function () {
	var left = new Node();
	var right = new Node();
	
	if (this.left != null) {
		left = this.left.copy();
	}
	if (this.right != null) {
		right = this.right.copy();
	}
	
	var copiedNode = new Node(this.element);
	copiedNode.height = this.height;
	copiedNode.left = left;
	copiedNode.right = right;
	
	return copiedNode;
}

AvlTree.prototype.copy = function () {
	var copiedAvlTree = new AvlTree(this._compare);
	copiedAvlTree._root = this._root.copy();
	return copiedAvlTree;
}

function sortLeftToRight(a, b) {
	if (a < b) {
		return -1
	} else if (a > b) {
		return 1;
	}
	return 0;
}

function getHeight(node) {
	if (node === null) {
		return 0;
	}
	return node.height;
}

function updateHeight(node) {
	node.height = Math.max(getHeight(node.left), getHeight(node.right)) + 1;
}

function getBalance(node) {
	if (node != null) {
		return (getHeight(node.right) - getHeight(node.left));
	}
	return 0;
}

// join returns a copy instead of modifying the current trees
AvlTree.prototype.join = function (element, node2) {
	var tree1 = this.copy();
	var tree2 = node2.copy();
	
	var keyNode = new Node(element);
	
	var heightTree1 = tree1._root.height;
	var heightTree2 = tree2._root.height;
	
	if (Math.abs(heightTree1 - heightTree2) <= 1) {
		var joinedTree = new AvlTree(this._compare);
		keyNode.left = tree1._root;
		keyNode.right = tree2._root;
		updateHeight(keyNode);
		joinedTree._root = keyNode;
		return joinedTree;
	}
	
	var joinedTree = new AvlTree(this._compare);
	joinedTree._root = tree1._root;
	var currNode;
	var parentNode;
	
	if (heightTree1 > heightTree2) {
		currNode = tree1._root;
		
		while (currNode.height > heightTree2 + 1) {
			parentNode = currNode;
			currNode = currNode.right;
		}
		
		keyNode.left = currNode;
		keyNode.right = tree2._root;
		updateHeight(keyNode);
		parentNode.right = keyNode;
		
		joinedTree._balance(joinedTree._root, null);
		updateHeight(joinedTree._root);
	}
	
	return joinedTree;	
};

//TODO: union, intersection and set difference, helpers, Split