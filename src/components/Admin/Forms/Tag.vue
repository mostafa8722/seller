<template>
    <div class="admin-page">
        <h3>افزودن تگ</h3>
        <div class="admin-form mt-4">
            <div class="admin-tab">
                <custom-input kind="text" key="7" container="half-width ml-3 mt-3" classes="full-width" v-bind:theModel.sync="tag.name" label="نام تگ" placeholder="نام"></custom-input>
                <div class="add-image mt-4">
                    <label for="img">انتخاب تصویر:</label>
                    <input type="file" class="block" id="img" name="img" accept="image/*" @change="(e)=>updatePic(e)">
                    <div class="admin-locker" v-if="img != ''">
                        <img :src="img" alt="image">
                    </div>
                </div>
            </div>
            <div class="adminSend">
                <button class="purple-btn" @click="addTag">ارسال</button>
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
        const img = ref('')
        const pictureFile = ref(null)

        const updatePic = (e) => {
            img.value = URL.createObjectURL(e.target.files[0])
            pictureFile.value = e.target.files[0]
        }
        onMounted(() => {
            if(context.root.$route.params.id){
                edit.value = true
                theService.value.receive('admin/tag/'+context.root.$route.params.id,{},getTagToEdit,failedAdd)
            }
        })

        const getTagToEdit = async (s,d) => {
            tag.value = {name:{value:d.data.name,valid:true},image:d.data.image,id:d.data.id}
            img.value = d.data.image
            pictureFile.value = await fetch(img.value).then(r => r.blob())
            editTag.value = {name:{value:d.data.name,valid:true},image:d.data.image,id:d.data.id}
        }
        //form
        const tag = ref({name:{value:null,valid:true},image:null})
        const editTag = ref(null)

        const addTag = () => {
            let f = new FormData()
            if(edit.value){
                if(tag.value.name.value != editTag.value.name.value)
                    f.append("name",tag.value.name.value)
                if(img.value != editTag.value.image)
                    f.append("image",pictureFile.value)
                
            }
            else{
                f.append("image",pictureFile.value)
                f.append("name",tag.value.name.value)
            }   
            if(!edit.value)
                theService.value.transmit('admin/tag',f,successfullAdd,failedAdd)
            else{
                theService.value.transmit('admin/tag/'+tag.value.id,f,successfullAdd,failedAdd)
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
                for (const [key, value] of Object.entries(tag.value)) {
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

        return {tag,addTag,img,updatePic}
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