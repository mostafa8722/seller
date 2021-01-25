<template>
    <div class="admin-category-page">
        <div class="d-flex justify-content-between mb-3">
            <h3 class="mini-title">تگ ها</h3>    
            <router-link :to="{name:'Golpino Add Tags Page'}"><button class="purple-btn">افزودن</button></router-link>
        </div>
        <table>
            <tr>
                <th>نام</th>
                <th>ابزار</th>
                <th>تصویر</th>
            </tr>
            <show-tag @deleteMe="remove" v-for="(t,i) in tags" :key="i" :theTag="t" ></show-tag>
        </table>
    </div> 
</template>
<script>
import Service from "../../../utils/admin-service"
import {ref,computed,onMounted,inject} from "@vue/composition-api"
import ShowTag from "./partials/tag"
export default {
    components:{
        ShowTag
    },
    setup(){
        const theService = computed(()=>{
            return Service(false)
        })
        const global = inject('global')
        const tags = ref(null)
        onMounted(() => {
            theService.value.receive('admin/tag',{},getTags,errorHandler)
        })

        const errorHandler = (e)=>{

        }
        const getTags = (status,data) => {
            tags.value = data.data
        }

        const remove = (id) => {
            theService.value.remove('admin/tag/delete/' + id,{},successfullReq,failedReq)
        }

        const successfullReq = (s,d) => {
            if(s == 200){
                global.alertToggle('درخواست موفقیت آمیز بود!')
                theService.value.receive('admin/tag',{},getTags,errorHandler)
            }
        }

        const failedReq = (e) => {
            global.alertToggle('درخواست نا موفق!')
        }

        return {tags,remove}
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