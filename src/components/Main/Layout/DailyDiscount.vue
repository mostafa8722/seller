<template>
    <div class="daily-discount w-100 pr-3 pl-3 pb-4" @click="toShop">
        <!-- <div class="discount-discount"><p class="mini-title">50%</p></div> -->
        <div class="starburst example" id="example-2"><span>{{theShop.discount + "%"}}</span></div>
        <div class="daily-locker">
            <img :src="theShop.logo" class="daily-discount-image" alt="">
        </div>
        <div class="daily-discount-desc mt-2">
            <p class="daily-discount-shop">{{theShop.name}}</p>
            <p class="daily-discount-address">{{theShop.address}}</p>
        </div>
    </div>
</template>
<script>
export default {
    props:['theShop'],
    methods:{
      toShop:function(){
        this.$router.push('/shop/'+this.theShop.id)
      }
    }
}
</script>
<style scoped>
.daily-discount{
    width:100%;
    display: inline-block;
    position: relative;
    font-size: 0.8rem;
    height: 200px;
    /* border: 1px solid rgba(127, 127, 127, 0.2);
    border-radius: 10px; */
}

.daily-discount:hover{
  color: #F24949;
  cursor: pointer;
}

.daily-locker{
    border-radius: 7px;
    overflow: hidden;
    height: 40%;
    width: 100%;
    border:1px solid rgba(127, 127, 127, 0.3)
}

.daily-discount-image{
    width: 100%;
}

.daily-discount-desc{
    text-align: center;
}

.discount-discount{
    position: absolute;
    top:-8px;
    right:-8px;
    border:2px solid #fff;
    background-color: #F24949;
    color:#fff;
    border-radius: 7px;
    font-size: 0.6rem;
    font-weight: bolder;
    padding: 3px 6px 1px 6px;
    /* transform: rotate(45deg); */
}
.daily-discount-address{
      white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 90%;
}

.mini-title{
    display: inline-block;
}

.starburst {
  background: #F24949;  
  width: 25px;
  height: 25px;
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
  top: 8px;  
  right: 4px;
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