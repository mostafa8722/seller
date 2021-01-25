<template>
    <div class="shop-page">
        <div class="shop-main-locker">
            <img class="shop-image" :src="theShop.banner" alt="image">
        </div>
        <div class="shop-info mt-5">
            <div class="row">
                <div class="col-3 pt-5">
                    <img  class="shop-image" :src="theShop.logo" alt="image">
                </div>
                <div class="col-5">
                    <h3>{{theShop.name}}</h3>
                    <p class="tLighter">با خرید از فروشگاه  {{theShop.name + " "}}شما در سریع ترین و کوتاهترین زمان ممکن سفارش خود را دریافت نمایید ٬ گلپینو به عنوان پلتفرم خرید و وفروش گل نظارت می نماید که سفارش ما مطابق با تصویرو به موقع تحویل گردد . بعد از دریافت سفارش خود حتما با با درج نظر مثبت یا منفی خود  ٬ فروشگاه {{theShop.name + " "}}را در ارتقا و بالا بردن کیفیت خود یاری رسانید . ما منتظر پیشنهاد سازنده شما هستیم</p>
                </div>
                <div class="col-4 shop-actions pt-5">
                    <custom-button icon="/assets/site/images/seller-icons/purple-heart.svg" classes="follow-shop" label="دنبال کردن فروشگاه"></custom-button>
                <custom-button icon="/assets/site/images/seller-icons/purple-heart.svg" classes="follow-shop mt-3" label="مشاهده ی فضای سه بعدی فروشگاه"></custom-button>
                </div>
            </div>
            <div class="shop-hoopla mt-5">
                <div class="row">
                    <div class="col-8 hoopla-image pl-0">
                        <img  class="shop-image" src="/assets/site/images/site-banner.jpg" alt="">
                    </div>
                    <div class="col-4 hoopla-text pr-0">
                        <div class="p-5">
                            <p class="tLighter">{{theShop.address}}</p>
                            <button>مشاهده ی محصولات</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="shop-products mt-5">
            <h3>{{theShop.name}}</h3>
            <p>{{shopProducts.length}} محصول</p>
            <div class="shop-products-sort mb-5 mt-4">
                <div class="shop-sorting shop-tools">
                    <custom-input inputClass="tLighter" label="مرتب سازی" labelClass="tLighter mini-title" kind="dropDown" container="tLighter mr-3 full-width" v-bind:theModel.sync="sort" :selectItems="sorts" classes="tLighter mini-title half-width mr-3" placeholder="مرتب سازی"></custom-input>
                </div>
                <div class="shop-filters shop-tools">
                    <custom-input inputClass="tLighter" label="فیلتر" labelClass="tLighter mini-title" kind="dropDown" container="tLighter mr-3 full-width" v-bind:theModel.sync="filterCategory" :selectItems="categories" classes="tLighter mini-title half-width mr-3" placeholder="دسته بندی"></custom-input>
                </div>
                <!-- <custom-tag :theTag="tags" classes="shop-tag"></custom-tag>
                <custom-tag :theTag="tags" classes="shop-tag"></custom-tag>
                <custom-tag :theTag="tags" classes="shop-tag"></custom-tag>
                <custom-tag :theTag="tags" classes="shop-tag"></custom-tag> -->
            </div>
            <!-- <div class="row">
                <div class="col-3">
                    <product-thumb :theProduct="theProduct"></product-thumb>
                </div>
            </div> -->
            <!-- <my-carousel>
                
            </my-carousel> -->
            <div class="row" v-if="filterProducts == null">
                <div class="col-3 mb-3 p-3" v-for="(product,i) in shopProducts" :key="i">
                    <product-thumb @showModal="showModal" @addToBasket="addProductToCart" classes="mini-caroo-item" :theProduct="product"></product-thumb>
                </div>
            </div>
            <div class="row" v-else>
                <div class="col-3 mb-3 p-3" v-for="(product,i) in filterProducts" :key="i">
                    <product-thumb @showModal="showModal" @addToBasket="addProductToCart" classes="mini-caroo-item" :theProduct="product"></product-thumb>
                </div>
            </div>
            <!-- <div class="shop-products-nav pt-5">
                <div class="shop-pages">
                    <custom-button iconSize="mt-2" icon="/assets/site/images/seller-icons/right-arrow.svg" classes="shop-nav"></custom-button>
                    <button class="shop-page-number">1</button>
                    <button class="shop-page-number">2</button>
                    <button class="shop-page-number">3</button>
                    <button class="shop-page-number">4</button>
                    <custom-button iconSize="mt-2" icon="/assets/site/images/seller-icons/left-arrow.svg" classes="shop-nav"></custom-button>
                </div>
            </div> -->
        </div>
        <product-modal @addToBasket="addProductToCart" :theProduct="modalProduct"></product-modal>
    </div>    
