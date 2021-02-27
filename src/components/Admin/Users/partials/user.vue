<template>
  <tr class="product">
    <td >{{theUser.name}}</td>
    <td >{{theUser.date}}</td>
    <td ><p>{{theUser.mobile}}</p></td>
    <td >{{theUser.order_number}}</td>
    <td >{{theUser.district}}</td>
    <td ><button @click="goToPanel" class="purple-btn">ورود به حساب</button></td>
  </tr>
</template>
<script>
import { ref } from "@vue/composition-api"
export default {
  props: ["theUser"],
  methods:{
    goToPanel:function(){
      this.$emit('goToPanel',this.theUser.id)
    }
  }
};
</script>
<style scoped>
td {
  border: 1px solid rgba(127, 127, 127, 0.2);
  white-space: nowrap;
  padding: 0.5rem;
}

tr {
  width: 100%;
}

.order-locker img{
    width: 50%;
}

.small-cell{
  width: 5%;
}

.mid-cell{
  width:12vw;
}

.mid-cell p{
  white-space: pre-wrap;
  overflow: hidden;
}

.large-cell{
  width: 23%;
}

</style>