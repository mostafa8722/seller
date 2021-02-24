<template>
    <div class="admin-page">
        <h3>زمان تحویل</h3>
        <div class="admin-form mt-4">
            <div class="admin-tab">
                <div class="row">
                    <div class="col-6 mt-4">
                        <date-picker label="زمان شروع"  v-model="deliveryTime.from"  type="time" color="#9147FF"></date-picker>
                    </div>
                    <div class="col-6 mt-4">
                        <date-picker label="زمان پایان"  v-model="deliveryTime.to"  type="time" color="#9147FF"></date-picker>
                    </div>
                    <p v-if="formError != null" class="error-text">{{formError}}</p>
                </div>
            </div>
            <div class="adminSend">
                <button class="purple-btn" @click="addTime">ارسال</button>
            </div>
        </div>
    </div>    
</template>
<script>
import CustomInput from "../../Common/CustomInput"
import {ref,computed,inject,onMounted, reactive} from "@vue/composition-api"
import Service from "../../../utils/admin-service"
import VuePersianDatetimePicker from 'vue-persian-datetime-picker';
// import {useRoute} from "vue-router"
export default {
    components:{
        CustomInput,
        datePicker:VuePersianDatetimePicker
    },
    setup(props,context){
        // component
        const global = inject('global')
        const edit = ref(false)
        const theService = computed(()=>{
            return Service(false)
        })

        onMounted(() => {
            if(context.root.$route.params.id){
                edit.value = true
                theService.value.receive('admin/preorder/time/'+context.root.$route.params.id,{},getTimeToEdit,failedAdd)
            }
        })
        const getTimeToEdit = (s,d) => {
            if(s == 200){
                timeToEdit.from = d.data.from
                timeToEdit.to = d.data.to
                deliveryTime.from = d.data.from
                deliveryTime.to = d.data.to
            }
        }
        const deliveryTime = reactive({from:'',to:''})
        const timeToEdit = reactive({from:'',to:''})
        // FORM
        const successfullAdd = (s,d) => {
            if(s == 200){
                global.alertToggle('با موفقیت افزوده شد!')
            }
        }

        const failedAdd = (server,e) => {
            if(!server){
                if(e.response.data.error.invalid_params){
                    formError.value = ''
                    e.response.data.error.invalid_params.map((m)=>{
                        formError.value = formError.value + m.message + '-'
                    })
                }
            } 
        }
        const addTime = () => {
            let f = new FormData()
            if(edit.value){
                if(deliveryTime.from != timeToEdit.from)
                    f.append('from',deliveryTime.from)
                if(deliveryTime.to != timeToEdit.to)
                    f.append('to',deliveryTime.to)
                theService.value.transmit('admin/preorder/time/'+context.root.$route.params.id,f,successfullAdd,failedAdd)
            }
            else{
                f.append('from',deliveryTime.from)
                f.append('to',deliveryTime.to)
                theService.value.transmit('admin/preorder/time',f,successfullAdd,failedAdd)
            }
        }
        const formError = ref(null)
        return {addTime,deliveryTime}
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

.error-text{
    color: #ff3629;
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