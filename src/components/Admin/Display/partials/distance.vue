<template>
    <tr>
        <td>{{theDistance.from}}</td>
        <td>{{theDistance.to}}</td>
        <td><button class="purple-btn ml-2" @click="edit">ویرایش</button><button class="purple-btn" @click="remove">حذف</button></td>
    </tr>
</template>
<script>
export default {
    props:['theDistance'],
    methods:{
        edit:function(){
            this.$router.push({name: 'Golpino Edit Distance Page', params: { id: this.theDistance.id}});
        },
        remove:function(){
            this.$emit('deleteMe',this.theDistance.id)
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
