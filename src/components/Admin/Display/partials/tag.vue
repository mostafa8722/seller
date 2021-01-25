<template>
    <tr>
        <td>{{theTag.name}}</td>
        <td><div class="cat-locker"><img :src="theTag.image" alt="image"></div></td>
        <td><button class="purple-btn ml-2" @click="edit">ویرایش</button><button class="purple-btn" @click="remove">حذف</button></td>
    </tr>
</template>
<script>
export default {
    props:['theTag'],
    methods:{
        edit:function(){
            this.$router.push({name: 'Golpino Edit Tag Page', params: { id: this.theTag.id}});
        },
        remove:function(){
            this.$emit('deleteMe',this.theTag.id)
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
.cat-locker{
    width: 25%;
}
.cat-locker img{
    width:25%;
}
</style>
