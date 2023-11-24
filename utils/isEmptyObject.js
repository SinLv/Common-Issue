/**
 * 判断对象是否为空,或者为null、undefined、[]、''
 * {}: true
 * null: true
 * undefined: true
 * []: true
 * '': true
 * {a: 1}: false
 * @param { Object } obj
 * @return { boolean }
 */
function isEmptyObject(obj) {
    for (var key in obj) {
        return false;
    }
    return true;
}