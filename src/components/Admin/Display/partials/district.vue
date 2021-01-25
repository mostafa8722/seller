<template>
    <tr>
        <td>{{theDistrict.name}}</td>
        <td>{{theDistrict.city_id}}</td>
        <td><button class="purple-btn ml-2" @click="edit">ویرایش</button><button class="purple-btn" @click="remove">حذف</button></td>
    </tr>
</template>
<script>
export default {
    props:['theDistrict'],
    methods:{
        edit:function(){
            this.$router.push({name: 'Golpino Edit District Page', params: { id: this.theDistrict.id}});
        },
        remove:function(){
            this.$emit('deleteMe',this.theDistrict.id)
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
