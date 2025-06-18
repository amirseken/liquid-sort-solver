import { solve } from './solver.js';

// Пример из условия (возможно, упрощённый)
const matrix = [
  ["A", "B", "A", "B"],
  ["B", "A", "B", "A"],
  [],
  [],
];

const volume = 4;

const result = solve(matrix, volume);
console.log("Решение:");
console.log(result.map(([a, b]) => `(${a}, ${b})`).join(" "));
