/**
 * cookie操作工具类，小程序端用Storage模拟cookie
 * cookie.set(name, value[, exSeconds]) 默认7天过期
 * cookie.get(name)
 * cookie.remove(name)
 */

/**
 * 设置cookie,默认7天过期
 * @param {*} cname 
 * @param {*} cvalue 
 * @param {*} exSeconds  过期时间（秒）
 */
function set(cname, cvalue, exSeconds = 7 * 24 * 60 * 60) {
    var d = new Date();
    d.setTime(d.getTime() + (exSeconds * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires + "path=/";
}
/**
 * 获取cookie
 * @param {*} cname 
 */
function get(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}
/**
 * 移除某项cookie
 * @param {*} cname 
 */
function remove(cname) {
    set(cname, '', -365)
}


export default {
    get, set, remove
}