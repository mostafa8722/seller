<template>
    <div class="admin-page">
        <h3>افزودن فاصله</h3>
        <div class="admin-form mt-4">
            <div class="admin-tab">
                <custom-input kind="text" key="2" container="half-width ml-3 mt-3" classes="full-width" v-bind:theModel.sync="distance.from" label="از" placeholder="از"></custom-input>
                <custom-input kind="text" key="3" container="half-width ml-3 mt-3" classes="full-width" v-bind:theModel.sync="distance.to" label="تا" placeholder="تا"></custom-input>
            </div>
            <div class="adminSend">
                <button class="purple-btn" @click="addDistance">ارسال</button>
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
                theService.value.receive('admin/distance/'+context.root.$route.params.id,{},getDistanceToEdit,failedAdd)
            }
        })

        const getDistanceToEdit = (s,d) => {
            distance.value = {from:{value:d.data.from,valid:true},to:{value:d.data.to,valid:true},id:d.data.id}
            editDistance.value = {from:{value:d.data.from,valid:true},to:{value:d.data.to,valid:true},id:d.data.id}
        }
        //form
        const distance = ref({from:{value:null,valid:true},to:{value:null,valid:true}})
        const editDistance = ref(null)

        const addDistance = () => {
            let f = new FormData()
            if(edit.value){
                if(distance.value.to.value != editDistance.value.to.value)
                    f.append("to",distance.value.to.value)
                if(distance.value.from.value != editDistance.value.from.value)
                    f.append("from",distance.value.from.value)
            }
            else{
                f.append("to",distance.value.to.value)
                f.append("from",distance.value.from.value)
            }
            
            
            if(!edit.value)
                theService.value.transmit('admin/distance',f,successfullAdd,failedAdd)
            else{
                theService.value.transmit('admin/distance/'+distance.value.id,f,successfullAdd,failedAdd)
            }
        }

        const successfullAdd = (s,d) => {
            if(s == 200){
                global.alertToggle('با موفقیت افزوده شد!')
                distance.value = {from:{value:null,valid:true},to:{value:null,valid:true}}
            }
        }

        const failedAdd = (server,e) => {
            if(!server){
                e.response.data.error.invalid_params.map((ip)=>{
                for (const [key, value] of Object.entries(distance.value)) {
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

        return {distance,addDistance}
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