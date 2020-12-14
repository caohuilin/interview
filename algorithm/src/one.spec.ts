// 单例模式
class Print {
  static p: Print | null = null;

  constructor() {
    if (Print.p) {
      return Print.p;
    }
    Print.p = this;
  }
}

describe("单例模式", () => {
  it("单例模式", () => {
    const p1 = new Print();
    const p2 = new Print();
    expect(p1 === p2).toBe(true);
  });
});
