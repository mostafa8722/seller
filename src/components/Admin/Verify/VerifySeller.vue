<template>
    <div class="container p-5">
        <div class="container summary">
            <h3 class="tNormal">سفارشات</h3>
            <div class="search-section">
                <custom-input kind="text" container="mini-title ml-5 mt-5" classes="mini-title mr-2" v-bind:theModel.sync="userMobile" label="جستجوی کاربر" placeholder="شماره موبایل"></custom-input>
                <button class="purple-btn" @click="searchUserOrders">جستجو</button>
            </div>
            <div v-if="theUser != null" class="user-details pt-2 d-flex justify-content-start">
                <p class="mini-title tNormal ml-2">نام کاربر:</p>
                <p class="mini-title">{{theUser.full_name}}</p>
            </div>
            <table class="mt-2">
                <tr>
                    <th>شماره سفارش</th>
                    <th>نام فروشگاه</th>
                    <!-- <th>جمع کل</th>
                    <th>تخفیف</th> -->
                    <th>آدرس</th>
                    <th>هزینه ارسال</th>
                    <th>قابل پرداخت</th>
                    <th>وضعیت</th>
                    <th>گزینه ها</th>
                    <th>مشاهده</th>
                </tr>
                <shop-request></shop-request>
            </table>
        </div>
    </div>
</template>
<script>
import { computed, onMounted, ref} from "@vue/composition-api"
import ShopRequest from './partials/RequestSummery'
import Service from '../../../utils/service'
import CustomInput from '../../Common/CustomInput'
export default {
    components:{
        ShopRequest,
        CustomInput
    },
    setup(){
        const orders = ref(null)
        const userMobile = ref({value:null,valid:true})
        const theUser = ref(null)
        const theService = computed(()=>{
            return Service(false)
        })

        onMounted(()=>{
            getAllOrders()
        })

        const getAllOrders = ()=>{
            theService.value.receive('admin/order',{},(s,d)=>{
                if(s==200){
                    orders.value = d.data
                }
            },(s,e)=>{
                
            })
        }

        const searchUserOrders = () => {
            theService.value.receive('admin/user/search?mobile=' + userMobile.value.value,{},(s,d)=>{
                if(s==200){
                    if(d.data != []){
                        getUserOrders(d.data.id)
                        theUser.value = d.data
                    }
                }
            },(s,e)=>{
                
            })
        }

        const getUserOrders = (id) => {
            theService.value.receive('admin/user/' + id +'/order', {} ,(s,d)=>{
                if(s == 200){
                    orders.value = d.data
                }
            })
        }

        const acceptOrder = (id)=>{
            let f = new FormData
            f.append('status',1)
            theService.value.transmit('admin/order/'+id ,f,(s,d)=>{
                alert('با موفقیت ثبت شد')
            },
            (s,e)=>{

            })
        }

        const denyOrder = (id)=>{
            let f = new FormData
            f.append('status',0)
            theService.value.transmit('admin/order/'+id ,f,(s,d)=>{
                alert('سفارش لغو شد!')
            },
            (s,e)=>{

            })
        }


        return {orders,userMobile,acceptOrder,denyOrder,searchUserOrders,theUser}
    }
}
</script>
<style scoped>
.summary{
    background-color: #fff;
    font-size: 0.9rem;
    font-weight: lighter;
    min-height: 50vh;
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
    width: 25%;
    padding:0.5rem 1rem 0.5rem 1rem;
}
</style>