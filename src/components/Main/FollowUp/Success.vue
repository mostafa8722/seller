<template>
    <div class="page p-5">
        <div class="successful-complaint">
            <div class="d-flex justify-content-between">
                <div class="success-message">
                    <p class="green">سفارش شما با موفقیت ثبت گردید</p>
                    <div class="mt-3">
                        <p class="mini-title title">شماره سفارش :</p>
                        <p class="mini-title">{{orderId}}</p>
                    </div>
                    <div class="mt-3">
                        <p class="mini-title title">کد پیگیری پرداخت :</p>
                        <p class="mini-title">{{followUpNo}}</p>
                    </div>
                    <div class="mt-1 mb-4">
                        <p class="mini-title title">شیوه ی پرداخت :</p>
                        <p class="mini-title">پرداخت اینترنتی</p>
                    </div>
                    <router-link to="/">بازگشت به صفحه اصلی</router-link>
                </div>
                <icon-image address="/assets/site/images/seller-icons/tick.svg"></icon-image>
            </div>
            <!-- <div class="mt-3 guide">
                <p>مبلغ 140000 تومان از طریق درگاه اینترنتی از حساب شما کسر شد.</p>
            </div> -->
        </div>
        <!-- <div class="daily-showcase mt-4">
            <my-carousel classes="pt-3">
                <div class="dis my-carousel-item" v-for="(ss,i) in sampleShops" :key="i">
                    <daily-discount :theShop="ss"></daily-discount>
                </div>
            </my-carousel>
        </div> -->
    </div>    
</template>
<script>
import IconImage from "../../Common/icon"
import CustomInput from "../../Common/CustomInput"
import {computed, onMounted, ref} from "@vue/composition-api"
import MyCarousel from "../Layout/MyCarousel"
import DailyDiscount from "../Layout/DailyDiscount"
import Service from "../../../utils/service"
export default {
    components:{
        IconImage,
        CustomInput,
        MyCarousel,
        DailyDiscount
    },
    setup(props,context){
        const theService = computed(()=>{
            return Service(false)
        })
        const sampleShop = ref({name:"گلفروشی محمدی",address:{address:"سعادت آباد"},banner:"https://golpino.com/uploads/shop-images/1600249947.jpeg"})
        const sampleShops = ref([])
        onMounted(()=>{
            theService.value.receive('search?category_id=3',{},(s,d)=>{
                if(s==200){
                    sampleShops.value = d.data
                }
            },(s,e)=>{
                
            })
        })
        const followUpNo = computed(()=>{
            if(context.root.$route.params.follow)
                return context.root.$route.params.follow
            else 
                return false
        })
        const orderId = computed(()=>{
            if(context.root.$route.params.id)
                return context.root.$route.params.id
            else 
                return false
        })
        return{sampleShop,orderId,followUpNo,sampleShops}
    }
}
</script>
<style scoped>
/* STEP TWO */
    .successful-complaint{
            margin-left: auto;
            margin-right: auto;
            background-color: #fff;
            padding:1.2rem 3rem 1rem 3rem;
            border-radius: 5px;
            box-shadow: 0px 0px 5px rgba(127, 127, 127, 0.5);
            max-width: 70%;
    }

    .daily-showcase{
            margin-left: auto;
            margin-right: auto;
            background-color: #fff;
            padding:1.2rem 3rem 1rem 3rem;
            border-radius: 5px;
            box-shadow: 0px 0px 5px rgba(127, 127, 127, 0.5);
            max-width: 70%;
    }

    .success-message{
        display: inline-block;
    }

    .title{
        font-weight: lighter;
    }

    .green{
        color: #0d9e00;
        font-weight: normal;
        font-size: 1.1rem;
    }

    a{
        color: #772CE8;
    }

    .guide{
        padding-top: 1rem;
        border-top: 1px solid rgba(127, 127, 127, 0.5);
    }
    .dis{
        width:10vw;
    }

</style>