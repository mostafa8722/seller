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
    <div class="starburst example" v-if="theProduct.formattedFinalPrice" id="example-2"><span>{{theProduct.discount+ "%"}}</span></div>
    <div class="thePrice">
      <div class="discount-price tLighter" v-if="theProduct.formattedFinalPrice">
       <span class="discount-initial">{{theProduct.formattedPrice + " تومان"}}</span>
       <!-- <span class="discount-percentage">{{theProduct.discount+ "%"}}</span> -->
      </div>
      <div class="discount-final pl-2 pr-2">{{(theProduct.formattedFinalPrice ? theProduct.formattedFinalPrice : theProduct.formattedPrice ) + " تومان"}}</div>
    </div>
    <div class="product-tools d-flex justify-content-center mt-3 p-2">
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
    min-height: 300px;
    width : 100%;
    padding: 0px;
    display: inline-block;
    border:1px solid rgba(127,127,127,.2);
    border-radius: 4px;
    font-size: 0.9rem;
}

.thePrice{
  height: 33px;
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
  display: inline-block;
  color: #7F187F;
  font-weight: normal;
  font-size: .85rem;
}
.discount-price{
  /* display: inline-block; */
}

.product-thumb-desc p{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 90%;
}

.discount-initial{
    text-decoration: line-through;
    color: #969696;
    margin-left: 5px;
}

.discount-percentage{
    background-color: #fc5353;
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


.starburst {
  background: #F24949;  
  width: 35px;
  height: 35px;
  text-align: center;
  color: #fff;
}

.starburst,
.starburst span {
  display: flex;
  align-items: center;
  justify-content: center;
}

.starburst span {
  width: 100%;
  height: 100%;
  background: inherit;
  transform: rotate(45deg);
}

.starburst:before,
.starburst:after ,
.starburst span:before,
.starburst span:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: inherit;
  z-index: -1;
  transform: rotate(30deg);
}

.starburst:after {
  transform: rotate(-30deg);
}

.starburst span:after {
  transform: rotate(30deg);
}
.starburst span:before {
  transform: rotate(-30deg);
}

.example {
  position: absolute;
  top: 18px;  
  right: 5px;
  margin-top: -1.25em;
  margin-left: -1.25em;
}

#example-1 {
  left: 25%;
}

#example-2 {
  left: 75%;
  transform: rotate(-45deg);
}
</style>