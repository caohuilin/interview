// 发布订阅者模式

type CallBackFunc = (...args: any) => void;
class PubSub {
  // 维护事件及订阅行为
  events: { [key: string]: CallBackFunc[] } = {};
  /**
   * 注册事件订阅行为
   * @param {String} type 事件类型
   * @param {Function} cb 回调函数
   */
  subscribe(type: string, cb: CallBackFunc) {
    if (!this.events[type]) {
      this.events[type] = [];
    }
    this.events[type].push(cb);
  }
  /**
   * 发布事件
   * @param {String} type 事件类型
   * @param  {...any} args 参数列表
   */
  publish(type: string, ...args: any) {
    if (this.events[type]) {
      this.events[type].forEach((cb) => {
        cb(...args);
      });
    }
  }
  /**
   * 移除某个事件的一个订阅行为
   * @param {String} type 事件类型
   * @param {Function} cb 回调函数
   */
  unsubscribe(type: string, cb: CallBackFunc) {
    if (this.events[type]) {
      const targetIndex = this.events[type].findIndex((item) => item === cb);
      if (targetIndex !== -1) {
        this.events[type].splice(targetIndex, 1);
      }
      if (this.events[type].length === 0) {
        delete this.events[type];
      }
    }
  }
  /**
   * 移除某个事件的所有订阅行为
   * @param {String} type 事件类型
   */
  unsubscribeAll(type: string) {
    if (this.events[type]) {
      delete this.events[type];
    }
  }
}

describe("发布订阅者模式", () => {
  it("test", () => {
    let count = 0;
    const pubSub = new PubSub();
    const handleSet = () => {
      count++;
    };
    pubSub.subscribe("set", handleSet);

    pubSub.publish("set");

    pubSub.unsubscribe("set", handleSet);

    pubSub.publish("set");

    expect(count).toBe(1);
  });
});
