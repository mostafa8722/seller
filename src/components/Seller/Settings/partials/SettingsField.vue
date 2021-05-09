<template>
    <div class=" row pt-2 pb-2">
<!--        <div class="col-2 pt-1 pr-4 field-name">-->
<!--            {{theField}}-->
<!--        </div>-->
      <div class="col-6">

        <div @clicked="handleField" style="    background-color: rgba(0, 0, 0, 0.06);
    height: 40px;
    border-radius: 5px;
    border-bottom: 1px solid;">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" />
          </svg>
          <custom-button :toggle="(modal ? 'modal' : '')" :target="(modal ? '#addressModal' : '')"  :classes="(modal ? 'field-button modal-toggler' : 'field-button')" float="left"  iconSize="small ml-2" :label="deactive ? typeLabel : 'ثبت'"></custom-button>
        </div>


      </div>
        <div class="col-12">
            <slot></slot>
        </div>

    </div>
</template>
<script>
import CustomButton from '../../../Common/customButton'
export default {
    props:['theField','deactive','modal','typeLabel'],
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
    color:black!important;
    padding:0px !important;
}
</style>