//JS实现一个带并发限制的异步调度器Scheduler,
//保证同时运行的任务最多有两个。
//完善代码中Scheduler类,使得以下程序能正确输出：
//Scheduler内部可以写其他的方法
class Scheduler {
  _limit: number = 2;
  tasks: (() => Promise<any>)[] = [];
  process: Promise<any>[] = [];
  add(promiseCreator: () => Promise<any>) {
    this.tasks.push(promiseCreator);
    this.run();
  }
  run() {
    while (this.process.length < this._limit && this.tasks.length > 0) {
      const task = this.tasks.shift()!;
      const promise = task().then(() => {
        this.process.splice(this.process.indexOf(promise), 1);
        this.run();
      });
      this.process.push(promise);
    }
  }
}

const timeout = (time: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

describe("带并发限制的异步调度器Scheduler", () => {
  it("Scheduler", (done) => {
    const scheduler = new Scheduler();
    const result: string[] = [];
    const addTask = (time: number, order: string) => {
      scheduler.add(async () => {
        await timeout(time);
        result.push(order);
        if (result.length === 4) {
          expect(result).toEqual(["2", "3", "1", "4"]);
          done();
        }
      });
    };
    addTask(1000, "1");
    addTask(500, "2");
    addTask(300, "3");
    addTask(400, "4");
  });
});

// output: 2 3 1 4

// 一开始,1、2两个任务进入队列
// 500ms时,2完成,输出2,任务3进队
// 800ms时,3完成,输出3,任务4进队
// 1000ms时,1完成,输出1
// 1200ms时,4完成,输出4
