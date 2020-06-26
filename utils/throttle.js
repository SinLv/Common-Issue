/**
 * 事件节流函数
 * 当目标函数被连续频繁调用时，目标函数并不会每次调用都被执行，而是间隔一个设定好的时间再执行
 * @param {Function} func 需要节流的函数
 * @param {number} wait 节流时间
 */
const throttle = (func, wait) => {
    let timer = null;
    return (...args) => {
        if (!timer) {
            timer = setTimeout(() => {
                func.call(this, ...args);
                timer = null;
            }, wait);
        }
    }
}