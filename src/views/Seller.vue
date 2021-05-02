<template>
  <div class="page">
    <!--        <div id="mySidebar" class="mini-title side" v-if="global.user.value.isLoggedIn " style="display:none">-->
    <!--          <button @click="closeSideBar" class="w3-bar-item w3-large">Close &times;</button>-->
    <!--            <side-bar></side-bar>-->
    <!--        </div>-->
    <!--        <div id="main" class="" :class="(!global.user.value.isLoggedIn ? 'full-width' : 'mini-title main')">-->
    <!--        -->
    <!--            <seller-header v-if="global.user.value.isLoggedIn"></seller-header>-->
    <!--            <router-view></router-view>-->
    <!--        </div>-->
    <div class="col-5 seller-logo-locker">
    </div>
    <div id="mySidenav" class="sidenav">
      <a href="javascript:void(0)" class="closebtn" @click="closeNav">&times;</a>
      <side-bar @chosen="closeNav"></side-bar>
    </div>

    <!--      :class="(!global.user.value.isLoggedIn ? 'full-width' : 'mini-title main')"-->
    <div id="main">
      <!--      <seller-header v-if="global.user.value.isLoggedIn" :the-image="theImage"></seller-header>-->

      <div class="panel-header">
        <div class="">
           <span style="font-size:20px;cursor:pointer" @click="openNav"
                 v-if="!IsSideBarOpened && global.user.value.isLoggedIn">&#9776; پروفایل فروشگاه </span>
          <div v-if="global.user.value.isLoggedIn" class="info d-flex align-items-center" style="float:left;">
            <!--                <div class="mini-title notif">-->
            <!--                    <icon-image address="/assets/site/images/seller-icons/bell.svg" classes="big"></icon-image>-->
            <!--                    <span class="notif-number d-flex align-items-centerc justify-content-center">-->
            <!--                        <p class="mini-title p-0 m-0">1</p>-->
            <!--                    </span>-->
            <!--                </div>-->
            <div class="user-locker mini-title mr-2 ml-2">
              <img style="width: 25px;height: 25px;" v-if="theImage.logo != null" :src="theImage.logo" alt="image">
            </div>
            <p class="mini-title user-title p-0 m-0">
              {{ (global.user.value.name != "") ? global.user.value.name : 'نام فروشگاه' }}
            </p>
          </div>
        </div>
      </div>
      <router-view></router-view>
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
        document.getElementById("mySidenav").style.height = "750px";
        document.getElementById("main").style.marginTop = "750px";
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

.main {
  width: 85vw;
  margin: 0px;
  background-color: #EEEEEE;
  position: relative;
  top: 0px;
  right: 15vw;
}

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