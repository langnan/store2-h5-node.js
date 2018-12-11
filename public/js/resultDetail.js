
$(function(){
    $('#tab1').addClass('active').siblings().removeClass('active');
    $('#btn').addClass('arrow_down')
    $('.default').addClass('defaultCss').siblings().removeClass('defaultCss');
    var flag = true;
    $('#btn').click(function(){
        
        if(flag){
            $("#wrap li").each(function(){
                if($('.titleContent').text() === $(this).text()){
                 $(this).css({display:'none'}).siblings().css({display:'block'});
                }
             })
            $('#wrap').slideDown( "slow" );
            $('#btn').addClass('arrow_up').removeClass('arrow_down')
            $("#bg").css({'display':'block'})
            flag = !flag
        }else{
            $('#wrap').hide();   
            $('#btn').addClass('arrow_down').removeClass('arrow_up')
            $("#bg").css({'display':'none'})
            flag = !flag
        }
        

    })
    $("#wrap").click(function(event){
        var $target = $(event.target);
        $('#'+$target.data('id')).addClass('active').siblings().removeClass('active');
        $target.addClass('defaultCss').siblings().removeClass('defaultCss');
        $('.titleContent').text($target.html())
        $("li").each(function(){
           if($target.text() === $(this).text()){
            $(this).css({display:'none'}).siblings().css({display:'block'});
           }
        })
        $('#wrap').hide();
        $('#btn').addClass('arrow_down')
        $('#btn').trigger("click"); 
    })	

    $(document).on("touchmove",function(e) {
        if(e.target.className.indexOf("bgImg") >= 0) {
             e.preventDefault();      
         } else {
             e.stopPropagation();     
         }
     })

     var stickyEl = document.querySelector('#subTitle');
	function fixed(num) {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; 
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 
        if(isAndroid) {
            document.body.onscroll = function(e) {
                var scrollT = document.body.scrollTop;
                if (scrollT > num) {
                    $(stickyEl).addClass('fixed-top');
                }else {
                    $(stickyEl).removeClass('fixed-top');
                }
            };
        }else if(isiOS) {
            $(stickyEl).addClass('sticky');
        }
    }
    fixed(211);
 })

