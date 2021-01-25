<template>
    <div class="discount-thumb pb-1 mr-5">
        <div class="discount-locker">
            <!-- <img :src="theDiscount.image" alt="" class="discount-image"> -->
            <img src="/assets/site/images/phone-in-hand.jpg" alt="" class="discount-image">
        </div>
        <div class="discount-detail p-3">
            <p class="discount-name">{{theDiscount.description + "(" + theDiscount.count + ")"}}</p>
            <div class="discount-price">
                <span class="discount-initial">{{theDiscount.price}}</span>
                <span class="discount-percentage">{{theDiscount.discount + "%"}}</span>
            </div>
            <div class="discount-final">{{finalPrice + "تومان"}}</div>
        </div>
        <div class="discount-tools p-2">
            <span class="discount-shop"><span class="icon-shop"><p class="mini-title ml-2">فروشگاه محمدی</p></span></span>
            <button class="discount-add p-1"><span class="icon-plus"></span></button>
        </div>
    </div>
</template>
<script>
export default {
    // props:['theDiscount'],
    computed:{
        finalPrice:function(){
            return this.theDiscount.price * ((100 - this.theDiscount.discount)/100)
        },
        theDiscount:function(){
            return {description:"گل خر زهره",count:4,price:18000,discount:10}
        }
    }
}
</script>
<style scoped>

.discount-thumb{
    position: relative;
    border-radius: 6px;
    background-color: #fff;
    box-shadow: 0px 3px 15px rgba(0,0,0,0.15);
    transition: all .2s ease-out;
    width: 17vw;
    display: inline-block;
    overflow: hidden;
    position: relative;
}

.discount-thumb:hover{
    transform: translateY(2px);
    box-shadow: 0 2px 5px rgba(0,0,0,.1), 0 1px 2px rgba(0,0,0,.05);
}


.discount-pin{
    position: absolute;
    top:8px;
    right:15px;
    color:#fff;
}

.discount-locker{
    max-height: 50%;
    display: inline-block;
    overflow: hidden;
}

.discount-image{
    width: 100%;
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

.discount-add{
    min-width: 45px;
    border:none;
    border-radius: 8px;
    background-color: #9147FF;
    color: #fff;
    cursor: pointer;
    margin-right: 20%;
    box-shadow: 4px 4px 15px -4px rgba(145, 71, 255,0.7);
}

.discount-visit:hover{
    background-color: #fff;
    color: #9147FF;
}

.mini-title{
    display: inline-block;
}

@media (max-width: 70em){
    .discount-thumb{
        width: 45vw;
    }
}

</style>