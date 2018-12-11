$(function () {
  var canvas = document.getElementById('certificate');
  var ctx = canvas.getContext('2d');
  var image = new Image();   // using optional size for image
  image.onload = drawImageOfCanvasSize; // draw when image has loaded
  image.src = '/img/sft-cert.jpg';
  var fontFamily = ' -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif';
  function drawImageOfCanvasSize() {
    canvas.width = image.width;
    canvas.height = image.height;
    var scale = image.width / window.innerWidth;
    var name = getUrlParam('name');
    var number = getUrlParam('number');
    $(".title-middle-text").text("第" + number + "位");
    ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#2d2220';   // 文字填充颜色分  
    ctx.font = 2 * scale * 7 + 'px' + fontFamily;
    ctx.fillText(name, canvas.width * 0.302 - (name.length - 1) * 7 * scale, canvas.height * 0.515);
    ctx.fillText(number, canvas.width * 0.25 - (number.length - 1) * 4 * scale, canvas.height * 0.575);
    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth() + 1;
    var date = myDate.getDate();
    var time = year + '年' + month + '月' + date + '日';
    ctx.fillStyle = '#302623';
    ctx.font = 1 * scale * 7 + 'px' + fontFamily;
    ctx.fillText(time, canvas.width * 0.666, canvas.height * 0.81);
    ctx.stroke();

    $('#certificateImg').attr('src', canvas.toDataURL());
  }
})

function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg);  // 匹配目标参数
  if (r != null) return decodeURI(r[2]); return null; // 返回参数值
} 
