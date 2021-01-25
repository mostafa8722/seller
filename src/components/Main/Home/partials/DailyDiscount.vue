<template>
    <div class="daily-discount pr-3 pl-3 pb-4">
        <!-- <div class="discount-discount"><p class="mini-title">50%</p></div> -->
<div class="starburst example" id="example-2"><span>25%</span></div>
        <div class="daily-locker">
            <img :src="theShop.banner" class="daily-discount-image" alt="">
        </div>
        <div class="daily-discount-desc mt-2">
            <p class="daily-discount-shop">{{theShop.name}}</p>
            <p class="daily-discount-address">{{theShop.address.address}}</p>
        </div>
    </div>
</template>
<script>
export default {
    props:['theShop']
}
</script>
<style scoped>
.daily-discount{
    width:100%;
    display: inline-block;
    position: relative;
}

.daily-locker{
    border-radius: 7px;
    overflow: hidden;
    width:100%;
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
  top: 6px;  
  right: 6px;
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