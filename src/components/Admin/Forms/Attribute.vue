<template>
    <div class="admin-page">
        <h3>افزودن خصوصیت</h3>           
        <div class="admin-form mt-4">
            <div class="admin-tab">
                <custom-input kind="text" key="8" container="half-width ml-3 mt-3" classes="full-width" v-bind:theModel.sync="attr.name" label="نام خصوصیت" placeholder="نام"></custom-input>
                <custom-input kind="dropDown" key="9" container="full-width mt-3" classes="half-width" v-bind:theModel.sync="attr.parent_id" :selectItems="attrParents" label="Parent" placeholder="Parent"></custom-input>
                <custom-input kind="dropDown" key="10" container="half-width mt-3" v-bind:theModel.sync="attr.category_id" :selectItems="categoryParents" label="دسته بندی" placeholder="دسته بندی"></custom-input>
            </div>
            <div class="adminSend">
                <button class="purple-btn" @click="addAttr">ارسال</button>
            </div>
        </div>
    </div>    
</template>
<script>
import CustomInput from "../../Common/CustomInput"
import {ref,computed,inject,onMounted,watch, reactive} from "@vue/composition-api"
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
        const publicAttrs = ref(null)
        onMounted(() => {
            theService.value.receive('admin/category',{},getCategories,failedAdd)
            theService.value.receive('admin/attribute/public',{},(s,d)=>{
                if(s == 200){
                    
                    publicAttrs.value = d.data
                    publicAttrs.value.map((pa)=>{
                        pa.value = pa.id
                        pa.text = pa.name
                    })
                    attrParents.value = [...publicAttrs.value]
                }
            },failedAdd)
            if(context.root.$route.params.id){
                edit.value = true
                theService.value.receive('admin/attribute/self/'+context.root.$route.params.id,{},getAttrToEdit,failedAdd)
            }
        })

        const getCategories = (status,data) => {
            categoryParents.value = data.data
            categoryParents.value.map((c)=>{
                c.text = c.name
                c.value = c.id
            })
        }

        const getAttrToEdit = (s,d) => {
            attr = {name:{value:d.data.name,valid:true},parent_id:{value:d.data.parent_id,valid:true},category_id:{value:d.data.category_id,valid:true},id:d.data.id}
            editAttr.value = attr
        }
        //form
        const attr = reactive({name:{value:null,valid:true},parent_id:{value:null,valid:true},category_id:{value:null,valid:true}})
        watch(()=>attr.category_id.value,(n,o)=>{
            if(n != o){
            theService.value.receive('admin/attribute/public',{},(s,d)=>{
                if(s == 200){
                    publicAttrs.value = d.data
                    publicAttrs.value.map((pa)=>{
                        pa.value = pa.id
                        pa.text = pa.name
                    })
                    attrParents.value = [...publicAttrs.value]
                }
            },failedAdd)
                theService.value.receive('admin/attribute/private/'+attr.category_id.value.value,{},(s,d)=>{
                    if(s == 200){
                        let x = d.data
                        x.map((xx)=>{
                            x.text = xx.name
                            x.value = xx.id
                        })
                        attrParents.value = [...attrParents.value,...x]
                    }
                },failedAdd)
            }
        })
        const editAttr = ref(null)
        const attrParents = ref([])
        const categoryParents = ref(null)
        const addAttr = () => {
            let f = new FormData()
            if(edit.value){
                if(attr.name.value != editAttr.value.name.value){
                    f.append("name",attr.name.value)    
                }
                if(attr.parent_id.value != null && attr.parent_id.value != editAttr.value.parent_id.value){
                    f.append("parent_id", parseInt(attr.parent_id.value.id))
                }
                if(attr.category_id.value != null && attr.category_id.value != editAttr.value.category_id.value){
                    f.append("category_id", parseInt(attr.category_id.value.id))
                }
            }
            else{
                f.append("name",attr.name.value)
                if(attr.parent_id.value != null){
                    f.append("parent_id", parseInt(attr.parent_id.value.id))
                }
                
                if(attr.category_id.value != null){
                    f.append("category_id", parseInt(attr.category_id.value.id))
                }
            }
            
            if(!edit.value)
                theService.value.transmit('admin/attribute',f,successfullAdd,failedAdd)
            else{
                theService.value.transmit('admin/attribute/'+attr.id,f,successfullAdd,failedAdd)
            }
        }
        const getAttrs = (status,data) => {
            attrParents.value = data.data
            attrParents.value.map((c)=>{
                c.text = c.name
                c.value = c.id
            })
        }

        const pictureFile = ref(null)

        const updatePic = (e) => {
            img.value = URL.createObjectURL(e.target.files[0])
            pictureFile.value = e.target.files[0]
        }

        const successfullAdd = (s,d) => {
            if(s == 200){
                global.alertToggle('با موفقیت افزوده شد!')
            }
        }

        const failedAdd = (server,e) => {
            if(!server){
                e.response.data.error.invalid_params.map((ip)=>{
                for (const [key, value] of Object.entries(attr)) {
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

        return {attr,addAttr,attrParents,categoryParents}
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