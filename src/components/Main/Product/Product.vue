<template>
    <div class="product-page">
        <div class="row">
            <div class="col-md-6">
                <div class="product-page-image">
                    <img :src="theImage" alt="">
                </div>
                <div class="product-page-images mt-3" v-if="theProduct.extraImages != []">
                    <div class="row">
                        <div class="col-2 product-page-image" v-for="(ex,i) in extraImages" :key="i">
                            <img :src="ex" alt="img" @click="()=>magnify(i)">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="product-profile">
                    <h3>{{theProduct.name}}</h3>
                    <p class="mini-title tLighter mt-3">مشاهده ی محصولات بیشتر در <a href="sss">فروشگاه محمدی</a></p>
                    <div class="discount-price mt-4" v-if="theProduct.formattedFinalPrice">
                        <span class="discount-initial">{{theProduct.formattedPrice + " تومان"}}</span>
                        <span>{{theProduct.formattedFinalPrice + " تومان"}}</span>
                       <!-- <span class="discount-percentage">{{theProduct.discount+ "%"}}</span> -->
                    </div>
                    <h3 class="mt-4" v-else>{{theProduct.formattedPrice}} تومان</h3>
                    <div class="delivery mt-4">
                        <div class="delivery-cube mini-title"></div>
                        <p class="tLighter mini-title">ارسال رایگان در 24 ساعت</p>
                    </div>
                    <div class="buy-settings">
                            <h5 class="tNormal mb-3">جزئیات خرید</h5>
                            <custom-input labelClass="tLighter" kind="dropDown" container="half-width ml-2" v-bind:theModel.sync="count" :selectItems="counts" label="انتخاب تعداد" placeholder="تعداد"></custom-input>
                            <button>افزودن به سبد خرید</button>
                    </div>
                    <div class="product-details">
                        <h5 class="tNormal mb-3">جزئیات محصول</h5>
                        <div id="accordion">
                        <div class="card">
                            <div class="card-header" id="headingOne">
                            <h5 class="mb-0">
                                <div class="full-width d-flex justify-content-between">
                                    <p class="mini-title tLighter">توضیحات</p>
                                    <custom-button toggle="collapse" target="#collapseOne" classes="no-border" icon="/assets/site/images/seller-icons/left-arrow.svg"></custom-button>
                                </div>
                            </h5>
                            </div>

                            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                            <div class="card-body">
                                {{theProduct.desc}}
                            </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header" id="headingTwo">
                            <h5 class="mb-0">
                                <div class="full-width d-flex justify-content-between">
                                    <p class="mini-title tLighter">وزن و ابعاد</p>
                                    <custom-button toggle="collapse" target="#collapseTwo" classes="no-border" icon="/assets/site/images/seller-icons/left-arrow.svg"></custom-button>
                                </div>
                            </h5>
                            </div>
                            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                            <div class="card-body">
                                {{theProduct.category_name}}
                            </div>
                            </div>
                        </div>
                     </div>
                    </div>
                    <div class="questions">
                        <p class="tLighter">
                            آیا سوال دیگری در مورد محصول دارید؟
                        </p>
                        <p class="tLighter">
                            پشتیبانی ما آماده به کمک به شما هستند
                        </p>
                        <custom-button icon="/assets/site/images/seller-icons/left-arrow.svg" label="تماس با ما" classes="no-border half-width purple-btn"></custom-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="similar-products">
            <h4 class="tNormal">محصولات مشابه</h4>
            <my-carousel>
                <div class="similar-product">
                    <mock></mock>
                </div>
                <div class="similar-product">
                    <mock></mock>
                </div>
                <div class="similar-product">
                    <mock></mock>
                </div>
                <div class="similar-product">
                    <mock></mock>
                </div>
                <div class="similar-product">
                    <mock></mock>
                </div>
                <div class="similar-product">
                    <mock></mock>
                </div>
            </my-carousel>
        </div>
    </div>
</template>
<script>
import CustomInput from "../../Common/CustomInput"
import {ref} from "@vue/composition-api"
import CustomButton from "../../Common/customButton"
import MyCarousel from "../Layout/MyCarousel"
import Mock from "../Layout/Mock"
export default {
    components:{
        CustomInput,
        CustomButton,
        Mock,
        MyCarousel
    },
    setup(props,{emit}){
        const theService = ref(Service(false))
        const counts = ref([{text:"1",value:1},{text:"2",value:2},{text:"3",value:3},{text:"4",value:4}])
        const count = ref({value:{text:"1",value:1},valid:true})
        const extraImages = ref([])
        const addToBasket = () =>{
            let x = {...props.theProduct}
            x.quantity = count.value.value.value
            emit('addToBasket',x)
        }
        const theImage = ref(null)
        watch(()=>props.theProduct,(n,o)=>{
            theImage.value = n.image
            extraImages.value = n.extraImages
            count.value = {value:{text:"1",value:1},valid:true}
        })

        const magnify = (i)=>{
            let temp = theImage.value
            theImage.value = extraImages.value[i]
            extraImages.value[i] = temp
        }

        return{addToBasket,counts,count,extraImages,magnify,theImage}
    }
}
</script>
<style>
    .product-page{
        padding: 2rem 2rem 4rem 2rem;
    }
    .product-page-image img{
        width: 100%;
    }

    .delivery-cube{
        width: 13px;
        height: 13px;
        margin-left: 5px;
        background-color: rgba(127, 127, 127, 0.25);
    }

    .buy-settings{
        border-top: 1px solid rgba(127, 127, 127, 0.2);
        padding-top:1.5rem;
        margin-top: 1rem;
    }

    .product-details{
        border-top: 1px solid rgba(127, 127, 127, 0.2);
        padding-top:1.5rem;
        margin-top: 3rem;
    }

    .buy-settings button{
        color: #fff;
        padding: 0.45rem 1.5rem 0.45rem 1.5rem;
        border-radius: 20px;
        background-color: #7F187F;
        border: none;
        font-size: 0.9rem;
        font-weight: lighter;
    }

    #accordion .card{
        border:none;
    }

    #accordion .card-header{
        background: none;
        padding-bottom: 0px ;
    }

    #accordion .btn-link{
        color: #000;
    }

    #accordion p{
        margin: 0px;
    }

    .questions{
        text-align: center;
        margin-top:3rem;
    }

    .questions .purple-btn{
        background-color: #7F187F !important;
    }

    .similar-products{
        margin-top: 3rem;
    }

    .similar-product{
        min-width: 20%;
        max-width: 21%;
        padding-left: 3px;
        padding-right: 3px;
    }
</style>