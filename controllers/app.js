const request = require('request');

exports.agreement = async function (req, res) {
  res.render('app/agreement');
}

exports.privacy = async function (req, res) {
  res.render('app/privacy');
}
