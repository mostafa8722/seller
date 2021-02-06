<template>
  <tr class="product">
    <td class="small-cell">{{theShop.name}}</td>
    <td class="mid-cell"><p>{{theShop.seller_name}}</p></td>
    <td class="small-cell">{{theShop.mobile}}</td>
    <td class="small-cell">{{theShop.address}}</td>
    <td class="small-cell">{{theShop.district}}</td>
    <td class="small-cell"><button @click="goToPanel" class="purple-btn ml-2">ورود به پنل</button></td>
  </tr>
</template>
<script>
import CustomInput from '../../../Common/CustomInput'
export default {
  props: ["theShop"],
  components:{
    CustomInput
  },
  methods:{
    goToPanel:function(){
      this.$emit('goToPanel',this.theShop.id)
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width:25vw;
}

.large-cell{
  width: 15vw;
}

</style>