<template>
<div class="new-header sticky-top" id="newHeader">
        <div class="modal fade" id="userAuthModal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="auth-modal-header">
                    <div class="full-width d-flex justify-content-between">
                        <h5 class="modal-title">ورود / عضویت</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
                <div class="modal-body p-5" v-if="!loading">
                    <div v-if="authStep == 0">
                        <custom-input kind="text" key="1" container="full-width" classes="full-width" v-bind:theModel.sync="phoneNumber" label="لطفا شماره ی تلفن همراه خود را وارد کنید:" placeholder="شماره موبایل"></custom-input>
                    </div>
                    <div v-else-if="authStep == 1">
                        <custom-input kind="text" key="2" container="full-width" classes="full-width" v-bind:theModel.sync="code" label="لطفا کد ارسال شده را وارد کنید" placeholder="کد"></custom-input>
                        <button class="purple-btn mt-3" @click="requestResendCode">ارسال مجدد کد</button>
                    </div>
                    <div v-else-if="authStep == 2">
                        <custom-input kind="text" key="3" container="full-width" classes="full-width" v-bind:theModel.sync="fullName" :label="(isSeller ? 'نام فروشگاه' : 'نام و نام خانوادگی')" placeholder=""></custom-input>
                        <custom-input kind="text" key="4" container="full-width mt-3" classes="full-width" theType="password" v-bind:theModel.sync="password" label="کلمه ی عبور" placeholder=""></custom-input>
                        <custom-input kind="text" key="5" container="full-width mt-3" classes="full-width" theType="password" v-bind:theModel.sync="rePassword" label="تکرار کلمه ی عبور" placeholder=""></custom-input>
                    </div>
                    <div v-else-if="authStep == 3">
                        <custom-input kind="text" key="6" container="full-width" classes="full-width" v-bind:theModel.sync="phoneNumber" label="لطفا شماره ی تلفن همراه خود را وارد کنید:" placeholder="شماره موبایل"></custom-input>
                        <custom-input kind="text" key="7" container="full-width mt-3" classes="full-width" theType="password" v-bind:theModel.sync="password" label="کلمه ی عبور" placeholder=""></custom-input>
                    </div>
                    <div v-else-if="authStep == 4">
                        <custom-input kind="text" key="8" container="full-width mt-3" classes="full-width" theType="password" v-bind:theModel.sync="password" label="لطفا کلمه ی عبور خود را وارد کنید" placeholder="کلمه ی عبور"></custom-input>
                        <button class="btn auth-btn mt-3" @click="handleForgetPassword">فراموشی کلمه ی عبور</button>    
                    </div>
                    <div v-else-if="authStep == 5">
                        <custom-input kind="text" key="2" container="full-width" classes="full-width" v-bind:theModel.sync="code" label="لطفا کد ارسال شده را وارد کنید" placeholder="کد"></custom-input>
                    </div>
                    <div v-else-if="authStep == 6">
                        <custom-input kind="text" key="9" container="full-width mt-3" classes="full-width" theType="password" v-bind:theModel.sync="password" label="لطفا کلمه ی عبور جدید خود را وارد کنید" placeholder="کلمه ی عبور جدید"></custom-input>    
                        <custom-input kind="text" key="5" container="full-width mt-3" classes="full-width" theType="password" v-bind:theModel.sync="rePassword" label="تکرار کلمه ی عبور" placeholder=""></custom-input>
                    </div>
                </div>
                <div class="modal-body p-5" v-else>
                    <div class="loading d-flex justify-content-center">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn auth-btn" @click="handleAuth">ارسال</button>
                    <button type="button" id="closeModalButton" class="btn close-auth-btn" data-dismiss="modal">بستن</button>
                </div>
                </div>
            </div>
        </div>
  <div class="banner-top p-1">
    <p class="mini-title">درصد تخفیف برای برخی از محصولات در فروشگاه های تهران</p>
    <a href="" class="mini-title">مشاهده ی بیشتر</a>
  </div>
    <nav class="navbar navbar-expand-lg sticky-top navbar-light pl-5 pr-3">
  <a class="navbar-brand" href="#"><span class="icon-circle-right"></span></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav ml-auto">
          <li class="nav-item ml-4 active" @click="()=>selectUserType(true)">
                                <router-link
                            to=""
                            class="nav-link btn-login pt-1"
                            data-toggle="modal"
                            data-target="#userAuthModal"
                        >
                            <img src="/assets/site/images/icon/user.svg" class="nav-image" alt="">
                            <p>{{(global.user.value.name == "" ? 'ورود / عضویت فروشنده' : global.user.value.name)}}</p>
                        </router-link>
      </li>
          <li class="nav-item ml-4 active">
              <router-link class="nav-link pt-1" to="/faq">
                <img src="/assets/site/images/icon/guide.svg" class="nav-image" alt="">
                <p>راهنما</p>
              </router-link>
      </li>
    </ul>
    <router-link to="/">
        <div class="golpino-logo d-flex justify-content-center">
            <img src="/assets/site/images/golpino-logo.png" class="nav-image" alt="">
        </div>
    </router-link>
    <ul class="navbar-nav mr-auto">
      <li class="nav-item ml-4 active" @click="()=>selectUserType(false)">
                                <router-link
                                id="letUserLogin"
                            to=""
                            class="nav-link btn-login pt-1"
                            data-toggle="modal"
                            data-target="#userAuthModal"
                        >
                            <img src="/assets/site/images/icon/user.svg" class="nav-image" alt="">
                            <p>{{(global.user.value.name == "" ? 'ورود / عضویت مشتری' : global.user.value.name)}}</p>
                        </router-link>
      </li>
      <li class="nav-item ml-4 active animate__animated" id="theCart">
        <a class="nav-link pt-1" id="theCart" href="#" @click="()=>toggleCart(false)">
            <div class="cart-count" v-if="cartItems.length>=1">{{cartItems.length}}</div>
            <img src="/assets/site/images/icon/basket.svg" class="nav-image" alt="">
            <p>سبد خرید</p>
            <div class="cart-tooltip" id="wholeTooltip">
                <div class="tooltiptext" id="cartTooltip">
                    <div class="tooltop d-flex justify-content-between">
                        <p class="mini-title">{{cartItems.length}} محصول</p>
                        <a href="aaa">مشاهده سبد خرید</a>
                    </div>
                    <div class="tooltip-items">
                        <cart-item v-for="(theItem,i) in cartItems" :key="i" :theItem="theItem"></cart-item>
                    </div>
                    <div class="tooltip-tools pt-1 d-flex justify-content-between">
                        <div class="mini-title">
                            <p class="tLighter">مبلغ قابل پرداخت</p>
                            <p class="tNormal">{{totalPrice}} تومان</p>
                        </div>
                        <button class="purple-btn" @click="()=>toggleCart(true)">ثبت سفارش</button>
                    </div>
                </div>
            </div>
        </a>
      </li>
    </ul>
  </div>
  <!-- <div class="shadow-banner"></div> -->
