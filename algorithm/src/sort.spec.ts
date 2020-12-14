function bubbleSort(arr: number[]) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

function selectSort(arr: number[]) {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let j = i; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  return arr;
}

function insertSort(arr: number[]) {
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = current;
  }
  return arr;
}

function mergeSort(arr: number[]) {
  const len = arr.length;
  if (len <= 1) {
    return arr;
  }
  const mid = Math.floor(len / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  const result: number[] = [];
  let i = 0,
    j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] > right[j]) {
      result.push(right[j]);
      j++;
    } else {
      result.push(left[i]);
      i++;
    }
  }
  while (i < left.length) {
    result.push(left[i]);
    i++;
  }
  while (j < right.length) {
    result.push(right[j]);
    j++;
  }
  return result;
}

function quickSort(arr: number[]): number[] {
  if (arr.length <= 1) {
    return arr;
  }
  const left = [];
  const right = [];
  const itemIndex = Math.floor(Math.random() * arr.length);
  for (let i = 0; i < arr.length; i++) {
    if (i === itemIndex) {
      continue;
    }
    if (arr[i] > arr[itemIndex]) {
      right.push(arr[i]);
    } else {
      left.push(arr[i]);
    }
  }
  return [...quickSort(left), arr[itemIndex], ...quickSort(right)];
}

function quickSort2(
  arr: number[],
  start: number = 0,
  end: number = arr.length
) {
  if (end - start <= 1) {
    return;
  }
  const itemIndex = start + Math.floor(Math.random() * (end - start));
  const item = arr[itemIndex];
  [arr[start], arr[itemIndex]] = [arr[itemIndex], arr[start]];
  let current = start + 1;
  for (let i = current; i < end; i++) {
    if (arr[i] <= item) {
      [arr[i], arr[current]] = [arr[current], arr[i]];
      current++;
    }
  }
  [arr[current - 1], arr[start]] = [arr[start], arr[current - 1]];
  quickSort2(arr, start, current - 1);
  quickSort2(arr, current, end);
}

describe("排序算法", () => {
  it("冒泡排序", () => {
    const data = [3, 2, 4, 5, 1, 6];
    expect(bubbleSort(data)).toEqual([1, 2, 3, 4, 5, 6]);
  });
  it("选择排序", () => {
    const data = [3, 2, 4, 5, 1, 6];
    expect(bubbleSort(data)).toEqual([1, 2, 3, 4, 5, 6]);
  });
  it("插入排序", () => {
    const data = [3, 2, 4, 5, 1, 6];
    expect(insertSort(data)).toEqual([1, 2, 3, 4, 5, 6]);
  });
  it("归并排序", () => {
    const data = [3, 2, 4, 5, 1, 6];
    expect(mergeSort(data)).toEqual([1, 2, 3, 4, 5, 6]);
  });
  it("快速排序", () => {
    const data = [3, 2, 4, 5, 1, 6];
    expect(quickSort(data)).toEqual([1, 2, 3, 4, 5, 6]);
  });
  it("快速排序2", () => {
    const data = [3, 2, 4, 5, 3, 3, 1, 6, 3];
    quickSort2(data);
    expect(data).toEqual([1, 2, 3, 3, 3, 3, 4, 5, 6]);
  });
  it("快速排序3", () => {
    const data = [1, 2, 3, 4, 5, 6];
    quickSort2(data);
    expect(data).toEqual([1, 2, 3, 4, 5, 6]);
  });
  it("快速排序3", () => {
    const data = [1, 2, 3, 4, 5, 2, 2, 2, 2];
    quickSort2(data);
    expect(data).toEqual([1, 2, 2, 2, 2, 2, 3, 4, 5]);
  });
  it("快速排序3", () => {
    const data = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5, 6, 6, 7, 7, 1, 1];
    quickSort2(data);
    expect(data).toEqual([1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7]);
  });
});
