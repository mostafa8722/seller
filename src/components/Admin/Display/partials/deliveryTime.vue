<template>
    <tr>
        <td>{{theTime.from}}</td>
        <td>{{theTime.to}}</td>
        <td><button class="purple-btn ml-2" @click="edit">ویرایش</button><button class="purple-btn" @click="remove">حذف</button></td>
    </tr>
</template>
<script>
export default {
    props:['theTime'],
    methods:{
        edit:function(){
            this.$router.push({name: 'Golpino Edit Delivery Time Page', params: { id: this.theTime.id}});
        },
        remove:function(){
            this.$emit('deleteMe',this.theTime.id)
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
