interface Action<T> {
  payload?: T;
  type: string;
}

class EffectModule {
  count = 1;
  message = "hello!";

  delay(input: Promise<number>) {
    return input.then((i) => ({
      payload: `hello ${i}!`,
      type: "delay",
    }));
  }

  setMessage(action: Action<Date>) {
    return {
      payload: action.payload!.getMilliseconds(),
      type: "set-message",
    };
  }
}

type RemoveNonFunctionProps<T> = {
  [key in keyof T]: T[key] extends Function ? key : never;
}[keyof T];

// type FunctionProps = RemoveNonFunctionProps<EffectModule>;

type PickFunction<T> = Pick<T, RemoveNonFunctionProps<T>>;

// type FunctionProps = PickFunction<EffectModule>;

// type asyncMethod<T, U> = (input: Promise<T>) => Promise<Action<U>>;
// type transformaAsyncMethod<T, U> = (input: T) => Action<U>

// type TransformAsyncMethod<T> = T extends (
//   input: Promise<infer T>
// ) => Promise<Action<infer U>>
//   ? (input: T) => Action<U>
//   : never;

// type syncMethod<T, U> = (action: Action<T>) => Action<U>;
// type transformsyncMethod<T, U> = (action: T) => Action<U>;

type TransformMethod<T> = T extends (
  input: Promise<infer T>
) => Promise<Action<infer U>>
  ? (input: T) => Action<U>
  : T extends (action: Action<infer T>) => Action<infer U>
  ? (action: T) => Action<U>
  : never;

type ConnectAll<T> = {
  [K in keyof T]: TransformMethod<T[K]>;
};

// 修改 Connect 的类型，让 connected 的类型变成预期的类型
type Connect = (module: EffectModule) => ConnectAll<PickFunction<EffectModule>>;

const connect: Connect = (m) => ({
  delay: (input: number) => ({
    type: "delay",
    payload: `hello 2`,
  }),
  setMessage: (input: Date) => ({
    type: "set-message",
    payload: input.getMilliseconds(),
  }),
});

type Connected = {
  delay(input: number): Action<string>;
  setMessage(action: Date): Action<number>;
};

export const connected: Connected = connect(new EffectModule());
