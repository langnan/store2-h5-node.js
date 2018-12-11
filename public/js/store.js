$(function () {
    //初始化fullpage
    $('#fullpage').fullpage({
        verticalCentered: false
    });

    var $modalBg = $('.search-modal-bg');

    //弹出modal
    $('.modal-btn').on('click', function () {
        $modalBg.fadeIn(500);
    });

    //点击黑色背景隐藏modal
    $modalBg.on('click touchstart', function (event) {
        var $target = $(event.target);
        console.log(event.target);
        if ($target.closest('.search-modal-container').length <= 0) {
            $modalBg.fadeOut(500);
        }
    });

    //点击close按钮隐藏modal
    $('.close-btn').click(function () {
        $modalBg.fadeOut(500);
    });

    $('.search-btn').click(function () {
        var text = $('.search-input').val();
        if (!text || text.length <= 0) {
            alert('请输入高校名称！');
        } else {
            location.replace('/statistics/store?college=' + text);
        }
    });
});

//绘制饼图
(function () {
    var pieColors = ['#500077', '#05044F', '#010080'];

    function getTotal(arr) {
        var j,
            myTotal = 0;

        for (j = 0; j < arr.length; j++) {
            myTotal += (typeof arr[j] === 'number') ? arr[j] : 0;
        }

        return myTotal;
    }

    function drawPieChart(canvasId) {
        var i,
            canvas = document.getElementById(canvasId),
            pieData = canvas.dataset.value.split(',').map(function (x) { return parseInt(x, 10) }),
            halfWidth = canvas.width * .5,
            halfHeight = canvas.height * .5,
            ctx = canvas.getContext('2d'),
            lastend = 0,
            myTotal = getTotal(pieData);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (i = 0; i < pieData.length; i++) {
            ctx.fillStyle = pieColors[i];
            ctx.beginPath();
            ctx.moveTo(halfWidth, halfHeight);
            ctx.arc(halfWidth, halfHeight, halfHeight, lastend, lastend + (Math.PI * 2 * (pieData[i] / myTotal)), false);
            ctx.lineTo(halfWidth, halfHeight);
            ctx.fill();
            lastend += Math.PI * 2 * (pieData[i] / myTotal);
        }
    }

    drawPieChart('canPie');
})();