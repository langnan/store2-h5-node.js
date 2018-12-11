const request = require('request');
const forge = require('node-forge');

class WechatService {
  constructor() {
    //cnuip
    this.appId = 'wxe92efaafe3a4bcf0';
    this.appSecret = '3d5d004b61dcff16149e38cd61668032';
    //personal
    // this.appId = 'wx0ae404f325c4e154';
    // this.appSecret = '1ffbc68b5bddabbcfa9632657b7e5297';
    this.accessToken = null;
    this.apiTicket = null;
  }

  //获取token
  async getAccessToken() {
    const self = this;
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${self.appId}&secret=${self.appSecret}`;
    return new Promise(function (resolve, reject) {
      request.get(url, function (error, response, body) {
        if (error) {
          self.accessToken = null;
          reject(error);
        } else {
          const result = JSON.parse(body);
          self.accessToken = result.access_token;
          const expiresIn = result.expires_in;
          setTimeout(function () {
            self.accessToken = null;
          }, expiresIn * 1000);
          resolve(self.accessToken);
        }
      });
    });
  }

  //获取jsapi_ticket
  async getApiTicket() {
    const self = this;
    if (!self.accessToken) {
      await self.getAccessToken();
    }
    const url = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${self.accessToken}&type=jsapi`;
    return new Promise(function (resolve, reject) {
      request.get(url, function (error, response, body) {
        if (error) {
          self.apiTicket = null;
          reject(error);
        } else {
          const result = JSON.parse(body);
          self.apiTicket = result.ticket;
          const expiresIn = result.expires_in;
          setTimeout(function () {
            self.apiTicket = null;
          }, expiresIn * 1000);
          resolve(self.apiTicket);
        }
      });
    });
  }

  //生成随机字符串
  getNoncenStr(length) {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  //生产时间戳
  getTimestamp() {
    return parseInt(new Date().getTime() / 1000) + '';
  }

  //生成签名seed
  getSeed(args) {
    var keys = Object.keys(args);
    keys = keys.sort()
    var newArgs = {};
    keys.forEach(function (key) {
      newArgs[key.toLowerCase()] = args[key];
    });

    var string = '';
    for (var k in newArgs) {
      string += '&' + k + '=' + newArgs[k];
    }
    string = string.substr(1);
    return string;
  }

  //生成签名
  async getSign(noncestr, timestamp, url) {
    const self = this;
    if (!self.apiTicket) {
      await self.getApiTicket();
    }
    var ret = {
      jsapi_ticket: self.apiTicket,
      nonceStr: noncestr,
      timestamp: timestamp,
      url: url
    };

    var seed = self.getSeed(ret);
    const md = forge.md.sha1.create();
    md.update(seed);
    ret.signature = md.digest().toHex();
    return ret;
  }

  //init
  async init() {
    const self = this;
    await self.getAccessToken();
    await self.getApiTicket();
  }

  //生成微信页面配置
  async getWxConfig(url) {
    const self = this;
    const nonceStr = self.getNoncenStr(16);
    const timestamp = self.getTimestamp();
    const sign = await self.getSign(nonceStr, timestamp, url);
    const config = {
      debug: false,
      appId: self.appId,
      timestamp: timestamp,
      nonceStr: nonceStr,
      signature: sign.signature,
      jsApiList: [
        // 'onMenuShareTimeline',
        // 'onMenuShareAppMessage',
        // 'onMenuShareQQ',
        // 'onMenuShareWeibo',
        // 'onMenuShareQZone'
        'checkJsApi'
      ]
    };
    self.wxConfig = config;
    return config;
  }
}
//test
async function test() {
  const wechatService = new WechatService();
  await wechatService.getAccessToken();
  await wechatService.getApiTicket();
  await wechatService.getWxConfig('http://www.baidu.com');
  console.log(wechatService);
}
// test();


module.exports = new WechatService();