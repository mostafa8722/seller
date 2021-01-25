<template>
    <div class="seller-page">
        <h3 class="tt">ثبت / ورود فروشنده</h3>           
        <div class="seller-form mt-4">
            <div class="seller-tab" v-if="authStep == 1">
                <custom-input kind="text" key="1" container="full-width ml-3 mt-3" classes="full-width" v-bind:theModel.sync="mobile" label="شماره موبایل"></custom-input>
                <custom-input kind="text" key="2" container="full-width ml-3 mt-3" classes="full-width" v-bind:theModel.sync="password" label="گذرواژه"></custom-input>
                <div class="d-flex justify-content-between mt-3">
                    <p class="tool-paragrapgh mini-title" @click="goToRegister">ثبت نام</p>
                    <p class="tool-paragrapgh mini-title" @click="forgotPassword">فراموشی گذرواژه</p>
                </div>
            </div>
            <div class="seller-tab" v-if="(authStep == 2 || authStep == 9)">
                <custom-input kind="text" key="3" container="full-width ml-3 mt-3" classes="full-width" v-bind:theModel.sync="mobile" label="شماره موبایل"></custom-input>
            </div>
            <div class="seller-tab" v-if="(authStep == 3 || authStep == 10)">
                <custom-input kind="text" key="4" container="full-width ml-3 mt-3" classes="full-width" v-bind:theModel.sync="code" label="کد"></custom-input>
                <p class="tool-paragrapgh" v-if="authStep == 3" @click="resendCode">ارسال دوباره</p>
            </div>
            <div class="seller-tab" v-if="(authStep == 4 || authStep == 11)">
                <custom-input kind="text" v-if="authStep == 4" key="5" container="full-width ml-3 mt-3" classes="full-width" v-bind:theModel.sync="name" label="نام فروشگاه"></custom-input>
                <custom-input kind="text" key="6" container="full-width ml-3 mt-3" classes="full-width" v-bind:theModel.sync="password" label="گذرواژه"></custom-input>
                <custom-input kind="text" key="7" container="full-width ml-3 mt-3" classes="full-width" v-bind:theModel.sync="rePassword" label="گذر واژه را مجددا وارد کنید"></custom-input>
            </div>
            <div class="sellerSend">
                <button class="purple-btn" @click="sellerLogin">ارسال</button>
            </div>
        </div>
    </div>    
