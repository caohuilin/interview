/**
 * m 矩阵 一定是方形的
 * n 是当前矩阵的规模
 * out： number[] 蛇形方式输出
 */
function Matrix(m: number[][], startIndex = 0, n = m.length): number[] {
  if (n === 0) {
    return [];
  }
  if (n === 1) {
    return [m[startIndex][startIndex]];
  }
  const result = [];
  const end = n + startIndex;
  for (let i = startIndex; i < end; i++) {
    result.push(m[startIndex][i]);
  }
  for (let i = startIndex + 1; i < end; i++) {
    result.push(m[i][end - 1]);
  }
  for (let i = end - 2; i >= startIndex; i--) {
    result.push(m[end - 1][i]);
  }
  for (let i = end - 2; i > startIndex; i--) {
    result.push(m[i][startIndex]);
  }
  return result.concat(Matrix(m, startIndex + 1, n - 2));
}

const m = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
console.log(Matrix(m));

const m2 = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
];
console.log(Matrix(m2));

const m3 = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25],
];
console.log(Matrix(m3));
