import Vue from 'vue'
/**
 * 提示通知
 * @param msg 消息内容 
 * @param duration 通知消失时间
 */
export default function toast(msg, duration) {
    duration = duration || 2500;
    var m = document.createElement('div');
    m.style.cssText = "width: 100%;text-align:center; position: fixed; bottom: 15%; z-index: 999999;font-size:13px;";
    m.innerHTML = '<span style="display:inline-block;max-width: 300px;background: rgba(17,17,17,0.7); color: #FFF; border-radius: 0.3rem;padding: 10px 20px">'+msg+'</span>';
    document.body.appendChild(m);
    setTimeout(function () {
        var d = 0.5;
        m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
        m.style.opacity = '0';
        setTimeout(function () { document.body.removeChild(m) }, d * 1000);
    }, duration);
}

Vue.prototype.$toast=toast