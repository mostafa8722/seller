<template>
    <div class="container">
        <div class="container mt-3 settings">
            <div class="right-bar">
                <div class="menu-right pt-3">
                    <menu-item v-for="(item,i) in menuItems" :id="i" :key="i" :theItem="item"></menu-item>
                </div>
            </div>
            <div class="main-section p-0 pt-4 ">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import {ref,onMounted,computed,inject,watch,reactive} from "@vue/composition-api"
import RoundedImage from '../../Common/roundImage'
import ImageIcon from '../../Common/icon'
import CustomField from './partials/SettingsField'
import CustomInput from '../../Common/CustomInput'
import MenuItem from './partials/RightMenuItems2'
import Service from "../../../utils/seller-service"
import AddressModal from "../../Common/AddressModal"
import $ from 'jquery'
export default {
    components:{
        RoundedImage,
        ImageIcon,
        CustomField,
        CustomInput,
        MenuItem,
        AddressModal
    },
    setup(){        
        const authService = computed(()=>{
            return Service(true)
        })

        const menuItems = ref([{text:'اطلاعات اولیه',icon:'user.svg',active:true,to:'shop-info'},{text:'زمان آماده سازی',icon:'black-bell.svg',active:false,to:'preparation-time'},{text:'ساعات کاری',icon:'activity.svg',active:false,to:'shop-hours'},{text:'محدوده ی خدمات',icon:'lock.svg',active:false,to:'shop-ranges'},{text:'هزینه ی ارسال',icon:'shield.svg',active:false,to:'shop-delivery-price'},{text:'تصاویر',icon:'dollar.svg',active:false,to:'shop-images'}])

        
        return {menuItems}
    }
}
</script>
<style>
.settings{
    background-color: #fff;
    font-size: 0.85rem;
    font-weight: lighter;
    position: relative;
}

.section-divider{
    background-color: #E8E8E8;
    border-radius: 4px;
    padding: .2rem 1rem .2rem 1rem;
}

.section-divider p{
    margin: 0px;
}

.deactive{
    background: none !important;
    border:none !important;
    color: #000 !important;
    font-weight: normal !important;
}

.right-bar{
    border-left: 1px solid rgba(127, 127, 127, 0.3);
    width:25%;
    display: inline-block;
    margin:0px;
    position: absolute;
    top:0px;
    right:0px;
}

.mid-right{
    border-top: 1px solid rgba(127, 127, 127, 0.3);
    border-bottom: 1px solid rgba(127, 127, 127, 0.3);
}

.main-section{
    width:100%;
    display: inline-block;
    margin:0px;
    position: relative;
    top: 0px;
    right:27%;
    min-height: 100vh;
}

.bank-form{
    background-color: rgba(127, 127, 127, 0.1);
    padding: 0.1rem 2rem 2rem 2rem;
}

.bank-tab-active{
    background-color: rgba(127, 127, 127, 0.1);
}

.bank-tab{
    text-align: center;
    padding: 1rem 1rem 0px 1rem;
}

#bankTab1{
    border-top-left-radius: 20px;
}
#bankTab2{
    border-top-right-radius: 20px;
}

.bank-tab:hover{
    cursor: pointer;
}

.seller-logo-locker img{
    width: 50%;
}
</style>
