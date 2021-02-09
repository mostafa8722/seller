<template>
    <div class="pt-5 pl-3 pr-3">
        <div class="summary">
            <h3 class="tNormal">کاربران</h3>
            <h5 class="tNormal mt-3 mini-title">تعداد کل :</h5>
            <h5 class="mini-title mr-2 tNormal mt-3">{{users.length}}</h5>
            <table class="mt-2">
                <tr>
                    <th class="small-cell">نام</th>
                    <th class="small-cell">تاریخ ثبت نام</th>
                    <th class="small-cell">شماره تلفن</th>
                    <th class="small-cell">تعداد سفارش</th>
                    <th class="small-cell">محله</th>
                </tr>
                <one-user v-for="(u,i) in users" :key="i" :theUser="u"></one-user>
            </table>
        </div>
    </div>
</template>
<script>
import { computed, onMounted, ref} from "@vue/composition-api"
import OneUser from './partials/user'
import Service from '../../../utils/admin-service'
import CustomInput from '../../Common/CustomInput'
import jalalim from 'jalali-moment'
export default {
    components:{
        OneUser,
        CustomInput
    },
    setup(props,context){
        const users = ref(null)

        const theService = computed(()=>{
            return Service(false)
        })

        onMounted(()=>{
            theService.value.receive('admin/user',{},(s,d)=>{
                users.value = d.data
                users.value.map((u)=>{
                    u.date = jalalim(u.register_time).locale('fa').format('YYYY/MM/DD')
                })
            },(s,e)=>{

            })
        })

        return {users}
    }
}
</script>
<style scoped>
.summary{
    background-color: #fff;
    font-size: 0.9rem;
    font-weight: lighter;
    min-height: 50vh;
    /* width: 100vw; */
}

.search-section{
    border-bottom: 1px solid rgba(127,127,127,0.2);
    padding-bottom: 0.5rem;
}

table{
    border-collapse: separate;
    border-spacing: 0px;
    width: 100%;
    table-layout: auto;
    text-align: center;
}

td{
    border: 1px solid rgba(127,127,127,0.2);
    white-space: nowrap;
    padding-right: 1rem;
}

tr{
    width: 100%;
}

.big-cell{
    width: 75%;
    padding:0.5rem 1rem 0.5rem 1rem;
}

.small-cell{
    width: 5%;
    padding:0.5rem 1rem 0.5rem 1rem;
}
</style>