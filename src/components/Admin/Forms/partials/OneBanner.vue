<template>
    <tr>
        <td></td>
        <td></td>
        <td class="half-width"></td>
        <td><button class="purple-btn ml-2">ویرایش</button><input type="file"><input type="file" class="hidden-input" id="img" name="img" accept="image/*" @change="(e)=>({})"></td>
    </tr>
</template>
<script>
export default {
    props:['theBanner'],
    methods:{
        
    }
}
</script>
<style scoped>
td{
    border:1px solid rgb(218, 218, 218);
    text-align: center;
    padding:5px;
}
.cat-locker{
    width: 25%;
}
.cat-locker img{
    width:25%;
}
</style>
