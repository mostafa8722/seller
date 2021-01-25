<template>
    <div class="admin-category-page">
        <div class="d-flex justify-content-between mb-3">
            <h3 class="mini-title">خصوصیت ها</h3>    
            <router-link :to="{name:'Golpino Add Attributes Page'}"><button class="purple-btn">افزودن</button></router-link>
        </div>
        <custom-input kind="dropDown" :selectItems="categories" label="دسته بندی" container="full-width mt-2" v-bind:theModel.sync="theCategory" classes="block full-width" placeholder="دسته بندی را انتخاب کنید"></custom-input>
        <custom-input kind="dropDown" :selectItems="publicAttrs" label="Parent" container="full-width mt-2" v-bind:theModel.sync="theAttr" classes="block full-width" placeholder="دسته بندی را انتخاب کنید"></custom-input>
        <table class="mt-4">
            <tr>
                <th>نام</th>
                <!-- <th>Parent</th>
                <th>دسته بندی</th> -->
                <th>ابزار</th>
            </tr>
            <show-attrs @deleteMe="remove" v-for="(a,i) in attrs" :key="i" :theAttr="a" ></show-attrs>
        </table>
    </div> 
</template>
<script>
import Service from "../../../utils/admin-service"
import {ref,computed,onMounted,inject,watch} from "@vue/composition-api"
import ShowAttrs from "./partials/attribute"
import CustomInput from "../../Common/CustomInput"
export default {
    components:{
        ShowAttrs,
        CustomInput
    },
    setup(){
        const theService = computed(()=>{
            return Service(false)
        })
        const global = inject('global')
        const attrs = ref(null)
        const publicAttrs = ref(null)
        const categories = ref(null)
        onMounted(() => {
            theService.value.receive('admin/attribute/public',{},(s,data)=>{
                if(s == 200){
                    attrs.value = data.data
                    publicAttrs.value = data.data
                    publicAttrs.value.map((p)=>{
                        p.value = p.id
                        p.text = p.name
                    })
                }
            },errorHandler)
            theService.value.receive('admin/category',{},getCategories,errorHandler)
        })

        const theCategory = ref({value:null,valid:true})
        const theAttr = ref({value:null,valid:true})
        watch(theAttr.value,(n,o)=>{
            theService.value.receive('admin/attribute/child/' + theAttr.value.value.id,{},getAttrs,errorHandler)
        })

        watch(theCategory.value,(n,o)=>{
            theService.value.receive('admin/attribute/private/' + theCategory.value.value.id,{},getAttrs,errorHandler)
        })

        const getCategories = (status,data) => {
            categories.value = data.data
            categories.value.map((c)=>{
                c.text = c.name
                c.value = c.id
            })
        }

        const errorHandler = (e)=>{

        }
        const getAttrs = (status,data) => {
            attrs.value = data.data
        }

        const remove = (id) => {
            theService.value.remove('admin/attribute/' + id,{},successfullReq,failedReq)
        }

        const successfullReq = (s,d) => {
            if(s == 200){
                global.alertToggle('درخواست موفقیت آمیز بود!')
                theService.value.receive('admin/attribute/public',{},getAttrs,errorHandler)
            }
        }

        const failedReq = (e) => {
            global.alertToggle('درخواست نا موفق!')
        }

        return {attrs,theAttr,publicAttrs,remove,categories,theCategory}
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