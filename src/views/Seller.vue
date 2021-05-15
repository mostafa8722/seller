<template>
  <div class="page">
    <!--        <div id="mySidebar" class="mini-title side" v-if="global.user.value.isLoggedIn " style="display:none">-->
    <!--          <button @click="closeSideBar" class="w3-bar-item w3-large">Close &times;</button>-->
    <!--            <side-bar></side-bar>-->
    <!--        </div>-->

    <!--    <div class="col-5 seller-logo-locker">-->
    <!--    </div>-->
    <div id="mySidenav" class="sidenav">
      <a href="javascript:void(0)" class="closebtn" @click="closeNav">&times;</a>
      <side-bar @chosen="closeNav"></side-bar>
    </div>


    <!--      :class="(!global.user.value.isLoggedIn ? 'full-width' : 'mini-title main')"-->
    <div style="height: 3000px" id="main" class="main">



      <!--      <seller-header v-if="global.user.value.isLoggedIn" :the-image="theImage"></seller-header>-->

      <div class="panel-header" v-if="global.user.value.isLoggedIn">
        <div class="">
          <!--                     <span style="font-size:20px;cursor:pointer" @click="openNav"-->
          <!--                           v-if="!IsSideBarOpened && global.user.value.isLoggedIn">&#9776; پروفایل فروشگاه </span>-->
          <!--          <div class="user-locker mini-title mr-2 ml-2" @click="openNav">-->
          <!--            <img style="width: 25px;height: 25px;" v-if="theImage.logo != null" :src="theImage.logo" alt="image">-->
          <!--          </div>-->
          <!--          <span v-if="global.user.value.isLoggedIn" class="mini-title user-title p-0 m-0">-->
          <!--            {{ (global.user.value.name != "") ? global.user.value.name : 'نام فروشگاه' }}-->
          <!--          </span>-->
          <v-row >
            <v-col :cols="3" :md="1" :sm="1">
              <div class="user-locker mini-title mr-2 ml-2" @click="openNav">
                <img style="width: 25px;height: 25px;cursor: pointer" v-if="theImage.logo != null" :src="theImage.logo"
                     alt="image">
              </div>
            </v-col>
            <v-col :cols="8" :md="10" :sm="8" style="align-self: center;font-weight: bold;font-size: 12px;}">
              {{ (global.user.value.name != "") ? global.user.value.name : 'نام فروشگاه' }}
            </v-col>
            <v-col cols="1">
              <v-btn icon  depressed style="color: rgb(119, 44, 232);
    background: rgb(119, 44, 232);
    float: left;">
                <svg style="width:20px;height:20px;color: white" viewBox="0 0 24 24">
                  <path fill="currentColor"
                        d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/>
                </svg>
                <a style="color: white;font-size: 10px" href="tel:+900300400">
                </a>
              </v-btn>
            </v-col>
          </v-row>

        </div>
      </div>
      <router-view></router-view>
    </div>
    <div class="navbar" v-if="global.user.value.isLoggedIn">
      <a href="/seller/dashboard">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path fill="currentColor" d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"/>
        </svg>
        <br>خانه</a>
      <a href="/seller/products">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path fill="currentColor"
                d="M5.06 3C4.63 3 4.22 3.14 3.84 3.42C3.46 3.7 3.24 4.06 3.14 4.5L2.11 8.91C1.86 10 2.06 10.92 2.69 11.73C2.81 11.85 2.93 11.97 3.04 12.07C3.63 12.64 4.28 13 5.22 13C6.16 13 6.91 12.59 7.47 12.05C8.1 12.67 8.86 13 9.8 13C10.64 13 11.44 12.63 12 12.07C12.68 12.7 13.45 13 14.3 13C15.17 13 15.91 12.67 16.54 12.05C17.11 12.62 17.86 13 18.81 13C19.76 13 20.43 12.65 21 12.06C21.09 11.97 21.18 11.87 21.28 11.77C21.94 10.95 22.14 10 21.89 8.91L20.86 4.5C20.73 4.06 20.5 3.7 20.13 3.42C19.77 3.14 19.38 3 18.94 3M18.89 4.97L19.97 9.38C20.06 9.81 19.97 10.2 19.69 10.55C19.44 10.86 19.13 11 18.75 11C18.44 11 18.17 10.9 17.95 10.66C17.73 10.43 17.61 10.16 17.58 9.84L16.97 5M5.06 5H7.03L6.42 9.84C6.3 10.63 5.91 11 5.25 11C4.84 11 4.53 10.86 4.31 10.55C4.03 10.2 3.94 9.81 4.03 9.38M9.05 5H11V9.7C11 10.05 10.89 10.35 10.64 10.62C10.39 10.88 10.08 11 9.7 11C9.36 11 9.07 10.88 8.84 10.59C8.61 10.3 8.5 10 8.5 9.66V9.5M13 5H14.95L15.5 9.5C15.58 9.92 15.5 10.27 15.21 10.57C14.95 10.87 14.61 11 14.2 11C13.89 11 13.61 10.88 13.36 10.62C13.11 10.35 13 10.05 13 9.7M3 14.03V19C3 20.11 3.89 21 5 21C9.67 21 14.33 21 19 21C20.1 21 21 20.11 21 19V14.05C20.45 14.63 19.75 14.96 19 15C18 15.03 17.25 14.74 16.54 14.05C15.94 14.65 15.14 15 14.3 15C13.4 15 12.6 14.64 12 14.07C11.43 14.64 10.65 15 9.78 15C8.87 15 8.07 14.65 7.47 14.05C6.89 14.64 6.1 15 5.23 15C4.33 15 3.66 14.65 3 14.03Z"/>
        </svg>
        <br>محصولات</a>
      <a href="/seller/orders">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path fill="currentColor"
                d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z"/>
        </svg>
        <br>سفارش ها</a>
      <a href="/seller/financials">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path fill="currentColor"
                d="M21,18V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5A2,2 0 0,1 5,3H19A2,2 0 0,1 21,5V6H12C10.89,6 10,6.9 10,8V16A2,2 0 0,0 12,18M12,16H22V8H12M16,13.5A1.5,1.5 0 0,1 14.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,12A1.5,1.5 0 0,1 16,13.5Z"/>
        </svg>
        <br>مالی</a>
    </div>

  </div>
