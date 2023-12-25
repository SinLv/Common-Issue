/**
 * 控制最大并发量任务队列
 * 使用方式：
 * const superTask = new SuperTask();
 * superTask.add(Fn).then(() => {console.log('任务完成')})
 */
class SuperTask {
    constructor(parallelCount = 2) {
        // 最大并发数量
        this.parallelCount = parallelCount;
        this.tasks = [];
        // 正在处理的任务数量
        this.runningCount = 0;
    }

    add(task) { 
        return new Promise((resolve, reject) => {
            this.tasks.push({
                task: task,
                resolve: resolve,
                reject: reject
            });
            this._run();
        });
    }
    _run() {
        while (this.runningCount < this.parallelCount && this.tasks.length > 0) {
            const {task, resolve, reject} = this.tasks.shift();
            this.runningCount++;
            Promise.resolve(task())
                .then(resolve)
                .catch(reject)
                .finally(() => {
                    this.runningCount--;
                    this._run();
                });
        }
    }
}