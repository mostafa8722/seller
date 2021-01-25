<template>
  <div class="product-product p-1" :class="(isActive ? 'chosen ' + classes : classes)" :id="'product'+theProduct.id" @click="activate">
    <div class="product-item">
      <div class="product-locker">
        <img
          class="product-image"
          :src="theProduct.image"
          alt=""
        />
      </div>
    </div>
    <div class="mt-2 pl-2 pr-2 tNormal product-thumb-desc">
      <p>{{theProduct.name}}</p>
    </div>
    <!-- <div class="discount-price tLighter">
       <span class="discount-initial">15000</span>
       <span class="discount-percentage">10%</span>
    </div> -->
    <div class="discount-final pl-2 pr-2">{{theProduct.formattedPrice + " تومان"}}</div>
    <div class="product-tools d-flex justify-content-center mt-1 p-2">
      <button class="product-add" @click="(e)=>addToBasket(e)">افزودن به سبد خرید</button>
    </div>
  </div>
</template>
<script>
export default {
  props:['theProduct','classes'],
  methods:{
    activate(){
      // document.getElementById('product'+this.theProduct.id).classList.add('chosen')
      this.showProductModal()
    },
    addToBasket(e){
      e.stopPropagation()
      this.$emit('addToBasket',this.theProduct)
    },
    showProductModal(){
      this.$emit('showModal',this.theProduct)
    }
  },
  inject:['stateValues'],
  computed:{
    isActive:function(){
      let is = false
      this.stateValues.shoppingCart.value.map((item)=>{
        if(item.id == this.theProduct.id)
          is = true
      })
      return is
    }
  }
};
</script>
<style scoped>
.product-product{
    height: 300px;
    width : 100%;
    padding: 0px;
    display: inline-block;
    border:1px solid rgba(127,127,127,.2);
    border-radius: 4px;
}

.product-product:hover{
  cursor: pointer;
}

.mini-caroo-item{
    /* width:40% !important;
    margin-right: 2rem; */
}

.product-item{
    width: 100%;
    height: auto;
}

.product-locker{
    border-radius: 4px;
    width: 100%;
    height: 170px;
    padding: 0px;
    overflow: hidden;
}

.product-image{
    width: 100%;
}

.discount-final{
  color: #7F187F;
  font-weight: normal;
  font-size: 1.1rem;
}

.product-thumb-desc p{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 90%;
}

.discount-initial{
    text-decoration: line-through;
    color: #dbdbdb;
}

.discount-percentage{
    background-color: #ed0000;
    border-radius: 5px;
    color: #fff;
    padding: 4px;
}

.chosen{
  border:2px solid #9147FF;
  border-radius: 5px;
}

.product-add{
    width: 90%;
    border:1px solid #9147FF;
    border-radius: 16px;
    background:none;
    color: #9147FF;
    cursor: pointer;
    padding: 4px 16px 4px 16px;
    font-size: 0.8rem;
}

.product-add:hover{
    background-color: #9147FF;
    color: #fff;
}

.product-tools{
  border-top: 1px solid rgba(127,127,127,.2);
}

</style>