import test from 'ava'

import { Solver } from '../index'

test('sync function from native code', (t) => {
    const words = ['CAT', 'DOG', 'BIRD', 'FISH', 'CAR', 'ART', 'TAR']
    const solver = new Solver(words);

    // Simple 3x3 grid specification
    const grid = [
      [1, 1, 1],
      [1, 0, 1], 
      [1, 1, 1]
    ];

    const result = solver.solve(grid);

    // Should return either a solution or null
    if (result !== null) {
      t.true(Array.isArray(result))
      t.true(result.every(item => typeof item === 'string'))
    } else {
      t.is(result, null)
    }
});
