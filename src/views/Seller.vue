<template>
    <div class="page">
        <div class="mini-title side" v-if="global.user.value.isLoggedIn">
            <side-bar></side-bar>
        </div>
        <div class="" :class="(!global.user.value.isLoggedIn ? 'full-width' : 'mini-title main')">
            <seller-header v-if="global.user.value.isLoggedIn"></seller-header>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import SideBar from '../components/Seller/SideBar'
import IconImage from '../components/Common/icon'
import SellerHeader from '../components/Seller/Header'
export default {
    components:{
        SideBar,
        IconImage,
        SellerHeader
    },
    data:()=>({
        showModal:false
    }),
    inject:['global'],
    methods:{
        toggleModal:function(){
            this.showModal=!this.showModal
        }
    }
}
</script>
<style>
html{
    background-color: #101924;
}
button:hover{
    cursor: pointer;
}

.page{
    width: 100%;
    padding: 0px;
    position: relative;
    min-height: 100vh;
    overflow-x: hidden;
}

.mini-title{
    display: inline-block;
    margin: 0px;
}

.block{
    display: block;
}

.full-width{
    width:100% !important;
}

.side{
    width: 15vw;
    height: 100%;
    margin:0px;
    position: absolute;
    top:0px;
    right:0px;
}

.main{
    width: 85vw;
    margin: 0px;
    background-color: #EEEEEE;
    position: relative;
    top:0px;
    right:15vw;
}

.menu-section{
    background:none;
    width: 100%;
    height: auto;
    padding: 10px 20px 0px 20px;
}

.purple-btn{
    background-color: #772CE8;
    color: #fff;
    border:none;
    border-radius: 5px;
    box-shadow: 1px 1px 5px 0px rgba(119, 44 , 232, 0.6);
    width: 100px;
    font-size: 0.8rem;
    font-weight: lighter;
    padding-top: 8px;
    padding-bottom: 8px;
}

.white-btn{
    background-color: #fff;
    border:1px solid #000;
    color:#000;
    border-radius: 5px;
    width: 100px;
    font-size: 0.8rem;
    font-weight: lighter;
    padding-top: 8px;
    padding-bottom: 8px;
}

.new-order{
    text-align: center;
    padding:1rem 4rem 1rem 4rem;
}

.notif-icon{
    background-color:  rgba(119, 44 , 232, 0.1);
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: inline-block;
    padding-top: 10px;
}


/* SCROLLBAR */
* {
  scrollbar-width: thin;
  scrollbar-color: gray transparent;
}

/* Works on Chrome/Edge/Safari */
*::-webkit-scrollbar {
  width: 2px;
}
*::-webkit-scrollbar-track {
  background: transparent;
}
*::-webkit-scrollbar-thumb {
  background-color: gray;
  border-radius: 20px;
  border: 3px solid transparent;
}

</style>