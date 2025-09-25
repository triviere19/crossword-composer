import test from 'ava'

import { Solver } from '../index'

test('Solver constructor creates instance', (t) => {
	const words = ['CAT', 'DOG', 'BIRD', 'FISH', 'CAR', 'ART', 'TAR']
	const solver = new Solver(words);
	t.truthy(solver);
	t.true(solver instanceof Solver);
});

test('Solver solves simple puzzle', (t) => {
	const words = ['CAT', 'DOG', 'BIRD', 'FISH', 'CAR', 'ART', 'TAR', 'RAT', 'TAT'];
	const solver = new Solver(words);

	// We expect to build the following puzzle:
	// C A T
	// A   A
	// R A T

	// This builds the following grid:
	// 0 1 2
	// 3   4
	// 5 6 7

	// And then given the grid, we want the following words:
	const grid = [
		[0, 3, 5,], 	// CAR
		[2, 4, 7,], 	// TAR
		[0, 1, 2,],     // CAT
		[5, 6, 7,],     // RAT
	];

	const result = solver.solve(grid);

	// Should return this solution
	const expectedResult = [
		'c', 'a', 't',
		'a', 'a', 'r',
		'a', 't'
	];

	console.log(result);

	if (result !== null) {
		t.true(Array.isArray(result));
		t.true(result.every(item => typeof item === 'string'));
		result.forEach((slot, i) => {
			t.true(slot == expectedResult[i]);
		})
	} else {
		t.fail();
	}
});
