<template>
  <div class="product-product" :id="'product'+theProduct.id" @click="activate">
    <div class="product-item">
      <div class="product-locker">
        <img
          class="product-image"
          src="https://post.healthline.com/wp-content/uploads/2020/09/blue-lotus-flower-732x549-thumbnail.jpg"
          alt=""
        />
      </div>
    </div>
    <div class="product-desc">
      <p>{{theProduct.name}}</p>
    </div>
    <!-- <div class="discount-price">
       <span class="discount-initial">15000</span>
       <span class="discount-percentage">10%</span>
    </div> -->
    <div class="discount-final">{{theProduct.price + "تومان"}}</div>
  </div>
</template>
<script>
export default {
  props:['theProduct'],
  methods:{
    activate(){
      document.getElementById('product'+this.theProduct.id).classList.add('chosen')
      this.$emit('addToBasket',this.theProduct)
    }
  }
};
</script>
<style scoped>
.product-product{
    width: 60px;
    height: 100%;
    width : 14vh;
    padding: 0px;
    margin-left: 14vh;
    display: inline-block;
}

.product-item{
    width: 14vh;
    height: auto;
}

.product-locker{
    border-radius: 5px;
    width: 100%;
    padding: 0px;
    overflow: hidden;
}

.product-image{
    width: 100%;
}

.product-desc{
    text-align: center;
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

</style>