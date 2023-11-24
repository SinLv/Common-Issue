/**
 * 获取小数点后数字长度
 * @param { Number } num 数字
 * @return { Number }    长度
 */
function decimalLength(num) {
    let str = num.toString();
    let index = str.indexOf('.');
    return index === -1 ? 0 : str.substr(index + 1).length
}

/**
 * 小数点后补齐0作为整数，使相加的数字长度相同
 * @param { Number } num 数字
 * @param { Number } length 补齐的长度
 * @return { Number }     补齐长度后的整数
 */
function suffixInteger(num, length) {
    let str = num.toString();
    let decimalLen = decimalLength(num);
    str += Math.pow(10, length - decimalLen).toString().substr(1);
    return Number(str.replace('.', ''))
}

/**
 * 浮点数相加
 * @param { Number } num1
 * @param { Number } num2
 * @return { Number }     相加结果
 */
function add(num1, num2) {
    let r1 = decimalLength(num1);
    let r2 = decimalLength(num2);

    let max = Math.max(r1, r2);

    let n1 = suffixInteger(num1, max);
    let n2 = suffixInteger(num2, max);

    return Number((n1 + n2) / Math.pow(10, max).toFixed(max))

}

/**
 * 减法函数
 * 说明：JavaScript的减法结果会有误差，在两个浮点数相减的时候会比较明显。
 * @param { Number } num1
 * @param { Number } num2
 * @return { Number }     相减结果
 */
function sub(num1, num2) {
    let r1 = decimalLength(num1);
    let r2 = decimalLength(num2);

    let max = Math.max(r1, r2);

    let n1 = suffixInteger(num1, max);
    let n2 = suffixInteger(num2, max);

    return Number((n1 - n2) / Math.pow(10, max).toFixed(max))
}

/**
 * 浮点数相乘
 * @param { Number } num1
 * @param { Number } num2
 * @return { Number }     相乘结果
 */
function mul(num1, num2) {
    let r1 = decimalLength(num1);
    let r2 = decimalLength(num2);

    let max = Math.max(r1, r2);

    let n1 = suffixInteger(num1, max);
    let n2 = suffixInteger(num2, max);

    return (n1 * n2) / Math.pow(10, max * 2)
}

/**
 * 浮点数相除
 * @param { Number } num1
 * @param { Number } num2
 * @return { Number }     相除结果
 */
function div(num1, num2) {
    let r1 = decimalLength(num1);
    let r2 = decimalLength(num2);

    let max = Math.max(r1, r2);

    let n1 = suffixInteger(num1, max);
    let n2 = suffixInteger(num2, max);

    return n1 / n2;
}
