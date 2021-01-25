<template>
    <div class="container p-5">
        <div class="container summary">
            <h3 class="tNormal">سفارشات شما</h3>
            <table class="mt-5">
                <tr>
                    <th>شماره سفارش</th>
                    <th>نام فروشگاه</th>
                    <th>جمع کل</th>
                    <th>تخفیف</th>
                    <th>هزینه ارسال</th>
                    <th>قابل پرداخت</th>
                    <th>وضعیت</th>
                    <th>گزینه ها</th>
                </tr>
                <an-order v-for="(order,i) in orders" :key="i" :theOrder="order"></an-order>
            </table>
        </div>
    </div>
</template>
<script>
import { computed, onMounted, ref} from "@vue/composition-api"
import AnOrder from './partials/OrderSummary'
import Service from '../../../utils/service'
export default {
    components:{
        AnOrder
    },
    setup(){
        const orders = ref(null)
        const authService = computed(()=>{
            return Service(true)
        })

        onMounted(()=>{
            getUserOrders()
        })
        const getUserOrders = ()=>{
            authService.value.receive('buy/order',{},(s,d)=>{
                if(s==200){
                    orders.value = d.data
                }
            },(s,e)=>{
                
            })
        }
        return {orders}
    }
}
</script>
<style>
.summary{
    background-color: #fff;
    font-size: 0.9rem;
    font-weight: lighter;
    min-height: 50vh;
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