class TreeNode {
  val?: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

function tree(arr: Array<number | null>) {
  if (arr.length === 0) {
    return null;
  }
  const head = arr[0] === null ? null : new TreeNode(arr[0]);
  const current = [head];
  let index = 1;
  for (let i = 0; i < current.length; i++) {
    if (index >= arr.length) {
      break;
    }
    const node = current.shift()!;
    if (node) {
      node.left = arr[index] === null ? null : new TreeNode(arr[index]!);
    }
    index++;
    if (index >= arr.length) {
      break;
    }
    if (node) {
      node.right = arr[index] === null ? null : new TreeNode(arr[index]!);
    }
    index++;
    current.push(node ? node.left : null);
    current.push(node ? node.right : null);
  }
  return head;
}

function dfsTree(node: TreeNode | null) {
  const result: Array<number | undefined> = [];
  const dfs = (node: TreeNode | null) => {
    if (!node) {
      return;
    }
    result.push(node.val);
    dfs(node.left);
    dfs(node.right);
  };
  dfs(node);
  return result;
}

describe("生成树", () => {
  it("树", () => {
    const root = tree([
      5,
      4,
      8,
      11,
      null,
      13,
      4,
      7,
      2,
      null,
      null,
      null,
      null,
      null,
      1,
    ]);
    console.log(root);
    const result = dfsTree(root);
    console.log(result);
  });
});
