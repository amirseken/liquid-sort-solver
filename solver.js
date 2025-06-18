import { Tube } from './tube.js';

function serializeState(tubes) {
  return tubes.map(t => t.contents.join(",")).join("|");
}

export function solve(initialMatrix, volume) {
  const initialTubes = initialMatrix.map(row => new Tube([...row], volume));
  const visited = new Set();
  const path = [];

  function dfs(tubes, moves) {
    const state = serializeState(tubes);
    if (visited.has(state)) return false;
    visited.add(state);

    if (tubes.every(t => t.isSorted())) {
      for (let m of moves) path.push(m);
      return true;
    }

    const N = tubes.length;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (i === j) continue;

        const tubesCopy = tubes.map(t => t.clone());
        const from = tubesCopy[i];
        const to = tubesCopy[j];

        if (from.canPourInto(to)) {
          from.pourInto(to);
          if (dfs(tubesCopy, [...moves, [i, j]])) {
            return true;
          }
        }
      }
    }
    return false;
  }

  dfs(initialTubes, []);
  return path;
}
