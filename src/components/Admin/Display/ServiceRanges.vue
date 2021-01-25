<template>
    <div class="admin-category-page">
        <div class="d-flex justify-content-between mb-3">
            <h3 class="mini-title">محدوده های خدماتی</h3>    
            <router-link :to="{name:'Golpino Add Ranges Page'}"><button class="purple-btn">افزودن</button></router-link>
        </div>
        <table>
            <tr>
                <th>محدوده</th>
                <th>ابزار</th>
            </tr>
            <show-ranges @deleteMe="remove" v-for="(r,i) in ranges" :key="i" :theRange="r" ></show-ranges>
        </table>
    </div> 
</template>
<script>
import Service from "../../../utils/admin-service"
import {ref,computed,onMounted,inject} from "@vue/composition-api"
import ShowRanges from "./partials/serviceRange"
export default {
    components:{
        ShowRanges
    },
    setup(){
        const theService = computed(()=>{
            return Service(false)
        })
        const global = inject('global')
        const ranges = ref(null)
        onMounted(() => {
            
            theService.value.receive('admin/service',{},getRanges,errorHandler)
        })

        const errorHandler = (e)=>{

        }
        const getRanges = (status,data) => {
            ranges.value = data.data
        }

        const remove = (id) => {
            theService.value.remove('admin/service/' + id,{},successfullReq,failedReq)
        }

        const successfullReq = (s,d) => {
            if(s == 200){
                global.alertToggle('درخواست موفقیت آمیز بود!')
                theService.value.receive('admin/service',{},getRanges,errorHandler)
            }
        }

        const failedReq = (e) => {
            global.alertToggle('درخواست نا موفق!')
        }

        return {ranges,remove}
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