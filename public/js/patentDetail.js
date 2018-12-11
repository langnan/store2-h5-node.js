
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
         console.log($(this),"10")
        if($target.data('id') === 'tab5'){
            var getAn = getUrlParameter('an');
            var quoteUrl = '/getQuoteList?an='+getAn;
            getQuoteData(quoteUrl)
        }
        if($target.data('id') === 'tab6'){
            var getAn = getUrlParameter('an');
            var similarUrl = '/getSimilarityInfo?an='+getAn;
            getByQuoteData(similarUrl)
        }
        $('#wrap').hide();
        $('#btn').addClass('arrow_down')
        $('#btn').trigger("click"); 
        function getQuoteData(url){
            $.ajax({
                url:url,    
                method:'GET',        
                dataType:'json',            
                success:function(data){    
                    var quoteList = "";
                    var byQuoteList = "";
                    if( Object.keys(data).length>0 ){
                         $.each(data.quoteData,function(i,item){   //遍历ul中的li
                           quoteList += "<li class='quoteInfo-1 commonBox'>"
                                            + "<div class='commonSub'>"
                                            +     "<span>申请号</span>"
                                            +     "<span class='val'>"+item.appNo+"</span>"
                                            +     "<span class='isQuote'>引证</span>"
                                            + "</div>"
                                            + "<div class='commonSub'>"
                                            +     "<span>公开号</span>"
                                            +     "<span class='val'>"+item.pubNo+"</span>"
                                            + "</div>"
                                            "<div class='commonSub'>"
                                            +     "<span>标题</span>"
                                            +     "<span class='val'>"+item.title.length>0 ? `${item.title.slice(0.30)}...`:item.title+"</span>"
                                            + "</div>"
                                            "<div class='commonSub'>"
                                            +     "<span>申请人</span>"
                                            +     "<span class='val'>"+item.assigneesName.join('，')+"</span>"
                                            + "</div>"
                                            +"</li>";
                          });
                         $('#quoteCon').html(quoteList);
                         $.each(data.byQuoteData || [],function(i,item){   //遍历ul中的li
                            byQuoteList += "<li class='quoteInfo-1 commonBox'>"
                                            + "<div class='commonSub'>"
                                            +     "<span>申请号</span>"
                                            +     "<span class='val'>"+item.appNo+"</span>"
                                            +     "<span class='isQuote'>被引证</span>"
                                            + "</div>"
                                            + "<div class='commonSub'>"
                                            +     "<span>公开号</span>"
                                            +     "<span class='val'>"+item.pubNo+"</span>"
                                            + "</div>"
                                            "<div class='commonSub'>"
                                            +     "<span>标题</span>"
                                            +     "<span class='val'>"+item.title.length>0 ? `${item.title.slice(0.30)}...`:item.title+"</span>"
                                            + "</div>"
                                            "<div class='commonSub'>"
                                            +     "<span>申请人</span>"
                                            +     "<span class='val'>"+item.assigneesName.join('，')+"</span>"
                                            + "</div>"
                                            +"</li>";
                              });
                             $('#byQuoteCon').html(byQuoteList);
                    }else{
                        $("#tab5").html("<span class='errInfo'>数据暂无!</span>")
                    }
                },
                error: function(obj){
                    alert("return error:"+obj);
                },    
            });
        }
        function getByQuoteData(url){
            $.ajax({
                url:url,    
                method:'GET',        
                dataType:'json',            
                success:function(data){ 
                    console.log(data)   
                    var similarList = "";
                    if( data ){
                         $.each(data.data || [],function(i,item){   //遍历ul中的li
                                similarList += "<li class='similarInfo-1 commonBox'>"
                                            + "<div class='commonSub'>"
                                            +     "<span>申请号</span>"
                                            +     "<span class='val'>"+item.appNo+"</span>"
                                            +     "<span class='isQuote'>"+item.score+"%相似</span>"
                                            + "</div>"
                                            + "<div class='commonSub'>"
                                            +     "<span>公开号</span>"
                                            +     "<span class='val'>"+item.pubNo+"</span>"
                                            + "</div>"
                                            "<div class='commonSub'>"
                                            +     "<span>标题</span>"
                                            +     "<span class='val'>"+item.title.length>0 ? `${item.title.slice(0,20)}...`:item.title+"</span>"
                                            + "</div>"
                                            "<div class='commonSub'>"
                                            +     "<span>申请人</span>"
                                            +     "<span class='val'>"+item.assigneesName.join('，')+"</span>"
                                            + "</div>"
                                            +"</li>";
                          });
                         $('#similarCon').html(similarList);
                            
                    }else{
                        $("#tab6").html("<span class='errInfo'>数据暂无!</span>")
                    }
                },
                error: function(obj){
                    alert("return error:"+obj);
                },    
            });
        }
        function getUrlParameter(sParam) {
            var sPageURL = window.location.search.substring(1),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;
        
            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');
        
                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
                }
            }
        };
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

