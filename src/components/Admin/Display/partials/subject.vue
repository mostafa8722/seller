<template>
    <tr>
        <td>{{theSubject.desc}}</td>
        <td><button class="purple-btn ml-2" @click="edit">ویرایش</button><button class="purple-btn" @click="remove">حذف</button></td>
    </tr>
</template>
<script>
export default {
    props:['theSubject'],
    methods:{
        edit:function(){
            this.$router.push({name: 'Golpino Edit Subject Page', params: { id: this.theSubject.id}});
        },
        remove:function(){
            this.$emit('deleteMe',this.theSubject.id)
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
