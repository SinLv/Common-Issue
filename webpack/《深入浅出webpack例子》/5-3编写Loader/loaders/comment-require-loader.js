function replace(source) {
    // 使用正则把 // @require './main.css' 转换成 require('./main.css');  
    return source.replace(/(\/\/ *@require)/, 'require');
}

module.exports = function (content) {
    return replace(content);
};