<template>
    <img v-if="clickable" :src="address" :class="classes + ' clickable'" @click="onClickHandler" alt="icon">
    <img v-else :src="address" :class="classes" alt="icon">
</template>
<script>
export default {
    props:{
      classes: {
            type: String,
            default: 'default-icon'
        },
        address:{
            type: String
        },
        clickable:{
            type:Boolean,
            default:false
        }
    },
    methods:{
        onClickHandler:function(){
            this.$emit('iconClicked')
        }
    }
}
</script>
<style scoped>
    .default-icon{
        width:15px;
        height: 15px;
    }
    .small{
        width: 7px;
        height:7px;
    }

    .mid{
        width:12px;
        height: 12px;
    }

    .big{
        width:18px;
        height: 18px;
    }

    .enormous{
        width:30px;
        height: 30px;
    }

    .huge{
        width: 50px;
        height: 50px;
    }

    .gigantic{
        width:100px;
        height:100px;
    }

    .clickable:hover{
        cursor: pointer;
    }
</style>