</template>
<script>
import ProductThumb from "../Layout/ProductThumb"
import IconImage from "../../Common/icon"
import {computed, inject, onMounted, ref, watch} from "@vue/composition-api"
import CustomButton from "../../Common/customButton"
import CustomLink from "../../Common/CustomLink"
import CustomTag from "../../Common/tag"
import CustomInput from "../../Common/CustomInput"
import Service from "../../../utils/service"
import MyCarousel from "../Layout/MyCarousel"
import currencyFormatter from "../../use/fomatCurrency"
import ProductModal from "../Layout/ProductModal"
import $ from 'jquery'
export default {
    components:{
        ProductThumb,
        IconImage,
        CustomButton,
        CustomLink,
        CustomTag,
        MyCarousel,
        ProductModal,
        CustomInput
    },
    setup(props,context){
        // MOCK
        const tags = ref({text:"تاج گل",id:1})
        const sorts = ref([{text:'ارزان ترین',value:1},{text:'گران ترین',value:2}])
        const sort = ref({value:null,valid:true})
        const categories = ref([])
        //COMPONENT
        const shopId = computed(()=>{
            return context.root.$route.params.id
        })
        const authService = computed (()=>{
            return Service(true)
        })
        const theService = computed(()=>{
            return Service(false)
        })
        const stateValues = inject('stateValues')
        const global = inject('global')
        const theShop = ref({banner:null,logo:null,name:null})
        const shopProducts = ref([])
        const addProductToCart = (theProduct) => {
            $('#productModal').modal('hide')
            if(stateValues.shoppingCart.value.length>0 && stateValues.shoppingCart.value[0].seller_id != theProduct.seller_id){
                    global.alertToggle('شما یک سبد خرید از فروشگاهی دیگر دارید!')
                    let cookie = cookieFinder()
                    if(cookie != '' && cookie != 'no-auth'){
                        authService.value.receive('buy/order/active',{},(s,d)=>{
                        if(s == 200){
                            if(d.data.product){
                                context.emit('cartModal',d.data.order.id)
                            }
                            else{
                                context.emit('cartModal','random')
                            }
                        }
                            
                        },(s,e)=>{

                        })
                    }                    
                    else{
                        global.alertToggle('شما یک سبد خرید از فروشگاهی دیگر دارید!')
                    }
            }
            else{
                let cookie = cookieFinder()
                let hasActiveCart = false
                if(cookie != '' && cookie != 'no-auth'){
                    authService.value.receive('buy/order/active',{},(s,d)=>{
                        if(s == 200){
                            if(d.data.product){
                                hasActiveCart = true
                            }
                                        if(!hasActiveCart)
                                            stateValues.addToCart(theProduct)
                                        else{
                                            global.alertToggle('شما یک سبد خرید فعال دارید')
                                            setTimeout(()=>{
                                                context.emit('cartModal',d.data.order.id)
                                            },1000)
                                        }
                        }
                        
                    },(s,e)=>{

                    })
                }
                else
                    stateValues.addToCart(theProduct)
                }
        }

        const cookieFinder = () =>
              {
                let match = document.cookie.match(new RegExp('(^| )' + 'Golpino_token' + '=([^;]+)'));
                if (match) {
                 return match[2]
                }
                else{
                    return 'no-auth'
                }
        }
        const getCategories = () => {
            theService.value.receive('search/category',{},(s,d)=>{
                if(s == 200){
                    categories.value = d.data
                    categories.value.map((c)=>{
                        c.text = c.name
                        c.value = c.id
                    })
                    categories.value = [{value:null,text:'تمامی دسته بندی ها'}].concat(categories.value)
                }
            },(s,e)=>{})
        }
        onMounted(()=>{
            theService.value.receive('search/seller/'+shopId.value , {} , (s,d)=>{
                theShop.value = d.data.seller
                shopProducts.value = d.data.products
                shopProducts.value.map((p)=>{
                    p.formattedPrice = currencyFormatter(p.price + "")
                })
            },(s,e)=>{

            })
            getCategories()
        })
        const extraImages = ref([])
        const modalProduct = ref({name:"",formattedPrice:"",image:""})
        const showModal = (v)=>{
            extraImages.value = []
            theService.value.receive('search/product/image/'+ v.id,{},(s,d)=>{
                    if(s == 200)
                        extraImages.value = [...d.data]
                        modalProduct.value = {...v,extraImages:extraImages.value}
                        $('#productModal').modal('show')
                },(s,e)=>{

                })
        }
        const filterCategory = ref({value:null,valid:true})
        const filterProducts = ref(null)

        watch(sort.value,(n,o)=>{
            if(n.value.value == 1){
                if(filterProducts.value != null){
                    filterProducts.value.sort((a,b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0))
                }
                else{
                    shopProducts.value.sort((a,b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0))
                }
            }
            else{
                if(filterProducts.value != null){
                    filterProducts.value.sort((a,b) => (a.price > b.price) ? -1 : ((b.price > a.price) ? 1 : 0))
                }
                else{
                    shopProducts.value.sort((a,b) => (a.price > b.price) ? -1 : ((b.price > a.price) ? 1 : 0))
                }
            }
            
        })

        watch(filterCategory.value,(n,o)=>{
            if(n.value.value == null){
                filterProducts.value = null
            }
            else{
                filterProducts.value = shopProducts.value.filter((p)=>{
                    if(p.category_id == n.value.value)
                        return p
                })
            }
        })

        return {sort,sorts,categories,filterCategory,filterProducts,modalProduct,showModal,tags,theShop,shopProducts,addProductToCart}
    }
}
</script>
<style>
.shop-page{
    background-color: #fff;
    padding:2rem 8rem 5rem 8rem;
    margin-top: 1rem;
}

