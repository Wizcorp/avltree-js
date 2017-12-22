'use strict';
var assert = require('assert');
var AvlTree = require('../index.js');

describe('avltree-js tests', function () {
	describe('insert', function () {
		var tree;
		beforeEach(function () {
			tree = new AvlTree();
		});
		it('should contain the inserted value', function () {
			tree.insert(1);
			assert.strictEqual(tree._root.element, 1);
			tree.insert(2);
			assert.strictEqual(tree._root.right.element, 2);
			assert.strictEqual(tree._root.height, 2);
		});
		it('should balance a right right heavy tree', function () {
			tree.insert(1);
			tree.insert(2);
			tree.insert(3);
			assert.strictEqual(tree._root.element, 2);
			assert.strictEqual(tree._root.left.element, 1);
			assert.strictEqual(tree._root.right.element, 3);
			assert.strictEqual(tree._root.height, 2);
			assert.strictEqual(tree._root.left.height, 1);
			assert.strictEqual(tree._root.right.height, 1);
		});
		it('should balance a left left heavy tree', function () {
			tree.insert(3);
			tree.insert(2);
			tree.insert(1);
			assert.strictEqual(tree._root.element, 2);
			assert.strictEqual(tree._root.left.element, 1);
			assert.strictEqual(tree._root.right.element, 3);
			assert.strictEqual(tree._root.height, 2);
			assert.strictEqual(tree._root.left.height, 1);
			assert.strictEqual(tree._root.right.height, 1);
		});
		it('should balance a right left heavy tree', function () {
			tree.insert(1);
			tree.insert(3);
			tree.insert(2);
			assert.strictEqual(tree._root.element, 2);
			assert.strictEqual(tree._root.left.element, 1);
			assert.strictEqual(tree._root.right.element, 3);
			assert.strictEqual(tree._root.height, 2);
			assert.strictEqual(tree._root.left.height, 1);
			assert.strictEqual(tree._root.right.height, 1);
		});
		it('should balance a right left heavy tree', function () {
			tree.insert(3);
			tree.insert(1);
			tree.insert(2);
			assert.strictEqual(tree._root.element, 2);
			assert.strictEqual(tree._root.left.element, 1);
			assert.strictEqual(tree._root.right.element, 3);
			assert.strictEqual(tree._root.height, 2);
			assert.strictEqual(tree._root.left.height, 1);
			assert.strictEqual(tree._root.right.height, 1);
		});
		it('should backtrack and balance', function () {
			tree.insert(1);
			tree.insert(2);
			tree.insert(3);
			tree.insert(4);
			tree.insert(5);
			tree.insert(6);
			assert.strictEqual(tree._root.element, 4);
			assert.strictEqual(tree._root.height, 3);
			assert.strictEqual(tree._root.left.element, 2);
			assert.strictEqual(tree._root.left.height, 2);
			assert.strictEqual(tree._root.left.left.element, 1);
			assert.strictEqual(tree._root.left.left.height, 1);
			assert.strictEqual(tree._root.left.right.element, 3);
			assert.strictEqual(tree._root.left.right.height, 1);
			assert.strictEqual(tree._root.right.element, 5);
			assert.strictEqual(tree._root.right.height, 2);
			assert.strictEqual(tree._root.right.right.element, 6);
			assert.strictEqual(tree._root.right.right.height, 1);
		});
	});
	describe('search', function () {
		var tree;
		beforeEach(function () {
			tree = new AvlTree();
		});
		it('should find the desired element', function () {
			var root = tree.insert(1, null);
			tree.insert(3);
			tree.insert(4);
			tree.insert(8);
			tree.insert(2);
			tree.insert(9);
			tree.insert(5);
			tree.insert(11);
			tree.insert(7);
			tree.insert(6);
			tree.insert(10);
			var target = 6;
			var element = tree.search(target);
			assert.strictEqual(element, target);
			tree.insert(12);
			tree.insert(13);
			tree.insert(15);
			tree.insert(16);
			tree.insert(14);
			element = tree.search(target, root);
			assert.strictEqual(element, target);
		});
		it('should return null if the tree is empty', function () {
			var result = tree.search(5);
			assert.strictEqual(result, null);
		});
		it('should return null if the element is not in the tree', function () {
			tree.insert(4);
			var result = tree.search(5);
			assert.strictEqual(result, null);
		});
	});
	describe('delete', function () {
		var tree;
		beforeEach(function () {
			tree = new AvlTree();
		});
		it('should remove a leaf element from the tree', function () {
			tree.insert(1);
			tree.insert(2);
			tree.delete(2);
			assert.strictEqual(tree._root.right, null);
			assert.strictEqual(tree._root.element, 1);
			assert.strictEqual(tree._root.height, 1);
		});
		it('should delete the root from the tree', function () {
			tree.insert(1);
			tree.delete(1);
			assert.strictEqual(tree._root, null);
		});
		it('should delete and replace the root', function () {
			tree.insert(1);
			tree.insert(2);
			tree.delete(1);
			assert.strictEqual(tree._root.element, 2);
			assert.strictEqual(tree._root.height, 1);
		});
		it('should remove an element with only left children', function () {
			tree.insert(3);
			tree.insert(2);
			assert.strictEqual(tree._root.height, 2);
			assert.strictEqual(tree._root.left.height, 1);
			tree.delete(2);
			assert.strictEqual(tree._root.element, 3);
			assert.strictEqual(tree._root.height, 1);
		});
		it('should remove an element with only right children', function () {
			tree.insert(1);
			tree.insert(2);
			tree.delete(2);
			assert.strictEqual(tree._root.element, 1);
			assert.strictEqual(tree._root.height, 1);
			assert.strictEqual(tree._root.right, null);
			assert.strictEqual(tree._root.left, null);
		});
		it('should balance a large tree', function () {
			tree.insert(50);
			tree.insert(25);
			tree.insert(75);
			tree.insert(10);
			tree.insert(30);
			tree.insert(60);
			tree.insert(80);
			tree.insert(5);
			tree.insert(15);
			tree.insert(27);
			tree.insert(55);
			tree.insert(1);
			assert.strictEqual(tree._root.element, 50);
			assert.strictEqual(tree._root.height, 5);
			assert.strictEqual(tree._root.left.element, 25);
			assert.strictEqual(tree._root.left.height, 4);
			assert.strictEqual(tree._root.right.element, 75);
			assert.strictEqual(tree._root.right.height, 3);
			assert.strictEqual(tree._root.left.left.element, 10);
			assert.strictEqual(tree._root.left.left.height, 3);
			assert.strictEqual(tree._root.left.right.element, 30);
			assert.strictEqual(tree._root.left.right.height, 2);
			assert.strictEqual(tree._root.right.left.element, 60);
			assert.strictEqual(tree._root.right.left.height, 2);
			assert.strictEqual(tree._root.right.right.element, 80);
			assert.strictEqual(tree._root.right.right.height, 1);
			assert.strictEqual(tree._root.left.left.left.element, 5);
			assert.strictEqual(tree._root.left.left.left.height, 2);
			assert.strictEqual(tree._root.left.left.right.element, 15);
			assert.strictEqual(tree._root.left.left.right.height, 1);
			assert.strictEqual(tree._root.left.right.left.element, 27);
			assert.strictEqual(tree._root.left.right.left.height, 1);
			assert.strictEqual(tree._root.right.left.left.element, 55);
			assert.strictEqual(tree._root.right.left.left.height, 1);
			assert.strictEqual(tree._root.left.left.left.left.element, 1);
			assert.strictEqual(tree._root.left.left.left.left.height, 1);
			tree.delete(80);
			assert.strictEqual(tree._root.element, 25);
			assert.strictEqual(tree._root.height, 4);
			assert.strictEqual(tree._root.left.element, 10);
			assert.strictEqual(tree._root.left.height, 3);
			assert.strictEqual(tree._root.right.element, 50);
			assert.strictEqual(tree._root.right.height, 3);
			assert.strictEqual(tree._root.left.left.element, 5);
			assert.strictEqual(tree._root.left.left.height, 2);
			assert.strictEqual(tree._root.left.right.element, 15);
			assert.strictEqual(tree._root.left.right.height, 1);
			assert.strictEqual(tree._root.right.left.element, 30);
			assert.strictEqual(tree._root.right.left.height, 2);
			assert.strictEqual(tree._root.right.right.element, 60);
			assert.strictEqual(tree._root.right.right.height, 2);
			assert.strictEqual(tree._root.left.left.left.element, 1);
			assert.strictEqual(tree._root.left.left.left.height, 1);
			assert.strictEqual(tree._root.right.left.left.element, 27);
			assert.strictEqual(tree._root.right.left.left.height, 1);
			assert.strictEqual(tree._root.right.right.left.element, 55);
			assert.strictEqual(tree._root.right.right.left.height, 1);
			assert.strictEqual(tree._root.right.right.right.element, 75);
			assert.strictEqual(tree._root.right.right.right.height, 1);
		});
		it('should remove an element with two children', function () {
			tree.insert(1);
			tree.insert(2);
			tree.insert(3);
			tree.insert(4);
			tree.insert(5);
			tree.delete(4);

			assert.strictEqual(tree._root.element, 2);
			assert.strictEqual(tree._root.height, 3);
			assert.strictEqual(tree._root.left.element, 1);
			assert.strictEqual(tree._root.left.height, 1);
			assert.strictEqual(tree._root.right.element, 3);
			assert.strictEqual(tree._root.right.height, 2);
			assert.strictEqual(tree._root.right.right.element, 5);
			assert.strictEqual(tree._root.right.right.height, 1);
		});
		it('should remove the root element with two children', function () {
			tree.insert(1);
			tree.insert(2);
			tree.insert(3);
			tree.delete(2);

			assert.strictEqual(tree._root.element, 1);
			assert.strictEqual(tree._root.height, 2);
			assert.strictEqual(tree._root.left, null);
			assert.strictEqual(tree._root.right.element, 3);
			assert.strictEqual(tree._root.right.height, 1);
		});
		it('should remove an element with two children, with a large tree, near bottom', function () {
			tree.insert(1);
			tree.insert(2);
			tree.insert(3);
			tree.insert(4);
			tree.insert(5);
			tree.insert(6);
			tree.insert(7);
			tree.insert(8);
			tree.insert(9);
			tree.insert(10);
			tree.insert(11);
			tree.insert(12);
			tree.insert(13);
			tree.insert(14);
			tree.insert(15);
			tree.insert(16);
			tree.insert(17);
			tree.insert(18);
			tree.insert(19);
			tree.insert(20);
			tree.insert(21);
			tree.insert(22);
			tree.insert(23);
			tree.insert(24);
			tree.delete(4);
			assert.strictEqual(tree._root.element, 16);
			assert.strictEqual(tree._root.height, 5);

			assert.strictEqual(tree._root.left.element, 8);
			assert.strictEqual(tree._root.left.height, 4);
			assert.strictEqual(tree._root.right.element, 20);
			assert.strictEqual(tree._root.right.height, 4);

			assert.strictEqual(tree._root.left.left.element, 3);
			assert.strictEqual(tree._root.left.left.height, 3);
			assert.strictEqual(tree._root.left.right.element, 12);
			assert.strictEqual(tree._root.left.right.height, 3);
			assert.strictEqual(tree._root.right.left.element, 18);
			assert.strictEqual(tree._root.right.left.height, 2);
			assert.strictEqual(tree._root.right.right.element, 22);
			assert.strictEqual(tree._root.right.right.height, 3);

			assert.strictEqual(tree._root.left.left.left.element, 2);
			assert.strictEqual(tree._root.left.left.left.height, 2);
			assert.strictEqual(tree._root.left.left.right.element, 6);
			assert.strictEqual(tree._root.left.left.right.height, 2);
			assert.strictEqual(tree._root.left.right.left.element, 10);
			assert.strictEqual(tree._root.left.right.left.height, 2);
			assert.strictEqual(tree._root.left.right.right.element, 14);
			assert.strictEqual(tree._root.left.right.right.height, 2);
			assert.strictEqual(tree._root.right.left.left.element, 17);
			assert.strictEqual(tree._root.right.left.left.height, 1);
			assert.strictEqual(tree._root.right.left.right.element, 19);
			assert.strictEqual(tree._root.right.left.right.height, 1);
			assert.strictEqual(tree._root.right.right.left.element, 21);
			assert.strictEqual(tree._root.right.right.left.height, 1);
			assert.strictEqual(tree._root.right.right.right.element, 23);
			assert.strictEqual(tree._root.right.right.right.height, 2);

			assert.strictEqual(tree._root.left.left.left.left.element, 1);
			assert.strictEqual(tree._root.left.left.left.left.height, 1);
			assert.strictEqual(tree._root.left.left.right.left.element, 5);
			assert.strictEqual(tree._root.left.left.right.left.height, 1);
			assert.strictEqual(tree._root.left.left.right.right.element, 7);
			assert.strictEqual(tree._root.left.left.right.right.height, 1);
			assert.strictEqual(tree._root.left.right.left.left.element, 9);
			assert.strictEqual(tree._root.left.right.left.left.height, 1);
			assert.strictEqual(tree._root.left.right.left.right.element, 11);
			assert.strictEqual(tree._root.left.right.left.right.height, 1);
			assert.strictEqual(tree._root.left.right.right.left.element, 13);
			assert.strictEqual(tree._root.left.right.right.left.height, 1);
			assert.strictEqual(tree._root.left.right.right.right.element, 15);
			assert.strictEqual(tree._root.left.right.right.right.height, 1);
			assert.strictEqual(tree._root.right.right.right.right.element, 24);
			assert.strictEqual(tree._root.right.right.right.right.height, 1);

			tree.delete(3);
			assert.strictEqual(tree._root.element, 16);

			assert.strictEqual(tree._root.left.element, 8);
			assert.strictEqual(tree._root.right.element, 20);

			assert.strictEqual(tree._root.left.left.element, 2);
			assert.strictEqual(tree._root.left.right.element, 12);
			assert.strictEqual(tree._root.right.left.element, 18);
			assert.strictEqual(tree._root.right.right.element, 22);

			assert.strictEqual(tree._root.left.left.left.element, 1);
			assert.strictEqual(tree._root.left.left.right.element, 6);
			assert.strictEqual(tree._root.left.right.left.element, 10);
			assert.strictEqual(tree._root.left.right.right.element, 14);
			assert.strictEqual(tree._root.right.left.left.element, 17);
			assert.strictEqual(tree._root.right.left.right.element, 19);
			assert.strictEqual(tree._root.right.right.left.element, 21);
			assert.strictEqual(tree._root.right.right.right.element, 23);

			assert.strictEqual(tree._root.left.left.right.left.element, 5);
			assert.strictEqual(tree._root.left.left.right.right.element, 7);
			assert.strictEqual(tree._root.left.right.left.left.element, 9);
			assert.strictEqual(tree._root.left.right.left.right.element, 11);
			assert.strictEqual(tree._root.left.right.right.left.element, 13);
			assert.strictEqual(tree._root.left.right.right.right.element, 15);
			assert.strictEqual(tree._root.right.right.right.right.element, 24);

			tree.delete(2);
			tree.delete(6);
			assert.strictEqual(tree._root.element, 16); // TODO: check heights!

			assert.strictEqual(tree._root.left.element, 8);
			assert.strictEqual(tree._root.right.element, 20);

			assert.strictEqual(tree._root.left.left.element, 5);
			assert.strictEqual(tree._root.left.right.element, 12);
			assert.strictEqual(tree._root.right.left.element, 18);
			assert.strictEqual(tree._root.right.right.element, 22);

			assert.strictEqual(tree._root.left.left.left.element, 1);
			assert.strictEqual(tree._root.left.left.right.element, 7);
			assert.strictEqual(tree._root.left.right.left.element, 10);
			assert.strictEqual(tree._root.left.right.right.element, 14);
			assert.strictEqual(tree._root.right.left.left.element, 17);
			assert.strictEqual(tree._root.right.left.right.element, 19);
			assert.strictEqual(tree._root.right.right.left.element, 21);
			assert.strictEqual(tree._root.right.right.right.element, 23);

			assert.strictEqual(tree._root.left.right.left.left.element, 9);
			assert.strictEqual(tree._root.left.right.left.right.element, 11);
			assert.strictEqual(tree._root.left.right.right.left.element, 13);
			assert.strictEqual(tree._root.left.right.right.right.element, 15);
			assert.strictEqual(tree._root.right.right.right.right.element, 24);
		});
		it('should remove an element with two children, with a large tree, near root', function () {
			tree.insert(1);
			tree.insert(2);
			tree.insert(3);
			tree.insert(4);
			tree.insert(5);
			tree.insert(6);
			tree.insert(7);
			tree.insert(8);
			tree.insert(9);
			tree.insert(10);
			tree.insert(11);
			tree.insert(12);
			tree.insert(13);
			tree.insert(14);
			tree.insert(15);
			tree.insert(16);
			tree.insert(17);
			tree.insert(18);
			tree.insert(19);
			tree.insert(20);
			tree.insert(21);
			tree.insert(22);
			tree.insert(23);
			tree.insert(24);
			tree.delete(20);
			assert.strictEqual(tree._root.element, 16);
			assert.strictEqual(tree._root.height, 5);

			assert.strictEqual(tree._root.left.element, 8);
			assert.strictEqual(tree._root.left.height, 4);
			assert.strictEqual(tree._root.right.element, 19);
			assert.strictEqual(tree._root.right.height, 4);

			assert.strictEqual(tree._root.left.left.element, 4);
			assert.strictEqual(tree._root.left.left.height, 3);
			assert.strictEqual(tree._root.left.right.element, 12);
			assert.strictEqual(tree._root.left.right.height, 3);
			assert.strictEqual(tree._root.right.left.element, 18);
			assert.strictEqual(tree._root.right.left.height, 2);
			assert.strictEqual(tree._root.right.right.element, 22);
			assert.strictEqual(tree._root.right.right.height, 3);

			assert.strictEqual(tree._root.left.left.left.element, 2);
			assert.strictEqual(tree._root.left.left.left.height, 2);
			assert.strictEqual(tree._root.left.left.right.element, 6);
			assert.strictEqual(tree._root.left.left.right.height, 2);
			assert.strictEqual(tree._root.left.right.left.element, 10);
			assert.strictEqual(tree._root.left.right.left.height, 2);
			assert.strictEqual(tree._root.left.right.right.element, 14);
			assert.strictEqual(tree._root.left.right.right.height, 2);
			assert.strictEqual(tree._root.right.left.left.element, 17);
			assert.strictEqual(tree._root.right.left.left.height, 1);
			assert.strictEqual(tree._root.right.right.left.element, 21);
			assert.strictEqual(tree._root.right.right.left.height, 1);
			assert.strictEqual(tree._root.right.right.right.element, 23);
			assert.strictEqual(tree._root.right.right.right.height, 2);

			assert.strictEqual(tree._root.left.left.left.left.element, 1);
			assert.strictEqual(tree._root.left.left.left.left.height, 1);
			assert.strictEqual(tree._root.left.left.left.right.element, 3);
			assert.strictEqual(tree._root.left.left.left.right.height, 1);
			assert.strictEqual(tree._root.left.left.right.left.element, 5);
			assert.strictEqual(tree._root.left.left.right.left.height, 1);
			assert.strictEqual(tree._root.left.left.right.right.element, 7);
			assert.strictEqual(tree._root.left.left.right.right.height, 1);
			assert.strictEqual(tree._root.left.right.left.left.element, 9);
			assert.strictEqual(tree._root.left.right.left.left.height, 1);
			assert.strictEqual(tree._root.left.right.left.right.element, 11);
			assert.strictEqual(tree._root.left.right.left.right.height, 1);
			assert.strictEqual(tree._root.left.right.right.left.element, 13);
			assert.strictEqual(tree._root.left.right.right.left.height, 1);
			assert.strictEqual(tree._root.left.right.right.right.element, 15);
			assert.strictEqual(tree._root.left.right.right.right.height, 1);
			assert.strictEqual(tree._root.right.right.right.right.element, 24);
			assert.strictEqual(tree._root.right.right.right.right.height, 1);
		});
		it('should remove root of a large tree', function () {
			tree.insert(1);
			tree.insert(2);
			tree.insert(3);
			tree.insert(4);
			tree.insert(5);
			tree.insert(6);
			tree.insert(7);
			tree.insert(8);
			tree.insert(9);
			tree.insert(10);
			tree.insert(11);
			tree.insert(12);
			tree.insert(13);
			tree.insert(14);
			tree.insert(15);
			tree.insert(16);
			tree.insert(17);
			tree.insert(18);
			tree.insert(19);
			tree.insert(20);
			tree.insert(21);
			tree.insert(22);
			tree.insert(23);
			tree.insert(24);
			tree.delete(16);
			assert.strictEqual(tree._root.element, 15);
			assert.strictEqual(tree._root.height, 5);

			assert.strictEqual(tree._root.left.element, 8);
			assert.strictEqual(tree._root.left.height, 4);
			assert.strictEqual(tree._root.right.element, 20);
			assert.strictEqual(tree._root.right.height, 4);

			assert.strictEqual(tree._root.left.left.element, 4);
			assert.strictEqual(tree._root.left.left.height, 3);
			assert.strictEqual(tree._root.left.right.element, 12);
			assert.strictEqual(tree._root.left.right.height, 3);
			assert.strictEqual(tree._root.right.left.element, 18);
			assert.strictEqual(tree._root.right.left.height, 2);
			assert.strictEqual(tree._root.right.right.element, 22);
			assert.strictEqual(tree._root.right.right.height, 3);

			assert.strictEqual(tree._root.left.left.left.element, 2);
			assert.strictEqual(tree._root.left.left.left.height, 2);
			assert.strictEqual(tree._root.left.left.right.element, 6);
			assert.strictEqual(tree._root.left.left.right.height, 2);
			assert.strictEqual(tree._root.left.right.left.element, 10);
			assert.strictEqual(tree._root.left.right.left.height, 2);
			assert.strictEqual(tree._root.left.right.right.element, 14);
			assert.strictEqual(tree._root.left.right.right.height, 2);
			assert.strictEqual(tree._root.right.left.left.element, 17);
			assert.strictEqual(tree._root.right.left.left.height, 1);
			assert.strictEqual(tree._root.right.left.right.element, 19);
			assert.strictEqual(tree._root.right.left.right.height, 1);
			assert.strictEqual(tree._root.right.right.left.element, 21);
			assert.strictEqual(tree._root.right.right.left.height, 1);
			assert.strictEqual(tree._root.right.right.right.element, 23);
			assert.strictEqual(tree._root.right.right.right.height, 2);

			assert.strictEqual(tree._root.left.left.left.left.element, 1);
			assert.strictEqual(tree._root.left.left.left.left.height, 1);
			assert.strictEqual(tree._root.left.left.left.right.element, 3);
			assert.strictEqual(tree._root.left.left.left.right.height, 1);
			assert.strictEqual(tree._root.left.left.right.left.element, 5);
			assert.strictEqual(tree._root.left.left.right.left.height, 1);
			assert.strictEqual(tree._root.left.left.right.right.element, 7);
			assert.strictEqual(tree._root.left.left.right.right.height, 1);
			assert.strictEqual(tree._root.left.right.left.left.element, 9);
			assert.strictEqual(tree._root.left.right.left.left.height, 1);
			assert.strictEqual(tree._root.left.right.left.right.element, 11);
			assert.strictEqual(tree._root.left.right.left.right.height, 1);
			assert.strictEqual(tree._root.left.right.right.left.element, 13);
			assert.strictEqual(tree._root.left.right.right.left.height, 1);
			assert.strictEqual(tree._root.right.right.right.right.element, 24);
			assert.strictEqual(tree._root.right.right.right.right.height, 1);
		});
		it('should swap element with a left left max value', function () {
			tree.insert(5);
			tree.insert(3);
			tree.insert(10);
			tree.insert(2);
			tree.insert(4);
			tree.insert(11);
			tree.insert(1);
			tree.delete(3);
			assert.strictEqual(tree._root.element, 5);
			assert.strictEqual(tree._root.height, 3);

			assert.strictEqual(tree._root.left.element, 2);
			assert.strictEqual(tree._root.left.height, 2);
			assert.strictEqual(tree._root.right.element, 10);
			assert.strictEqual(tree._root.right.height, 2);

			assert.strictEqual(tree._root.left.left.element, 1);
			assert.strictEqual(tree._root.left.left.height, 1);
			assert.strictEqual(tree._root.left.right.element, 4);
			assert.strictEqual(tree._root.left.right.height, 1);
			assert.strictEqual(tree._root.right.right.element, 11);
			assert.strictEqual(tree._root.right.right.height, 1);
		});
		it('should swap element with a left right max value', function () {
			tree.insert(5);
			tree.insert(3);
			tree.insert(10);
			tree.insert(1);
			tree.insert(4);
			tree.insert(11);
			tree.insert(2);
			tree.delete(3);
			assert.strictEqual(tree._root.element, 5);
			assert.strictEqual(tree._root.height, 3);

			assert.strictEqual(tree._root.left.element, 2);
			assert.strictEqual(tree._root.left.height, 2);
			assert.strictEqual(tree._root.right.element, 10);
			assert.strictEqual(tree._root.right.height, 2);

			assert.strictEqual(tree._root.left.left.element, 1);
			assert.strictEqual(tree._root.left.left.height, 1);
			assert.strictEqual(tree._root.left.right.element, 4);
			assert.strictEqual(tree._root.left.right.height, 1);
			assert.strictEqual(tree._root.right.right.element, 11);
			assert.strictEqual(tree._root.right.right.height, 1);
		});
		it('should delete and return the max of the tree', function () {
			tree.insert(5);
			tree.insert(3);
			tree.insert(10);
			tree.insert(1);
			tree.insert(4);
			tree.insert(11);
			tree.insert(2);
			var max = tree.deleteMax();
			assert.strictEqual(max, 11);
			assert.strictEqual(tree._root.element, 3);
			assert.strictEqual(tree._root.height, 3);

			assert.strictEqual(tree._root.left.element, 1);
			assert.strictEqual(tree._root.left.height, 2);
			assert.strictEqual(tree._root.right.element, 5);
			assert.strictEqual(tree._root.right.height, 2);

			assert.strictEqual(tree._root.left.right.element, 2);
			assert.strictEqual(tree._root.left.right.height, 1);
			assert.strictEqual(tree._root.right.left.element, 4);
			assert.strictEqual(tree._root.right.left.height, 1);
			assert.strictEqual(tree._root.right.right.element, 10);
			assert.strictEqual(tree._root.right.right.height, 1);
		});
		it('should not crash if the tree is empty', function () {
			tree.delete(5);
		});
		it('should not crash if the element is not in the tree', function () {
			tree.insert(4);
			tree.delete(5);
		});
	});
	describe('forEach', function () {
		var tree;
		beforeEach(function () {
			tree = new AvlTree();
		});
		it('should iterate the tree in order', function () {
			tree.insert(5);
			tree.insert(3);
			tree.insert(10);
			tree.insert(1);
			tree.insert(4);
			tree.insert(11);
			tree.insert(2);
			var expected = [1, 2, 3, 4, 5, 10, 11];
			var i = 0;
			tree.forEach(function (element) {
				assert.strictEqual(element, expected[i]);
				i += 1;
			});
		});
	});
	describe('getElementsAtDepth', function () {
		var tree;
		beforeEach(function () {
			tree = new AvlTree();
		});
		it('list all the nodes at the given depth', function () {
			tree.insert(1);
			tree.insert(2);
			tree.insert(3);
			tree.insert(4);
			tree.insert(5);
			tree.insert(6);
			tree.insert(7);
			tree.insert(8);
			tree.insert(9);
			tree.insert(10);
			tree.insert(11);
			tree.insert(12);
			tree.insert(13);
			tree.insert(14);
			tree.insert(15);
			tree.insert(16);
			tree.insert(17);
			tree.insert(18);
			tree.insert(19);
			tree.insert(20);
			tree.insert(21);
			tree.insert(22);
			tree.insert(23);
			tree.insert(24);
			assert.strictEqual(tree._root.element, 16);
			assert.strictEqual(tree._root.height, 5);

			assert.strictEqual(tree._root.left.element, 8);
			assert.strictEqual(tree._root.left.height, 4);
			assert.strictEqual(tree._root.right.element, 20);
			assert.strictEqual(tree._root.right.height, 4);

			assert.strictEqual(tree._root.left.left.element, 4);
			assert.strictEqual(tree._root.left.left.height, 3);
			assert.strictEqual(tree._root.left.right.element, 12);
			assert.strictEqual(tree._root.left.right.height, 3);
			assert.strictEqual(tree._root.right.left.element, 18);
			assert.strictEqual(tree._root.right.left.height, 2);
			assert.strictEqual(tree._root.right.right.element, 22);
			assert.strictEqual(tree._root.right.right.height, 3);

			assert.strictEqual(tree._root.left.left.left.element, 2);
			assert.strictEqual(tree._root.left.left.left.height, 2);
			assert.strictEqual(tree._root.left.left.right.element, 6);
			assert.strictEqual(tree._root.left.left.right.height, 2);
			assert.strictEqual(tree._root.left.right.left.element, 10);
			assert.strictEqual(tree._root.left.right.left.height, 2);
			assert.strictEqual(tree._root.left.right.right.element, 14);
			assert.strictEqual(tree._root.left.right.right.height, 2);
			assert.strictEqual(tree._root.right.left.left.element, 17);
			assert.strictEqual(tree._root.right.left.left.height, 1);
			assert.strictEqual(tree._root.right.left.right.element, 19);
			assert.strictEqual(tree._root.right.left.right.height, 1);
			assert.strictEqual(tree._root.right.right.left.element, 21);
			assert.strictEqual(tree._root.right.right.left.height, 1);
			assert.strictEqual(tree._root.right.right.right.element, 23);
			assert.strictEqual(tree._root.right.right.right.height, 2);

			assert.strictEqual(tree._root.left.left.left.left.element, 1);
			assert.strictEqual(tree._root.left.left.left.left.height, 1);
			assert.strictEqual(tree._root.left.left.left.right.element, 3);
			assert.strictEqual(tree._root.left.left.left.right.height, 1);
			assert.strictEqual(tree._root.left.left.right.left.element, 5);
			assert.strictEqual(tree._root.left.left.right.left.height, 1);
			assert.strictEqual(tree._root.left.left.right.right.element, 7);
			assert.strictEqual(tree._root.left.left.right.right.height, 1);
			assert.strictEqual(tree._root.left.right.left.left.element, 9);
			assert.strictEqual(tree._root.left.right.left.left.height, 1);
			assert.strictEqual(tree._root.left.right.left.right.element, 11);
			assert.strictEqual(tree._root.left.right.left.right.height, 1);
			assert.strictEqual(tree._root.left.right.right.left.element, 13);
			assert.strictEqual(tree._root.left.right.right.left.height, 1);
			assert.strictEqual(tree._root.left.right.right.right.element, 15);
			assert.strictEqual(tree._root.left.right.right.right.height, 1);
			assert.strictEqual(tree._root.right.right.right.right.element, 24);
			assert.strictEqual(tree._root.right.right.right.right.height, 1);

			var nodesAtZero = tree.getElementsAtDepth(0);
			assert.strictEqual(nodesAtZero.length, 1);
			assert.strictEqual(nodesAtZero[0], 16);

			var nodesAtOne = tree.getElementsAtDepth(1);
			assert.strictEqual(nodesAtOne.length, 2);
			assert.strictEqual(nodesAtOne[0], 8);
			assert.strictEqual(nodesAtOne[1], 20);

			var nodesAtTwo = tree.getElementsAtDepth(2);
			assert.strictEqual(nodesAtTwo.length, 4);
			assert.strictEqual(nodesAtTwo[0], 4);
			assert.strictEqual(nodesAtTwo[1], 12);
			assert.strictEqual(nodesAtTwo[2], 18);
			assert.strictEqual(nodesAtTwo[3], 22);

			var nodesAtThree = tree.getElementsAtDepth(3);
			assert.strictEqual(nodesAtThree.length, 8);
			assert.strictEqual(nodesAtThree[0], 2);
			assert.strictEqual(nodesAtThree[1], 6);
			assert.strictEqual(nodesAtThree[2], 10);
			assert.strictEqual(nodesAtThree[3], 14);
			assert.strictEqual(nodesAtThree[4], 17);
			assert.strictEqual(nodesAtThree[5], 19);
			assert.strictEqual(nodesAtThree[6], 21);
			assert.strictEqual(nodesAtThree[7], 23);

			var nodesAtFour = tree.getElementsAtDepth(4);
			assert.strictEqual(nodesAtFour.length, 9);
			assert.strictEqual(nodesAtFour[0], 1);
			assert.strictEqual(nodesAtFour[1], 3);
			assert.strictEqual(nodesAtFour[2], 5);
			assert.strictEqual(nodesAtFour[3], 7);
			assert.strictEqual(nodesAtFour[4], 9);
			assert.strictEqual(nodesAtFour[5], 11);
			assert.strictEqual(nodesAtFour[6], 13);
			assert.strictEqual(nodesAtFour[7], 15);
			assert.strictEqual(nodesAtFour[8], 24);
		});
	});
	describe('custom sort', function () {
		it('should order objects correctly by property', function () {
			// Create a custom sorting function that will order people by age.
			function personSortingFunction(personA, personB) {
				if (personA.age < personB.age) {
					return -1;
				} else if (personA.age > personB.age) {
					return 1;
				}
				return 0;
			}

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

			var expectedOrder = [1, 2, 3, 4];
			var actualOrder = [];

			personTree.forEach(function (person) {
				actualOrder.push(person.age);
			});

			assert.deepStrictEqual(expectedOrder, actualOrder);
		});
	});
});
