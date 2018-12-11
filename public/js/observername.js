$(function () {
  $(".button").click(function () {
    var reg = new RegExp("^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]){2,4}$");
    var name = $('.name').val();
    if (reg.test($(".name").val())) {
      $.post("/observer/name", { name: name }, function (result) {
        if (result.status === "true") {
          location.href = "/observerSuccess?name=" + result.name + "&number=" + result.number;
        } else {
          console.log("false");
        }
      });
    } else {
      alert('请您输入正确姓名');
    }
  })

})