$(function () {
    var url = location.href.split('#')[0];
    $.post('/wxConfig', { url: url }, function (data) {
        console.log(data);
        wx.config(data.wxConfig);
        wx.ready(function () {
            console.log('wx ready');
        });
        var shareInfo = JSON.parse($('#shareInfo').val());
        if (shareInfo) {
            shareInfo.link = url;
            console.log(shareInfo);
            wx.onMenuShareTimeline({
                title: shareInfo.title, // 分享标题
                link: shareInfo.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: shareInfo.icon, // 分享图标
                success: function () {
                    // 用户点击了分享后执行的回调函数
                }
            });

            wx.onMenuShareAppMessage({
                title: shareInfo.title, // 分享标题
                desc: shareInfo.desc, // 分享描述
                link: shareInfo.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: shareInfo.icon, // 分享图标
                type: 'link', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    // 用户点击了分享后执行的回调函数
                }
            });

            wx.onMenuShareQQ({
                title: shareInfo.title, // 分享标题
                desc: shareInfo.desc, // 分享描述
                link: shareInfo.link, // 分享链接
                imgUrl: shareInfo.icon, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });

            wx.onMenuShareWeibo({
                title: shareInfo.title, // 分享标题
                desc: shareInfo.desc, // 分享描述
                link: shareInfo.link, // 分享链接
                imgUrl: shareInfo.icon, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });

            wx.onMenuShareQZone({
                title: shareInfo.title, // 分享标题
                desc: shareInfo.desc, // 分享描述
                link: shareInfo.link, // 分享链接
                imgUrl: shareInfo.icon, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
        }
    });
});