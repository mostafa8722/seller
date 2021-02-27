<template>
    <div class="pt-5 pl-3 pr-3">
        <div class="summary">
            <h3 class="tNormal">کاربران</h3>
            <h5 class="tNormal mt-3 mini-title">تعداد کل :</h5>
            <h5 class="mini-title mr-2 tNormal mt-3">{{users.length}}</h5>
            <div class="search-section">
                <custom-input kind="text" container="mini-title ml-5 mt-5" classes="mini-title mr-2" v-bind:theModel.sync="userMobile" label="جستجوی کاربر" placeholder="شماره موبایل"></custom-input>
                <button class="purple-btn" @click="searchUser">جستجو</button>
                <button class="purple-btn mr-2" @click="showAll">نمایش همه</button>
            </div>
            <table class="mt-2" v-if="searchError == ''">
                <tr>
                    <th class="small-cell">نام</th>
                    <th class="small-cell">تاریخ ثبت نام</th>
                    <th class="small-cell">شماره تلفن</th>
                    <th class="small-cell">تعداد سفارش</th>
                    <th class="small-cell">محله</th>
                    <th class="small-cell">ابزار</th>
                </tr>
                <one-user @goToPanel="goToPanel" v-for="(u,i) in (searchUsers.length>0 ? searchUsers : users)" :key="i" :theUser="u"></one-user>
            </table>
            <div v-else>{{searchError}}</div>
        </div>
    </div>
</template>
<script>
import { computed, onMounted, ref ,inject} from "@vue/composition-api"
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
        const users = ref([])
        const global = inject('global')
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

        const userMobile = ref({value:null,valid:true})
        const searchUsers = ref([])
        const searchError = ref('')

        const searchUser = () => {
            searchError.value = ''
            let x = users.value.filter((u)=>{
                if(u.mobile == userMobile.value.value)
                    return u
                })
            searchUsers.value = x
            if(searchUsers.value.length ==0 ){
                searchError.value = 'کاربری با این مشخصات یافت نشد'
            }
        }

        const showAll = () => {
            searchError.value = ''
            searchUsers.value = []
        }

        const goToPanel = (id) => {
            theService.value.receive('admin/user/return/token/'+id,{},(s,d)=>{
                $cookies.set("Golpino_token",d.data,2147483647)
                global.toggleLogin(true)
                global.setUserType('user')
                let routeData = context.root.$router.resolve({name: 'Golpino Home Page'})
                window.open(routeData.href, '_blank')
            },(s,e)=>{

            })
        }

        return {users,userMobile,searchUsers,searchUser,showAll,searchError,goToPanel}
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