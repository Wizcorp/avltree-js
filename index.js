function AvlTree(comparisonFunc) {
	if (typeof comparisonFunc !== 'function') {
		this._compare = sortLeftToRight;
	} else {
		this._compare = comparisonFunc;
	}
	this._root = null;
}
module.exports = AvlTree;

// TODO: should this return the node?
AvlTree.prototype.search = function (element) {
	return this._search(element, this._root);
};

AvlTree.prototype._search = function (element, node) {
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
	if (direction < 0) { // go left
		node.left = this._insert(element, node.left);
	} else if (direction > 0) { // go right
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
	this._delete(element, this._root, null);
};

AvlTree.prototype._delete = function (element, node, parent) {
	var direction = this._compare(element, node.element);
	if (direction < 0) { // go left
		return this._delete(element, node.left, node);
	} else if (direction > 0) { // go right
		return this._delete(element, node.right, node);
	} else { // found our target element
		if (node.left !== null && node.right !== null) {


			var current = node.right; // find the next greatest valued node
			var parentOfNextGreatest = node;
			var nextGreatest = null;
			while (current.left) {
				parentOfNextGreatest = nextGreatest;
				nextGreatest = current.left;
			}
			var nextGreatest = this.getMin(node.right);
			parentOfNextGreatest.left = node;
			nextGreatest.left = node.left;
			nextGreatest.right = node.right;
			node.left = null;
			node.right = null;
			if (parent.right === node) { // we are in the right child
				parent.right = nextGreatest;
			} else { // we are in the left child
				parent.left = nextGreatest;
			}


		} else if (node.left !== null) { // only has left
			if (parent.right === node) { // we are in the right child
				parent.right = node.left;
			} else { // we are in the left child
				parent.left = node.left;
			}
			node.left = null;
		} else if (node.right !== null) { // only has right
			if (parent.right === node) { // we are in the right child
				parent.right = node.right;
			} else { // we are in the left child
				parent.left = node.right;
			}
			node.right = null;
		} else { // both children are empty
			if (parent.right === node) { // we are in the right child
				parent.right = null;
			} else { // we are in the left child
				parent.left = null;
			}
		}
		parent.height = Math.max(getHeight(node.left), getHeight(node.right)) + 1;
		return this._balance(parent);
	}
};

AvlTree.prototype.getMin = function (node) {
	if (node.left === null) {
		return node;
	} else {
		return this.getMin(node.left)
	}
};

AvlTree.prototype.getMax = function (element, node) {
	if (node.right === null) {
		return node;
	} else {
		return this.getMax(node.right);
	}
};

AvlTree.prototype._balance = function (node) {
	var balance = getHeight(node.left) - getHeight(node.right);
	if (balance < 0) {
		//TODO: maybe trinode

		// TODO: update height
	} else if (balance > 0) {

	}
	return node;
};

//TODO: refactor out parent
AvlTree.prototype.triNodeRestructure = function (x, y, z) {
	var a, b, c;
	if (z.element <= x.element && x.element <= y.element) {
		a = z;
		b = x;
		c = y;
	}
	if (z.element >= x.element && x.element >= y.element) {
		a = y;
		b = x;
		c = z;
	}
	if (z.element <= y.element && y.element <= x.element) {
		a = z;
		b = y;
		c = x;
	}
	if (z.element >= y.element && y.element >= x.element) {
		a = x;
		b = y;
		c = z;
	}

	if (z === this._root) {
		this._root = b;
		b.parent = null
	} else {
		if (z.parent.left === z) {
			makeLeftChild(z.parent, b);
		} else {
			makeRightChild(z.parent, b);
		}
	}

	if (b.left !== x && b.left !== y && b.left !== z) {
		makeRightChild(a, b.left);
	}
	if (b.right !== x && b.right !== y && b.right !== z) {
		makeLeftChild(c, b.right);
	}
	makeLeftChild(b, a);
	makeRightChild(b, c);
};

function makeLeftChild(a, b) {
	a.leftChild = b;
	b.parent = a;
}

function makeRightChild(a, b) {
	a.rightchild = b;
	b.parent = a;
}
//TODO: refactor out parent

AvlTree.prototype.forEach = function (node, func) {
	this.forEach(node.left, func);
	func(node.element);
	this.forEach(node.right, func);
};

function Node(element) {
	this.element = element;
	this.height = 1;
	this.left   = null;
	this.right  = null;
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
};

function getBalance(node) {
	if (node != null) {
		return (getHeight(node.right) - getHeight(node.left));
	}
	return 0;
}

//TODO: union, intersection and set difference, helpers, Split and Join