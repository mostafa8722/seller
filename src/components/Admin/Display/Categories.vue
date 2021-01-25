<template>
    <div class="admin-category-page">
        <div class="d-flex justify-content-between mb-3">
            <h3 class="mini-title">دسته بندی ها</h3>    
            <router-link :to="{name:'Golpino Add Categories Page'}"><button class="purple-btn">افزودن</button></router-link>
        </div>
        <table>
            <tr>
                <th>نام</th>
                <th>Parent</th>
                <th class="half-width">تصویر</th>
                <th>ابزار</th>
            </tr>
            <show-category @deleteMe="remove" v-for="(c,i) in categories" :key="i" :theCategory="c" ></show-category>
        </table>
    </div> 
</template>
<script>
import Service from "../../../utils/admin-service"
import {ref,computed,onMounted,inject} from "@vue/composition-api"
import ShowCategory from "./partials/category"
export default {
    components:{
        ShowCategory
    },
    setup(){
        const theService = computed(()=>{
            return Service(false)
        })
        const global = inject('global')
        const categories = ref(null)
        onMounted(() => {
            theService.value.receive('admin/category',{},getCategories,errorHandler)
        })
        const errorHandler = (e)=>{
            
        }
        const getCategories = (status,data) => {
            categories.value = data.data
            categories.value.map((c)=>{
                if(c.parent_id != null){
                    categories.value.map((cc)=>{
                        if(c.parent_id == cc.id)
                            c.parent_name = cc.name
                    })
                }
            })
        }

        const remove = (id) => {
            theService.value.remove('admin/category/' + id,{},successfullReq,failedReq)
        }

        const successfullReq = (s,d) => {
            if(s == 200){
                global.alertToggle('درخواست موفقیت آمیز بود!')
                theService.value.receive('admin/category',{},getCategories,errorHandler)
            }
        }

        const failedReq = (e) => {
            global.alertToggle('درخواست نا موفق!')
        }

        return {categories,remove}
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