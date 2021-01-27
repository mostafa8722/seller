<template>
    <div class="user-profile">
        <div class="row">
            <div class="col-3 user-side-bar">
                <ul>
                    <router-link to="/profile/info">
                        <li class="user-side-control active" @click="()=>userMenuController(1)" id="usc1">
                            <icon-image address="/assets/site/images/seller-icons/user.svg" classes="m-1 big"></icon-image>
                            اطلاعات کاربری
                        </li>
                    </router-link>
                    <router-link to="/profile/orders">
                        <li class="user-side-control" @click="()=>userMenuController(2)" id="usc2">
                            <icon-image address="/assets/site/images/seller-icons/shopping-bag.svg" classes="m-1 big"></icon-image>
                            سفارشات
                        </li>
                    </router-link>
                    <li class="user-side-control" @click="()=>userMenuController(3)" id="usc3">
                        <icon-image address="/assets/site/images/seller-icons/logout.svg" classes="m-1 big"></icon-image>
                        خروج از حساب کاربری
                    </li>
                </ul>
            </div>
            <div class="col-9 user-control-section">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import IconImage from "../../Common/icon"
import { computed,ref,inject, onUpdated, onMounted} from "@vue/composition-api"
import OrderSummary from "../Orders/Summary"
import UserInfo from "./partials/UserInfo"
import Service from "../../../utils/service"
export default {
    components:{
        OrderSummary,
        UserInfo,
        IconImage
    },
    setup(props,context){
        
        onUpdated(()=>{
            if(context.root.$route.fullPath == '/profile'){
                context.root.$router.push('/profile/info')
                userMenuController(1)
            }
            else if(context.root.$route.fullPath == '/profile/orders'){
                userMenuController(2)
            }
        })
        onMounted(()=>{
            if(context.root.$route.fullPath == '/profile'){
                context.root.$router.push('/profile/info')
                userMenuController(1)
            }
            else if(context.root.$route.fullPath == '/profile/orders'){
                userMenuController(2)
            }
        })
        const userSideOption = ref(1)
        const authService = computed(()=>{
            return Service(true)
        })
        const stateValues = inject('stateValues')
        const global = inject('global')
        const userMenuController = (n) => {
            document.getElementById('usc' + userSideOption.value).classList.remove('active')
            userSideOption.value = n
            document.getElementById('usc' + userSideOption.value).classList.add('active')
            if(n == 3){
                authService.value.transmit('user/logout',{},(s,d)=>{
                    if(s == 200){
                        $cookies.set('Golpino_token','',-999999999)
                        context.root.$router.push('/')
                        stateValues.setCart([])
                        global.setUserName("")
                        global.toggleLogin(false)
                        global.setUserAddresses([])
                    }
                })
            }
        }
        return {userSideOption,userMenuController}
    }
}
</script>
<style scoped>
.user-profile{
    background-color: #f0f0f0;
    padding: 2.5rem 1rem 3rem 8rem;
    min-height: 95vh;
}

.user-side-control{
    background-color: #fff;
    color: #000;
    padding: 0.7rem 1.5rem 0.7rem 2rem;
    border-bottom: 1px solid rgba(0,0,0,0.08);
    box-shadow: 0px 3px 5px rgba(0,0,0,0.1);
}

ul{
    list-style-type:none;
}

.user-side-control:hover{
    background-color: #772CE8;
    color: #fff;
    cursor: pointer;
}

.user-control-section{
    background-color: #fff;
}

.active{
border-right: 4px solid #772CE8;
}
</style>