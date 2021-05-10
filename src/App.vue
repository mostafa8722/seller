<template>
  <!-- <div id="app" v-if="path !='/'"> -->
  <div id="app">
    <div id="alertAll" v-show="myGlobe.state.value.alert" class="mini-title alertAll animate__animated animate__backInRight">
      <p class="pr-5 pl-5 pt-2 pb-2">{{myGlobe.state.value.message}}</p>
      <div class="timer" id="alertTimer"></div>
    </div>
    <!-- <Header v-if="path == 'site'" :userType="(path == 'site' ? 'user' : 'seller')" @blackDrop="dropper"></Header> -->
    <!-- <for-seller v-if="path == 'shop'" userType="seller" @blackDrop="dropper"></for-seller> -->
    <!-- <admin-header v-if="path == 'admin'" @blackDrop="dropper"></admin-header> -->
    <!-- <router-view v-if="path != 'seller'"/> -->
    <!-- <seller-page v-else></seller-page> -->
    <seller-view></seller-view>

    <div v-if="drop" class="blackDrop" @click="hideDrop">
    </div>
  </div>
  <!-- <div id="app" v-else>
    <div class="construction">
      <img src="/assets/site/images/construction.jpg" alt="">
    </div>
  </div> -->
</template>
<script>
import Header from "./components/Main/Layout/NewHeader"
import Footer from "./components/Main/Layout/NewFooter"
import global from "./state/global"
import stateValues from "./state/values"
import EventBus from "./EventBus/EventBus"
import SellerPage from "./components/Seller/Seller"
import ForSeller from "./components/Main/Layout/ForSellerHeader"
import SellerView from "./views/Seller"
export default {
  data:()=>({
    drop:false,
    w:0
  }),
  components:{
    Header,
    Footer,
    SellerPage,
    ForSeller,
    SellerView,
  },
  provide:{
    global,
    stateValues
  },
  created(){
    global.setUserType(this.tokenType)
    if(this.tokenType != 'wanderer'){
      global.toggleLogin(true)
    }
  },
  beforeCreate(){
      if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        if(window.location.href.includes('online-payment')){
          // let s1 = window.location.hash;
          // let s2 = s1.substring(1);
        
          // // window.location.href = 'https://app.golpino.com/payment/success?id=' + this.$route.params.id + '&follow_number=' + this.$route.params.follow
          // window.location.href = 'https://app.golpino.com' + s2

          let url = window.location.href
          let reg  = RegExp("([0-9]+)\/([0-9]+)")
          let [full,id,follow] =  reg.exec(url)
          // alert(id)
          // alert(follow)
          window.location.href = "https://app.golpino.com/payment/success?id=" + id + "&follow=" + follow
        }
        if(window.location.href.includes('shop')){
          let url = window.location.href
          
          let res = url.split("/shop/")

          window.location.href = "https://app.golpino.com/shop/" + res[1]
        }
        else{
           window.location.href = 'https://app.golpino.com'
        }
      }
  },
  methods:{
    dropper:function(t){
      this.drop=!this.drop
    },
    hideDrop:function(){
      this.drop= false
      EventBus.$emit('hideCart')
    },
    alertTimer:function(){
      if(this.w<100){
                this.w++
                document.getElementById("alertTimer").style.width=this.w + '%'
                setTimeout(this.alertTimer, 30)
            }
            else{
                this.w=0
            }
    }
  },
  computed:{
    myGlobe:function(){
      return global
    },
    alert:function(){
      return global.state.value.alert
    },
    path:function(){
      return this.$route.fullPath
      // if(window.location.href.includes("qwertyzxcvb")){
      //   return 'admin'
      // }
      // else if(window.location.href.includes("seller")){
      //   return 'seller'
      // }
      // else if(window.location.href.includes("golpino-for-vendor")){
      //   return 'shop'
      // }
      // else{
      //   return 'site'
      // }
    },
    tokenType:function(){
      if($cookies.get("Golpino_token") != null && $cookies.get("Golpino_token") != ''){
        return 'user'
      }
      else if($cookies.get("Golpino_seller") != null && $cookies.get("Golpino_seller") != ''){
        return 'seller'
      }
      else if($cookies.get("Golpino_admin") != null && $cookies.get("Golpino_admin") != ''){
        return 'admin'
      }
      else {
        return 'wanderer'
      }
    },
    isLoggedIn:function(){
      return global.user.value.isLoggedIn
    }
  }
  ,
  watch:{
    alert:function(n,o){
      if(n){
          this.alertTimer()
      }
    },
    isLoggedIn:function(n,o){
      
    }
  }
}
</script>
<style lang="scss">
html{
  direction: rtl;
  font-family: IRANSans;
}

#app{
  text-align: right;
  font-family: IRANSans;
  position: relative;
  height: auto;
}

.alertAll{
  padding:1rem 0px 0px 0px;
  color:#000 ;
  background-color: #fff;
  font-weight: lighter;
  position: fixed;
  top:17vh;
  right:15px;
  z-index: 1112;
  max-width: 35vw;
}
#alertTimer{
  width: 0px;
  height:5px;
  background-color:#772CE8 ;
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

