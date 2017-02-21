<template>
    <table class="report-sum-thead">
        <tbody>
            <tr class="sum-tr">
                <td rowspan="2" class="td-first">
                        <select id="table_rpt_range" class="input form-control" v-on:change="countRptSum()">
                            <option value="0" selected="selected">今日实时</option>
                            <option value="7">过去一周数据</option>
                        </select>
                </td>
                <td data-type="cost" class="td-current" v-on:click="changeType">总花费</td>
                <td data-type="impressions"  v-on:click="changeType">总展现</td>
                <td data-type="pay"  v-on:click="changeType">总成交</td>
                <td data-type="click"  v-on:click="changeType">点击量</td>
                <td data-type="cpc"  v-on:click="changeType">CPC</td>
                <td data-type="roi"  v-on:click="changeType">ROI</td>
            </tr>
            <tr class="sum-tr">
                <td data-type="cost" class="td-current"  v-on:click="changeType">{{(Math.round(sum_rpt_data.cost) / 100).toFixed(2) + '元'}}</td>
                <td data-type="impressions"  v-on:click="changeType">{{sum_rpt_data.impressions}}</td>
                <td data-type="pay" v-on:click="changeType">{{(sum_rpt_data.pay / 100).toFixed(2) + '元'}}</td>
                <td data-type="click"  v-on:click="changeType">{{sum_rpt_data.click}}</td>
                <td data-type="cpc"  v-on:click="changeType">{{(sum_rpt_data.cpc / 100).toFixed(2) + '元'}}</td>
                <td data-type="roi" v-on:click="changeType">{{sum_rpt_data.roi.toFixed(2)}}</td>
            </tr>
        </tbody>
    </table>
    <div class="account-money">
        <span class="bd-title">剩余金额：</span>
        <span id="account_balance" class="less-money">-1.9</span>
        <br>
        <a href="https://subway.simba.taobao.com/#!/account/recharge" class="btn recharge" target="_blank">立即充值</a>
    </div>
    <div class="report-chart">
        
    </div>
</template>

