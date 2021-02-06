<template>
    <div class="admin-page">
        <h3>افزودن موضوع</h3>
        <div class="admin-form mt-4">
            <div class="admin-tab">
                <custom-input kind="text" key="10" container="half-width ml-3 mt-3" classes="full-width" v-bind:theModel.sync="subject.name" label="نام موضوع" placeholder="موضوع"></custom-input>
            </div>
            <div class="adminSend">
                <button class="purple-btn" @click="addSubject">ارسال</button>
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
        const global = inject('global')
        const edit = ref(false)
        const theService = computed(()=>{
            return Service(false)
        })

        onMounted(() => {
            if(context.root.$route.params.id){
                edit.value = true
                theService.value.receive('admin/contact/subject/'+context.root.$route.params.id,{},getSubjectToEdit,failedAdd)
            }
        })

        const getSubjectToEdit = (s,d) => {
            subject.value = {name:{value:d.data.name,valid:true},id:d.data.id}
        }
        //form
        const subject = ref({name:{value:null,valid:true}})

        const addSubject = () => {
            let f = new FormData()
            f.append("desc",subject.value.name.value)
            if(!edit.value)
                theService.value.transmit('admin/contact/subject',f,successfullAdd,failedAdd)
            else{
                theService.value.transmit('admin/contact/subject/'+subject.value.id,f,successfullAdd,failedAdd)
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
                for (const [key, value] of Object.entries(subject.value)) {
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

        return {subject,addSubject}
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