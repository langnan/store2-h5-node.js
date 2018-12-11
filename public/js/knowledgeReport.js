

$(function () {
   //获取图表数据
    var dataAva = $('#valAsessment').data('ava');
    var headerData = $('.middleTitles').data('header');
    // console.log(headerData)
    var dataSci = [];
     //科研方向
    //获取无效专利统计图表    
    var myChart4 = echarts.init(document.getElementById('sciChart'));
    $.ajax({
        method:'GET',
        url:'/scientific',
        timeout:30000,
        beforeSend:function(xhr){
            xhr.setRequestHeader("X-Request-UserId",Number(headerData["userid"])),
            xhr.setRequestHeader("X-Request-UserName",headerData["username"])
        },
        success:function(res){
            dataExpert = res.expertsNum;
            dataEnterprise = res.companiesNum;
            if(dataExpert){
                $(".expert").text(dataExpert)
            }
            if(dataEnterprise){
                $(".enterprise").text(dataEnterprise)
            }
            if(res.scientificList.length>0){
                
                // var myChart4 = echarts.init(document.getElementById('sciChart'));
                
                option4 = {
                    title: {
                      text: '科研方向',
                      subtext:'占比',
                      x: 'center',
                      y: 'center' ,
                      textStyle:{
                          fontSize:12,
                          color:'#8184dd',
                      },
                      subtextStyle:{
                        fontSize:12,
                        color:'#8184dd',
                        fontWeight:600
                    }
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter:  '{b}|{d}% '
                    },
                    
                    calculable: true,
                    series: [
                      {
                        color: ['#53a8dc','#dc7e39','#e6bd50'],
                        type: 'pie',
                        radius: ['40%', '70%'],
                        center: ['50%', '50%'],
                        roseType: 'radius',
                        data: res.scientificList,
                        label:{
                            normal:{
                                formatter: '{b}|{d}% '
                            }
                        }
                      }
                    ]
                  }
                myChart4.setOption(option4);  
                // window.onresize = function(){
                //     myChart4.resize();
                // }   
            }
        },  
        error:function(){
            console.log("数据请求失败!")
        }
    })

    //获取价值评估统计图表
    var myChart1 = echarts.init(document.getElementById('valAsessment'));
        // 指定图表的配置项和数据
        option1 = {
            series: [{
                color:["#8f82bc"],
                name: '访问来源',
                type: 'pie',
                radius: ['60%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: true,
                        position: 'center'
                    },
                    // emphasis: {
                    //     show: false,
                    //     textStyle: {
                    //         fontSize: '30',
                    //         fontWeight: 'bold'
                    //     }
                    // }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [{
                        value: dataAva,
                        name: dataAva,
                        label: {
                            normal: {
                                textStyle: {
                                    fontSize: '20',
                                    fontWeight: 'bold',
                                    color:'#e2b748'
                                },
                                // padding: [10, 0, 0, 0]
                            }
                        },
                        itemStyle:{
                            normal:{
                                borderWidth:10,
                                borderColor:{
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0, color: '#df833d' // 0% 处的颜色
                                    }, {
                                        offset: 1, color: '#f1af66' // 100% 处的颜色
                                    }],
                                }    
                            }
                        },
                    },
                    {
                        value: 100-dataAva,
                        name: '价值评估(分)',
                        label: {
                            normal: {
                                 textStyle: {
                                    fontSize: '14',
                                    color:'#8f82bc',
                                    fontWeight: 'bold'
                                },
                                padding: [35, 0, 0, 0]
                            }
                        },
                    }
                ]
            }]
        };
        
        myChart1.setOption(option1);
    window.onresize = function(){
        myChart1.resize();
        myChart4.resize();
    }    
});   