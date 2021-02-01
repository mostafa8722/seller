<template>
<div class="container addProduct">
    <p class="mt-3">محصولات > اضافه کردن محصول</p>
    <div class="product-form mt-2 p-4">
        <div class="container">
            <p>عکس محصول</p>
            <div class="big-upload mt-1 pb-4" v-if="mainImage == ''">
                <div class="upload-locker">
                    <img src="/assets/site/images/seller-icons/upload.svg" alt="image">
                </div>
                <p>برای گذاشتن عکس محصول برروی دکمه ی بارگزاری کلیک کنید</p>
                <p>(حداقل اندازه ی تصویر 1600 x 1400 و حداقل سایز 10mb)</p>
                <button class="white-btn" @click="()=>openInput(1)">بارگزاری</button>
            </div>
            <div class="image-showcase mt-1 pb-4" v-else>
                <div class="row">
                    <div class="col-12 showcase-locker">
                        <img :src="mainImage" class="showcase-image" alt="image">
                    </div>
                    <div v-for="(image , i) in extraImages" class="col-3 mt-3 showcase-locker" @click="()=>selectImage(i)" :class="image.isSelected ? 'selectedImage' : ''" :key="i">
                        <div class="selectedLocker" v-if="image.isSelected">
                            <icon-image address="/assets/site/images/seller-icons/selected.svg" classes="mid"></icon-image>
                        </div>
                        <img class="showcase-image" :src="image.url" alt="image">
                    </div>
                    <div class="col-3 mt-3">
                        <div @click="()=>openInput(1)" class="add-image d-flex justify-content-center align-items-center pt-4 pb-4">
                            <icon-image address="/assets/site/images/seller-icons/plus.svg" classes="big"></icon-image>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <input type="file" id="getImage" class="hiddenInput"  @change="(e)=>addImage(e)" name="img" accept="image/*">
        <div>
            <form action="">
                <div class="row">
                    <div class="col-lg-6 col-md-12 mt-3"><custom-input kind="text" label="نام محصول" :initialEdit="editProduct.name" container="full-width" v-bind:theModel.sync="product.name" classes="block full-width"></custom-input></div>
                    <div class="col-lg-6 col-md-12 mt-3"><custom-input kind="text" label="قیمت" container="full-width" v-bind:theModel.sync="product.price" classes="block full-width"></custom-input></div>
                    <div class="col-lg-6 col-md-12 mt-3"><custom-input kind="dropDown" :selectItems="categories" label="دسته بندی" container="full-width" v-bind:theModel.sync="product.category_id" classes="block full-width" placeholder="دسته بندی را انتخاب کنید"></custom-input></div>
                    <div class="col-lg-6 col-md-12 mt-3"><custom-input kind="dropDown" :selectItems="subCategories" label="زیر دسته" container="full-width" v-bind:theModel.sync="product.subCat" classes="block full-width" placeholder="دسته بندی را انتخاب کنید"></custom-input></div>
                    <div class="col-lg-6 col-md-12 mt-3"><custom-input kind="text" label="درصد تخفیف" container="full-width" v-bind:theModel.sync="product.discount" classes="block full-width"></custom-input></div>
                    <div class="col-lg-6 col-md-12 mt-3"><custom-input kind="text" label="موجودی" container="full-width" v-bind:theModel.sync="product.remaining" classes="block full-width"></custom-input></div>
                    <!-- <div class="col-lg-6 col-md-12 mt-3"><custom-input kind="text" placeholder="کد تخفیف را وارد کنید" label="کد تخفیف" container="full-width" v-bind:theModel.sync="model" classes="block full-width"></custom-input></div> -->
                    <div class="col-lg-6 col-md-12 mt-3">
                        <custom-input kind="tag" :suggestions="tags" @addTag="addTag" label="برچسب ها" container="full-width" v-bind:theModel.sync="product.tag_id" classes="block full-width">
                            <my-tag v-for="(tag,i) in product.tag_id" :theTag="tag" @closeTag="()=>removeTag(tag.id)" classes="productTag" :key="i"></my-tag>                            
                        </custom-input>
                        <div class="suggestions">
                            <p class="mini-title">برچسب های پیشنهادی :</p>
                            <p class="mini-title suggestion" v-for="(t,i) in suggestedTags" @click="()=>addTag(t)" :key="i">
                                {{t.text}}
                                {{i >= suggestedTags.length-1 ? "" : " - "}}
                            </p>
                        </div>
                    </div>
                    <div class="col-12 mt-3 attrs">
                        <div class="d-flex justify-content-between">
                            <p class="tNormal mini-title">خصوصیت ها</p>
                            <button class="purple-btn" @click="(e)=>addNewAttr(e)">افزودن خصوصیت جدید</button>
                        </div>
                        <div class="row add-attr-row m-0 p-0" v-for="(x,i) in finalAttrs" :key="i">
                            <div class="col-6 p-0"><div class="col-lg-6 col-md-12 mt-3"><custom-input kind="dropDown" :selectItems="attrs" label="خصوصیت" container="full-width" v-bind:theModel.sync="x.theParentAttr" @newSelect="refreshChilds" classes="block full-width" placeholder="خصوصیت"></custom-input></div></div>
                            <div class="col-6 p-0"><div class="col-lg-6 col-md-12 mt-3"><custom-input kind="dropDown" :selectItems="childAttrs" label="مقدار" container="full-width" v-bind:theModel.sync="x.theChildAttr" classes="block full-width" placeholder="مقدار خصوصیت"></custom-input></div></div>
                        </div>
                    </div>
                    <div class="col-12 mt-3"><custom-input kind="area" label="توضیحات" placeholder="توضیحات مربوط به محصول را وارد کنید" container="full-width" v-bind:theModel.sync="product.desc" classes="block full-width"></custom-input></div>
                    <!-- <div class="col-12 mt-3"><custom-input kind="tick" label="افزودن به گل های زیر قیمت بازار" value="under" v-bind:theModel.sync="tick"></custom-input><icon-image address="/assets/site/images/seller-icons/question.svg" classes="big ml-1"></icon-image></div> -->
                    <input type="file" id="getExtraImage" class="hiddenInput"  @change="(e)=>addExtraImage(e)" name="extraImg" accept="image/*">
                    <div class="col">
                        <button class="purple-btn mt-3" @click="(e)=>submitProduct(e)">ثبت محصول</button>
                        <button class="white-btn mt-3 mr-3">انصراف</button>
                    </div>
                    <div class="add-pics col-12 mt-3 upload-extra" v-if="edit">
                        <h4 class="tLighter">افزودن تصویر مضاعف</h4>
                        <div class="row mt-4">
                            <div class="col-2">
                                <div class="purple-btn full-width" @click="()=>openInput(2)">انتخاب تصویر جدید</div>
                            </div>
                            <div class="col-2 extra-image-locker" v-if="extraImageToBeAdded != null">
                                <img :src="extraImageToBeAdded.url" class="extra-image-to-add" alt="image">
                            </div>
                            <div class="col-2 extra-image-locker" v-if="extraImageToBeAdded != null">
                                <div class="purple-btn full-width" @click="submitExtraImage">ثبت تصویر</div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
