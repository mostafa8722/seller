<template>
 <div v-if="toggle != ''" class="custom-button" :class="classes" :data-toggle="toggle" :data-target="target" @click="onClickHandler">
     <image-icon v-if="icon.length > 0 && float=='right'" :address="icon" :classes="iconSize"></image-icon>
     <p class="mini-title m-0" :class="(float == 'left' ? 'ml-2' : 'mr-2')" v-if="label != ''">{{label}}</p>
     <image-icon v-if="icon.length > 0 && float=='left'" :address="icon" :classes="iconSize"></image-icon>
     <button class="theButton"></button>
 </div>
 <div v-else class="custom-button" :class="classes" @click="onClickHandler">
     <image-icon v-if="icon.length > 0 && float=='right'" :address="icon" :classes="iconSize"></image-icon>
     <p class="mini-title m-0" :class="(float == 'left' ? 'ml-2' : 'mr-2')" v-if="label != ''">{{label}}</p>
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
            type:String,
            default:''
        },
        classes:{
            type:String,
            defaul:''
        },
        iconSize:{
            type:String
        },
        float:{
            type:String,
            default:'right'
        },
        toggle:{
            type:String,
            defaul:''
        },
        target:{
            type:String,
            defaul:''
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
        font-size: 0.8rem;
    }

    .custom-button:hover{
        cursor: pointer;
    }

    .text-big{
        font-size: 1.2rem;
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

    .add-address-btn{
        border: none;
        font-weight: lighter;
    }
</style>