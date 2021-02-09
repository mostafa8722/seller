<template>
    <div class="admin-category-page">
        <div class="d-flex justify-content-between mb-3">
            <h3 class="mini-title">تماس با ما</h3>    
        </div>
        <table>
            <tr>
                <th>نام فرستنده</th>
                <th>ایمیل</th>
                <th>شماره تلفن</th>
                <th>تصویر</th>
                <th>متن</th>
            </tr>
            <show-contact v-for="(s,i) in contacts" :key="i" :theContact="s"></show-contact>
        </table>
    </div> 
</template>
<script>
import Service from "../../../utils/admin-service"
import {ref,computed,onMounted,inject} from "@vue/composition-api"
import ShowContact from "./partials/contact"
export default {
    components:{
        ShowContact
    },
    setup(){
        const theService = computed(()=>{
            return Service(false)
        })
        const global = inject('global')
        const contacts = ref(null)
        onMounted(() => {
            theService.value.receive('admin/contact',{},getContacts,errorHandler)
        })

        const errorHandler = (e)=>{

        }
        const getContacts = (status,data) => {
            contacts.value = data.data
        }

        const failedReq = (e) => {
            global.alertToggle('درخواست نا موفق!')
        }

        return {contacts}
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