<template>
  <div>
    <Header @blackDrop="dropper"></Header>
    <router-view/>
    <Footer></Footer>
    <div v-if="drop" class="blackDrop" @click="hideDrop">
    </div>
    <div v-if="global.state.alert" class="alertAll animate__animated animated__backInRight">
      <p>{{global.state.message}}</p>
    </div>
  </div>
</template>
<script>
import Header from "./Main/Layout/NewHeader"
import Footer from "./Main/Layout/NewFooter"
import EventBus from "../EventBus/EventBus"
export default {
  data:()=>({
    drop:false
  }),
  components:{
    Header,
    Footer
  },
  inject:['global'],
  methods:{
    dropper:function(t){
      this.drop=!this.drop
    },
    hideDrop:function(){
      this.drop=!this.drop
      EventBus.$emit('hideCart')
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
  padding:1rem 2rem 1rem 2rem;
  background-color:#772CE8 ;
  color: #fff;
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

.no-border{
    border:none !important;
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
*::-webkit-scrollbar-thumb {
  background-color: gray;
  border-radius: 20px;
  border: 3px solid transparent;
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
