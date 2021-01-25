<template>
  <tr class="recent">
    <td>گل رز هلندی</td>
    <td><rounded-image src="/assets/site/images/popular.png" kind="mid"></rounded-image> محمد نقوی الحسینی ابیازنی</td>
    <td>دسته گل ها</td>
    <td>250000 تومان</td>
  </tr>
</template>
<script>
import RoundedImage from '../../Common/roundImage'
export default {
    components:{
        RoundedImage
    },
    props:['theRecent']
};
</script>
<style scoped>
    .recent{
        font-size: 0.8rem;
        border-top:  1px solid rgba(127, 127, 127, 0.3);
    }

    td{
        padding: 10px 12px 10px 0px;
    }

</style>