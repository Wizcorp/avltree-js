var assert = require('assert');
var AvlTree = require('./jAvlTree');

describe('should insert', function () {
	var tree;
	beforeEach(function () {
		tree = new AvlTree();
	});
	it('should contain the inserted value', function () {
		var root = tree.insert(1, null);
		assert.strictEqual(root.element, 1);
		tree.insert(2, root);
		assert.strictEqual(root.right.element, 2);
		assert.strictEqual(root.height, 2);
	});
	it('should balance a right right heavy tree', function () {
		var root = tree.insert(1, null);
		root = tree.insert(2, root);
		root = tree.insert(3, root);
		assert.strictEqual(root.element, 2);
		assert.strictEqual(root.left.element, 1);
		assert.strictEqual(root.right.element, 3);
		assert.strictEqual(root.height, 2);
		assert.strictEqual(root.left.height, 1);
		assert.strictEqual(root.right.height, 1);
	});
	it('should balance a left left heavy tree', function () {
		var root = tree.insert(3, null);
		root = tree.insert(2, root);
		root = tree.insert(1, root);
		assert.strictEqual(root.element, 2);
		assert.strictEqual(root.left.element, 1);
		assert.strictEqual(root.right.element, 3);
		assert.strictEqual(root.height, 2);
		assert.strictEqual(root.left.height, 1);
		assert.strictEqual(root.right.height, 1);
	});
	it('should balance a right left heavy tree', function () {
		var root = tree.insert(3, null);
		root = tree.insert(1, root);
		root = tree.insert(2, root);
		assert.strictEqual(root.element, 2);
		assert.strictEqual(root.left.element, 1);
		assert.strictEqual(root.right.element, 3);
		assert.strictEqual(root.height, 2);
		assert.strictEqual(root.left.height, 1);
		assert.strictEqual(root.right.height, 1);
	});
});