<template>
    <div class="admin-page">
        <h3 class="tt">ادمین گلپینو</h3>           
        <div class="admin-form mt-4">
            <div class="admin-tab">
                <custom-input kind="text" key="1" container="full-width ml-3 mt-3" classes="full-width" v-bind:theModel.sync="username" label="نام کاربری"></custom-input>
                <custom-input kind="text" key="2" container="full-width ml-3 mt-3" classes="full-width" v-bind:theModel.sync="password" label="گذرواژه"></custom-input>
            </div>
            <div class="adminSend">
                <button class="purple-btn" @click="adminLogin">ورود</button>
            </div>
        </div>
    </div>    
</template>
<script>
import CustomInput from "../../Common/CustomInput"
import {ref,computed,inject,onMounted,watch, reactive} from "@vue/composition-api"
import Service from "../../../utils/service"
// import {useRoute} from "vue-router"
export default {
    components:{
        CustomInput
    },
    setup(props,context){
        // component
        const global = inject('global')
        
        const theService = computed(()=>{
            return Service(false)
        })
        
        const username = ref({value:null,valid:true})
        const password = ref({value:null,valid:true})

        const adminLogin = () =>{
            let f = new FormData()
            f.append("password",password.value.value)
            f.append("username",username.value.value)
            theService.value.transmit('admin/login',f,(s,d)=>{
                if(s == 200){
                    $cookies.set("Golpino_admin",d.data.token,2147483647)
                    context.root.$router.push('/qwertyzxcvb/admin/view/categories')
                    global.setUserType('admin')
                    global.toggleLogin(true)
                }
            },(s,e)=>{
                if(!s){
                    if(e.response.data.error.invalid_params){
                        let errors = e.response.data.error.invalid_params
                        errors.map((er)=>{
                            if(er.field == 'username'){
                                username.value.valid = false
                                username.value.message = er.message
                            }
                            else if(er.field == 'password'){
                                password.value.valid = false
                                password.value.message = er.message
                            }
                        })
                    }
                }
            })
        }
        
        return {username,password,adminLogin}
    }
}
</script>
<style scoped>
.admin-page{
    padding:2rem 5rem 2rem 5rem;
}

.tt{
    
    text-align: center;
}

.admin-tab-bar{
    background-color: #fff;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
}

.admin-tab-bar .active{
    background-color: rgba(127, 127, 127, 0.1);
}

.admin-form{
    border-radius: 8px;
    background-color: rgba(127, 127, 127, 0.1);
    border:1px solid rgba(127, 127, 127, 0.2);
    width: 30%;
    margin-right: auto;
    margin-left: auto;
}

.admin-tab{
    padding:1.5rem 2rem 1rem 2rem;
    border-bottom: 1px solid rgba(127, 127, 127, 0.3);
}

.adminSend{
    padding:1.5rem 2rem 1.5rem 2rem;
}
.adminSend button{
    width: 100%;
}

</style>