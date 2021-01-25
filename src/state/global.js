import { ref,computed } from "@vue/composition-api";

const state = ref({
  alert : false,
  message: ""
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
  isLoggedIn:false
})

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


export default { setUserPhone,state,alertToggle,user,setUserAuth,setUserName,setUserAddresses,toggleLogin,setUserType}