<script>

    import Highcharts from 'highcharts'
    import base from '../js/base'
    import {Highcharts_COLORS,rpt_data, rpt_data_7,RPT_SORT_INDEX, seriesBaseConfig, seriesTotalConfig, seriesHGConfig, specialType,KEY_ARR} from '../data/index_rpt'
    let range_global = 0
    
    let legendItemClick = (self) => {
        self.setVisible(!self.visible)
        var series = self.chart.series
        var temp_series = []
        for(var i = 0; i < series.length; i++){
            if(series[i].visible){
                temp_series.push(series[i])
            } else if(series[i].yAxis.userOptions.title.text){
                series[i].yAxis.update({
                    title:{text:''}
                })
            }
        }
        if(temp_series.length){
            for(var i = 0; i < temp_series.length - 1; i++){
                if(temp_series[i].yAxis.userOptions.labels.enabled){
                    temp_series[i].yAxis.update({
                        labels:{enabled : false},
                        title:{text:''}
                    })
                }
            }
            temp_series[temp_series.length - 1].yAxis.update({
                labels:{enabled : true},
                title:{text:range_global ? temp_series[temp_series.length - 1].name : temp_series[temp_series.length - 1].name.substring(4)}
            })
        }
    }
    export default {
        data () {
            return {
                rpt_data:rpt_data,
                sum_rpt_data:{
                    'cpc':0,
                    'impressions':0,
                    'cost':0,
                    'pay':0,
                    'click':0,
                    'roi':0
                },
                rpt_data_7:rpt_data_7,
                CURRENT_TYPE:'cost'
            }
        },
        methods: {
            countRptSum (){
                console.log(66666666666)
                range_global = $('#table_rpt_range').val() - 0 
                let data = range_global ? this.rpt_data_7 : this.rpt_data
                $.each(this.sum_rpt_data,value => this.sum_rpt_data[value] = 0)
                if(range_global){
                    for(let item of data){
                        for(let key in item){
                            if($.inArray(key, KEY_ARR) > -1){
                                this.sum_rpt_data[key] += item[key]
                            }
                        }
                    }
                } else {
                    for(let key in data){
                        if($.inArray(key, KEY_ARR) > -1){
                            let values = data[key].today
                            for(let value of values){
                                this.sum_rpt_data[key] += (value ? value : 0)
                            }
                        }
                    }
                }
                this.insertHighchart()
            },
            insertHighchart (){
                let rpts = $.extend(true, {},range_global ? this.rpt_data_7 : this.rpt_data)
                const dayNames = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六");
                let xDate = [], seriesData = {}, container = $('.report-chart')[0]
                this.CURRENT_TYPE = $('.sum-tr .td-current')[0] ? $('.sum-tr .td-current').attr('data-type') : this.CURRENT_TYPE
                if(range_global){
                    seriesData[this.CURRENT_TYPE] = []
                    for(let j = 0; j < range_global; j++) {
                        for(var key in seriesData) {
                            seriesData[key][j] = parseFloat(rpts[range_global - j - 1][key], 10);
                        }
                        xDate[j] =  dayNames[new Date(rpts[range_global - j - 1].date).getDay()];//syb非实时
                    }
                } else {//syb实时
                    seriesData = rpts[this.CURRENT_TYPE]
                    $.extend(seriesData, {wx_yestoday: rpts['wx_' + this.CURRENT_TYPE].yestoday, wx_today: rpts['wx_' + this.CURRENT_TYPE].today})
                    xDate = rpts.date_list
                }
                this.setSumChart(container, seriesData, xDate);
            },
            setSumChart (container, seriesData, xDate){
                var seriesArr = [], i = 0;
                var colors = Highcharts_COLORS, types, dashStyles, seriesConfig;
                if(range_global){
                    seriesConfig = seriesBaseConfig
                } else {
                    types = (this.CURRENT_TYPE === 'cpc' || this.CURRENT_TYPE === 'roi') ? ['line', 'line', 'line', 'line'] : ['line', 'area', 'line', 'area']
                    dashStyles = ['dash', '', 'dash', '']
                    seriesConfig = $.extend({}, seriesTotalConfig, seriesHGConfig)
                }
                var current_type_index = $('.sum-tr td[data-type="' + this.CURRENT_TYPE + '"]').index()
                for(var key in seriesData) {
                    var options = {
                        name: range_global ? seriesConfig[key].title : seriesConfig[this.CURRENT_TYPE + '_' + key].title,
                        color: Highcharts_COLORS[(current_type_index - 1) * 4 + i],
                        type: types ? types[i] : '',
                        dashStyle:dashStyles ? dashStyles[i] : '',
                        seriesArr: seriesArr,
                        i:i
                    }
                    this.formatSeriesData(seriesData[key], xDate, options)
                    i++
                }
                //排序当日数据排前面
                seriesArr.sort(function(a, b){
                    return a.name.localeCompare(b.name)
                })
                //图例的设置
                var legend =  {
                    layout: 'vertical',
                    padding:10,
                    align: 'left',
                    verticalAlign: 'top',
                    floating: true,//图表可与图例重合
                    x: 60,
                    y: range_global ? 0 : -20,
                    symbolHeight: 2,
                    symbolWidth: 36
                }
                var chart_set = {
                    renderTo: container,
                    height: 300,
                    marginBottom: 50,
                    backgroundColor: 'rgba(0,0,0,0)'
                }
                var xAxis = range_global ? {categories:xDate} : {
                    type: 'datetime',
                    labels: {
                        formatter: function() {
                            return  !range_global ? Highcharts.dateFormat('%H:%M', this.value + 8 * 3600 * 1000) : this.value;
                        },
                    },
                }
                var j = 0, yAxisArr = []
                for(var key in seriesConfig){
                    var color = colors[4*j]
                    yAxisArr.push({
                        title: {
                            text: '',
                            style: {
                                color: color
                            },
                            margin:5,
                        },
                        labels: {
                            style: {
                                color: color
                            },
                            enabled: this.CURRENT_TYPE === key//控制y轴是否显示
                        },
                    })
                    j++
                }
                yAxisArr[RPT_SORT_INDEX[this.CURRENT_TYPE]].title.text = seriesBaseConfig[this.CURRENT_TYPE].title
                var chart = new Highcharts.Chart({
                    chart: chart_set,
                    title: {
                        text: null
                    },
                    credits: {
                        enabled: false
                    },
                    xAxis:xAxis,
                    yAxis: yAxisArr,
                    tooltip: {
                        crosshairs: true,
                        shared: true,
                        style: {
                            color: '#fff',
                            padding: '8px',
                            opacity:0.9,
                        },
                        backgroundColor:'#5e5b53',
                        borderColor:'#5e5b53',
                        borderRadius: 3,
                        formatter: function(a) {
                            var index;
                            for(var i = 0; i < xDate.length; i++){
                                if(xDate[i] === this.x){
                                    index = i;
                                    break
                                }
                            }
                            var data_html = range_global ? this.x + ' ：<br/>' : base.formatDate(this.x, 'hhmm') + '：<br/>'
                            for(var i = 0; i < this.points.length; i++){
                                data_html += ('<span style="color:' + this.points[i].series.color + '">'  + this.points[i].series.name + ' ：' + Math.round(this.points[i].y * 100) / 100 + '</span><br/>');
                            }
                            return data_html;
                        }
                    },
                    plotOptions: {
                        series: {
                            connectNulls:true//断点续连
                        },
                        lineWidth: 4,
                        states: {
                            hover: {
                                lineWidth: 5
                            }
                        },
                    },
                    legend: legend,
                    series: seriesArr
                });
            },
            formatSeriesData (seriesData_item, xDate, options){
                if(seriesData_item){
                    for(var k  = 0; k < seriesData_item.length; k++){
                       if(!(seriesData_item[k] && seriesData_item[k].marker)){
                            var y = seriesData_item[k]
                            seriesData_item[k] = {
                                y: y === null ? null : ($.inArray(this.CURRENT_TYPE, specialType) >= 0 ? (y / 100).toFixed(2) - 0 : y),
                                marker: {
                                    enabled:true,
                                    symbol: 'circle',
                                    lineWidth:'1px',
                                }
                            }
                            if(!range_global){
                                var today = new Date(), hour_minute = xDate[k].split(':')
                                $.extend(seriesData_item[k], {x: new Date(today.getFullYear(), today.getMonth(), today.getDate(), hour_minute[0] - 0, hour_minute[1] - 0,0)})
                            }
                        }
                    }
                } else {//点击顶部新增以已存储7天数据
                    if(options && options.extra_data){
                        seriesData_item = []
                        for(var k = options.extra_data.length - 1; k >= 0; k--){
                            var y = options.extra_data[k][this.CURRENT_TYPE]
                            seriesData_item.push({
                                y: y === null ? null : ($.inArray(this.CURRENT_TYPE, specialType) >= 0 ? (y / 100).toFixed(2) - 0 : y),
                                marker: {
                                    enabled:true,
                                    symbol: 'circle',
                                    lineWidth:'1px',
                                }
                            })
                        }
                    }
                }
                if(options){
                    var i = options.i || 0
                    var seriesArr = options.seriesArr || []
                    var type = options.type || 'line'
                    var dashStyle = options.dashStyle || ''
                    var color = options.color || Highcharts_COLORS[0]
                    var name = options.name || ''
                    seriesArr[i] = {
                        name: name,
                        data: seriesData_item,
                        color: color,
                        marker:{
                            enabled:false,
                        },
                        yAxis: RPT_SORT_INDEX[this.CURRENT_TYPE],
                        events:{
                            legendItemClick:function(e){
                                e.preventDefault()
                                legendItemClick(this)
                            }
                        }
                    }
                    if(type){
                        $.extend(seriesArr[i], {type: type})
                        type === 'area' && $.extend(seriesArr[i], {fillOpacity:0.1})
                    }
                    if(dashStyle){
                        $.extend(seriesArr[i], {dashStyle: dashStyle})
                    }
                    // i++;
                }
            },
            changeType (e){
                this.CURRENT_TYPE = $(e.target).attr('data-type')
                console.log(this.CURRENT_TYPE)
                $(e.target).parents('tbody').find('.td-current').removeClass('td-current').end().find('td[data-type="' + this.CURRENT_TYPE + '"]').addClass('td-current')
                this.insertHighchart()
            }
        },
        attached (){
            console.log(33333333)
            //this.$emit('#table_rpt_range',"投注站");
            this.countRptSum()
        },
    }
