var assert = require('assert');
var AvlTree = require('../index.js');

describe('avltree-js tests', function() {
	describe('insert', function () {
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
		it('should backtrack and balance', function () {
			var root = tree.insert(1, null);
			root = tree.insert(2, root);
			root = tree.insert(3, root);
			root = tree.insert(4, root);
			root = tree.insert(5, root);
			root = tree.insert(6, root);
			assert.strictEqual(root.element, 4);
			assert.strictEqual(root.height, 3);
			assert.strictEqual(root.left.element, 2);
			assert.strictEqual(root.left.height, 2);
			assert.strictEqual(root.left.left.element, 1);
			assert.strictEqual(root.left.left.height, 1);
			assert.strictEqual(root.left.right.element, 3);
			assert.strictEqual(root.left.right.height, 1);
			assert.strictEqual(root.right.element, 5);
			assert.strictEqual(root.right.height, 2);
			assert.strictEqual(root.right.right.element, 6);
			assert.strictEqual(root.right.right.height, 1);
		});
	});
	describe('search', function () {
		var tree;
		beforeEach(function () {
			tree = new AvlTree();
		});
		it('should find the desired element', function () {
			var root = tree.insert(1, null);
			root = tree.insert(3, root);
			root = tree.insert(4, root);
			root = tree.insert(8, root);
			root = tree.insert(2, root);
			root = tree.insert(9, root);
			root = tree.insert(5, root);
			root = tree.insert(11, root);
			root = tree.insert(7, root);
			root = tree.insert(6, root);
			root = tree.insert(10, root);
			var target = 6;
			var targetNode = tree.search(target, root);
			assert.strictEqual(targetNode.element, target);
			root = tree.insert(12, root);
			root = tree.insert(13, root);
			root = tree.insert(15, root);
			root = tree.insert(16, root);
			root = tree.insert(14, root);
			var targetNode = tree.search(target, root);
			assert.strictEqual(targetNode.element, target);
		});
	});
	describe('delete', function () {
		var tree;
		beforeEach(function () {
			tree = new AvlTree();
		});
		it('should remove a leaf element from the tree', function () {
			var root = tree.insert(1, null);
			root = tree.insert(2, root);
			tree.delete(2, root, null);
			assert.strictEqual(root.right, null);
			assert.strictEqual(root.element, 1);
			assert.strictEqual(root.height, 1);
		});
		it('should delete the root from the tree', function () {
			
		});
	});
});