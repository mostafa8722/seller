<template>
    <div class="admin-page">
        <h3>افزودن منطقه</h3>
        <div class="admin-form mt-4">
            <div class="admin-tab">
                <custom-input kind="text" key="10" container="half-width ml-3 mt-3" classes="full-width" v-bind:theModel.sync="district.name" label="نام منطقه" placeholder="منطقه"></custom-input>
                <!-- <custom-input kind="dropDown" key="11" container="half-width mt-3" v-bind:theModel.sync="district.city_id" :selectItems="cities" label="شهر" placeholder="شهر"></custom-input> -->
            </div>
            <div class="adminSend">
                <button class="purple-btn" @click="addDistrict">ارسال</button>
            </div>
        </div>
    </div>    
</template>
<script>
import CustomInput from "../../Common/CustomInput"
import {ref,computed,inject,onMounted} from "@vue/composition-api"
import Service from "../../../utils/admin-service"
// import {useRoute} from "vue-router"
export default {
    components:{
        CustomInput
    },
    setup(props,context){
        // component
        const cities = ref([{text:'دیرکرد',value:1},{text:'خرابی',value:2}])
        const global = inject('global')
        const edit = ref(false)
        const theService = computed(()=>{
            return Service(false)
        })

        onMounted(() => {
            if(context.root.$route.params.id){
                edit.value = true
                theService.value.receive('admin/district/self/'+context.root.$route.params.id,{},getDistrictToEdit,failedAdd)
            }
        })

        const getDistrictToEdit = (s,d) => {
            district.value = {name:{value:d.data.name,valid:true},city_id:{value:d.data.city_id,valid:true},id:d.data.id}
        }
        //form
        const district = ref({name:{value:null,valid:true},city_id:{value:null,valid:true}})

        const addDistrict = () => {
            let f = new FormData()
            f.append("city_id",1)
            f.append("name",district.value.name.value)
            if(!edit.value)
                theService.value.transmit('admin/district',f,successfullAdd,failedAdd)
            else{
                theService.value.transmit('admin/district/'+district.value.id,f,successfullAdd,failedAdd)
            }
        }

        const successfullAdd = (s,d) => {
            if(s == 200){
                global.alertToggle('با موفقیت افزوده شد!')
            }
        }

        const failedAdd = (server,e) => {
            if(!server){
                e.response.data.error.invalid_params.map((ip)=>{
                for (const [key, value] of Object.entries(district.value)) {
                        console.log({ip})
                        console.log({key})
                        if(typeof value === 'object' && value !== null){
                            if(key == ip.field){
                            value.valid = false
                            value.message = ip.message
                            }
                        }
                        else{
                            if(key == ip.field){
                            error.value = ip.message
                            }
                        }
                    }
                })
            } 
        }

        return {district,cities,addDistrict}
    }
}
</script>
<style scoped>
.admin-page{
    padding:2rem 5rem 2rem 5rem;
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
    min-height: 70vh;
}
.admin-tab-button{
    display: inline-block;
    min-width:10%;
    padding-top:1rem;
    margin-left: 3rem;
    padding-right: 1rem;
    padding-left: 1rem;
    text-align: center;
}

.admin-tab{
    padding:1.5rem 2rem 1.5rem 2rem;
    border-bottom: 1px solid rgba(127, 127, 127, 0.3);
    min-height: 50vh;
}

.adminSend{
    padding:1.5rem 2rem 1.5rem 2rem;
    text-align: left;
}


.admin-tab-button:hover{
    cursor: pointer;
}

.admin-locker{
    width: 15%;
    margin:1rem;
    border:2px dashed #9147FF;
    padding:0.3rem;
}

.admin-locker img{
    width: 100%;
}
</style>