</script>

<style>
    #rpt_highchart_wrap {
        /*margin-right: 296px;
        border-right: 0;
        height: 415px;
        border: 1px solid #ccc;
        background-color: #fff;
        padding:0 15px;*/
        height: 415px;
        border: 1px solid #ccc;
        border-right: none;
        background-color: #fff;
        padding: 0 15px;
        width: 84%;
        float: left;
    }
    .report-sum-thead {
        width: 85%;
        float: left;
        margin: 0 0 30px 0;
        overflow: visible;
    }
    .sum-tr {
        background-color: #e8e8e8;
    }
    .sum-tr td {
        border-right: 2px solid #fff;
        color: #444;
        padding: 5px 20px;
        width: 13%;
        font-size: 14px;
    }
    .sum-tr td.td-current {
        background-color: #62a1ff;
        color: #fff;
        position: relative;
    }
    .sum-tr td.td-first  {
        padding: 5px;
        margin: 0 auto;
        text-align: center;
        width: 15%;
        background-color: #fff;
    }
    .account-money {
        width: 13%;
        float: right;
        margin-top: 10px;
        font-size:12px;
    }
    #account_balance {
        color:#ff6600;
    }
    .account-money .btn.recharge {
        color:#fff;
        background-color: #e01500;
        border: none;
        padding: 6px 20px;
        font-size: 12px;
        margin-top:4px;
    }
    .account-money:hover .btn.recharge {
        background-color:#e01500;
        color:#fff;
    }
</style>