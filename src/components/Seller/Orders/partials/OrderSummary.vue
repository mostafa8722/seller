<template>
  <tr class="product">
    <td class="order-locker">
        <img src="/assets/site/images/popular.png" alt="">
    </td>
    <td>گل رز هلندی</td>
    <td>5 عدد</td>
    <td>20000 تومان</td>
  </tr>
</template>
<script>
import { ref } from "@vue/composition-api";
export default {
  props: ["theOrder"],
};
</script>
<style>
td {
  border: 1px solid rgba(127, 127, 127, 0.2);
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