<template>
  <tr class="transaction">
    <td>#2456687</td>
    <td><rounded-image src="/assets/site/images/popular.png" kind="mid"></rounded-image> محمد نقوی الحسینی ابیازنی</td>
    <td>1399/6/11</td>
    <td>250000 تومان</td>
    <td><etiquette kind="pending"></etiquette></td>
    <td><button class="showBtn">نمایش</button></td>
  </tr>
</template>
<script>
import Etiquette from './etiquette'
import RoundedImage from '../../Common/roundImage'
export default {
    components:{
        Etiquette,
        RoundedImage
    },
    props:['theTransaction']
};
</script>
<style scoped>
    .transaction{
        font-size: 0.8rem;
        border-top:  1px solid rgba(127, 127, 127, 0.3);
    }

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
        padding: 10px 12px 10px 0px;
    }

</style>