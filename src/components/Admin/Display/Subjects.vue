<template>
    <div class="admin-category-page">
        <div class="d-flex justify-content-between mb-3">
            <h3 class="mini-title">موضوع ها</h3>    
            <router-link :to="{name:'Golpino Add Subject Page'}"><button class="purple-btn">افزودن</button></router-link>
        </div>
        <table>
            <tr>
                <th>نام</th>
                <th>ابزار</th>
            </tr>
            <show-subject @deleteMe="remove" v-for="(s,i) in subjects" :key="i" :theSubject="s" ></show-subject>
        </table>
    </div> 
</template>
<script>
import Service from "../../../utils/admin-service"
import {ref,computed,onMounted,inject} from "@vue/composition-api"
import ShowSubject from "./partials/subject"
export default {
    components:{
        ShowSubject
    },
    setup(){
        const theService = computed(()=>{
            return Service(false)
        })
        const global = inject('global')
        const subjects = ref(null)

        onMounted(() => {
            theService.value.receive('admin/contact/subject',{},getSubjects,errorHandler)
        })

        const errorHandler = (s,e)=>{

        }
        const getSubjects = (status,data) => {
            subjects.value = data.data
        }

        const remove = (id) => {
            theService.value.remove('admin/contact/subject/' + id,{},successfullReq,failedReq)
        }

        const successfullReq = (s,d) => {
            if(s == 200){
                global.alertToggle('درخواست موفقیت آمیز بود!')
                theService.value.receive('admin/contact/subject',{},getSubjects,errorHandler)
            }
        }

        const failedReq = (e) => {
            global.alertToggle('درخواست نا موفق!')
        }

        return {subjects,remove}
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