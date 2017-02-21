<template>
    <div class="side-block syb-block">
        <ul class="shop-info">
            <li>
                <img v-bind:src="shop_img" class="shop-img">
                <p>
                    <a href="/integral" target="_blank"><span class="current-score">{{score}}</span>分</a>
                </p>
            </li>
            <li class="ar">
                <p class="shop-name" title="麦苗时尚精品店">{{shop_name}}</p>
                <p>优化天数：<span>{{days}} 天</span></p>
                <p>剩余天数：<span>{{getDays()}} 天</span></p>
            </li>
            <li class="sign-in">
                <a v-on:click="signIn()" class=" icon-sign-in" title="签到送积分">签到</a>
                <a href="/renew_upgrade/re" class="btn btn-renew" target="_blank">续费升级</a>
            </li>
        </ul>
        <ul class="optimize-info">
            <li>自动花费 <p>{{Math.round(cost) / 100}}</p></li>
            <li>自动成交额 <p>{{Math.round(pay) / 100}}</p></li>
            <li>优化操作数 <p>{{op_count}}</p></li>
        </ul>
        <div class="panel-info" id="announce">
            <announce-list v-bind:data="announce_list"></announce-list>
        </div>
    </div>
</template>
<script>
    import AnnounceList from '../components/announceList'
    import {announce_list} from '../data/announce_data'
    export default {
        data () {
            return {
                "pay": 4000,
                "days": 4,
                "shop_name": "麦苗时尚精品店",
                "cost": 2000,
                "op_count": 4634,
                "shop_img": "http://logo.taobao.com/shop-logo/5a/9e/T1nkXiFhNgXXb1upjX.jpg",
                "deadline": {
                    "$date": 1503100800000
                },
                "score":1226,
                announce_list:announce_list
            }
        },
        methods:{
            getDays () {
                return Math.ceil((this.deadline.$date - 8 * 3600000 - (new Date()).getTime()) / 3600000 / 24)
            },
            signIn (){
                this.score += 5
            }

        },
        components:{AnnounceList}
    }
</script>

<style>
    #user_center {
        float:right;
        width: 16%;
        border:1px solid #ccc;
        height: 415px;
        background-color: #fff;
        position: relative;
    }
    .shop-info .shop-img {
        width: 50px;
        height: 50px;
    }
    .syb-block .shop-info {
        height: 104px;
        padding: 14px 10px;
        margin-bottom: 0
    }
    .shop-info > li {
        float: left;
        list-style:none;
    }
    .shop-info > li:first-child {
        margin-left: 10px;
    }
    .shop-info p {
        margin-bottom: 9px
    }
    .shop-info > li:first-child p {
        text-align: center;
        margin-top: 7px;
    }
    .shop-info > li:first-child p a {
        text-decoration: underline;
    }
    .shop-info > li:nth-child(2) {
        text-align: right;
    }
    .shop-info .shop-name {
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 138px;
    }
    .shop-info > .sign-in {
        float: right;
        position: relative;
    }
    .shop-info .icon-sign-in {
        display: block;
        background-color: #62a1ff;
        border-radius: 2px;
        border: 3px solid #96bef9;
        width: 55px;
        height: 45px;
        line-height: 39px;
        font-size: 14px;
        color: #fff;
        text-align: center;
        font-style: normal;
        cursor: pointer;
    }
    .shop-info .btn-renew {
        width: 55px;
        height: 18px;
        border: 1px solid #62a1ff;
        margin-top: 11px;
        line-height: 16px;
        padding: 0;
        border-radius: 2px;
        font-size: 10px;
        color: #62a1ff;
        text-align: center;
    }
    .syb-block .optimize-info {
        height: 70px;
        background-color: #f5fafe;
        padding: 14px 10px;
        border-top: 1px solid #e2e2e2;
        border-bottom: 1px solid #e2e2e2;
        margin-bottom: 0
    }
    .syb-block .optimize-info li {
        float: left;
        width: 33.33333333333333%;
        text-align: center;
        list-style:none;
    }
    .syb-block .optimize-info li p {
        margin-top: 3px;
        font-size: 14px;
        border-right: 1px solid #ccc;
    }
    .syb-block .optimize-info li:last-child p {
        border:none;
    }
</style>