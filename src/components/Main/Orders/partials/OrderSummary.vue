<template>
  <tr class="product">
    <td>{{theOrder.id}}</td>
    <td>{{theOrder.seller_name}}</td>
    <td>{{theOrder.amount}}</td>
    <td>{{theOrder.discount}}</td>
    <td>{{theOrder.delivery_cost}}</td>
    <td>{{theOrder.payable}}</td>
    <td><Etiquette :status="parseInt(theOrder.status)"></Etiquette></td>
    <td><router-link :to="{name:'Golpino User Order Page',params:{id:theOrder.id}}"><button class="purple-btn">مشاهده سفارش</button></router-link></td>
  </tr>
</template>
<script>
import Etiquette from './etiquette'
export default {
  props: ["theOrder"],
  components:{
    Etiquette
  }
};
</script>
<style>
td {
  border: 1px solid rgba(127, 127, 127, 0.2);
  white-space: nowrap;
  width:25%;
  padding: 0.5rem;
}

tr {
  width: 100%;
}

.order-locker img{
    width: 50%;
}

</style>
