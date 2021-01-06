function getObjAttr(obj: { [key: string]: any }): string[] {
  const result: string[][] = [];
  const dfs = (obj: { [key: string]: any }, depth: number) => {
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === "object") {
        dfs(obj[key], depth + 1);
      }
      result[depth] = (result[depth] || []).concat(key);
    });
  };
  dfs(obj, 0);
  let attrs: string[] = [];
  for (let i = result.length - 1; i >= 0; i--) {
    attrs = attrs.concat(result[i]);
  }
  return attrs;
}
describe("获取对象属性", () => {
  it("简单", () => {
    const obj = {
      a: { b: "bb" },
    };
    expect(getObjAttr(obj)).toEqual(["b", "a"]);
  });
  it("获取对象属性", () => {
    const obj = {
      a: {
        b: {
          c: { f: "aa" },
        },
        d: {
          e: { g: "bb" },
          h: { i: "cc" },
        },
        j: {
          k: "dd",
        },
      },
    };
    expect(getObjAttr(obj)).toEqual([
      "f",
      "g",
      "i",
      "c",
      "e",
      "h",
      "k",
      "b",
      "d",
      "j",
      "a",
    ]);
  });
});
