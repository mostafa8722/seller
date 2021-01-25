<template>
    <!-- Modal -->
<div class="modal hide fade" id="cartModal" tabindex="-1" role="dialog" aria-labelledby="cartModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="cart-modal-header d-flex justify-content-between">
            <h5 class="modal-title">سبد خرید فعال</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
      </div>
      <div class="modal-body">
          <cart-item @cartChanged="()=>({})" v-for="(theItem,i) in cartItems" :key="i" :theItem="theItem"></cart-item>
      </div>
      <div class="modal-footer pt-2 pb-2 pr-4 pl-4 d-flex justify-content-between">
          <router-link :to="'/user/payment/'+activeCart"><button class="purple-btn" data-target="#cartModal" data-toggle="modal">تکمیل خرید</button></router-link>
          <button class="red-btn" data-target="#cartModal" data-toggle="modal" @click="deleteCart">حذف سبد</button>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import { ref, computed,inject} from "@vue/composition-api";
import CartItem from "../Main/Layout/CartItem"
import Service from "../../utils/service"
export default {
  inject:['global'],
  components:{
      CartItem
  },
  props:['activeCart'],
  setup(props) {
    const stateValues = inject('stateValues')
    const authService = computed(()=>{
      return Service(true)
    })

    const deleteCart = ()=> {
      if(props.activeCart != 'random'){
        authService.value.remove('/buy/order/'+props.activeCart , {} , (s,d)=>{
                if(s == 200){
                    stateValues.setCart([])
                }
            },(s,e)=>{

            })
      }
      else
        stateValues.setCart([])
    }
    const cartItems = computed(()=>{
        return stateValues.shoppingCart.value
    })
    return {cartItems,deleteCart};
  }
}
</script>
<style scoped>
#cartMap {
  width: 600px;
  height:300px;
  position: relative;
  margin-left: auto;
  margin-right: auto;
}

.cart-modal-header{
    padding:0.5rem 2rem 0.5rem 2rem;
    border-bottom: 1px solid rgba(179,179,179,0.3);
}

.map-control{
  position: absolute;
  z-index: 1111 !important;
  bottom: 5%;
  left: 5%;
}

.modal-dialog{
    max-width: 700px !important;
}
.purple-btn{
  /* padding: 0px !important; */
}

.invalid{
  color: red;
  margin-top: 1rem;
  text-align: center;
  width: 100%;
}

.modal-footer{
    border: none;
}
</style>