</template>

<script>
import SideBar from '../components/Seller/SideBar'
import IconImage from '../components/Common/icon'
import SellerHeader from '../components/Seller/Header'
import {computed, inject, onMounted, ref} from "@vue/composition-api";
import Service from "../utils/seller-service";

export default {
  components: {
    SideBar,
    IconImage,
    SellerHeader
  },
  data: () => ({
    showModal: false,
    showSideBar: false,
    IsSideBarOpened: false
  }),
  inject: ['global'],
  methods: {
    myEventHandler(e) {
      document.getElementById("mySidenav").style.height = "0px";
      document.getElementById("main").style.marginTop = "0px";


      if (document.body.scrollWidth < 700) {
        document.getElementById("mySidenav").style.width = "100%";
      } else {
        document.getElementById("mySidenav").style.width = "0px";
      }

      document.getElementById("main").style.marginRight = "0px";
      this.IsSideBarOpened = false
    },
    toggleModal: function () {
      this.showModal = !this.showModal
    },
    openNav() {


      if (document.body.scrollWidth < 700) {
        document.getElementById("mySidenav").style.height = "400px";
        document.getElementById("main").style.marginTop = "400px";
      } else {
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("main").style.marginRight = "250px";
      }

      this.IsSideBarOpened = true
    },
    closeNav() {

      if (document.body.scrollWidth < 700) {
        document.getElementById("mySidenav").style.height = "0px";
        document.getElementById("main").style.marginTop = "0px";
      } else {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginRight = "0px";
      }

      this.IsSideBarOpened = false
    }
  },
  created() {
    window.addEventListener("resize", this.myEventHandler);
  },
  destroyed() {
    window.removeEventListener("resize", this.myEventHandler);
  },
  setup() {
    const global = inject('global')
    const authService = computed(() => {
      return Service(true)
    })
    const theImage = ref({logo: null, banner: null, licence: null})
    const getImage = (e, k) => {
      switch (k) {
        case 1:
          logoImage.value.logo = e.target.files[0]
          theImage.value.logo = URL.createObjectURL(e.target.files[0])
          fData.value.append('logo', logoImage.value.logo)
          break;
        case 2:
          logoImage.value.banner = e.target.files[0]
          theImage.value.banner = URL.createObjectURL(e.target.files[0])
          fData.value.append('banner', logoImage.value.banner)
          break;
        case 3:
          logoImage.value.licence = e.target.files[0]
          theImage.value.licence = URL.createObjectURL(e.target.files[0])
          fData.value.append('licence', logoImage.value.licence)
          break;
        default:
          break;
      }
    }
    onMounted(() => {
      authService.value.receive('seller/base', {}, (s, d) => {
        if (s == 200) {

          console.log(d.data)
          global.user.value.sellerId = d.data.id

          // if (d.data.specification != null && d.data.desc != null) {
          //   descs.value.fields[0].value.value = d.data.specification
          //   descs.value.fields[1].value.value = d.data.desc
          // }
          if (d.data.status != 4) {
            this.verified = false
          }
        }
      }, (s, e) => {
      })


      authService.value.receive('seller/base/image', {}, (s, d) => {
        if (s == 200) {
          if (d.data != [] && d.data != null) {
            theImage.value = {logo: d.data.logo, banner: d.data.banner, licence: d.data.licence}
          }
        }
      }, (s, e) => {
      })


    })


    return {
      getImage,
      theImage,
    }

  },

}
</script>
<style>
@media only screen and (min-width: 700px) {
  .sidenav {
    height: 100% !important;
    width: 0;
    position: fixed;
    z-index: 1;
    top: 0;
    right: 0;
    background-color: #111;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 60px;
  }

  .sidenav a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 18px;
    color: #818181;
    display: block;
    transition: 0.3s;
  }
}

