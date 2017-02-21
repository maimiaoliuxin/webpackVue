<template>
    <table class="table table-bordered">
        <caption v-html="title"></caption>
        <thead>
            <th style="width:25%">计划名称</th>
            <th style="width:15%">日限额</th>
            <th style="width:25%">投放平台</th>
            <th style="width:10%">计划状态</th>
            <th style="width:25%">操作优化</th>
        </thead>
        <tbody>
            <tr v-for="campaign in campaignsPlatform" id="{{campaign.campaign_id}}">
                <td>{{campaign.title}}</td>
                <td>{{campaign.budget / 100 + ' 元'}}</td>
                <td v-html="campaign.platform ?'计算机<br/>移动' : '计算机'"></td>
                <td>{{campaign.online_status === 'online' ?'推广中' : '暂停中'}}</td>
                <td>
                    <button class="btn btn-default" v-on:click="changeOnlineStatus">{{campaign.online_status === 'online' ?'暂停推广' : '推广计划'}}</button>
                </td>
            </tr>
        </tbody>
    </table>
    <div v-for="n in evenNumbers">{{n.id}}</div>
</template>

<script>
    export default {
        data () {
            return {
                title:'<h1>推广计划管理</h1>',
                campaigns:[
                    {
                        "title": "省油宝规则A",
                        "enum": "A",
                        "mode_type": 0,
                        "campaign_id": 3328400,
                        "platform": "all",
                        "online_status": "online",
                        "budget": 33,
                        "type": "auto"
                    },
                    {
                        "title": "API测试-省油宝长尾B",
                        "enum": "A",
                        "mode_type": 0,
                        "campaign_id": 3367690,
                        "platform": "all",
                        "online_status": "online",
                        "budget": 500,
                        "type": "hot"
                    },
                    {
                        "online_status": "online",
                        "title": "省油宝全能A",
                        "budget": 100,
                        "enum": "",
                        "type": "not in",
                        "mode_type": "",
                        "campaign_id": 3442512
                    },
                    {
                        "online_status": "offline",
                        "title": "推荐抢排名，测试，勿动-省油宝长尾A",
                        "budget": 30,
                        "enum": "",
                        "type": "not in",
                        "mode_type": "",
                        "campaign_id": 3367748
                    },
                    {
                        "online_status": "online",
                        "title": "省油宝全能B1217",
                        "budget": 30,
                        "enum": "",
                        "type": "not in",
                        "mode_type": "",
                        "campaign_id": 35024129
                    },
                    {
                        "online_status": "online",
                        "title": "省油宝长尾A5441",
                        "budget": 30,
                        "enum": "",
                        "type": "not in",
                        "mode_type": "",
                        "campaign_id": 33415659
                    },
                    {
                        "online_status": "offline",
                        "title": "API测试",
                        "budget": 500,
                        "enum": "",
                        "type": "not in",
                        "mode_type": "",
                        "campaign_id": 36305653
                    },
                    {
                        "online_status": "online",
                        "title": "实时 好的-省油宝长尾A",
                        "budget": 30,
                        "enum": "",
                        "type": "not in",
                        "mode_type": "",
                        "campaign_id": 33415658
                    }
                ]
            }
        },
        computed:{
            campaignsPlatform (){
                return this.campaigns.filter((campaign) => {
                    return campaign.budget >=30
                })
            },
        },
        methods: {
            changeOnlineStatus (e) {
                let campaign = this.campaigns[$(e.target).parents('tr').index()]
                campaign.online_status = campaign.online_status === 'online' ? 'offline' : 'online'
            }
        }
    }
</script>

<style>
    .main {
        padding:10px;
    }
    #table_wrap h1 {
        font-size:26px;
        font-weight: 700
    }
    th {
        background-color:#f0f0f0;
    }
</style>
<!-- 使用了 v-for v-on v-html 指令-->
<!-- 过程：定义了View Model ViewModel
其中ViewMidel 使用了 data el methods computed 属性 方法 -->