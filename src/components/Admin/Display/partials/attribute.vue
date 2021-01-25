<template>
    <tr>
        <td>{{theAttr.name}}</td>
        <!-- <td>{{theAttr.parent_name}}</td>
        <td>{{theAttr.category_name}}</td> -->
        <td><button class="purple-btn ml-2" @click="edit">ویرایش</button><button class="purple-btn" @click="remove">حذف</button></td>
    </tr>
</template>
<script>
export default {
    props:['theAttr'],
    methods:{
        edit:function(){
            this.$router.push({name: 'Golpino Edit Attribute Page', params: { id: this.theAttr.id}});
        },
        remove:function(){
            this.$emit('deleteMe',this.theAttr.id)
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
