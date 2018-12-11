const path = require('path');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const expressStatusMonitor = require('express-status-monitor');
const wechatService = require('./services/WechatService');

/**
 * 初始化微信服务
 */
// wechatService.init().catch(err => {
//   console.error(err);
// }) 

/**
 * controllers
 */
const homeController = require('./controllers/home');

const storeController = require('./controllers/store2');
const appController = require('./controllers/app');

// const storeSciCon = require('./services/sciService');

/**
 * server
 */
const app = express();

app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(expressStatusMonitor());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

/**
 * routes
 */

app.get('/', homeController.index);
//http://localhost:8080/statistics/bag?college=南京理工大学&name=胡文斌
app.get('/statistics/bag', homeController.bagStatistics);
//http://localhost:8080/statistics/bag/summary?college=南京理工大学&name=胡文斌
app.get('/statistics/bag/summary', homeController.bagStatistics);
//http://localhost:8080/statistics/store?college=南京理工大学
app.get('/statistics/store', homeController.storeStatistics);
//http://localhost:8080/statistics/store/summary?college=南京理工大学
app.get('/statistics/store/summary', homeController.storeStatistics);
//下载跳转页
app.get('/download', homeController.download);
//微信公众号
app.post('/wxConfig', homeController.getWxConfig);
app.get('/MP_verify_Iol1tt1WWUjUeHjr.txt', homeController.wxVerify);
app.get('/statistics/bag/MP_verify_Iol1tt1WWUjUeHjr.txt', homeController.wxVerify);
app.get('/statistics/store/MP_verify_Iol1tt1WWUjUeHjr.txt', homeController.wxVerify);
//个人
app.get('/MP_verify_BE4R6ga7CPDthQIH.txt', homeController.wxVerifyPersonal);
app.get('/statistics/bag/MP_verify_BE4R6ga7CPDthQIH.txt', homeController.wxVerifyPersonal);
app.get('/statistics/store/MP_verify_BE4R6ga7CPDthQIH.txt', homeController.wxVerifyPersonal);

//见证人页面
app.get('/observer', homeController.observer);
app.get('/observerSuccess', homeController.observerSuccess);
app.post('/observer/name', homeController.saveName);

//苏富特见证人页面
app.get('/sftobserver', homeController.sftObserver);
app.get('/sftobserverSuccess', homeController.sftObserverSuccess);
app.post('/sftobserver/name', homeController.sftSaveName);

/**
 * store2.0 H5
 */
app.get('/patentDetail', storeController.patentDetail);
app.get('/getQuoteList', storeController.getQuoteList);
app.get('/getSimilarityInfo', storeController.getSimilarityInfo);
app.get('/resultDetail', storeController.resultDetail);
app.get('/patentInfoDetail', storeController.patentInfoDetail);
app.get('/analysisDetail', storeController.analysisDetail);
app.get('/knowledgeReport', storeController.knowledgeReport);
app.get('/scientific', storeController.getSciData)

app.get('/agreement', appController.agreement);
app.get('/privacy', appController.privacy);

/**
 * Error Handler.
 */
if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorHandler());
}

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
