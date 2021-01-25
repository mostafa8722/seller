<template>
    <div class="mini-title m-1">
        <div :class="'d-flex justify-content-around align-items-center tag p-1 ' + classes">
        <image-icon address="/assets/site/images/seller-icons/close.svg" classes="small" :clickable="true" @iconClicked="closeTag"></image-icon>
        <p class="mini-title m-0">{{theTag.text}}</p>
    </div>
    </div>
</template>
<script>
import ImageIcon from './icon'
export default {
    props:['theTag','classes'],
    components:{
        ImageIcon
    },
    methods:{
        closeTag:function(){
            this.$emit("closeTag",this.theTag.id)
        }
    }
}
</script>
<style >
    .tag{
        border: 1px solid #000;
        background-color: #fff;
        font-size: 0.7rem;
        width: auto;
    }
</style>