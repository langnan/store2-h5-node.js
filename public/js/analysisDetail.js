$(function(){
    //获取图表数据
    var data = $('.topTitle').data('obj')
    //总体评分
    if(data.patentValue){
        var myChart1 = echarts.init(document.getElementById('totalChart'));
        option1 = {
            title: {
                text: '总体评分',
                left: 'center',
                top: 'bottom' ,
                textStyle:{
                    fontSize:12,
                    color:'#666666',
                },
              },
            tooltip: {
                formatter: "{a} <br/>{b} : {c}%"
            },
            series: [{
                name: '',
                type: 'gauge',
                center: ['50%', '60%'], // 默认全局居中
                radius: '80%',
                axisLine: {
                    show: false,
                    lineStyle: { // 属性lineStyle控制线条样式
                        color: [
                            [parseFloat(data.patentValue), '#7876cf'],
                            [1, '#e1e1e1']
                        ],
                        width: 15
                    }
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                pointer: {
                    show: false,
                    length: '0',
                    width: '0'
                },
                detail: {
                    formatter: '{value}分',
                    offsetCenter: [0, '5%'],
                    color:'#2e3159',
                    fontSize:18
                },
                data: [{
                    value: (parseFloat(data.patentValue)*100).toFixed(2),
                    label: {
                        textStyle: {
                            fontSize: 10
                        }
                    }
                }]
            
            }]
        };
        myChart1.setOption(option1);
    } else{
        "暂无数据"
    }
    
    //价值统计    
   
        var myChart2 = echarts.init(document.getElementById('classify'));
        var baifenbi = [data.legalValue, data.economicValue, data.technologicalValue];
        var grayBar = [1, 1, 1];
        var xingm = ['法律价值', '经济价值', '技术价值'];
        var myColor = ['#70c6ab', '#cec175', '#7876cf'];
        option2 = {
            grid:{
                x:58,
                y:10,
                x2:5,
                y2:10,
               
            },

            xAxis: [{
                    show: false,
                },
                //由于下边X轴已经是百分比刻度了,所以需要在顶部加一个X轴,刻度是金额,也隐藏掉
                {
                    show: false,
                }
            ],
            yAxis: {
                type: 'category',
                axisLabel: {
                    show: true, //让Y轴数据不显示
                    textStyle:{
                        color:"#333333"
                    }
                },
                itemStyle: {

                },
                axisTick: {
                    show: false, //隐藏Y轴刻度
                },
                axisLine: {
                    show: true, //隐藏Y轴线段
                    lineStyle:{
                        color:'#ccc',
                        
                    }
                },
                data: xingm,
                max:1.5
            },
            series: [
                //背景色--------------------我是分割线君------------------------------//
                {
                    show: true,
                    type: 'bar',
                    barGap: '-100%',
                    barWidth: '60%', //统计条宽度 
                    itemStyle: {
                        normal: {
                            color: '#e1e1e1'
                        },
                    },
                    z: 1,
                    data: grayBar,
                },
                //蓝条--------------------我是分割线君------------------------------//
                {
                    show: true,
                    type: 'bar',
                    barGap: '-100%',
                    barWidth: '60%', //统计条宽度
                    itemStyle: {
                        normal: {
                            color: function(params) {
                                var num = myColor.length;
                                return myColor[params.dataIndex % num]
                            },
                        }
                    },
                    max: 1,
                    label: {
                        normal: {
                            show: true,
                            textStyle: {
                                color: '#fff', //百分比颜色
                            },
                            position: 'inside',
                            formatter: function(data) {
                                return (baifenbi[data.dataIndex] * 100).toFixed(2) + '分';
                            },
                        }
                    },
                    labelLine: {
                        show: false,
                    },
                    z: 2,
                    data: baifenbi,
                },
            ]
        };
        myChart2.setOption(option2);
  
        window.onresize = function(){
            myChart1.resize();
            myChart2.resize();
        }
})