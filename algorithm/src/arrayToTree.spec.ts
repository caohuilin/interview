interface INode {
  id: number;
  value: number;
  parent: number;
  children?: INode[];
}

const findChildren = (node: INode, allNodes: INode[]) => {
  node.children = allNodes.filter((n) => n.parent === node.id);
  node.children.forEach((child) => findChildren(child, allNodes));
};

function arrToTree(arr: INode[]) {
  if (arr.length === 0) {
    return null;
  }
  for (let i = 0; i < arr.length; i++) {
    arr[i].children = [];
  }
  arr.sort((a, b) => a.parent - b.parent);
  findChildren(arr[0], arr);
  return arr[0];
}

describe("数组结构转树结构", () => {
  it("arr to tree", () => {
    const arr = [
      { id: 2, value: 2, parent: 1 },
      { id: 3, value: 3, parent: 2 },
      { id: 4, value: 4, parent: 2 },
      { id: 1, value: 1, parent: 0 },
    ];
    const head = {
      id: 1,
      value: 1,
      parent: 0,
      children: [
        {
          id: 2,
          value: 2,
          parent: 1,
          children: [
            { id: 3, value: 3, parent: 2, children: [] },
            { id: 4, value: 4, parent: 2, children: [] },
          ],
        },
      ],
    };
    expect(arrToTree(arr)).toEqual(head);
  });
});