</nav>

</div>
</template>
<script>
import CartItem from "./CartItem"
import {ref,computed,inject,onMounted, watch} from "@vue/composition-api"
import EventBus from "../../../EventBus/EventBus"
import CustomInput from "../../Common/CustomInput"
import Service from "../../../utils/service"
import $ from 'jquery'
export default {
    props:['userType'],
    components:{
        CartItem,
        CustomInput
    },
    mounted(){
        EventBus.$on('hideCart',()=>{
            this.toggleCart(false)
        })
        console.log("global",this.global)
        document.getElementById('wholeTooltip').addEventListener('click',function (event){
            event.stopPropagation();
        });
        $('#userAuthModal').on('hidden.bs.modal', function () {
            document.getElementById('newHeader').classList.add('sticky-top')
        })
    },
    setup(props,context){
        onMounted(()=>{
            $('#userAuthModal').on('hidden.bs.modal', function () {
                authStep.value = 0
                phoneNumber.value = {value:null,valid:true}
                code.value = {value:"",valid:true}
                fullName.value = {value:null,valid:true}
                password.value = {value:null,valid:true}
                rePassword.value = {value:null,valid:true}
            })
            if(isLoggedIn.value && !isSeller.value){
                authService.value.transmit('user/baseinfo',{},(s,d)=>{
                    global.setUserName(d.data.full_name)
                },(s,e)=>{

                })
            }
        })
        const cookieFinder = () =>
            {
                let match = document.cookie.match(new RegExp('(^| )' + 'Golpino_token' + '=([^;]+)'));
                if (match) {
                 return match[2]
                }
                else{
                    return 'no-auth'
                }
            }
        const isLoggedIn = ((cookieFinder() == 'no-auth' || cookieFinder() == '') ? ref(false) : ref(true))
        // component
        const displayCart = ref(false)
        const loading = ref(false)
        const stateValues = inject('stateValues')
        const cartItems = computed(()=>{
            return stateValues.shoppingCart.value
        })
        const totalPrice = computed(()=>{
            return stateValues.totalPrice.value
        })
        const theService = computed(()=>{
            return Service(false)
        })
        const numberOfItems = computed(()=>{
            return cartItems.value.length
        })
        watch(numberOfItems,(n,o)=>{
            document.getElementById('theCart').classList.remove('animate__swing')
            setTimeout(()=>{
                document.getElementById('theCart').classList.add('animate__swing')
            },200)
        })
        const isSeller = ref(false)
        const authService = computed(()=>{
            return Service(true)
        })
        const user = ref("")
        const hasShop = ()=>{
            return false
        }

        const authStep = ref(0)
        const global = inject("global")
        const userName = ref(global.user.value.name)
        // AUTH
        const phoneNumber = ref({value:null,valid:true})
        const code = ref({value:"",valid:true})
        const fullName = ref({value:null,valid:true})
        const password = ref({value:null,valid:true})
        const rePassword = ref({value:null,valid:true})


        // AUTH
        const handleAuth = () => {
            loading.value = true
            switch (authStep.value) {
                case 0:
                    checkUserExists()
                    break;
                case 1:
                    checkCode()
                    break;
                case 2:
                    finalizeRegistration()
                    break;
                case 3:
                    checkUserExists()
                    break;
                case 4:
                    login()
                    break;
                case 5:
                    checkCode()
                    break;
                case 6:
                    resetPassword()
                default:
                    break;
            }
        }
        const handleError = (server,e) => {
            loading.value = false
            if(!server){
                console.log({e})
                switch (authStep.value) {
                    case 0:
                        phoneNumber.value.valid = false
                        phoneNumber.value.message = e.response.data.error.invalid_params[0].message
                        break;
                    case 1:
                        code.value.valid = false
                        code.value.message = "کد وارد شده صحیح نیست"
                        break;
                    case 5:
                        code.value.valid = false
                        code.value.message = "کد وارد شده صحیح نیست"
                        break;
                    case 4:
                        password.value.valid = false
                        password.value.message = e.response.data.error.message
                    default:
                        break;
                }
            }
        }
        const handleForgetPassword = () => {
            let f = new FormData()
            f.append("mobile",phoneNumber.value.value)
            if(!isSeller.value)
                theService.value.transmit('user/register/resendcode',f,resendReceived,handleError)
            else
                theService.value.transmit('seller/register/resendcode',f,resendReceived,handleError)
        }

        const mobileReceived = (status,data) =>{
            loading.value = false
            if(!phoneNumber.value.valid){
            phoneNumber.value.valid = true
            phoneNumber.value.message = ""
            }
            if(data.data.status == 1)
            authStep.value++
            else if(data.data.status == 2)
            authStep.value = authStep.value + 2
            else if(data.data.status == 3 || data.data.status == 4)
            authStep.value = 4
        }

        const codeReceived = (status,data) =>{
            loading.value = false
            if(!code.value.valid){
                code.value.valid = true
                code.value.message = ""
            }
            global.setUserAuth(data.data.token)
            $cookies.set("Golpino_token",data.data.token)
            authService.value = Service(true)
            authStep.value++
        }

        const resendReceived = (status,data) => {
            // global.setUserAuth(data.data.token)
            // $cookies.set("Golpino_token",data.data.token)
            loading.value = false
            if (status == 200)
                authStep.value = 5
        }


        const successfulRegister = (status,data) =>{
            loading.value = false
            document.getElementById('closeModalButton').click()
            global.setUserName(fullName.value.value)
            global.toggleLogin(true)
            if(isLoggedIn.value && !isSeller.value){
                authService.value.transmit('user/baseinfo',{},(s,d)=>{
                    global.setUserName(d.data.full_name)
                },(s,e)=>{

                })
            }
            isLoggedIn.value = true
            console.log({status})
            console.log({data})
        }

        const successfulReset = (status,data)=>{
            loading.value = false
            document.getElementById('closeModalButton').click()
        }

        const successfulLogin = (status,data) => {
            loading.value = false
            document.getElementById('closeModalButton').click()
            // global.setUserAuth(data.data.token)
            // global.setUserName(data.data.full_name)
            $cookies.set("Golpino_token",data.data.token)
            global.toggleLogin(true)
            authService.value = Service(true)
            global.setUserName(data.data.full_name)
            isLoggedIn.value = true
            if(isSeller.value){
                context.root.$router.push('/seller/settings')
            }
        }


        const checkUserExists = () => {
            let f = new FormData()
            f.append("mobile",phoneNumber.value.value)
            if(!isSeller.value)
                theService.value.transmit('user/register/checkuser',f,mobileReceived,handleError)
            else
                theService.value.transmit('seller/register/checkseller',f,mobileReceived,handleError)
        }
        const checkCode = () => {
            let f = new FormData()
            f.append("code",parseInt(code.value.value))
            f.append("mobile",phoneNumber.value.value)
            if(!isSeller.value)
                theService.value.transmit('user/register/checkcode',f,codeReceived,handleError)
            else
                theService.value.transmit('seller/register/checkcode',f,codeReceived,handleError)
        }
        const login = () => {
            let f = new FormData()
            f.append("password",password.value.value)
            f.append("mobile",phoneNumber.value.value)
            if(!isSeller.value)
                theService.value.transmit('user/login',f,successfulLogin,handleError)
            else
                theService.value.transmit('seller/login',f,successfulLogin,handleError)
        }
        const resendCode = () => {
            let f = new FormData()
            f.append("mobile",phoneNumber.value.value)
            if(!isSeller.value)
                theService.value.transmit('user/register/resendcode',f,resendReceived,handleError)
            else
                theService.value.transmit('seller/register/resendcode',f,resendReceived,handleError)
        }

        const requestResendCode = () => {
            let f = new FormData()
            f.append("mobile",phoneNumber.value.value)
            if(!isSeller.value)
                theService.value.transmit('user/register/resendcode',f,()=>{loading.value = false},handleError)
            else
                theService.value.transmit('seller/register/resendcode',f,()=>{loading.value = false},handleError)
        }

        const resetPassword = (status,data) => {
            let f = new FormData()
            if(rePassword.value.value == password.value.value){
                f.append("password",password.value.value)
                f.append("c_password",rePassword.value.value)
                if(!isSeller.value)
                    authService.value.transmit('user/newpassword',f,successfulReset,handleError)
                else
                    authService.value.transmit('seller/newpassword',f,successfulReset,handleError)
            }
            else{
                rePassword.value.valid = false
                rePassword.value.message = 'مقادیر کلمه ی عبور با یکدیگر تطابق ندارد'
            }
        }
        const finalizeRegistration = () => {
            if(password.value.value == rePassword.value.value){
                rePassword.value.valid = true
                rePassword.value.message = ""
                let f = new FormData()
                f.append("password",password.value.value)
                if(!isSeller.value){
                    f.append("full_name",fullName.value.value)
                    authService.value.transmit('user/register/addinfo',f,successfulRegister,handleError)
                }
                else{
                    f.append("name",fullName.value.value)
                    authService.value.transmit('seller/register/addinfo',f,successfulRegister,handleError)
                }
            }
            else{
                loading.value = false
                rePassword.value.valid = false
                rePassword.value.message = "مقادیر وارد شده با یکدیگر مطابقت ندارد"
            }
        }


        // component
        const toggleCart = (l) => {
            displayCart.value = !displayCart.value
            if(displayCart.value){
                document.getElementById('cartTooltip').style.visibility = 'visible'
                context.emit('blackDrop',true)
            }
            else{
                document.getElementById('cartTooltip').style.visibility = 'hidden'
                if(l){
                    context.emit('blackDrop',false)
                    if(isLoggedIn.value)
                        context.root.$router.push('/user/payment')
                    else{
                        global.alertToggle('لطفا ابتدا وارد حساب کاربری شوید')
                        setTimeout(()=>{
                            // $('#userAuthModal').modal('toggle');
                            document.getElementById('letUserLogin').click()
                        },1000)
                    }
                }
            }
        }
        const selectUserType = (t) => {
            document.getElementById('newHeader').classList.remove('sticky-top')
            isSeller.value = t
        }
        

        return {isLoggedIn,loading,cartItems,totalPrice,requestResendCode,isSeller,selectUserType,global,toggleCart,displayCart,code,fullName,password,rePassword,phoneNumber,user,hasShop,authStep,handleAuth,theService,handleForgetPassword}
    }
};
</script>
<style lang="scss" scoped>
.new-header{
    -webkit-box-shadow: 0px 3px 14px 0px rgba(179,179,179,0.15);
-moz-box-shadow: 0px 3px 14px 0px rgba(179,179,179,0.15);
box-shadow: 0px 3px 14px 0px rgba(179,179,179,0.15);
top: 0px;
right:0px;
}
.mini-title{
  display: inline-block;
}

