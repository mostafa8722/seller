<template>
    <div class="admin-category-page">
        <div class="d-flex justify-content-between mb-3">
            <h3 class="mini-title">تخفیف ها</h3>    
            <router-link :to="{name:'Golpino Add Discount Page'}"><button class="purple-btn">افزودن</button></router-link>
        </div>
        <table>
            <tr>
                <th>نام</th>
                <th>مقدار</th>
                <th>درصد</th>
                <th>تعداد</th>
                <th>حداقل</th>
                <th>حداکثر</th>
                <th>زمان شروع</th>
                <th>زمان پایان</th>
                <th>ابزار</th>
            </tr>
            <show-discount @deleteMe="remove" v-for="(d,i) in discounts" :key="i" :theDiscount="d" ></show-discount>
        </table>
    </div> 
</template>
<script>
import Service from "../../../utils/admin-service"
import {ref,computed,onMounted,inject} from "@vue/composition-api"
import ShowDiscount from "./partials/discount"
export default {
    components:{
        ShowDiscount
    },
    setup(){
        const theService = computed(()=>{
            return Service(false)
        })
        const global = inject('global')
        const discounts = ref(null)
        onMounted(() => {
            theService.value.receive('admin/discount',{},getDiscounts,errorHandler)
        })

        const errorHandler = (e)=>{

        }
        const getDiscounts = (status,data) => {
            if(status == 200)
            discounts.value = data.data
        }

        const remove = (id) => {
            theService.value.remove('admin/discount/' + id,{},successfullReq,failedReq)
        }

        const successfullReq = (s,d) => {
            if(s == 200){
                global.alertToggle('درخواست موفقیت آمیز بود!')
                theService.value.receive('admin/discount',{},getDiscounts,errorHandler)
            }
        }

        const failedReq = (e) => {
            global.alertToggle('درخواست نا موفق!')
        }

        return {discounts,remove}
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