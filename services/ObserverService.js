var mysql = require('mysql');
var pool = mysql.createPool({
  host: 'rm-uf6p7j82ei5675ba3o.mysql.rds.aliyuncs.com',
  user: 'pcityall',
  password: 'PcityAll123!',
  database: 'publicity'
});
exports.observerNums = function (name, isSft = false) {
  const table = isSft ? 'observer_info_sft' : 'observer_info';

  return new Promise(function (resolve, reject) {
    pool.getConnection(function (err, connection) {
      var addSql = `INSERT INTO ${table}(name) VALUES(?)`;
      var addParams = [name]
      connection.query(addSql, addParams, function (err, result) {
        if (err) {
          console.log('[INSERT ERROR] - ', err.message);
          reject(error);
        } else {
          var id = result.insertId;
          console.log('insert id is ' + id);
          var querySql = `select count(*) as num from ${table} where id < ${id}`;
          connection.query(querySql, function (error, results, fields) {
            if (error) {
              console.log('[query ERROR] - ', err.message);
              reject(error);
            } else {
              var nums = 0;
              console.log('log The solution is: ', results[0].num);
              if (results[0].num == null) {
                nums = 500;
                console.log("log The nums is: " + nums);
              } else {
                nums = results[0].num + 500;
                console.log("log The nums is: " + nums);
              }
              resolve(nums);
            }
            // And done with the connection.
            connection.release();
            // Don't use the connection here, it has been returned to the pool.
          });
        }
      })
    })
  })
}
/*
var nums = observerNums('陶化伦').then(function(value){console.log("log The lastest nums is: " + value);});
var nums = observerNums('陶化伦').then(function(value){console.log("log The lastest nums is: " + value);});
*/

