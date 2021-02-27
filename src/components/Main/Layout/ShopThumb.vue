<template>
    <div class="shop-thumb" v-if="grid">
        <div class="shop-score pr-2 pl-2 pt-1 pb-1">
            <span class="icon-star mr-1"></span>{{theShop.score}}
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
            <p class="shop-name mini-title">{{theShop.name}}</p>
            <p class="mini-title pt-1 shop-comments">({{theShop.comment_number}} نظر)</p>
            <div class="shop-address mt-2">
                <p class="mini-title"><image-icon address="/assets/site/images/seller-icons/shoploc.svg"></image-icon>{{theShop.address}}</p>
            </div>
            <div class="shop-address">
                <p class="mini-title mt-2 shop-time"><image-icon address="/assets/site/images/seller-icons/timer.svg"></image-icon>زمان آماده سازی {{theShop.preparation_time}} دقیقه</p>
            </div>
        </div>
        <div class="shop-tools mt-2 p-2">
            <router-link :to="'/shop/'+theShop.id">
                <button class="shop-visit" @click="visitShop">مشاهده ی فروشگاه<span class="icon-more mr-2"></span></button>
            </router-link>
        </div>
    </div>
    <div class="row-shop-thumb" v-else>
        <div class="row-logo-locker">
            <img :src="theShop.logo" alt="" class="logo-image">
        </div>
        <div class="row-shop-detail mini-title p-3">
            <p class="shop-name mini-title">{{theShop.name}}</p>
            <p class="mini-title mb-3 pt-1 shop-comments">({{theShop.comment_number}} نظر)</p>
            <div class="shop-address">
                <p class="mini-title"><image-icon address="/assets/site/images/seller-icons/shoploc.svg"></image-icon>{{theShop.address}}</p>
            </div>
            <div class="shop-address">
                <p class="mini-title shop-time"><image-icon address="/assets/site/images/seller-icons/timer.svg"></image-icon>زمان آماده سازی {{theShop.preparation_time}} دقیقه</p>
            </div>
        </div>
        <!-- <div class="shop-pin">
            <span class="icon-bookmark mr-1"></span>
        </div> -->
        <div class="row-shop-tools mini-title p-2">
            <div class="row-shop-score pr-2 pl-2 pt-1 pb-1 mb-3">
                <span class="icon-star ml-1"></span>{{theShop.score}}
            </div>
            <router-link :to="'/shop/'+theShop.id">
                <button class="shop-visit" @click="visitShop">مشاهده ی فروشگاه<span class="icon-more mr-2"></span></button>
            </router-link>
        </div>
    </div>
</template>
<script>
import ImageIcon from '../../Common/icon'
export default {
    props:{
        theShop:{
            required:true
        },
        grid:{
            default:true
        }
    },
    methods:{
        visitShop:function(){
            this.$router.push('/shop/'+ this.theShop.id)
        }
    },
    components:{
        ImageIcon
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
    width:100%;
    display: inline-block;
    overflow: hidden;
    position: relative;
    height: 325px;
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
    right: 42%;
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
    font-size: 0.8rem;
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
    width: auto;
    border:1px solid #9147FF;
    border-radius: 16px;
    background:none;
    color: #9147FF;
    cursor: pointer;
    padding: 4px 16px 4px 16px;
    font-size: 0.7rem;
}

.shop-visit:hover{
    background-color: #9147FF;
    color: #fff;
}

.shop-address{
    font-size: 0.7rem;
}

.shop-address p{
  /* word-wrap: break-word;
  overflow: hidden;
  display: inline-block;
  max-height: 2em;
  line-height: 1.8em;
  text-align:r; */
    white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 90%;
}
/* .shop-address p::after {
  content: "...";
  position: absolute;
  right: 0px;
  top: 0px;
  color: #000;
  font-size: 1rem;
  font-weight: normal;
} */

.shop-address span{
    width: 20%;
}

.shop-address div{
    width: 80%;
}

.shop-time{
    color: rgba(127,127,127,.65);
}

.shop-comments{
    color: rgba(127,127,127,.65);
    float: left;
    font-size: 0.8rem;
}

.mini-title{
    display: inline-block;
}

/* ROW SHAPED */
.row-shop-detail{
    position: relative;
    top:-25px;
}

.row-shop-thumb{
    position: relative;
    border-radius: 6px;
    background-color: #fff;
    box-shadow: 0 2px 10px -4px rgba(0,0,0,.19);
    transition: all .2s ease-out;
    width:100%;
    display: inline-block;
    overflow: hidden;
    position: relative;
    height: 150px;
    padding: 1.2rem;
}

.row-logo-locker{
    height: 100px;
    width: 100px;
    display: inline-block;
    border-radius: 5px;
    overflow: hidden;
    border: 1px solid rgba(0,0,0,.1);
}

.row-logo-locker img{
    width: 100%;
}

.row-shop-score{
    max-width: 45px;
    font-size: 0.9rem;
    font-weight: lighter;
    padding-right: 0.5rem;
    padding-left: 0.5rem;
    text-align: center;
    border-radius: 15px;
    background-color: #9147FF;
    color:#fff;
    z-index: 10;
    position: relative;
    right:70%;
}

.row-shop-tools{
    height: 100%;
    float: left;
    /* position: relative;
    top:-25px; */
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