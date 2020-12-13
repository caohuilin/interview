type ParamType<T> = T extends (param: infer P) => any ? P : T;

type Caller<T extends (...args: any[]) => any> = () => ParamType<T>;

function tx(x: string) {
  return x;
}

const caller: Caller<typeof tx> = () => {
  return "x";
};

describe("two sum", () => {
  it("1 + 2", () => {
    expect(caller()).toEqual("x");
  });
});
