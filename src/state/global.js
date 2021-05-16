import { ref,computed } from "@vue/composition-api";

const state = ref({
  alert : false,
  message: "",
    seenOrders:0,
    reload:0
});

const alertToggle = (m)=>{
    state.value.alert = !state.value.alert
    state.value.message = m
    setTimeout(function() {
      document.getElementById("alertAll").classList.add("animate__backOutRight")
    }, 3000);
    setTimeout(function() {
      document.getElementById("alertAll").classList.remove("animate__backOutRight")
      state.value.alert = !state.value.alert
      state.value.message = ""
    }, 3500);
}

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

const user = ref({
  type:'',
  token:"",
  name:"",
  addresses:[],
  phone:'',
  isLoggedIn:false,
  seller:{
    name:'',
    desc:''
  },
    sellerId:null
})

const setUserSeller = (n,d) => {
  user.value.seller.name = n
  user.value.seller.desc = d
}

const setUserAuth = (token) => {
  user.value.token = token
}

const setUserPhone = (p) => {
  user.value.phone = p
}

const setUserName = (name) => {
  user.value.name = name
}

const setUserAddresses = (ads) => {
  user.value.addresses = ads
}

const toggleLogin = (x) => {
  user.value.isLoggedIn = x
}

const setUserType = (x) => {
  user.value.type = x
}


export default {setUserSeller, setUserPhone,state,alertToggle,user,setUserAuth,setUserName,setUserAddresses,toggleLogin,setUserType}