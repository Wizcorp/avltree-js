'use strict';

function getHeight(node) {
	if (node === null) {
		return 0;
	}
	return node.height;
}

function getBalance(node) {
	if (node === null) {
		return 0;
	}

	return (getHeight(node.right) - getHeight(node.left));
}

function Node(element) {
	this.element = element;
	this.height = 1;
	this.left = null;
	this.right = null;
}

function sortLeftToRight(a, b) {
	if (a < b) {
		return -1;
	} else if (a > b) {
		return 1;
	}
	return 0;
}

function updateHeight(node) {
	node.height = Math.max(getHeight(node.left), getHeight(node.right)) + 1;
}

function AvlTree(comparisonFunc) {
	if (typeof comparisonFunc === 'function') {
		this._compare = comparisonFunc;
	} else {
		this._compare = sortLeftToRight;
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
	}
	return node;
};

AvlTree.prototype.insert = function (element) {
	this._root = this._insert(element, this._root);
};

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
	} else if (node.left !== null && node.right !== null) { // found our target element
		var detachedMax = this._deleteMax(node.left, node);
		node.element = detachedMax.element; // TODO: if we end up adding data to nodes, copy it here
	} else if (node.left === null) {
		if (node.right === null) { // both children are empty
			if (parent === null) {
				return null;
			}
			if (parent.right === node) {
				parent.right = null;
			} else {
				parent.left = null;
			}
		} else { // only has right
			if (parent === null) {
				return node.right;
			}
			if (parent.right === node) {
				parent.right = node.right;
			} else {
				parent.left = node.right;
			}

			node.right = null;
		}
	} else { // only has left
		if (parent === null) {
			return node.left;
		}
		if (parent.right === node) {
			parent.right = node.left;
		} else {
			parent.left = node.left;
		}

		node.left = null;
	}

	return this._balance(node, parent); // backtrack and balance everyone
};

AvlTree.prototype.deleteMax = function () {
	return this._deleteMax(this._root, null).element;
};

AvlTree.prototype._deleteMax = function (node, parent) {
	var max;
	if (node.right === null) { // max found
		max = this._delete(node.element, node, parent);
		this._balance(node, parent);
		return max;
	}  // not yet at max, keep going
	max = this._deleteMax(node.right, node);
	this._balance(node, parent);  // backtrack and balance everyone in the left sub tree
	return max;
};

AvlTree.prototype.getMin = function () {
	return this._getMin(this._root);
}

AvlTree.prototype._getMin = function (node) {
	if (node.left === null) {
		return node;
	}
	return this._getMin(node.left);
};

AvlTree.prototype.getMax = function () {
	return this._getMax(this._root);
}

AvlTree.prototype._getMax = function (node) {
	if (node.right === null) {
		return node;
	}
	return this._getMax(node.right);
};

AvlTree.prototype._balance = function (node, parent) {
	updateHeight(node);
	var balance = getBalance(node);
	var newRoot, x, y, z;
	if (balance < -1) {
		z = node;
		y = node.left;
		x = this._getTallestSubtree(y);
		newRoot = this._triNodeRestructure(x, y, z, parent);
		updateHeight(z);
		updateHeight(x);
		updateHeight(y);
		return newRoot;
	} else if (balance > 1) {
		z = node;
		y = node.right;
		x = this._getTallestSubtree(y);
		newRoot = this._triNodeRestructure(x, y, z, parent);
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
	}
	return node.right;
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
	} else if (parent.left === z) {
		parent.left = b;
	} else {
		parent.right = b;
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

// TODO: union, intersection and set difference, helpers, Split and Join