@media only screen and (max-width: 700px) {
  .sidenav {
    width: 100%;
    height: 0;
    position: absolute;
    z-index: 1;
    top: 0;
    /*right: 0;*/
    background-color: #111;
    overflow-x: hidden;
    transition: 0.5s;
    /*padding-top: 60px;*/
  }

  .sidenav a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 12px;
    color: #818181;
    display: block;
    transition: 0.3s;
  }
}

.sidenav a:hover {
  color: #f1f1f1;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }

  .sidenav a {
    font-size: 18px;
  }
}


html {
  background-color: #101924;
}

button:hover {
  cursor: pointer;
}

.page {
  width: 100%;
  padding: 0px;
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
}

.mini-title {
  display: inline-block;
  margin: 0px;
}

.block {
  display: block;
}

.full-width {
  width: 100% !important;
}

.side {
  width: 15vw;
  height: 100%;
  margin: 0px;
  position: absolute;
  top: 0px;
  right: 0px;
}

/*.main {*/
/*  width: 85vw;*/
/*  margin: 0px;*/
/*  background-color: #EEEEEE;*/
/*  position: relative;*/
/*  top: 0px;*/
/*  right: 15vw;*/
/*}*/

.menu-section {
  background: none;
  width: 100%;
  height: auto;
  padding: 10px 20px 0px 20px;
}

.purple-btn {
  background-color: #772CE8;
  color: #fff;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 5px 0px rgba(119, 44, 232, 0.6);
  width: 100px;
  font-size: 0.8rem;
  font-weight: lighter;
  padding-top: 8px;
  padding-bottom: 8px;
}

.white-btn {
  background-color: #fff;
  border: 1px solid #000;
  color: #000;
  border-radius: 5px;
  width: 100px;
  font-size: 0.8rem;
  font-weight: lighter;
  padding-top: 8px;
  padding-bottom: 8px;
}

.new-order {
  text-align: center;
  padding: 1rem 4rem 1rem 4rem;
}

.notif-icon {
  background-color: rgba(119, 44, 232, 0.1);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: inline-block;
  padding-top: 10px;
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

</style>
<style scoped>
.navbar {
  overflow: hidden;
  background-color: gainsboro;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 100;
}

.navbar a {
  float: left;
  display: block;
  color: black;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.navbar a:hover {
  background: #ddd;
  color: #772CE8;
  z-index: 100;
}

.main {
  padding: 16px;
  margin-bottom: 200px!important;
  margin-top: 30px;
  height: fit-content!important;
}

.main {
  width: 100% !important;
  margin: 0px;
  background-color: #F5F5F5 !important;
  position: initial !important;
  /* top: 0px; */
  /* right: 15vw; */
}

.panel-header {
  width: 100%;
  background-color: #fff;
  box-shadow: 0px 1px 10px 0px rgba(127, 127, 127, 0.15);
  padding: 15px 18px 15px 18px;
  font-size: 0.85rem;
  font-weight: lighter;
  height: 60px;
}

.notif {
  position: relative;
}

.notif span {
  width: 14px;
  height: 14px;
  background-color: #000;
  border-radius: 50%;
  position: absolute;
  right: -4px;
  top: -7px;
  color: #fff;
}

.notif span p {
  font-size: 0.7rem;
  font-weight: lighter;
}

.user-locker {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #772CE8;
}

.user-image {
  width: 100%;
}
</style>