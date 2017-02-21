import Highcharts from 'highcharts'
import Vue from 'vue'
import navbar from '../components/navbar'
import rptHighcharts from '../components/rptHighcharts'
import campaignList from '../components/campaignList'
import userCenter from '../components/userCenter'

new Vue({
    el: '#navbar',
    components: { navbar }
})

new Vue({
    el: '#rpt_highchart_wrap',
    components: { rptHighcharts }
})

new Vue({
    el: '#user_center',
    components: { userCenter }
})

new Vue({
    el: '#table_wrap',
    components: { campaignList }
})

