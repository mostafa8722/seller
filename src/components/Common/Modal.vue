<template>
    <div class="modal-container">
        <div class="modal-whole" :class="position">
            <div class="modal-modal" :class="classes">
                <div class="modal-toolbar">
                    <custom-button iconSize="mid" icon="/assets/site/images/seller-icons/close-purple.svg" @clicked="closeModal" classes="no-border"></custom-button>
                </div>
                <div class="container">
                    <slot></slot>
                </div>
            </div>
        </div>    
    </div>
</template>
<script>
import CustomButton from "./customButton"
export default {
    props:['position','classes'],
    components:{
        CustomButton
    },
    methods:{
        closeModal:function(){
            this.$emit("closeModal")
        }
    }
}
</script>
<style scoped>
.modal-container{
    position: sticky;
    top:0px;
    z-index: 100000000000000001;
}

.modal-whole{
    position: absolute;    
    background-color: rgba(0, 0, 0, 0.4);
    top: 0px;
    right:0px;
    width: 100vw;
    height: 100vh;
    padding-top: 4vh;
}

.modal-modal{
    background-color: #fff;
    max-width: 50%;
    margin: auto;
}

.mini{
    max-width: 40% !important;
}

.modal-toolbar{
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
}

</style>