<template>
    <tr>
        <td>{{theShop.id}}</td>
        <td>{{theShop.name}}</td>
        <td>{{theShop.mobile}}</td>
        <td><button class="purple-btn ml-2" @click="verify">تأیید</button></td>
    </tr>
</template>
<script>
export default {
    props:['theShop'],
    methods:{
        verify:function(){
            this.$emit('verifyMe',this.theShop.id)
        }
    }
}
</script>
<style scoped>
td{
    border:1px solid rgb(218, 218, 218);
    text-align: center;
    padding:5px;
}
</style>
