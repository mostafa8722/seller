<template>
    <div class="admin-category-page">
        <div class="d-flex justify-content-between mb-3">
            <h3 class="mini-title">فاصله ها</h3>    
            <router-link :to="{name:'Golpino Add Distances Page'}"><button class="purple-btn">افزودن</button></router-link>
        </div>
        <table>
            <tr>
                <th>از</th>
                <th>تا</th>
                <th>ابزار</th>
            </tr>
            <show-distance @deleteMe="remove" v-for="(d,i) in distances" :key="i" :theDistance="d" ></show-distance>
        </table>
    </div> 
</template>
<script>
import Service from "../../../utils/admin-service"
import {ref,computed,onMounted,inject} from "@vue/composition-api"
import ShowDistance from "./partials/distance"
export default {
    components:{
        ShowDistance
    },
    setup(){
        const theService = computed(()=>{
            return Service(false)
        })
        const global = inject('global')
        const distances = ref(null)
        onMounted(() => {
            
            theService.value.receive('admin/distance',{},getDistances,errorHandler)
        })

        const errorHandler = (e)=>{

        }
        const getDistances = (status,data) => {
            distances.value = data.data
        }

        const remove = (id) => {
            theService.value.remove('admin/distance/' + id,{},successfullReq,failedReq)
        }

        const successfullReq = (s,d) => {
            if(s == 200){
                global.alertToggle('درخواست موفقیت آمیز بود!')
                theService.value.receive('admin/distance',{},getDistances,errorHandler)
            }
        }

        const failedReq = (e) => {
            global.alertToggle('درخواست نا موفق!')
        }

        return {distances,remove}
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