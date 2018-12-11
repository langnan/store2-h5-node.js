 'use strict'
const Client = require('aliyun-api-gateway').Client;
const client = new Client('25352280','2bbde40fce3283586f72b0609cf16de6');
const request = require('request');
const moment = require('moment');
const path = require('path');

const storeUrlBase = 'http://openapi.cnuip.net/store2P/store2-service-colligate';
const storeResultUrl = 'http://openapi.cnuip.net/store2P/store2-service-result';
const storeCnuipUrl = 'http://openapi.cnuip.net/cnuipP/cnuip2-mservice-article';

/**
 * store2.0 H5
 * **/

 //专利详情

 exports.patentDetail = async function (req,res) {
   const an = req.query.an;
  //  const an = 'CN201711472055.2'
   const query = { an };
   const patentTypeMap = {
      SYXX: '实用新型',
      FMZL: '发明专利',
      FMSQ: '发明授权',
      WGZL: '外观设计',
   };
   async function get() {
    var url = `${storeUrlBase}/v1/patent/detail?an=${an}`;
    var result = await client.get(url, {
      headers: {
        accept: 'application/json'
      }
    });
    if( !(result.result) ){
      res.render('error',{error:'您找的专利详情暂无数据!'});
        return;
    }
    // res.json(result.result)
    res.render('patentDetail', {
        result: result.result,
        patentTypeMap:patentTypeMap,
    });
  }
  get().catch((err) => {
    console.log(err.stack);
  });
 }
 
 //引证
exports.getQuoteList = async function (req, res) {
  const an = req.query.an;
  //  const an = 'CN201711472055.2'
  async function get() {
    var url = `${storeUrlBase}/v1/patent/patentQuoteList?an=${an}`;
    var result = await client.get(url, {
      headers: {
        accept: 'application/json'
      }
    });
    if( !(result.result) ){
      res.render('error',{error:'您找的引证信息暂无数据！'});
        return;
    }
    res.json(result.result)
  }
  
  get().catch((err) => {
    console.log(err.stack);
  });
}

 //相似度
exports.getSimilarityInfo = async function (req, res) {
  const an = req.query.an;
  //  const an = 'CN201711472055.2'
  async function get() {
    var url = `${storeUrlBase}/v1/patent/patentSimilarityInfo?an=${an}`;
    var result = await client.get(url, {
      headers: {
        accept: 'application/json'
      }
    });
    if( !(result.result) ){
      res.render('error',{error:'暂无数据!'});
        return;
    }
    res.json(result.result)
  }
  
  get().catch((err) => {
    console.log(err.stack);
  });
}


//成果详情

 exports.resultDetail = async function (req,res) {
   const patentResultId = req.query.patentResultId;
   const maturityList = [
    {
      id: 1,
      type: 'SAMPLE',
      value: '已有样品',
    },
    {
      id: 2,
      type: 'SMALL_TEST',
      value: '通过小试',
    },
    {
      id: 3,
      type: 'PILOT_TEST',
      value: '通过中试',
    },
    {
      id: 4,
      type: 'BATCH_PRODUCTION',
      value: '可以量产',
    },
  ];
  var filterMaturity = text => {
    let value1 = '';
    maturityList.forEach(ele => {
      if (ele.type === text) {
        const { value } = ele;
        value1 = value;
      }
    });
    return value1;
  };
  async function get() {
    var url = `${storeResultUrl}/v1/patentresult/detail?patentResultId=${patentResultId}`;
    var result = await client.get(url, {
      headers: {
        accept: 'application/json'
      }
    });
    if( !(result.result) ){
      res.render('error',{error:'暂无数据!'});
        return;
    }
    res.render('resultDetail', {
      result: result.result,
      maturity: filterMaturity(result.result.maturity),
      files:result.patentResultAttachmentList,
      labelValueList:result.result.labelValueList
    });
  }
  
  get().catch((err) => {
    console.log(err.stack);
  });
  
 }

//知事详情

exports.patentInfoDetail = async function (req,res) {
  const id = req.query.id;
  async function get() {
    var url = `${storeCnuipUrl}/v1/article/app/detail?id=${id}`;
    var result = await client.get(url, {
      headers: {
        accept: 'application/json'
      }
    });
    if( !(result.result) ){
      res.render('error',{error:'暂无数据!'});
        return;
    }
    res.render('patentInfoDetail', {
      result: result.result.nowArticleVo,
      startTime:moment(result.result.nowArticleVo.startTime).format('YYYY-MM-DD'),
      labels:result.result.nowArticleVo.label.split(','),
      files:result.result.nowArticleVo.articleAttachments
    });
  }
  
  get().catch((err) => {
    console.log(err.stack);
  });

}

//分析详情

exports.analysisDetail = async function (req,res) {
  const an = req.query.an;
  async function get() {
    var url = `${storeUrlBase}/v1/patent/report?an=${an}`;
    var result = await client.get(url, {
      headers: {
        accept: 'application/json'
      }
    });
    if( !(result.result) ){
      res.render('error',{error:'暂无数据!'});
        return;
    }
    const dataObj = {
      patentValue:result.result.patent && result.result.patent.patentValue,
      economicValue:result.result.labels && result.result.labels.economicValue,
      legalValue:result.result.labels && result.result.labels.legalValue,
      technologicalValue:result.result.labels && result.result.labels.technologicalValue
    }
    res.render('analysisDetail', {
      result: result.result,
      dataObj:dataObj
    });
  }
  
  get().catch((err) => {
    console.log(err.stack);
  });

}

//知产报告

exports.knowledgeReport = async function (req,res) {
    const headersInfo = req.query;
    const headers = {
      'X-Request-UserId':Number(headersInfo["userid"]),
      'X-Request-UserName':headersInfo["username"],
      'X-Request-OrganizationId':Number(headersInfo["organizationid"])
    }
    async function get() {
      var url = `${storeUrlBase}/v1/patent/knowledge/report`;
      var result = await client.get(url, {
        headers: {
          accept: 'application/json',
          ...headers,
        }
      });
      if( !(result.result) ){
        res.render('error',{error:'由于您暂无专利，所以无法生成报告。'});
          return;
      }
      const headerData=headersInfo;
      res.render('knowledgeReport', {
        headerData:headerData,
        result: result.result,
        dataAva:result.result.yxPatentValueAvg,
      });
    }
    
    get().catch((err) => {
      res.render('error',{error:'由于您的专利全部失效，所以无法生成报告!'});
    });
}


//调用天弓获取科研方向数据
exports.getSciData = async function (req, res) {
    const headersInfo = req.headers;
    const headers = {
      'X-Request-UserId':Number(headersInfo["x-request-userid"]),
      'X-Request-UserName':headersInfo["x-request-username"]
    }
  async function get() {
    var url = `${storeUrlBase}/scientific`;
    var result = await client.get(url, {
      headers: {
        accept: 'application/json',
        ...headers,
        timeout:30000
      }
    });
    if( !(result.result) ){
      res.render('error',{error:'暂无数据'});
        return;
    }
    res.json(result.result);
  }
  
  get().catch((err) => {
    console.log(err.stack);
  });
}
