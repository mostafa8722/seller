<template>
    <div class="field row pt-2 pb-2">
<!--        <div class="col-2 pt-1 pr-4 field-name">-->
<!--            {{theField}}-->
<!--        </div>-->
        <div class="col-12">
            <slot></slot>
        </div>
<!--        <div class="col-2 p-0 pt-1">-->
<!--            <custom-button :toggle="(modal ? 'modal' : '')" :target="(modal ? '#addressModal' : '')" @clicked="handleField" :classes="(modal ? 'field-button modal-toggler' : 'field-button')" float="left" icon="/assets/site/images/seller-icons/left-arrow-purple.svg" iconSize="small ml-2" :label="deactive ? 'ویرایش' : 'ثبت'"></custom-button>-->
<!--        </div>-->
    </div>
</template>
<script>
import CustomButton from '../../../Common/customButton'
export default {
    props:['theField','deactive','modal'],
    components:{
        CustomButton
    },
    // computed:{
    //     theLabel:function(){
    //         return this.deactive
    //     }
    // },
    methods:{
        handleField:function(){
            if(this.deactive)
                this.$emit('activate')
            else
                this.$emit('edit')
        }
    }
}
</script>
<style>

.field{
    width: 100%;
    border-bottom:1px solid rgba(127, 127, 127, 0.1)
}

.field-button{
    border:none !important;
    background: none !important;
    color:#772CE8;
    padding:0px !important;
}
</style>