</template>
<script>
import { ref,onMounted,watch,computed, reactive,inject} from "@vue/composition-api";
import CustomButton from '../../Common/customButton'
import IconImage from '../../Common/icon'
import CustomInput from '../../Common/CustomInput'
import ProductItem from './partials/productItem'
import myTag from '../../Common/tag'
import Service from "../../../utils/seller-service"
export default {
    components:{
        CustomButton,
        CustomInput,
        IconImage,
        ProductItem,
        myTag
    },
    setup(props,context){
        function callSupport(){
            // CALL SUPPORT HERE
            console.log("call support")
        }

        const authService = computed(()=>{
            return Service(true)
        })
        const global = inject('global')
        const finalAttrs = ref([{theParentAttr:{value:null,valid:true},theChildAttr:{value:null,valid:true}}])
        const edit = ref(false) 
        const subCategories = ref(null)
        const categories = ref(null)
        const product = reactive({name:{value:null,valid:true},
            price:{value:null,valid:true},
            remaining:{value:null,valid:true},
            category_id:{value:null,valid:true},
            discount:{value:null,valid:true},
            desc:{value:null,valid:true},
            image:{value:null,valid:true},
            tag_id:[],
            attr_id:{value:[],valid:true},
            subCat:{value:'none',valid:true}
        })
        const editProduct = ref({name:{value:null,valid:true},
            price:{value:null,valid:true},
            remaining:{value:null,valid:true},
            category_id:{value:null,valid:true},
            discount:{value:null,valid:true},
            desc:{value:null,valid:true},
            image:{value:null,valid:true},
            tag_id:[],
            attr_id:{value:[],valid:true},
            subCat:{value:'none',valid:true}
        })
        watch(product.category_id,(n,o)=>{
            getSubCategories(n.value.id)
            getAttrs()
        })

        const theParentAttr = computed(()=>{
            if(finalAttrs.value.length>1)
                return finalAttrs.value[finalAttrs.value.length-1].theParentAttr
            else
                return []
        })
        const theChildAttr = computed(()=>{
            if(finalAttrs.value.length>1)
                return finalAttrs.value[finalAttrs.value.length-1].theChildAttr
            else
                return []
        })

        // watch(theParentAttr.value,(n,o)=>{
        //     console.log("blakh")
        //     if(n != {} && n != null )
        //         getChildAttrs()
        // })
        const productToEdit = ref(null)

        onMounted(()=>{
            getCategories()
            getTags()
            if(context.root.$route.params.id){
                edit.value = true
                authService.value.receive('search/product/image/'+ context.root.$route.params.id,{},(s,d)=>{
                    if(s == 200)
                        extraImages.value = []
                        d.data.map((ex)=>{
                            extraImages.value.push({url:ex})
                        })
                },(s,e)=>{

                })
                authService.value.receive('seller/product/'+context.root.$route.params.id,{},(s,d)=>{
                    if(s == 200){
                        categories.value.map((c)=>{
                                if(c.id == product.category_id.value){
                                    product.category_id.value = c
                                }
                            })

                        productToEdit.value = {}
                        productToEdit.value.name = d.data.product.name
                        productToEdit.value.price = d.data.product.price
                        productToEdit.value.remaining = d.data.product.remain
                        productToEdit.value.discount =d.data.product.discount
                        productToEdit.value.desc =d.data.product.desc

                        product.name = {value:d.data.product.name,valid:true}
                        product.price = {value:d.data.product.price,valid:true}
                        product.remaining = {value:d.data.product.remain,valid:true}
                        if(d.data.category.parent_id == null)
                            product.category_id ={value:{value:d.data.product.category_id,text:d.data.category.name},valid:true}
                        else{
                            categories.value.map((c)=>{
                                if(c.id){
                                    if(c.id = d.data.category.parent_id)
                                        product.category_id.value = {text:c.name,value:c.id}
                                }
                            })
                            product.subCat.value = {text:d.data.category.name,value:d.data.category.id}
                        }
                            mainImage.value = d.data.product.image
                            product.discount ={value:d.data.product.discount,valid:true}
                            product.desc ={value:d.data.product.desc,valid:true}
                            product.image ={value:d.data.product.image,valid:true}
                            if(d.data.tag){
                                product.tag_id =[...d.data.tag]
                                product.tag_id.map((tt)=>{
                                    tt.text = tt.name
                                    tt.value = tt.id
                                })
                            }
                            
                            categories.value.map((c)=>{
                                if(c.id = d.data.category.parent_id)
                                    product.category_id.value = {text:c.name,value:c.id}
                            })
                            product.subCat.value = {text:d.data.category.name,value:d.data.category.id}
                            if(d.data.product.attr_id){
                                product.attr_id ={value:[...d.data.product.attr_id],valid:true}
                            }
                            
                            finalAttrs.value = []
                            if(d.data.attribute){
                                d.data.attribute.map((ta)=>{
                                finalAttrs.value.push({theParentAttr:{value:ta.parent_id,valid:true},theChildAttr:{value:ta.id,valid:true}})
                                })
                                finalAttrs.value = d.data.attribute
                            }
                            
                            
                            // let childCategori = getParrentCat(product.category_id.value)

                            categories.value.map((c)=>{
                                if(c.id == product.category_id.value){
                                    product.category_id.value = c
                                }
                            })
                    }
                },(s,e)=>{console.log("this is error",e)})
            }
        })

        // const 

        const getCategories = () => {
            authService.value.receive('seller/categories',{},(s,d)=>{
                if(s == 200)
                    categories.value = d.data
                categories.value.map((c)=>{
                    c.text = c.name
                    c.value = c.id
                })
            },(s,e)=>{console.log("this is error",e)})
        }

        const getSubCategories = (id) => {
            authService.value.receive('seller/subcategories/'+id , {} ,(s,d)=>{
                if(s == 200)
                    subCategories.value = d.data
                subCategories.value.map((c)=>{
                    c.text = c.name
                    c.value = c.id
                })
            },(s,e)=>{console.log("this is error",e)})
        }

        const getAttrs = () => {
            authService.value.receive('seller/attributes?category_id=' + product.category_id.value.id,{},(s,d)=>{
                if(s == 200)
                    attrs.value = d.data
                attrs.value.map((a)=>{
                    a.text = a.name
                    a.value = a.id
                })
            },(s,e)=>{})
        }

        const getChildAttrs = (i) => {
            authService.value.receive('seller/attributechild/' + i,{},(s,d)=>{
                if(s == 200)
                  childAttrs.value = d.data
                childAttrs.value.map((a)=>{
                    a.text = a.name
                    a.value = a.id
                })
            },(s,e)=>{})
        }

        const getTags = () => {
            authService.value.receive('seller/tags',{},(s,d)=>{
                if(s == 200)
                    tags.value = d.data
                tags.value.map((t)=>{
                    t.text = t.name
                })
                suggestedTags.value=d.data
                suggestedTags.value.map((t)=>{
                    t.text = t.name
                })
            },(s,e)=>{console.log("this is error",e)})
        }

        const attrs = ref(null)
        const childAttrs = ref(null)

        const items=[{text:'text1',value:'value1'},{text:'text2',value:'value2'},{text:'text2',value:'value2'},{text:'text2',value:'value2'},{text:'text2',value:'value2'},{text:'text2',value:'value2'}]

        const model = ref(null)
        const tick = ref(false)
        const mainImage = ref('')
        const extraImageToBeAdded = ref(null)
        const images = ref([])
        const extraImages = ref(null)
        


        const tags = ref([{text:'دسته گل عروسی',id:1},{text:'گل ترحیم',id:2}])
        const suggestedTags = ref(null)

        const addTag = (t)=>{
            product.tag_id = [...product.tag_id,t]
        }

        const removeTag = (v) =>{
            product.tag_id = product.tag_id.filter((i)=>{
                return i.id != v 
            })
        }

        const openInput = (ni) => {
            if(ni == 1)
                document.getElementById("getImage").click()
            else
                document.getElementById("getExtraImage").click()
        }

        
        function addImage(e){
            // let isSelected = images.value.length<1 ? true : false
            let isSelected = images.value.length<2 ? true : false

            if(isSelected)
                mainImage.value = URL.createObjectURL(e.target.files[0])

            // images.value = [...images.value,{url:URL.createObjectURL(e.target.files[0]),isSelected:isSelected}]
            images.value = [{url:URL.createObjectURL(e.target.files[0]),isSelected:isSelected}]

            product.image = e.target.files[0]
        }

        function addExtraImage(e){
            extraImageToBeAdded.value = {image:e.target.files[0],url:URL.createObjectURL(e.target.files[0])}
        }

        const selectImage = (i)=>{
            images.value.map((m)=>{
                m.isSelected = false
            })

            images.value[i].isSelected = true
            mainImage.value = images.value[i].url
        }

        const submitExtraImage = () =>{
            let f = new FormData()
            f.append("image",extraImageToBeAdded.value.image)
            authService.value.transmit('seller/product/image/'+context.root.$route.params.id,f,(s,d)=>{
                if(s == 200){
                    global.alertToggle('با موفقیت افزوده شد')
                    extraImageToBeAdded.value = null
                }
            },(s,d)=>{
                global.alertToggle('درخواست ناموفق!')
            })
        }

        const submitProduct = (e) => {
            e.preventDefault()
            let f = new FormData()
            if(productToEdit.value != null){
                if(productToEdit.value.name != product.name.value)
                    f.append('name',product.name.value)
                if(productToEdit.value.price != product.price.value)
                    f.append('price',parseInt(product.price.value))
                if(productToEdit.value.remaining != product.remaining.value)
                    f.append('remain',parseInt(product.remaining.value))
                if(productToEdit.value.discount != product.discount.value)
                    f.append('discount',parseInt(product.discount.value))
                if(productToEdit.value.desc != product.desc.value)
                    f.append('desc',product.desc.value)
                if(!product.image.value)
                    f.append('image',product.image)
                authService.value.transmit('seller/product/'+context.root.$route.params.id,f,()=>{
                    alert("تغییرات ثبت شد")
                    location.reload();
                },(s,er)=>{
                    console.log({er})
                })
            }
            else{
                f.append('name',product.name.value)
                f.append('price',parseInt(product.price.value))
                f.append('remain',parseInt(product.remaining.value))
                if(product.subCat.value != 'none'){
                    f.append('category_id',parseInt(product.subCat.value.id))
                }
                else{
                    if( product.category_id.value != null)
                        f.append('category_id',parseInt(product.category_id.value.id))
                }
                f.append('discount',parseInt(product.discount.value))
                f.append('desc',product.desc.value)
                f.append('image',product.image)
                let myTags = []
                product.tag_id.map((t)=>{
                    myTags.push(t.id)
                })
                // f.append('tag_id',myTags)
                myTags.map((v,i)=>{
                    f.append('tag_id['+i+']',v)
                })
                finalAttrs.value.map((aa)=>{
                    if(aa.theChildAttr.value != null ){
                        product.attr_id.value.push(parseInt(aa.theChildAttr.value.id))
                    }
                })
                if(product.attr_id.value.length>0)
                product.attr_id.value.map((v,i)=>{
                    f.append('attribute_id['+i+']',v)
                })
                // f.append('attribute_id',product.attr_id.value)

                authService.value.transmit('seller/product',f,()=>{
                    alert("با موفقیت ثبت شد!")
                    location.reload();
                },(s,er)=>{
                    console.log({er})
                    if(!s){
                        er.response.data.error.invalid_params.map((err)=>{
                            if(err.field == 'name'){
                                product.name.valid = false
                                product.name.message = err.message
                            }
                            else if(err.field == 'remain'){
                                product.remaining.valid = false
                                product.remaining.message = err.message
                            }
                            else if(err.field == 'price'){
                                product.price.valid = false
                                product.price.message = err.message
                            }
                            else if(err.field == 'discount'){
                                product.discount.valid = false
                                product.discount.message = err.message
                            }
                            else if(err.field == 'desc'){
                                product.desc.valid = false
                                product.desc.message = err.message
                            }
                            else if(err.field == 'category_id'){
                                product.category_id.valid = false
                                product.category_id.message = err.message
                            }
                        })
                    }
                })
            }
        }

        const addNewAttr = (e) => {
            e.preventDefault()
            finalAttrs.value = [...finalAttrs.value,{theParentAttr:{value:null,valid:true},theChildAttr:{value:null,valid:true}}]
        }

        const refreshChilds = (x) =>{
            getChildAttrs(x.value)
        }

        return{productToEdit,extraImages,submitExtraImage,extraImageToBeAdded,addExtraImage,edit,refreshChilds,editProduct,addNewAttr,finalAttrs,product,childAttrs,theChildAttr,theParentAttr,submitProduct,subCategories,items,tags,removeTag,addTag,suggestedTags,tick,openInput,images,mainImage,addImage,selectImage,categories,attrs}
    }
}
</script>
<style scoped>
.addProduct{
    font-weight: lighter;
}

