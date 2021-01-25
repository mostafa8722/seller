<template>
  <tr class="product">
    <!-- <td>{{theOrder.id}}</td> -->
    <td>{{theOrder.seller_name}}</td>
    <td>{{theOrder.address}}</td>
    <td>{{theOrder.user_phone}}</td>
    <!-- <td>{{theOrder.amount}}</td>
    <td>{{theOrder.discount}}</td> -->
    <td>{{theOrder.delivery_cost}}</td>
    <td>{{theOrder.payable}}</td>
    <td><Etiquette :status="theOrder.status"></Etiquette></td>
    <td><button @click="acceptOrder" class="purple-btn ml-2">تایید سفارش</button><button @click="denyOrder" class="red-btn">رد سفارش</button></td>
    <td><router-link :to="{name:'Golpino Admin Order Page' , params:{id:theOrder.id}}"><button class="purple-btn ml-2">مشاهده سفارش</button></router-link></td>
  </tr>
</template>
<script>
import { ref } from "@vue/composition-api";
import Etiquette from './etiquette'
export default {
  props: ["theOrder"],
  components:{
    Etiquette
  },
  methods:{
    acceptOrder:function(){
      this.$emit('acceptOrder',this.theOrder.id)
    },
    denyOrder:function(){
      this.$emit('denyOrder',this.theOrder.id)
    }
  }
};
</script>
<style scoped>
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