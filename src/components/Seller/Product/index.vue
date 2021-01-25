<template>
<div class="container products-page pt-4">
    <div class="d-flex justify-content-between">
        <h2 class="mini-title">محصولات</h2>
        <router-link :to="{name:'Golpino Seller Product Form'}"><custom-button classes="add-button" icon="/assets/site/images/seller-icons/white-plus.svg" label="افزودن محصول"></custom-button></router-link>
    </div>
    <div class="products mt-2">
        <div class="product-tools d-flex justify-content-between">
            <div class="mini-title">
                <custom-input placeholder="جستجوی محصول" icon="/assets/site/images/seller-icons/search.svg" kind="text" v-bind:theModel.sync="model"></custom-input>                
            </div>
            <div class="mini-title">
                <p class="mini-title">
                    نمایش 1 تا 10 از 100 محصول
                </p>
                <custom-button classes="list-nav-button" icon="/assets/site/images/seller-icons/right-arrow.svg" iconSize="mid"></custom-button>
                <custom-button classes="list-nav-button" icon="/assets/site/images/seller-icons/left-arrow.svg" iconSize="mid"></custom-button>
            </div>
        </div>
        <div class="products-table mt-2">
            <table>
                <tr>
                    <th>تصویر<icon-image address="/assets/site/images/seller-icons/arrow-up.svg" classes="mid"></icon-image><icon-image address="/assets/site/images/seller-icons/arrow-down.svg" classes="mid"></icon-image></th>
                    <th>نام محصول<icon-image address="/assets/site/images/seller-icons/arrow-up.svg" classes="mid"></icon-image><icon-image address="/assets/site/images/seller-icons/arrow-down.svg" classes="mid"></icon-image></th>
                    <th>دسته بندی<icon-image address="/assets/site/images/seller-icons/arrow-up.svg" classes="mid"></icon-image><icon-image address="/assets/site/images/seller-icons/arrow-down.svg" classes="mid"></icon-image></th>
                    <th>قیمت<icon-image address="/assets/site/images/seller-icons/arrow-up.svg" classes="mid"></icon-image><icon-image address="/assets/site/images/seller-icons/arrow-down.svg" classes="mid"></icon-image></th>
                    <th>قیمت با تخفیف<icon-image address="/assets/site/images/seller-icons/arrow-up.svg" classes="mid"></icon-image><icon-image address="/assets/site/images/seller-icons/arrow-down.svg" classes="mid"></icon-image></th>
                    <th>تعداد<icon-image address="/assets/site/images/seller-icons/arrow-up.svg" classes="mid"></icon-image><icon-image address="/assets/site/images/seller-icons/arrow-down.svg" classes="mid"></icon-image></th>
                    <th>تاریخ<icon-image address="/assets/site/images/seller-icons/arrow-up.svg" classes="mid"></icon-image><icon-image address="/assets/site/images/seller-icons/arrow-down.svg" classes="mid"></icon-image></th>
                    <th>اقدامات<icon-image address="/assets/site/images/seller-icons/arrow-up.svg" classes="mid"></icon-image><icon-image address="/assets/site/images/seller-icons/arrow-down.svg" classes="mid"></icon-image></th>
                </tr>
                <product-item @deleteMe="deleteProduct" v-for="(p,i) in products" :key="i" :theProduct="p"></product-item>
            </table>
        </div>
    </div>

</div>
</template>
<script>
import { ref,onMounted,computed } from "@vue/composition-api";
import CustomButton from '../Common/customButton'
import IconImage from '../Common/icon'
import CustomInput from '../Common/CustomInput'
import ProductItem from './partials/productItem'
import Service from "../../../utils/seller-service"
export default {
    components:{
        CustomButton,
        CustomInput,
        IconImage,
        ProductItem
    },
    setup(){
        onMounted(()=>{
            getProducts()
        })

        const authService = computed(()=>{
            return Service(true)
        })
        const products = ref(null)

        const getProducts = () => {
            authService.value.receive('seller/product',{},(s,d)=>{
                if(s == 200)
                    products.value = d.data
            },(s,e)=>{})
        }
        const model = ref(null)

        const deleteProduct = (id) => {
            authService.value.remove('seller/product/' + id , {},(s,d)=>{
                if(s == 200)
                    getProducts()
            },(s,e)=>{

            })
        }

        return{products,model,deleteProduct}
    }
}
</script>
<style scoped>
.products-page{
    font-weight: lighter;
    font-size: 0.8rem;
}

h2{
    font-weight: lighter;
    font-size: 1.2rem;
}

.list-nav-button{
    border:none;
}

.products{
    background-color: #fff;
    padding:12px 18px 0px 18px;
}

.product-table{
    width: 100%;
}

table{
  border-collapse: collapse; 
  border-spacing: 20px 10px;
  width: 100%;
  font-size: 0.75rem;
}
</style>