.loading {
  $colors: #a681de, #9767e0, #8647e6, #772CE8, #6007e6;
  display: flex;

  .dot {
    position: relative;
    width: 2em;
    height: 2em;
    margin: 0.8em;
    border-radius: 50%;

    &::before {
      position: absolute;
      content: "";
      width: 100%;
      height: 100%;
      background: inherit;
      border-radius: inherit;
      animation: wave 2s ease-out infinite;
    }

    @for $i from 1 through 5 {
      &:nth-child(#{$i}) {
        background: nth($colors, $i);

        &::before {
          animation-delay: $i * 0.2s;
        }
      }
    }
  }
}

@keyframes wave {
  50%,
  75% {
    transform: scale(2.5);
  }

  80%,
  100% {
    opacity: 0;
  }
}

.banner-top{
  background-color: #000000;
  color: #fff;
  text-align: center;
}

.banner-top a{
  color: #fff;
}

.navbar {
  background-color: #ffffff;
  padding:14px 0px 0px 0px;
  font-size: 0.7rem;
}

.shadow-banner{
    width: 65vw;
    height: 10px;
    position: absolute;
    bottom:0px;
    right:0px;
    background-color: coral;
    opacity: 0.4;
}
.nav-link{
    padding: 0px;
    text-align: center;
}

