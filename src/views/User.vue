<template>
    <div class="user-page">
        <site-header @blackDrop="dropper" @cartModal="cartModal"></site-header>
        <router-view @blackDrop="dropper" @cartModal="cartModal"></router-view>
        <div v-if="drop" class="blackDrop"  @click="hideDrop">
        </div>
        <cart-modal :activeCart="activeCart"></cart-modal>
    </div>
</template>

<script>
import IconImage from '../components/Common/icon'
import SiteHeader from '../components/Main/Layout/NewHeader'
import EventBus from "../EventBus/EventBus"
import CartModal from "../components/Common/CartModal"
import $ from 'jquery'
export default {
    components:{
        IconImage,
        SiteHeader,
        CartModal
    },
    data:()=>({
        showModal:false,
        drop:false,
        activeCart:0
    }),
    inject:['global'],
    methods:{
        toggleModal:function(){
            this.showModal=!this.showModal
        },
        dropper:function(t){
            this.drop=!this.drop
        },
        hideDrop:function(){
            this.drop= false
            EventBus.$emit('hideCart')
        },
        cartModal:function(x){
            this.activeCart = x
            $('#cartModal').modal('show')
        }
    }
}
</script>
<style scoped>
html{
    background-color: #101924;
}
button:hover{
    cursor: pointer;
}

.blackDrop{
  background-color: rgba(0, 0, 0, 0.7) ;
  position: absolute;
  top: 0px;
  right:0px;
  width: 100%;
  z-index: 2;
  height:100%;
}

.user-page{
    width: 100%;
    padding: 0px;
    min-height: 100vh;
    position: relative;
}


</style>