.shop-main-locker{
    max-height: 50vh;
    overflow: hidden;
}

.shop-image{
    width: 100%;
}

.shop-actions{
    text-align: left;
}

.follow-shop{
    padding:5px 13px 5px 13px;
    border-radius: 15px;
    color: #772CE8;
    border:1px solid #772CE8;
}

.follow-shop:hover{
    color: #fff;
    background-color: #772CE8;
}


.hoopla-text{
    padding-top: 3rem;
    background-color: #F5F5F5;
    text-align: center;
    font-weight: lighter;
}

.hoopla-text button{
    background-color: #7F187F;
    color: #fff;
    border:none;
    padding: 8px 25px 8px 25px;
    border-radius: 20px;
}

.hoopla-text button:hover{
    cursor: pointer;
}

.shop-tag{
    padding:0.5rem 1rem 0.5rem 1rem !important;
    background-color: #7F187F;
    color: white;
    border:none;
    border-radius: 18px;
    font-size: 0.9rem;
    font-weight: lighter;
}

.shop-page-number{
    border:none;
    border-bottom: 2px solid rgba(127, 127, 127, 0.15);
    background: none;
    margin:5px;
}

.shop-nav{
    width: 25px !important;
    height: 25px !important;
    border-radius: 50% !important;
    border:none !important;
    padding: 0px !important;
    background-color: rgba(127, 127, 127, 0.25) !important;
}

.shop-pages{
    width: 100%;
    text-align: center;
}

/* FILTERS */
.shop-tools{
    display: inline-block;
    padding-left: 1rem;
    width: 25vw;
}

.shop-sorting{
    border-left: 2px solid rgba(127, 127, 127, 0.25);
}

.shop-filters{
    padding-right: 1rem;
}
</style>