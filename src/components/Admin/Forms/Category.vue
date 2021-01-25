<template>
    <div class="admin-page">
        <h3>افزودن دسته بندی</h3>     
        <div class="admin-form mt-4">
            <div class="admin-tab">
                <custom-input kind="text" key="8" container="half-width ml-3 mt-3" classes="full-width" v-bind:theModel.sync="category.name" label="نام دسته بندی" placeholder="نام"></custom-input>
                <custom-input kind="dropDown" key="9" container="half-width mt-3" v-bind:theModel.sync="category.parent_id" :selectItems="categoryParents" label="Parent" placeholder="Parent"></custom-input>
                <div class="add-image mt-4">
                    <label for="img">انتخاب تصویر:</label>
                    <input type="file" class="block" id="img" name="img" accept="image/*" @change="(e)=>updatePic(e)">
                    <p class="error">{{error}}</p>
                    <div class="admin-locker" v-if="img != ''">
                        <img :src="img" alt="image">
                    </div>
                </div>
            </div>
            <div class="adminSend">
                <button class="purple-btn" @click="addCategory">ارسال</button>
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
        const error = ref('')

        onMounted(() => {
            theService.value.receive('admin/category',{},getCategories,errorHandler)
            if(context.root.$route.params.id){
                edit.value = true
                theService.value.receive('admin/category/self/'+context.root.$route.params.id,{},getCategoryToEdit,failedAdd)
            }
        })

        const errorHandler = (server,error) => {
            global.alertToggle('درخواست نا موفق!')
        }

        //form
        
        const getCategoryToEdit = async (s,d) => {
            category.value = {name:{value:d.data.name,valid:true},parent_id:{value:d.data.parent_id,valid:true},image:d.data.image,id:d.data.id}
            editCat.value = {name:{value:d.data.name,valid:true},parent_id:{value:d.data.parent_id,valid:true},image:d.data.image,id:d.data.id}
            img.value = category.value.image
            pictureFile.value = await fetch(img.value).then(r => r.blob());
        }

        const getCategories = (status,data) => {
            categoryParents.value = data.data
            categoryParents.value.map((c)=>{
                c.text = c.name
                c.value = c.id
            })
        }

        const category = ref({name:{value:null,valid:true},parent_id:{value:null,valid:true},image:null})
        const editCat = ref(null)
        const categoryParents = ref([{text:"aaa",value:1}])
        const addCategory = () => {
            let f = new FormData()
            if(edit.value){
                if(category.value.parent_id.value != null && category.value.parent_id.value != editCat.value.parent_id.value)
                    f.append("parent_id", parseInt(category.value.parent_id.value.id))    
                if(category.value.name.value != editCat.value.name.value)
                    f.append("name",category.value.name.value)
                if(img.value != editCat.value.image)
                    f.append("image",pictureFile.value)                
            }
            else{
                if(category.value.parent_id.value != null)
                    f.append("parent_id", parseInt(category.value.parent_id.value.id))
                f.append("name",category.value.name.value)
                f.append("image",pictureFile.value)
            }
            if(!edit.value)
                theService.value.transmit('admin/category',f,successfullAdd,failedAdd)
            else{
                theService.value.transmit('admin/category/'+category.value.id,f,successfullAdd,failedAdd)
            }
        }

        const pictureFile = ref(null)

        const updatePic = (e) => {
            img.value = URL.createObjectURL(e.target.files[0])
            pictureFile.value = e.target.files[0]
        }

        const successfullAdd = (s,d) => {
            if(s == 200){
                global.alertToggle('با موفقیت افزوده شد!')
                category.value = {name:{value:null,valid:true},parent_id:{value:null,valid:true},image:null}
            }
        }

        const failedAdd = (server,e) => {
            if(!server)
            console.log("cat error handler",{...e})
            e.response.data.error.invalid_params.map((ip)=>{
                for (const [key, value] of Object.entries(category.value)) {
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

        return {category,addCategory,categoryParents,img,updatePic,error}
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