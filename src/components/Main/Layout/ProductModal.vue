<template>
    <!-- Modal -->
<div class="modal fade pModal" id="productModal" tabindex="-1" role="dialog" aria-labelledby="productModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="address-modal-header">
        <div class="full-width d-flex justify-content-end pl-3 pt-3">
            <!-- <h5 class="modal-title"></h5> -->
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
      </div>
      <div class="modal-body">
        <div class="row">
            <div class="col-md-6">
                <div class="product-page-image">
                    <img :src="theImage" alt="">
                </div>
                <div class="product-page-images mt-3" v-if="theProduct.extraImages != []">
                    <div class="row">
                        <div class="col-4 product-page-image" v-for="(ex,i) in extraImages" :key="i">
                            <img :src="ex" alt="img" @click="()=>magnify(i)">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="product-profile">
                    <h3>{{theProduct.name}}</h3>
                    <!-- <p class="mini-title tLighter mt-3">مشاهده ی محصولات بیشتر در <a href="sss">فروشگاه محمدی</a></p> -->
                    <h3 class="mt-4">{{theProduct.formattedPrice}} تومان</h3>
                    <div class="delivery mt-4">
                        <div class="delivery-cube mini-title"></div>
                        <p class="tLighter mini-title">ارسال رایگان در 24 ساعت</p>
                    </div>
                    <div class="buy-settings">
                            <h5 class="tNormal mb-3">جزئیات خرید</h5>
                            <custom-input labelClass="tLighter" kind="dropDown" container="half-width ml-2" v-bind:theModel.sync="count" :selectItems="counts" label="انتخاب تعداد" placeholder="تعداد"></custom-input>
                            <button @click="addToBasket">افزودن به سبد خرید</button>
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

                            <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                            <div class="card-body">
                                {{theProduct.desc}}
                            </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header" id="headingTwo">
                            <h5 class="mb-0">
                                <div class="full-width d-flex justify-content-between">
                                    <p class="mini-title tLighter">خصوصیات</p>
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
                        <!-- <div class="card">
                            <div class="card-header" id="headingThree">
                            <h5 class="mb-0">
                                <div class="full-width d-flex justify-content-between">
                                    <p class="mini-title tLighter">وزن و ابعاد</p>
                                    <custom-button toggle="collapse" target="#collapseThree" classes="no-border" icon="/assets/site/images/seller-icons/left-arrow.svg"></custom-button>
                                </div>
                            </h5>
                            </div>
                            <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                            <div class="card-body">
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                            </div>
                            </div>
                        </div> -->
                     </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <!-- <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                وزن و ابعاد
                                </button> -->
      <div class="modal-footer pt-2 pb-2 pr-4 pl-4">
        
      </div>
    </div>
  </div>
</div>
</template>
<script>
import { ref,inject, onMounted, watch } from "@vue/composition-api";
import CustomInput from "../../Common/CustomInput"
import IconImage from "../../Common/icon"
import CustomButton from "../../Common/customButton"
import Service from '../../../utils/service'
export default {
    components: {
    IconImage,
    CustomInput,
    CustomButton
  },
  props:['theProduct'],
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
<style scoped>
.modal-dialog{
    max-width: 800px !important;
}
.product-profile{
    font-size: 0.8rem;
}

.product-profile h3{
    font-size: 1rem;
}

.product-profile h5{
    font-size: 1rem;
}
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