import fly from '../js/request';
import cookie from './cookie'
const APPID = process.env.VUE_APP_WX_APPID;
const WX_AUTH_URL = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + APPID
    + '&redirect_uri=REDIRECT_URI&response_type=code&scope=snsapi_base&state=0#wechat_redirect';

/**
 * 微信授权
 */
export default function wxAuth() {
    return new Promise((resolve, reject) => {
        let openid = cookie.get('openid');
        if (openid) {
            resolve(openid);
            return;
        }
        let code = getUrlParam('code');
        if (!code) {//未经过微信授权
            let currentUrl = encodeURIComponent(window.location.href);
            window.location.replace(WX_AUTH_URL.replace('REDIRECT_URI', currentUrl));
        } else {
            fly.post('/wx/wxAuth/codeToOpenid', {
                code: code
            }).then(res => {
                if (res.code == 200) {
                    console.log("微信授权完成");
                    resolve(res.data);
                } else {
                    console.log("换取openid失败");
                }
            });
        }
    });
}

function getUrlParam(key) {//获取当前页面url中的参数
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : '';
}
