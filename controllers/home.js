const request = require('request');
const moment = require('moment');
const path = require('path');
const wechatService = require('../services/WechatService');
const observerService = require('../services/ObserverService');
const urlBase = 'http://58.213.198.76:10001/patentQuery';
const storeUrlBase = 'http://58.213.198.77:10010/store2-service-colligate';

exports.index = async function (req, res) {
  const shareInfo = {
    title: `中高统计`,
    icon: `${req.protocol}://${req.hostname}/img/cnuip-logo.png`,
    desc: `中高为您统计各项专利数据`
  }
  res.render('index', {
    shareInfo: shareInfo
  });
}

//专利书包滚动页面
exports.bagStatistics = async function (req, res) {
  const collegeName = req.query.college;
  const name = req.query.name;
  const from = req.query.from;
  const query = { collegeName, name };
  const options = {
    url: `${urlBase}/findProfessorCountByName`,
    qs: query
  }
  request(options, function (err, response, body) {
    if (err) {
      res.render('error');
    } else {
      if (!JSON.parse(body).result) {
        res.render('error', { error: '您查找的高校或者专家不存在！' });
        return;
      }
      const result = JSON.parse(body).result.value;
      result.adMin = moment(result.adMin, 'YYYY.MM.DD').format('YYYY年MM月DD日');
      result.adMax = moment(result.adMax, 'YYYY.MM.DD').format('YYYY年MM月DD日');
      // console.log(`专利书包返回：${JSON.stringify(result)}`); 
      const shareInfo = {
        title: `${name}的专利简报`,
        icon: `${req.protocol}://${req.hostname}/img/cnuip-logo.png`,
        desc: `${collegeName}-${name}的专利数据统计`
      }
      res.render('bag', {
        result: result,
        title: `${name}的专利简报`,
        icon: '/img/cnuip-logo.png',
        from: from,
        shareInfo: shareInfo
      });
    }
  });
}

//专利宝统计页面
exports.storeStatistics = async function (req, res) {
  const collegeName = req.query.college;
  const query = { collegeName };
  const options = {
    url: `${urlBase}/findCollegeCountByName`,
    qs: query
  }
  request(options, function (err, response, body) {
    if (err) {
      res.render('error');
    } else {
      const result = JSON.parse(body).result;
      if (!result) {
        res.render('error', { error: '您查找的高校不存在！' });
        return;
      }
      result.value.now = moment(new Date()).format('YYYY.MM.DD');
      // console.log(`专利宝返回：${JSON.stringify(result)}`);   
      const shareInfo = {
        title: `${collegeName}的专利简报`,
        icon: `${req.protocol}://${req.hostname}/img/cnuip-logo.png`,
        desc: `${collegeName}的专利数据统计`
      }
      res.render('store', {
        result: result,
        icon: '/img/cnuip-logo.png',
        title: `${collegeName}的专利简报`,
        shareInfo: shareInfo
      });
    }
  });
}


//下载跳转页
exports.download = function (req, res) {
  res.render('download');
}

//微信认证
exports.wxVerify = function (req, res) {
  const file = path.resolve(__dirname, '../public/file/MP_verify_Iol1tt1WWUjUeHjr.txt');
  res.download(file);
}

//个人微信认证
exports.wxVerifyPersonal = function (req, res) {
  const file = path.resolve(__dirname, '../public/file/MP_verify_BE4R6ga7CPDthQIH.txt');
  res.download(file);
}

//获取微信配置
exports.getWxConfig = async function (req, res) {
  const url = req.body.url;
  const wxConfig = await wechatService.getWxConfig(url).catch(err => {
    console.error(err);
  });
  res.send({
    wxConfig: wxConfig,
  });
}

//见证人
exports.observer = function (req, res) {
  res.render('observer');
}
exports.observerSuccess = function (req, res) {
  res.render('observerSuccess');
}
exports.saveName = function (req, res) {
  const name = req.body.name;
  observerService.observerNums(name).then(
    (value) => {
      var result = { status: 'true', number: value, name: name }
      res.json(result);
    }
  ).catch(
    err => {
      console.error(err);
    }
  );
}


//苏富特见证人
exports.sftObserver = function (req, res) {
  res.render('sftObserver');
}
exports.sftObserverSuccess = function (req, res) {
  res.render('sftObserverSuccess');
}
exports.sftSaveName = function (req, res) {
  const name = req.body.name;
  observerService.observerNums(name, true).then(
    (value) => {
      var result = { status: 'true', number: value, name: name }
      res.json(result);
    }
  ).catch(
    err => {
      console.error(err);
    }
  );
}