button:hover{
    cursor: pointer;
}


.mini-title{
    display: inline-block;
    margin: 0px;
}

.full-width{
    width: 100% !important;
}

.logical-width{
    width: 70% !important;
}

.half-width{
    width: 50% !important;
}

.purple-btn{
    background-color: #772CE8;
    color: #fff;
    border:none;
    border-radius: 5px;
    box-shadow: 1px 1px 5px 0px rgba(119, 44 , 232, 0.6);
    width: 100px;
    font-size: 0.8rem;
    font-weight: lighter;
    padding-top: 8px;
    padding-bottom: 8px;
}

.purple-btn:hover{
  background-color: #fff;
  color: #000 !important;
}

.red-btn{
    background-color: #fc6265;
    color: #fff;
    border:none;
    border-radius: 5px;
    width: 100px;
    font-size: 0.8rem;
    font-weight: lighter;
    padding-top: 8px;
    padding-bottom: 8px;
}

.green-btn{
    background-color: #30ab0e;
    color: #fff;
    border:none;
    border-radius: 5px;
    width: 100px;
    font-size: 0.8rem;
    font-weight: lighter;
    padding-top: 8px;
    padding-bottom: 8px;
}

//.purple-btn{
//  background-color:  #682AD5;
//  color: #fff;
//  border:none;
//  border-radius: 5px;
//  width: 100px;
//  font-size: 0.8rem;
//  font-weight: lighter;
//  padding-top: 8px;
//  padding-bottom: 8px;
//}

.white-btn{
    background-color: #fff;
    border:1px solid #000;
    color:#000;
    border-radius: 5px;
    width: 100px;
    font-size: 0.8rem;
    font-weight: lighter;
    padding-top: 8px;
    padding-bottom: 8px;
}

.gray-btn{
    background-color: #fff;
    border:1px solid #bababa;
    color:#bababa;
    border-radius: 5px;
    width: 100px;
    font-size: 0.8rem;
    font-weight: lighter;
    padding-top: 8px;
    padding-bottom: 8px;
}

.new-order{
    text-align: center;
    padding:1rem 4rem 1rem 4rem;
}

.notif-icon{
    background-color:  rgba(119, 44 , 232, 0.1);
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: inline-block;
    padding-top: 10px;
}

.tNormal{
    font-weight: normal !important;
}

.tLighter{
    font-weight: lighter !important;
}

.tBold{
  font-weight: bold;
}

.no-border{
    border:none !important;
}

.mid-width{
  width: 65%;
}


/* SCROLLBAR */
* {
  scrollbar-width: thin;
  scrollbar-color: gray transparent;
}

/* Works on Chrome/Edge/Safari */
*::-webkit-scrollbar {
  width: 2px;
}

*::-webkit-scrollbar-track {
  background: transparent;
}
*::-webkit-scrollbar-track:hover *::-webkit-scrollbar{
  width: 6px;
}

*::-webkit-scrollbar-thumb {
  background-color: gray;
  border-radius: 20px;
  border: 3px solid transparent;
}

