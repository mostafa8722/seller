<template>
  <tr class="product">
    <td class="order-locker">
        <img :src="theItem.image" alt="image">
    </td>
    <td>{{theItem.name}}</td>
    <td>{{theItem.number}}</td>
    <td>{{theItem.price}}</td>
    <td>{{theItem.user_address}}</td>
    <td>{{theItem.user_phone}}</td>
  </tr>
</template>
<script>
import { ref } from "@vue/composition-api";
export default {
  props: ["theItem"],
};
</script>
<style scoped>
td {
  border-top: 1px solid rgba(127, 127, 127, 0.2);
  white-space: nowrap;
  width:25%;
}

tr {
  width: 100%;
}

.order-locker img{
    width: 50%;
}

</style>