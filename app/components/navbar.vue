<template>
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <div class="navbar-header">
                    <a class="navbar-brand" href="#">
                        <img v-if="is_ycs" src="https://staticwww.maimiaotech.com/syb/images/logo_yun_c3d78c8.png">
                        <img v-else src="https://staticwww.maimiaotech.com/syb/images/logo_zs_yun_90c73d2.png">
                    </a>
                </div>
            </div>

            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li :class="{active:is_active}"><a href="#">推广计划 <span class="sr-only">(current)</span></a></li>
                    <li><a href="#">报表</a></li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">工具 <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="#">自动创意</a></li>
                            <li><a href="#">重复词过滤</a></li>
                            <li><a href="#">促销管理</a></li>
                        </ul>
                    </li>
                </ul>
                <form class="navbar-form navbar-left">
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Search" v-model="username">
                    </div>
                </form>
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="#">你好，{{username}}</a></li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">帮助 <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="#">常见问题</a></li>
                            <li><a href="#">使用手册</a></li>
                            <li><a href="#">增值服务</a></li>
                            <li role="separator" class="divider"></li>
                            <li><a href="#">麦苗学堂</a></li>
                        </ul>
                    </li>
                </ul>
            </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
    </nav>
</template>

<script>
    export default {
        data () {
            return {
                is_active:true,
                username:'刘欣',
                is_ycs:true
            }
        }
    }
</script>

<style>
    body{
        background-color: #f7f7f7;
        font-size: 12px;
    }
    ul {
        padding-left: 0
    }
    li {
        list-style: none;
    }
    .navbar-default {
        background-color:#294171;
        border:none
    }
    .navbar-default .navbar-nav>.active>a, .navbar-default .navbar-nav>.active>a:focus, .navbar-default .navbar-nav>.active>a:hover,.navbar-default .navbar-nav>.open>a, .navbar-default .navbar-nav>.open>a:focus, .navbar-default .navbar-nav>.open>a:hover {
        color:#fff;
        background-color:#21345a
    }
    .navbar-default .navbar-nav>li>a, .navbar-default .navbar-nav>li>a:focus, .navbar-default .navbar-nav>li>a:hover {
        color:#fff;
        font-size:18px
    }
    .navbar-brand{
        padding:5px 15px
    }
</style>

<!-- 使用了  v-model v-bind  v-if v-else 指令， 数据驱动 特性 -->


<!-- 过程：定义了View Model ViewModel
其中ViewMidel 使用了 data el 属性 -->