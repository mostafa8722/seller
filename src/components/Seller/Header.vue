<template>
    <div class="panel-header">
        <div class="d-flex justify-content-between">
<!--            <div class="tools">-->
<!--                <icon-image address="/assets/site/images/seller-icons/plus.svg" class="mid"></icon-image>-->
<!--                اضافه کردن جدید-->
<!--                <icon-image address="/assets/site/images/seller-icons/expand.svg" class="mid"></icon-image>-->
<!--            </div>-->
            <div class="info d-flex align-items-center">
                <div class="mini-title notif">
                    <icon-image address="/assets/site/images/seller-icons/bell.svg" classes="big"></icon-image>
                    <span class="notif-number d-flex align-items-centerc justify-content-center">
                        <p class="mini-title p-0 m-0">1</p>
                    </span>
                </div>
                <div class="user-locker mini-title mr-2 ml-2">
                    <img src="/assets/site/images/popular.png" class="user-image" alt="icon">
                </div>
                <p class="mini-title user-title p-0 m-0">
                    {{(global.user.value.name != "") ? global.user.value.name : 'نام فروشگاه'}}
                </p>
                <icon-image address="/assets/site/images/seller-icons/expand.svg" classes="small ml-2"></icon-image>
            </div>
        </div>
    </div>
</template>
<script>
import iconImage from './Common/icon'
export default {
    components:{
        iconImage
    },
    inject:['global']
}
</script>
<style  scoped>
    .panel-header{
        width: 100%;
        background-color: #fff;
        box-shadow: 0px 1px 10px 0px rgba(127, 127,127,0.15);
        padding:15px 18px 15px 18px;
        font-size: 0.85rem;
        font-weight: lighter;
        height:10vh;
    }

    .notif{
        position: relative;
    }

    .notif span{
        width : 14px;
        height: 14px;
        background-color: #000;
        border-radius: 50%;
        position: absolute;
        right:-4px;
        top:-7px;
        color:#fff;
    }

    .notif span p{
        font-size: 0.7rem;
        font-weight: lighter;
    }

    .user-locker{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        overflow: hidden;
        border:1px solid #772CE8;
    }

    .user-image{
        width: 100%;
    }
</style>