function stopLoading() {
    $("#loadingContainer").hide();
}

var href = '/';
var ua = navigator.userAgent.toLowerCase();

if (/iphone|ipad|ipod/.test(ua)) {
    href = 'https://itunes.apple.com/cn/app/id1328199165?mt=8';
    setTimeout(function(){
        location.replace(href);
    }, 1000);
} else if (/android/.test(ua)) {
    if (/MicroMessenger/i.test(ua) || /MQQBrowser/i.test(ua)) {
        //如果是微信或者QQ浏览器
        $("#modal").show();
    } else {
        href = 'https://downloadzgapk.oss-cn-shanghai.aliyuncs.com/patentbag1-1.apk';
        setTimeout(function(){
            location.replace(href);
        }, 1000);
    }
} else {
    setTimeout(function () {
        stopLoading();
        alert('抱歉，跳转下载页面失败！');
    }, 1000);
}