.product-form{
    background-color: #fff;
}

.purple-btn{
    text-align: center;
}

.purple-btn:hover{
    cursor: pointer;
}

.upload-extra{
    border:2px dashed rgba(127, 127, 127, 0.4);
    padding: .5rem 1.5rem 1rem 1.5rem;
}

.upload-extra h4{
    font-size: 1rem;
}

.big-upload{
    text-align: center;
    border:2px dashed #772CE8;
}

.showcase-image{
    width: 100%;
}

.add-image{
    border:2px dashed rgba(127, 127, 127, 0.5);
    width: 100%;
    cursor: pointer;
}

.showcase-locker{
    overflow:hidden;
    position: relative;
}

.showcase-locker:hover{
    cursor: pointer;
}

.selectedImage{
    border:2px solid #772CE8;
}

.extra-image-to-add{
    height: 40px;
}

.selectedLocker{
    position: absolute;
    top:3%;
    right:5%;
}

.hiddenInput{
    position: absolute;
    visibility: hidden;
}

.productTag{
    border: 1px solid #772CE8;
    color: #772CE8;
    background-color: rgba(119, 44, 232, 0.16);
    border-radius: 5px;
}

.suggestion{
    color: #772CE8;
    font-size: 0.9rem;
    font-weight: lighter;
}

.suggestion:hover{
    cursor: pointer;
}

.attrs{
    padding: 1rem 0px 2rem 0px;
    border-top:1px solid rgba(127, 127, 127, 0.3);
    border-bottom:1px solid rgba(127, 127, 127, 0.3);
}

.attrs button{
    width:auto !important;
    padding: 1rem;
}

</style>