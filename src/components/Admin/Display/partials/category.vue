<template>
    <tr>
        <td>{{theCategory.name}}</td>
        <td>{{theCategory.parent_name}}</td>
        <td class="half-width"><div class="cat-locker"><img :src="theCategory.image" alt="image"></div></td>
        <td><button class="purple-btn ml-2" @click="edit">ویرایش</button><button class="purple-btn" @click="remove">حذف</button></td>
    </tr>
</template>
<script>
export default {
    props:['theCategory'],
    methods:{
        edit:function(){
            this.$router.push({name: 'Golpino Edit Category Page', params: { id: this.theCategory.id}});
        },
        remove:function(){
            this.$emit('deleteMe',this.theCategory.id)
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
