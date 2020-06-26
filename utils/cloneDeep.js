/**
 * 对象或者数组进行深拷贝
 * @param {object} obj 要拷贝的对象
 */
const cloneDeep = (obj) => {
    var o;
    if (typeof obj === 'object') {
        if (obj === null) {
            o = null;
        } else if (obj instanceof Array) {
            o = [];
            for (var i = 0; i < obj.length; i ++) {
                o.push(cloneDeep(obj[i]));
            }
        } else {
            o = {};
            for (var j in obj) {
                o[j] = cloneDeep(obj[j]);
            }
        }
    } else {
        o = obj;
    }
    return o;
}