// *::-webkit-scrollbar-thumb:hover *::-webkit-scrollbar{
//   width: 6px;
// }
::-webkit-scrollbar:hover {
    width: 6px;
}
// FONT
@font-face {
    font-family: "icomoon";
    src: url("/assets/font/icomoon/icomoon.eot");
    src: url("/assets/font/icomoon/icomoon.eot?#iefix") format("embedded-opentype"), url("/assets/font/icomoon/icomoon.woff")
        format("woff"), url("/assets/font/icomoon/icomoon.ttf") format("truetype"), url("/assets/font/icomoon/icomoon.svg#icomoon")
        format("svg");
    font-weight: normal;
    font-style: normal;
  }


  [class^="icon-"], [class*=" icon-"] {
    /* use !important to prevent issues with browser extensions that change fonts */
    font-family: 'icomoon' !important;
    speak: never;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
  
    /* Better Font Rendering =========== */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  .icon-double-arrow:before {
    content: "\e90b";
    position:relative;
    top:3px;
  }

  .icon-shop:before {
  content: "\e90a";
  position:relative;
  top:3px;
  } 
  .icon-plus:before {
    content: "\e900";
    position:relative;
    top:3px;
  }
  .icon-bookmark:before {
    content: "\e901";
    position:relative;
    top:3px;
  }
  .icon-left-arrow:before {
    content: "\e902";
    position:relative;
    top:3px;
  }
  .icon-more:before {
    content: "\e903";
    position:relative;
    top:3px;
  }
  .icon-guide:before {
    content: "\e904";
    position:relative;
    top:3px;
  }
  .icon-right-arrow:before {
    content: "\e905";
    position:relative;
    top:3px;
  }
  .icon-cart:before {
    content: "\e906";
    position:relative;
    top:3px;
  }
  .icon-star:before {
    content: "\e907";
    position:relative;
    top:3px;
  }
  .icon-truck:before {
    content: "\e908";
    position:relative;
    top:3px;
  }
  .icon-user:before {
    content: "\e909";
    position:relative;
    top:3px;
  }

  //under construction
  .construction{
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  .construction img{
    width: 100%;
  }

  @font-face {
    font-family: IRANSans;
    font-style: normal;
    font-weight: 900;
    src: url('/assets/font/eot/IRANSansWeb(FaNum)_Black.eot');
    src: url('/assets/font/eot/IRANSansWeb(FaNum)_Black.eot?#iefix') format('embedded-opentype'), /* IE6-8 */ url('/assets/font/woff2/IRANSansWeb(FaNum)_Black.woff2') format('woff2'), /* FF39+,Chrome36+, Opera24+*/ url('/assets/font/woff/IRANSansWeb(FaNum)_Black.woff') format('woff'), /* FF3.6+, IE9, Chrome6+, Saf5.1+*/ url('/assets/font/ttf/IRANSansWeb(FaNum)_Black.ttf') format('truetype');
}

@font-face {
    font-family: IRANSans;
    font-style: normal;
    font-weight: bold;
    src: url('/assets/font/eot/IRANSansWeb(FaNum)_Bold.eot');
    src: url('/assets/font/eot/IRANSansWeb(FaNum)_Bold.eot?#iefix') format('embedded-opentype'), /* IE6-8 */ url('/assets/font/woff2/IRANSansWeb(FaNum)_Bold.woff2') format('woff2'), /* FF39+,Chrome36+, Opera24+*/ url('/assets/font/woff/IRANSansWeb(FaNum)_Bold.woff') format('woff'), /* FF3.6+, IE9, Chrome6+, Saf5.1+*/ url('/assets/font/ttf/IRANSansWeb(FaNum)_Bold.ttf') format('truetype');
}

@font-face {
    font-family: IRANSans;
    font-style: normal;
    font-weight: 500;
    src: url('/assets/font/eot/IRANSansWeb(FaNum)_Medium.eot');
    src: url('/assets/font/eot/IRANSansWeb(FaNum)_Medium.eot?#iefix') format('embedded-opentype'), /* IE6-8 */ url('/assets/font/woff2/IRANSansWeb(FaNum)_Medium.woff2') format('woff2'), /* FF39+,Chrome36+, Opera24+*/ url('/assets/font/woff/IRANSansWeb(FaNum)_Medium.woff') format('woff'), /* FF3.6+, IE9, Chrome6+, Saf5.1+*/ url('/assets/font/ttf/IRANSansWeb(FaNum)_Medium.ttf') format('truetype');
}

@font-face {
    font-family: IRANSans;
    font-style: normal;
    font-weight: 300;
    src: url('/assets/font/eot/IRANSansWeb(FaNum)_Light.eot');
    src: url('/assets/font/eot/IRANSansWeb(FaNum)_Light.eot?#iefix') format('embedded-opentype'), /* IE6-8 */ url('/assets/font/woff2/IRANSansWeb(FaNum)_Light.woff2') format('woff2'), /* FF39+,Chrome36+, Opera24+*/ url('/assets/font/woff/IRANSansWeb(FaNum)_Light.woff') format('woff'), /* FF3.6+, IE9, Chrome6+, Saf5.1+*/ url('/assets/font/ttf/IRANSansWeb(FaNum)_Light.ttf') format('truetype');
}

@font-face {
    font-family: IRANSans;
    font-style: normal;
    font-weight: 200;
    src: url('/assets/font/eot/IRANSansWeb(FaNum)_UltraLight.eot');
    src: url('/assets/font/eot/IRANSansWeb(FaNum)_UltraLight.eot?#iefix') format('embedded-opentype'), /* IE6-8 */ url('/assets/font/woff2/IRANSansWeb(FaNum)_UltraLight.woff2') format('woff2'), /* FF39+,Chrome36+, Opera24+*/ url('/assets/font/woff/IRANSansWeb(FaNum)_UltraLight.woff') format('woff'), /* FF3.6+, IE9, Chrome6+, Saf5.1+*/ url('/assets/font/ttf/IRANSansWeb(FaNum)_UltraLight.ttf') format('truetype');
}

@font-face {
    font-family: IRANSans;
    font-style: normal;
    font-weight: normal;
    src: url('/assets/font/eot/IRANSansWeb(FaNum).eot');
    src: url('/assets/font/eot/IRANSansWeb(FaNum).eot?#iefix') format('embedded-opentype'), /* IE6-8 */ url('/assets/font/woff2/IRANSansWeb(FaNum).woff2') format('woff2'), /* FF39+,Chrome36+, Opera24+*/ url('/assets/font/woff/IRANSansWeb(FaNum).woff') format('woff'), /* FF3.6+, IE9, Chrome6+, Saf5.1+*/ url('/assets/font/ttf/IRANSansWeb(FaNum).ttf') format('truetype');
}
  
</style>
