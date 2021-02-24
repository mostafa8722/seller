<template>
    <div class="user-info pl-5 pr-5 pb-5 pt-3">
            <h5 class="tNormal">اطلاعات کاربری</h5>
            <div class="user-profile-info pt-2">
                <div class="user-profile-info-bar">
                    <p class="mini-title tLighter active-bar" id="ui1" @click="()=>uiHandler(1)">اطلاعات شخصی</p>
                    <p class="mini-title tLighter" id="ui2" @click="()=>uiHandler(2)">آدرس</p>
                </div>
                <div class="user-infos pt-3" v-if="ui == 1">
                    <div class="user-profile-info-item">
                        <custom-input :deactive="true" label="نام - نام خانوادگی" inputClass="tNormal" kind="text" container="full-width mb-2 mt-2" classes="half-width block" v-bind:theModel.sync="userModel.name" placeholder="نام"></custom-input>
                        <custom-input :deactive="true" label="شماره موبایل" inputClass="tNormal" kind="text" container="full-width mb-2 mt-2" classes="half-width block" v-bind:theModel.sync="userModel.phone" placeholder="موبایل"></custom-input>
                    </div>
                </div>
                <div class="user-adresses pt-3" v-else>
                    <p class="tNormal">آدرس های شما</p>
                    <!-- <p class="tLighter">برای ویرایش آدرس ابتدا آدرس مورد نظر را انتخاب کنید و سپس برروی دکمه ی ویرایش کلیک کنید</p>
                    <custom-input label="انتخاب آدرس" inputClass="tNormal" labelClass="tLighter mini-title" kind="dropDown" container="half-width mb-2 mt-2" classes="no-border half-width barely-visible mini-title" v-bind:theModel.sync="addressToEdit" :selectItems="userAddresses" placeholder="آدرس"></custom-input> -->
                    <user-address v-for="(a,i) in userAddresses" :key="i" @deleteMe="deleteAddress" :theAddress="a"></user-address>
                    <div class="w-100 d-flex justify-content-center">
                        <button class="purple-btn w-25 m-auto" data-target="#addressModal" data-toggle="modal">افزودن آدرس جدید</button>    
                    </div>
                    
                </div>
                <address-modal :districts="districts" @addressComplete="sendAddress"></address-modal>
            </div>
    </div>
</template>
<script>
import CustomInput from '../../../Common/CustomInput'
import AddressModal from '../../../Common/AddressModal'
import Service from "../../../../utils/service"
import UserAddress from "./UserAddress"
import { computed,ref, onMounted,inject, reactive, watch } from '@vue/composition-api'
import $ from 'jquery'
export default {
    components:{
        CustomInput,
        AddressModal,
        UserAddress
    },
    setup(){
        const authService = computed(()=>{
            return Service(true)
        })
        const theService = computed(()=>{
            return Service(false)
        })
        const global = inject('global')
        const user = computed(()=>{
            return global.user.value
        })
        const userModel = reactive({
            name:{value:(global.user.value.name == "" ? null : global.user.value.name),valid:true},
            phone:{value:(global.user.value.phone == '' ? null : global.user.value.phone),valid:true}
        })
        watch(user.value,(n,o)=>{
            userModel.name.value = n.name
            userModel.phone.value = n.phone
        })
        
        
        const userAddresses = ref([])
        const districts = ref(null)
        const addressToEdit = ref({value:null,valid:true})
        const getUserAddresses = () => {
            authService.value.receive('user/address',{},(s,d)=>{
                let x = d.data
                x.map((a)=>{
                    a.text = a.name + ": " + a.address
                    a.value = a.id
                })
                userAddresses.value = x
            },(s,e)=>{

            })
            // authService.value.transmit('cors',{},(s,d)=>{
            //     let x = d.data
            //     console.log('zzzzzzzzzzzzzzzzzzzz',x)
            //     console.log({d})
            // },(s,e)=>{

            // })
        }
        const getDistricts = () =>{
            theService.value.receive('search/district',{},(s,d)=>{
                if(s == 200){
                    districts.value = d.data
                    districts.value.map((dis)=>{
                        dis.value = dis.id
                        dis.text = dis.name
                    })
                }
            },(s,e)=>{

            })
        }
        const sendAddress = (ad) => {
            let f = new FormData()
            f.append('name',ad.name.value)
            f.append('district_id',ad.district_id)
            f.append('lat',ad.lat)
            f.append('long',ad.long)
            f.append('address',ad.address.value)
            authService.value.transmit('user/address',f,(s,d)=>{
                if(s == 200){
                    getUserAddresses()
                    $(function () {
                        $('#addressModal').modal('toggle');
                    });
                }
            },(s,e)=>{

            })
        }

        onMounted(()=>{
            getDistricts()
            getUserAddresses()
        })

        const checkSelected = () =>{
            if(addressToEdit.value.value == null){
                addressToEdit.value.valid = false
                addressToEdit.value.message = 'لطفا ابتدا آدرس مورد نظر را انتخاب کنید'
            }
            else if(addressToEdit.value.valid == false){
                addressToEdit.value.valid = true
                addressToEdit.value.message = ''
            }
        }
        const ui = ref(1)
        const uiHandler = (i)=>{
            document.getElementById("ui"+ui.value).classList.remove("active-bar")
            ui.value = i
            document.getElementById("ui"+ui.value).classList.add("active-bar")
        }
        const deleteAddress = (id)=>{
            authService.value.remove('user/address/'+id,{},(s,d)=>{
                if(s == 200){
                    getUserAddresses()
                }
            },(s,e)=>{

            })
        }
        return {user,deleteAddress,userModel,userAddresses,addressToEdit,districts,sendAddress,checkSelected,uiHandler,ui}
    }
}
</script>
<style scoped>
.user-info{
    background-color: #fff;
}



.user-profile-info-item{
    /* padding: ; */
}

.user-profile-info-bar p:hover{
    cursor: pointer;
}

.user-profile-info-bar{
    border-bottom: 1px solid rgba(127, 127, 127, 0.2);
}

.user-profile-info-bar p{
    padding: 0.5rem 2rem 0.5rem 2rem;
    margin-left: 7px;
}

.active-bar{
    border-bottom: 2px solid #772CE8;
}
</style>