</template>
<script>
import CustomInput from "../../Common/CustomInput"
import {ref,computed,inject,onMounted,watch, reactive} from "@vue/composition-api"
import Service from "../../../utils/seller-service"
export default {
    components:{
        CustomInput
    },
    setup(props,context){
        // component
        const global = inject('global')
        const authStep = ref(1)
        
        const theService = computed(()=>{
            return Service(false)
        })
        const authService = computed(()=>{
            return Service(true)
        })
        
        const mobile = ref({value:null,valid:true})
        const password = ref({value:null,valid:true})
        const rePassword = ref({value:null,valid:true})
        const code = ref({value:null,valid:true})
        const name = ref({value:null,valid:true})

        const goToRegister = () => {
            authStep.value = 2
        }

        const forgotPassword = () => {
            authStep.value = 9
        }

        const resendCode = () =>{
                let f = new FormData()
                f.append('mobile',mobile.value.value)
                theService.value.transmit('seller/register/resendcode',f,(s,d)=>{
                    if(s == 200){

                    }
                },(s,e)=>{

                })
        }

        const sellerLogin = () =>{
            let f = new FormData()
            // login
            if(authStep.value == 1){
                f.append('mobile',mobile.value.value)
                f.append('password',password.value.value)
                theService.value.transmit('seller/login',f,(s,d)=>{
                    if(s == 200){
                        $cookies.set("Golpino_seller",d.data.token,2147483647)
                        global.toggleLogin(true)
                        global.setUserType('seller')
                        context.root.$router.push('/seller/settings')
                    }
                },(s,e)=>{
                    if(!s){
                        mobile.value.valid = false
                        password.value.message = 'کاربری با این مشخصات یافت نشد'
                        password.value.valid = false
                    }
                })
            }
            // request code resend to reset password
            else if(authStep.value == 9){
                f.append('mobile',mobile.value.value)
                theService.value.transmit('seller/register/resendcode',f,(s,d)=>{
                    if(s == 200){
                        authStep.value = 10
                    }
                },(s,e)=>{

                })
            }

            // check code to get token and reset password
            else if(authStep.value == 10){
                f.append('mobile',mobile.value.value)
                f.append('code',code.value.value)
                code.value.valid = true
                code.value.message = ""
                theService.value.transmit('seller/register/checkcode',f,(s,d)=>{
                    if(s == 200){
                        if(d != []){
                            // set token and send to enter password
                            $cookies.set("Golpino_seller",d.data.token,2147483647)
                            authStep.value = 11
                        }
                        else{
                            code.value.valid = false
                            code.value.message = "مقدار کد نامعتبر است"
                        }
                    }
                },(s,e)=>{
                    if(!s){
                        code.value.valid = false
                        code.value.message = "مقدار کد نا معتبر است"
                    }
                })
            }
            
            // set new passwords and go to page
            else if(authStep.value == 11){
                if(rePassword.value.value == password.value.value){
                    rePassword.value.valid = true
                    rePassword.value.message = ''
                    f.append('password',password.value.value)
                    f.append('c_password',rePassword.value.value)
                    authService.value.transmit('seller/newpassword',f,(s,d)=>{
                        if(s == 200){
                            global.toggleLogin(true)
                            global.setUserType('seller')
                            context.root.$router.push('/seller/settings')
                        }
                    },(s,e)=>{

                    })
                }
                else{
                    rePassword.value.valid = false
                    rePassword.value.message = 'مقادیر گذرواژه مطابقت ندارد'
                }
            }

            // enter mobile to check and register
            else if(authStep.value == 2){
                f.append('mobile',mobile.value.value)
                theService.value.transmit('seller/register/checkseller',f,(s,d)=>{
                    if(s == 200){
                        if(d.data.status == 4 || d.data.status == 3){
                            // send to password and login
                            authStep.value = 1
                        }
                        else if(d.data.status == 1){
                            // send to code to register
                            authStep.value = 3
                        }
                    }
                },(s,e)=>{

                })
            }
            // enter code
            else if(authStep.value == 3){
                f.append('mobile',mobile.value.value)
                f.append('code',code.value.value)
                code.value.valid = true
                code.value.message = ""
                theService.value.transmit('seller/register/checkcode',f,(s,d)=>{
                    if(s == 200){
                        if(d != []){
                            // set token and send to enter password
                            $cookies.set("Golpino_seller",d.data.token,2147483647)
                            authStep.value = 4
                        }
                        else{
                            code.value.valid = false
                            code.value.message = "مقدار کد نا معتبر است"
                        }
                    }
                },(s,e)=>{
                    if(!s){
                        code.value.valid = false
                        code.value.message = "مقدار کد نا معتبر است"
                    }
                })
            }
            else if(authStep.value == 4){
                // add name and password and finalize register
                if(rePassword.value.value == password.value.value){
                    rePassword.value.valid = true
                    rePassword.value.message = ''
                    f.append('name',name.value.value)
                    f.append('password',password.value.value)
                    authService.value.transmit('seller/register/addinfo',f,(s,d)=>{
                        if(s == 200){
                            global.toggleLogin(true)
                            global.setUserType('seller')
                            context.root.$router.push('/seller/settings')
                        }
                    },(s,e)=>{

                    })
                }
                else{
                    rePassword.value.valid = false
                    rePassword.value.message = 'مقادیر گذرواژه مطابقت ندارد'
                }
            }
        }
        
        return {mobile,password,sellerLogin,rePassword,name,code,resendCode,forgotPassword,authStep,goToRegister}
    }
}
</script>
<style scoped>
.seller-page{
    width: 100%;
    height: 100%;
    padding:4rem 5rem 2rem 5rem;
}

.tt{
    
    text-align: center;
}

.tool-paragrapgh{
    color: #0498db;
}

.tool-paragrapgh:hover{
    cursor: pointer;
    text-decoration: underline;
}

.seller-tab-bar{
    background-color: #fff;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
}

.seller-tab-bar .active{
    background-color: rgba(127, 127, 127, 0.1);
}

.seller-form{
    border-radius: 8px;
    background-color: rgba(127, 127, 127, 0.1);
    border:1px solid rgba(127, 127, 127, 0.2);
    width: 30%;
    margin-right: auto;
    margin-left: auto;
}

.seller-tab{
    padding:1.5rem 2rem 1rem 2rem;
    border-bottom: 1px solid rgba(127, 127, 127, 0.3);
}

.sellerSend{
    padding:1.5rem 2rem 1.5rem 2rem;
}
.sellerSend button{
    width: 100%;
}

</style>