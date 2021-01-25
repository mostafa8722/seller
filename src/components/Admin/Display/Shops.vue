<template>
    <div class="admin-category-page">
        <div class="d-flex justify-content-between mb-3">
            <h3 class="mini-title">تأیید فروشگاه</h3>    
        </div>
        <table>
            <tr>
                <th>شماره</th>
                <th>نام فروشگاه</th>
                <th>شماره تلفن</th>
                <th>ابزار</th>
            </tr>
            <show-shops @verifyMe="verify" v-for="(s,i) in shops" :key="i" :theShop="s"></show-shops>
        </table>
    </div> 
</template>
<script>
import Service from "../../../utils/admin-service"
import {ref,computed,onMounted,inject} from "@vue/composition-api"
import ShowShops from "./partials/shop"
export default {
    components:{
        ShowShops
    },
    setup(){
        const theService = computed(()=>{
            return Service(false)
        })
        const global = inject('global')
        const shops = ref(null)
        onMounted(() => {
            theService.value.receive('admin/seller',{},getShops,errorHandler)
        })

        const errorHandler = (e)=>{

        }
        const getShops = (status,data) => {
            shops.value = data.data
        }

        const verify = (id) => {
            theService.value.transmit('admin/seller/' + id,{},successfullReq,failedReq)
        }

        const successfullReq = (s,d) => {
            if(s == 200){
                global.alertToggle('درخواست موفقیت آمیز بود!')
                theService.value.receive('admin/service',{},(s,d)=>{
                    if(s == 200)
                    theService.value.receive('admin/seller',{},getShops,errorHandler)
                },errorHandler)
            }
        }

        const failedReq = (e) => {
            global.alertToggle('درخواست نا موفق!')
        }

        return {shops,verify}
    }
}
</script>
<style scoped>
.admin-category-page{
    padding:3rem 3rem 1rem 3rem;
}
table{
    width: 100%;
    border:1px solid rgb(218, 218, 218);
}
th{
    border:1px solid rgb(218, 218, 218);
}
tr{
    width:100%;
    border:1px solid rgb(218, 218, 218);
    text-align: center;
}
</style>