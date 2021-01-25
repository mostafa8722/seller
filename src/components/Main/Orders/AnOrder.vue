<template>
    <div class="container p-5">
        <div class="container">
            <h3 class="tNormal mb-5">خلاصه سفارش</h3>
            <table>
                <tr>
                    <th>تصویر محصول</th>
                    <th>نام محصول</th>
                    <th>تعداد</th>
                    <th>قیمت</th>
                </tr>
                <order-item v-for="(item,i) in items" :key="i" :theItem="item"></order-item>
            </table>
        </div>
    </div>
</template>
<script>
import { computed, onMounted, ref} from "@vue/composition-api"
import OrderItem from './partials/OrderItem'
import Service from '../../../utils/service'
export default {
    components:{
        OrderItem
    },
    setup(props,context){
        const items = ref(null)
        const theOrderId = computed(()=>{
            return context.root.$route.params.id
        })
        const authService = computed(()=>{
            return Service(true)
        })

        onMounted(()=>{
            authService.value.receive('buy/order/' + theOrderId.value , {} , (s,d)=>{
                if(s == 200){
                    items.value = d.data.product
                }
            },(s,e)=>{

            })
        })
        return {items}
    }
}
</script>
<style>
.summary{
    background-color: #fff;
    font-size: 0.9rem;
    font-weight: lighter;
}

table{
    border-collapse: separate;
    border-spacing: 0px;
    width: 100%;
    table-layout: auto;
}

td{
    border: 1px solid rgba(127,127,127,0.2);
    white-space: nowrap;
    padding-right: 1rem;
    text-align: center;
}

th{
    text-align: center;
    padding: 1rem ;
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

.accounts{
    border-top: 1px solid rgba(127,127,127,0.2);
}

</style>