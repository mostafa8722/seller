<template>
    <div class="container">
        <div class="container summary">
            <p>خلاصه سفارش</p>
            <table>
                <tr>
                    <th>تصویر محصول</th>
                    <th>نام محصول</th>
                    <th>تعداد</th>
                    <th>قیمت</th>
                </tr>
                <an-order v-for="(order,i) in orders" :key="i" :theOrder="order"></an-order>
            </table>
            <table>
                <tr>
                    <td class="big-cell">مجموع</td>
                    <td class="small-cell">150000 تومان</td>
                </tr>
                <tr>
                    <td class="big-cell">سود شرکت</td>
                    <td class="small-cell">150000 تومان</td>
                </tr>
                <tr class="final">
                    <td class="big-cell">خالص دریافتی</td>
                    <td class="small-cell">150000 تومان</td>
                </tr>
            </table>
            <div class="accounts pt-3 mt-5">
                <p>شماره حساب های شما</p>
                <div class="row">
                    <div class="col-3">
                        <Card></Card>
                    </div>
                    <div class="col-3">
                        <Card></Card>
                    </div>
                    <div class="col-3">
                        <Card></Card>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref} from "@vue/composition-api"
import AnOrder from './partials/OrderSummary'
import Card from './partials/Card'
export default {
    components:{
        AnOrder,
        Card
    },
    setup(){
        const orders = ref([1,2])
        return {orders}
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