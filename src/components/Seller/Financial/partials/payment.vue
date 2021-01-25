<template>
    <tr>
        <td>#1231231</td>
        <td>محمد نقوی</td>
        <td>300000 تومان</td>
        <td>20000 تومان</td>
        <td>120000 تومان</td>
        <td>13/7/1399</td>
        <td><etiquette kind="pending"></etiquette></td>
        <td><button class="showBtn">نمایش</button></td>
    </tr>    
</template>
<script>
import Etiquette from "../../Dashbioard/Partials/etiquette"
export default {
    components:{
        Etiquette
    },
    props:['thePayment']
}
</script>
<style scoped>
    .showBtn{
        background-color: #772CE8;
        color: #fff;
        border:none;
        border-radius: 4px;
        font-size: 0.85rem;
        padding: 4px 12px 4px 12px;
        cursor: pointer;
    }

    td{
        border-top:1px solid rgba(127, 127, 127 , 0.4);
        padding:6px 2px 6px 2px;
        text-align: center;
    }
</style>