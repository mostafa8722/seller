<template>
    <div class="shop-thumb mr-5">
        <div class="shop-score pr-2 pl-2 pt-1 pb-1">
            <span class="icon-star ml-1"></span>4.4
        </div>
        <div class="shop-pin">
            <span class="icon-bookmark mr-1"></span>
        </div>
        <div class="shop-locker">
            <img :src="theShop.banner" alt="" class="shop-image">
        </div>
        <div class="logo-locker">
            <img :src="theShop.logo" alt="" class="logo-image">
        </div>
        <div class="shop-detail p-3">
            <p class="shop-name">{{theShop.name}}</p>
            <div class="shop-address">
                <p class="mini-title"><span class="icon-star mr-1"></span>{{theShop.address.address}}</p>
            </div>
        </div>
        <div class="shop-tools p-2">
            <router-link :to="'/shop/'+theShop.id">
                <button class="shop-visit">مشاهده ی فروشگاه<span class="icon-more ml-1"></span></button>
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    props:['theShop'],
    created(){

    }
}
</script>
<style scoped>

.shop-thumb{
    position: relative;
    border-radius: 6px;
    background-color: #fff;
    box-shadow: 0 2px 10px -4px rgba(0,0,0,.19);
    transition: all .2s ease-out;
    width:15vw;
    display: inline-block;
    overflow: hidden;
    position: relative;
    height: 300px;
}

.shop-thumb:hover{
    transform: translateY(2px);
    box-shadow: 0 2px 5px rgba(0,0,0,.1), 0 1px 2px rgba(0,0,0,.05);
}

.shop-thumb:hover .shop-locker{
    -webkit-filter: brightness(60%);
    filter: brightness(60%);
}

.shop-thumb:hover .logo-locker{
    right: 38%;
}

.shop-thumb:hover .shop-image{
    transform: scale(1.35);
}

.shop-score{
    width: auto;
    border-radius: 15px;
    background-color: #9147FF;
    color:#fff;
    position: absolute;
    top:8px;
    left:15px;
    text-align: end;
    z-index: 10;
}

.shop-pin{
    position: absolute;
    top:8px;
    right:15px;
    color:#fff;
    z-index: 10;
    cursor: pointer;
}

.shop-locker{
    width: 100%;
    height: 50%;
    display: inline-block;
    overflow: hidden;
}

.shop-image{
    height: 100%;
    transition: transform .3s ease-out;
}

.logo-locker{
    width:3vw;
    height: 3vw;
    display: inline-block;
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    top: 41%;
    right: 20px;
    border:3px solid white;
    transition-duration: .3s;
    transition-property: right;
    -moz-transition-timing-function: ease-out;
    transition-timing-function: ease-out;
}

.logo-image{
    height:100%;
}

.shop-detail{
    height: 30%;
}

.shop-visit{
    width: 90%;
    border:1px solid #9147FF;
    border-radius: 16px;
    background:none;
    color: #9147FF;
    cursor: pointer;
    padding: 4px 16px 4px 16px;
    font-size: 0.8rem;
}

.shop-visit:hover{
    background-color: #9147FF;
    color: #fff;
}

.shop-address{
    font-size: 0.7rem;
}

.shop-address span{
    width: 20%;
}

.shop-address div{
    width: 80%;
}

.mini-title{
    display: inline-block;
}


@media (max-width: 63.9375em){
    .shop-thumb{
        width: 35vw;
    }
}

@media (max-width: 70em){
    .shop-thumb{
        width: 35vw;
    }
    .shop-locker{
        width: 100%;
        height: 50%;
        display: inline-block;
        overflow: hidden;
    }

    .shop-image{
        width: 100%;
        transition: transform .3s ease-out;
    }

    .shop-visit{
        width: 60%;
    }
}

</style>