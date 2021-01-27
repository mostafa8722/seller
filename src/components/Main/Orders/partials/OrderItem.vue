<template>
  <div class="order-product">
    <div class="row">
      <div class="col-3 order-locker">
        <img :src="theItem.image" alt="image"> 
      </div>
      <div class="col-3">
        <p>{{theItem.product_name}}</p>
        <p class="tLighter">{{theItem.price}} تومان</p>
        <p class="tLighter">{{theItem.number}} عدد</p>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "@vue/composition-api";
import formattedPrice from '../../../use/fomatCurrency'
export default {
  props: ["theItem"],
};
</script>
<style scoped>
.order-product{
  padding: 0.5rem 1rem 0.5rem 1rem;
  border: 1px solid rgba(127, 127, 127, 0.2);
  border-radius: 6px;
  margin:12px;
}

p{
  margin-bottom: 5px;
}

.order-locker{
  border-radius: 16px;
  overflow: hidden;
  height: 80px;
}

.order-locker img{
  width: 100%;
}

</style>