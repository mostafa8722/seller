<template>
    <div class="admin-page">
        <div class="admin-form">
            <div class="admin-tab-bar">
                <div class="admin-tab-button active" id="adminTab1" @click="()=>switchTab(1)"><p>محدوده ی خدمات</p></div>
                <div class="admin-tab-button" id="adminTab2" @click="()=>switchTab(2)"><p>فاصله</p></div>
                <div class="admin-tab-button" id="adminTab3" @click="()=>switchTab(3)"><p>تگ</p></div>
                <div class="admin-tab-button" id="adminTab4" @click="()=>switchTab(4)"><p>خصوصیت</p></div>
                <div class="admin-tab-button" id="adminTab5" @click="()=>switchTab(5)"><p>دسته بندی</p></div>
                <div class="admin-tab-button" id="adminTab6" @click="()=>switchTab(6)"><p>منطقه</p></div>
                <div class="admin-tab-button" id="adminTab6" @click="()=>switchTab(7)"><p>سفارش</p></div>
            </div>
            <div v-if="currentTab == 1" class="admin-tab">
                <custom-input kind="text" key="1" container="half-width ml-3 mt-3" classes="full-width" v-bind:theModel.sync="serviceRange" label="محدوده ی خدمات" placeholder="محدوده ی خدمات"></custom-input>
            </div>
            <div v-if="currentTab == 2" class="admin-tab">
                <custom-input kind="text" key="2" container="half-width ml-3 mt-3" classes="full-width" v-bind:theModel.sync="from" label="از" placeholder="از"></custom-input>
                <custom-input kind="text" key="3" container="half-width ml-3 mt-3" classes="full-width" v-bind:theModel.sync="to" label="تا" placeholder="تا"></custom-input>
            </div>
            <div v-if="currentTab == 3" class="admin-tab">
                <custom-input kind="text" key="7" container="half-width ml-3 mt-3" classes="full-width" v-bind:theModel.sync="tag" label="نام تگ" placeholder="نام"></custom-input>
            </div>
            <div v-if="currentTab == 4" class="admin-tab">
                <custom-input kind="text" key="4" container="half-width ml-3 mt-3" classes="full-width" v-bind:theModel.sync="attr.name" label="نام خصوصیت" placeholder="نام"></custom-input>
                <custom-input kind="dropDown" key="5" container="half-width ml-3 mt-3" v-bind:theModel.sync="attr.parent" :selectItems="attrParents" label="Parent" placeholder="Parent"></custom-input>
                <custom-input kind="dropDown" key="6" container="half-width ml-3 mt-3" v-bind:theModel.sync="attr.category" :selectItems="attrCategories" label="دسته بندی" placeholder="دسته بندی"></custom-input>
                <div class="add-image mt-4">
                    <label for="img">انتخاب تصویر:</label>
                    <input type="file" class="block" id="img" name="img" accept="image/*" @change="(e)=>updatePic(e)">
                    <div class="admin-locker" v-if="img != ''">
                        <img :src="img" alt="image">
                    </div>
                </div>
            </div>
            <div v-if="currentTab == 5" class="admin-tab">
                <custom-input kind="text" key="8" container="half-width ml-3 mt-3" classes="full-width" v-bind:theModel.sync="category.name" label="نام دسته بندی" placeholder="نام"></custom-input>
                <custom-input kind="dropDown" key="9" container="half-width mt-3" v-bind:theModel.sync="category.parent" :selectItems="categoryParents" label="Parent" placeholder="Parent"></custom-input>
                <div class="add-image mt-4">
                    <label for="img">انتخاب تصویر:</label>
                    <input type="file" class="block" id="img" name="img" accept="image/*" @change="(e)=>updatePic(e)">
                    <div class="admin-locker" v-if="img != ''">
                        <img :src="img" alt="image">
                    </div>
                </div>
            </div>
            <div v-if="currentTab == 6" class="admin-tab">
                <custom-input kind="text" key="10" container="half-width ml-3 mt-3" classes="full-width" v-bind:theModel.sync="district.name" label="نام منطقه" placeholder="منطقه"></custom-input>
                <custom-input kind="dropDown" key="11" container="half-width mt-3" v-bind:theModel.sync="district.city" :selectItems="districts" label="شهر" placeholder="شهر"></custom-input>
            </div>
            <div class="adminSend">
                <button class="purple-btn">ارسال</button>
            </div>
        </div>
    </div>    
</template>
<script>
import CustomInput from "../Common/CustomInput"
import {ref} from "@vue/composition-api"
export default {
    components:{
        CustomInput
    },
    setup(){
        // component
        const currentTab = ref(1)
        
        const switchTab = (t) => {
            let els = document.getElementsByClassName("admin-tab-button")
            for(let i=0;i<7;i++){
                els[i].classList.remove("active")
            }
            img.value = ''
            document.getElementById("adminTab"+t).classList.add("active")
            currentTab.value = t
        }
        const updatePic = (e) => {
            img.value = URL.createObjectURL(e.target.files[0])
            pictureFile.value = e.target.files[0]
        }

        const categoryParents = ref([{text:'دیرکرد',value:1},{text:'خرابی',value:2}])
        const attrParents = ref([{text:'دیرکرد',value:1},{text:'خرابی',value:2}])
        const attrCategories = ref([{text:'دیرکرد',value:1},{text:'خرابی',value:2}])
        const districts = ref([{text:'دیرکرد',value:1},{text:'خرابی',value:2}])
        const img = ref('')
        const pictureFile = ref(null)

        //form
        const tag = ref({value:null,valid:true})
        const serviceRange = ref({value:null,valid:true})
        const from = ref({value:null,valid:true})
        const to = ref({value:null,valid:true})
        const attr = ref({name:{value:null,valid:true},parent:{value:null,valid:true},category:{value:null,valid:true}})
        const category = ref({name:{value:null,valid:true},parent:{value:null,valid:true}})
        const district = ref({name:{value:null,valid:true},city:{value:null,valid:true}})




        return {switchTab,categoryParents,attrParents,attrCategories,tag,serviceRange,from,to,attr,category,currentTab,districts,district,img,updatePic}
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