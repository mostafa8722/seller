<template>
 <div :class="'custom-button ' + classes" @click="onClickHandler">
     <image-icon v-if="icon.length > 0 && float=='right'" :address="icon" :classes="iconSize"></image-icon>
     <p class="mini-title m-0 ml-2">{{label}}</p>
     <image-icon v-if="icon.length > 0 && float=='left'" :address="icon" :classes="iconSize"></image-icon>
     <button class="theButton"></button>
 </div>
</template>
<script>
import ImageIcon from './icon'
export default {
    components:{
        ImageIcon
    },
    props:{
        icon:{
            type:String,
            default:''
        },
        label:{
            type:String
        },
        classes:{
            type:String,
            defaul:'',
        },
        iconSize:{
            type:String
        },
        float:{
            type:String,
            default:'right'
        }
    },
    methods:{
        onClickHandler: function(){
            this.$emit('clicked')
        }
    }
}
</script>
<style scoped>
    .custom-button{
        width: auto;
        height: auto;
        border: 1px solid #000;
        border-radius:7px;
        background: none;
        padding: 12px 12px 12px 12px;
        margin:0px;
        display: inline-block;
        font-weight: lighter;
    }

    .custom-button:hover{
        cursor: pointer;
    }

    .custom-button button{
        border:none;
        display: none;
        margin: 0px;
        padding: 0px;
    }

    .add-button{
        color:#fff;
        background-color: #9147FF;
        border:none;
    }

    .no-border{
        border:none !important;
    }
</style>