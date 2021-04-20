<template>
    <div class="side-bar">
        <div class="emblem mini-title">
            <icon-image address="/assets/site/images/seller-icons/golpino.svg" classes="golpino"></icon-image>
        </div>
        <nav  class="side-nav mt-2 pr-1 pl-1">
<!--            <p class="pl-3">منوهای اصلی</p>-->
            <menu-item :to="{name:'Golpino Seller Dashboard'}" icon="/assets/site/images/seller-icons/home.svg" @activated="handleMenu" :active="activeItem" id="1" title="داشبورد"></menu-item>
            <menu-item v-if="verified" :to="{name:'Golpino Seller Products'}" icon="/assets/site/images/seller-icons/shop.svg" @activated="handleMenu" :active="activeItem" id="2" title="محصولات"></menu-item>
<!--            <menu-item to="/seller" icon="/assets/site/images/seller-icons/layers.svg" @activated="handleMenu" :active="activeItem" id="3" title="سفارشات"></menu-item>-->
<!--            <p class="pl-3 mt-3">جزئیات بیشتر</p>-->
<!--            <menu-item to="/dashboard" icon="/assets/site/images/seller-icons/letter.svg" @activated="handleMenu" :active="activeItem" id="4" title="نظریات مشتریان"></menu-item>-->
<!--            <menu-item to="/dashboard" icon="/assets/site/images/seller-icons/guide.svg" @activated="handleMenu" :active="activeItem" id="5" title="راهنما"></menu-item>-->
<!--            <menu-item :to="{name:'Golpino Seller Financials'}" icon="/assets/site/images/seller-icons/dollar.svg" @activated="handleMenu" :active="activeItem" id="6" title="مالی"></menu-item>-->
            <menu-item :to="{name:'Golpino Seller Settings'}" icon="/assets/site/images/seller-icons/cog.svg" @activated="handleMenu" :active="activeItem" id="7" title="تنظیمات"></menu-item>
            <menu-item icon="/assets/site/images/seller-icons/cog.svg" @activated="handleMenu" :active="activeItem" id="8" title="خروج"></menu-item>
        </nav>
    </div>    
</template>
<script>
import IconImage from './Common/icon'
import MenuItem from './partials/MenuItem'
import Service from '../../utils/seller-service'
export default {
    data:()=>({
        activeItem:"1",
        verified:true
    }),
    components:{
        IconImage,
        MenuItem
    },
    computed:{
        authService:function(){
            return Service(true)
        }
    },
    created(){
        this.authService.receive('seller/base',{},(s,d)=>{
            this.global.setUserName(d.data.name)
        },(s,e)=>{
            
        })
    },
    inject:['global'],
    methods:{
        handleMenu:function(id){
            this.activeItem = id
            if(id == 8){
                this.authService.transmit('seller/logout',{},()=>{
                    this.$cookies.set("Golpino_seller",'')
                    this.global.toggleLogin(false)
                    this.global.setUserType('wanderer')
                    this.$router.push('/golpino-for-vendor')
                },(s,e)=>{
                    if(!s){
                        this.global.alertToggle('درخواست نا موفق')
                    }
                })
            }
        }
    }
}
</script>
<style scoped>
    .side-bar{
        width:100%;
        background-color: #101924;
        color: #fff;
        height:100%;
        font-weight: lighter;
    }

    .emblem{
        width: 100%;
        text-align: center;
        padding: 0.8rem 0px 0.8rem 0px;
    }

    .emblem:hover{
        cursor: pointer;
    }

    .golpino{
        width: 60%;
    }
</style>