.cart-count{
    position: absolute;
    top:-7px;
    left: 50%;
    height: 17px;
    width: 17px;
    border-radius: 50%;
    color: #fff;
    background-color: #9147FF;
    text-align: center;
    transition-property: all;
    transition-duration: .1s;
    transition-timing-function:ease-in-out;
}

.nav-link span{
  font-size: 1.2rem;
}

.nav-image{
    position: relative;
    bottom: 0;
    transition-property: all;
    transition-duration: .1s;
    transition-timing-function:ease-in-out;
}


.nav-link:hover .nav-image{
    bottom: 7px;
}

.nav-link:hover .cart-count{
    top:-14px;
}

/* CART TOOL TIP */
#theCart{
    position: relative;
}
.cart-tooltip {
  position: absolute;
  bottom: -30%;
  left:55%;
  display: inline-block;
  border-bottom: 1px dotted black;
  z-index: 3;
}

.tooltop{
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(179,179,179,0.3);
}

.cart-tooltip .purple-btn{
    padding-top:0.75rem !important;
    padding-bottom:0.75rem !important;
    font-weight: lighter !important;
    font-size: 0.8rem !important;
    /* height: 60%; */
    margin-top: auto;
    margin-bottom: auto;
    min-width:50% !important;
}

.cart-tooltip .tooltiptext {
  visibility: hidden;
  width: 25vw;
  background-color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  padding:1rem;
  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  top: 100%;
  left: 50%;
  margin-left: -60px;
}

.cart-tooltip .tooltiptext::after {
  content: " ";
  position: absolute;
  bottom: 100%;  /* At the top of the tooltip */
  left: 18%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent #fff transparent;
}

.cart-tooltip:hover .tooltiptext {
  visibility: visible;
}

.tooltip-tools p{
    font-size: 1rem;
}

/* AUTH MODAL */
.auth-modal-header{
    padding:1rem 2rem 1rem 2rem;
    border-bottom: 1px solid rgba(179,179,179,0.3);
}

.auth-btn{
    background-color: #772CE8;
    color: #fff;
    border:none;
    border-radius: 5px;
    box-shadow: 1px 1px 5px 0px rgba(119, 44 , 232, 0.6);
    font-size: 1rem;
    font-weight: lighter;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
}

.auth-btn:hover{
    background-color: #fff;
}

.golpino-logo{
    height: 70px;
}

.golpino-logo:hover{
    cursor: pointer;
}

.golpino-logo img{
    height: 100%;
}
</style>