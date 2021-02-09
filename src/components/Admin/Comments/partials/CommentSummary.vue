<template>
  <tr class="product">
    <td>{{theComment.user}}</td>
    <td>{{theComment.message}}</td>
    <td>{{theComment.seller}}</td>
    <td>{{theComment.date}}</td>
    <td><button @click="()=>verifyMe(true)" class="green-btn ml-1">تآیید</button><button @click="()=>verifyMe(false)" class="red-btn ml-1">رد</button><router-link :to="{name:'Golpino Admin Comment Page' , params:{id:theComment.id}}"><button class="purple-btn ml-2">مشاهده جزئیات</button></router-link></td>
  </tr>
</template>
<script>
import { ref } from "@vue/composition-api";
export default {
  props: ["theComment"],
  components:{
    
  },
  methods:{
    verifyMe:function(v){
      this.$emit('verifyMe',{id:this.theComment.id,verify:v})
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