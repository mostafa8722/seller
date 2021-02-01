<template>
    <div class="container p-5">
        <div class="container summary">
            <h3 class="tNormal">سفارشات شما</h3>
            <table class="mt-5">
                <tr>
                    <th>شماره سفارش</th>
                    <th>نام فروشگاه</th>
                    <!-- <th>جمع کل</th> -->
                    <th>تخفیف</th>
                    <th>هزینه ارسال</th>
                    <th>قابل پرداخت</th>
                    <th>وضعیت</th>
                    <th>گزینه ها</th>
                </tr>
                <an-order-summary @reOrderMe="reOrder" v-for="(order,i) in orders" :key="i" :theOrder="order"></an-order-summary>
            </table>
        </div>
    </div>
</template>
<script>
import { computed, inject, onMounted, ref} from "@vue/composition-api"
import AnOrderSummary from './partials/OrderSummary'
import Service from '../../../utils/service'
export default {
    components:{
        AnOrderSummary
    },
    setup(props,context){
        const orders = ref(null)
        const authService = computed(()=>{
            return Service(true)
        })
        const stateValues = inject('stateValues')
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

        const reOrder = (id) => {
                        authService.value.receive('buy/order/' + id , {} , (s,d)=>{
                if(s == 200){
                    let items = []
                    items = d.data.product
                    items.map((i)=>{
                        i.quantity = i.number
                        i.id = i.product_id
                        stateValues.addToCart(i)
                        context.root.$router.push('/user/payment')
                    })
                }
            },(s,e)=>{

            })
        }

        return {orders,reOrder}
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

table{
    border-collapse: collapse;
    border-spacing: 0px;
    width: 100%;
    table-layout: auto;
    text-align: center;
}

tr{
    width: 100%;
}

</style>