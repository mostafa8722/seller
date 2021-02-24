<template>
    <div class="admin-category-page">
        <div class="d-flex justify-content-between mb-3">
            <h3 class="mini-title">زمان ها</h3>    
            <router-link :to="{name:'Golpino Add Delivery Time Page'}"><button class="purple-btn">افزودن</button></router-link>
        </div>
        <table>
            <tr>
                <th>زمان شروع</th>
                <th>زمان پایان</th>
                <th>ابزار</th>
            </tr>
            <show-time @deleteMe="remove" v-for="(d,i) in times" :key="i" :theTime="d" ></show-time>
        </table>
    </div> 
</template>
<script>
import Service from "../../../utils/admin-service"
import {ref,computed,onMounted,inject} from "@vue/composition-api"
import ShowTime from "./partials/deliveryTime"
export default {
    components:{
        ShowTime
    },
    setup(){
        const theService = computed(()=>{
            return Service(false)
        })
        const global = inject('global')
        const times = ref(null)
        onMounted(() => {
            theService.value.receive('admin/preorder/time',{},getTimes,errorHandler)
        })

        const errorHandler = (e)=>{

        }
        const getTimes = (status,data) => {
            if(status == 200)
            times.value = data.data
        }

        const remove = (id) => {
            theService.value.remove('admin/preorder/time/' + id,{},successfullReq,failedReq)
        }

        const successfullReq = (s,d) => {
            if(s == 200){
                global.alertToggle('درخواست موفقیت آمیز بود!')
                theService.value.receive('admin/preorder/time',{},getTimes,errorHandler)
            }
        }

        const failedReq = (e) => {
            global.alertToggle('درخواست نا موفق!')
        }

        return {times,remove}
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