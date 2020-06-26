/**
 * 事件防抖函数
 * @param {Function} func 需要防抖的函数
 * @param {number} wait 防抖时间
 */
const debounce = (func, wait) => {
    let timer;
    return (...args) => {
        if (timer) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.call(this, ...args)
            }, wait);
        }
    }
}