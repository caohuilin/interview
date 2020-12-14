function sum(a: number, b: number) {
  return a + b;
}

describe("two sum", () => {
  it("1 + 2", () => {
    expect(sum(1, 2)).toBe(3);
  });
});
