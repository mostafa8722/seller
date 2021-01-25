<template>
    <tr>
        <td>{{theDiscount.name}}</td>
        <td>{{theDiscount.value}}</td>
        <td>{{theDiscount.percent}}</td>
        <td>{{theDiscount.number}}</td>
        <td>{{theDiscount.min}}</td>
        <td>{{theDiscount.max}}</td>
        <td>{{theDiscount.start_at}}</td>
        <td>{{theDiscount.expired_at}}</td>
        <td><button class="purple-btn ml-2" @click="edit">ویرایش</button><button class="purple-btn" @click="remove">حذف</button></td>
    </tr>
</template>
<script>
export default {
    props:['theDiscount'],
    methods:{
        edit:function(){
            this.$router.push({name: 'Golpino Edit Discount Page', params: { id: this.theDiscount.id}});
        },
        remove:function(){
            this.$emit('deleteMe',this.theDiscount.id)
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
