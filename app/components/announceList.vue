<template>
    <div class="banner">
        <ul class="silder_bg">
             <li class="bg_li" v-bind:id="item._id" v-html="item.message_settings.content.show_html" v-for="item in data" v-on:mouseenter="sliderMouseenter" v-on:mouseleave="sliderMouseleave">
             </li>
        </ul>
        <ol class="bg_nav">
            <li class="icon" v-for="item in data"></li>
        </ol>
    </div>
</template>

<script>
    const time_step = 3000
    let picTimer, index = 0
    let showBgs = (index, old_index,target) => {
        if(target.find('.silder_bg')[0]){
            let left = target.find('.silder_bg').css('left').slice(0, -2) - 0
            left = left ? left : 0
            if(!index || old_index + 1 !== index){
                target.find('.silder_bg li:eq(' + index + ')').clone().insertAfter(target.find('.silder_bg li:eq(' + old_index + ')'))
            }
            target.find('.silder_bg').animate({left: (left - 274) + 'px'},time_step ? time_step / 5 : 1000, function(){
                if(!index || old_index + 1 !== index){
                    target.find('.silder_bg').css('left',index * (-274))
                    target.find('.silder_bg li:eq(' + (old_index + 1) + ')').remove()
                }
                target.find(".bg_nav li").removeClass('hover').eq(index).addClass("hover");
            })
            target.find(".bg_nav li").removeClass('hover').eq(index).addClass("hover");
        }
    }
    export default {
        // data () {
        //     return {}
        // },
        props:['data'],
        methods:{
            sliderMouseenter (e) {
                clearInterval(picTimer)
                let $self = $(e.target)
                let index  = $self.index()
                let $target = $('#announce')
                let old_index = $target.find(".bg_nav li.hover").index();
                old_index = old_index && old_index >= 0 ? old_index : 0
                $target.find(".bg_nav li").removeClass('hover')
                $target.find('.bg_nav li:eq(' + index + ')').addClass('hover')
                if(index !== old_index){
                    $target.find('.silder_bg').stop(true, true)
                    showBgs(index, old_index, $target)
                }
            },
            sliderMouseleave(e){
                picTimer = setInterval(() => {
                    let $target = $('#announce')
                    let len = this.data.length
                    if($target.find('.silder_bg')[0]){
                        index++;
                        if(index === len){
                            index = 0;
                            showBgs(index, len - 1, $target)
                        } else {
                            showBgs(index, index - 1, $target)
                        }
                    }
                }, time_step ? time_step : 5000)
            }
        },
        created (){
            this.sliderMouseleave()
        }
    }
</script>

<style>
    #announce {
        padding: 14px 12px;
        position: absolute;
        overflow: hidden;
        height: 230px;
    }
    #announce .banner {
        overflow: hidden;
        width: 274px;
    }
    #announce .silder_bg {
        width: 1000000px;
        position: relative;
        clear: both;
        overflow: hidden;
        margin-bottom: 0;
    }
    #announce .silder_bg li {
        float: left;
        width: 274px;
        height: 216px;
    }
    #announce a {
        color: #333;
        text-decoration: none;
    }
    #announce img.gg-bg {
        width: 100%;
        height: 150px;
        margin-bottom: 10px
    }
    .bg_nav {
        margin: 0 auto 0 81px;
        position: absolute;
        top: 143px;
    }
    .bg_nav .icon {
        background-color: #000;
        border-radius: 40px;
        display: inline-block;
        height: 10px;
        vertical-align: middle;
        width: 10px;
        opacity: 0.3;
        margin: 0 2px;
    }
    .bg_nav .icon.hover {
        background-color: #fff;
        opacity: 1;
    }
</style>