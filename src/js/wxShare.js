import fly from '../js/request';

// 朋友圈
let title = '微信CMS-By Niefy';
let imgUrl = 'https://avatar.gitee.com/uploads/43/1028743_niefy.png';
const defaultDesc = '这是一个极简的CMS系统！';
export default function wxShare(path = '/', desc = defaultDesc) {
    if (!isWeixinBrowser()) {
        return;
    }
    let shareUrl = window.location.origin + '/client/' + window.location.hash;
    loadShareSignature();
    wx.ready(function () {
        console.log('shareUrl:' + shareUrl);
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。
        wx.onMenuShareTimeline({
            title: '微信CMS', // 分享标题
            link: shareUrl, // 分享链接
            imgUrl: imgUrl, // 分享图标
        });
        // 朋友
        wx.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: shareUrl, // 分享链接
            imgUrl: imgUrl, // 分享图标
        });
    });
    wx.error(p => {
        console.log(p)
    });
}

function loadShareSignature() {
    if (sessionStorage.shareSignature) {
        let shareSignature = JSON.parse(sessionStorage.shareSignature);
        setShareConfig(shareSignature);
        return;
    }
    fly.get('/wx/wxAuth/getShareSignature',null,{
        headers:{
            'wx-client-href':location.href
        }
    }).then((res) => {
        if (res.code != 200) {
            return
        }
        sessionStorage.shareSignature = JSON.stringify(res.data);
        setShareConfig(res.data);
    });
}

function setShareConfig(shareSignature) {
    wx.config({
        debug: false,
        appId: shareSignature.appId,
        timestamp: shareSignature.wxTimestamp,
        nonceStr: shareSignature.wxNoncestr,
        signature: shareSignature.wxSignature,
        jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage']
    });
}

function isWeixinBrowser() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        console.info('非微信浏览器');
        return false;
    }
}
