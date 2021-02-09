<template>
    <div class="pay-page">
                <div class="pay-form" v-if="!successfulComment">
                    <div class="a-pay-form">
                        <div class="pay-form-title">
                                <icon-image address="/assets/site/images/seller-icons/user.svg"></icon-image>
                                <p class="mini-title tLighter mr-1">فروشگاه</p>
                        </div>
                        <div class="pay-form-form">
                            <div class="d-flex justify-content-between">
                                <p class="mini-title tNormal">نام</p>
                                <p class="mini-title tLighter">{{seller.name}}</p>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="a-pay-form">
                        <div class="pay-form-title">
                                <icon-image address="/assets/site/images/seller-icons/address.svg"></icon-image>
                                <p class="mini-title tLighter mr-1">امتیاز سفارش</p>
                        </div>
                        <div class="pay-form-form">
                            <div class="row">
                                <div class="col-7">
                                    میزان رضایت خود از سفارش را مشخص کنید
                                </div>
                                <div class="col-5 score" @mouseleave="()=>saveStars(savedStars)">
                                    <p class="mini-title tNormal">امتیاز : {{savedStars + 1}} از 5</p>
                                    <icon-image :hoverable="true" :clickable="true" @iconClicked="()=>saveStars(4)" @hovered="()=>starChanger(true,4)" @unhovered="()=>starChanger(false,4)" :address="starIcon5" classes="big"></icon-image>
                                    <icon-image :hoverable="true" :clickable="true" @iconClicked="()=>saveStars(3)" @hovered="()=>starChanger(true,3)" @unhovered="()=>starChanger(false,3)" :address="starIcon4" classes="big"></icon-image>
                                    <icon-image :hoverable="true" :clickable="true" @iconClicked="()=>saveStars(2)" @hovered="()=>starChanger(true,2)" @unhovered="()=>starChanger(false,2)" :address="starIcon3" classes="big"></icon-image>
                                    <icon-image :hoverable="true" :clickable="true" @iconClicked="()=>saveStars(1)" @hovered="()=>starChanger(true,1)" @unhovered="()=>starChanger(false,1)" :address="starIcon2" classes="big"></icon-image>
                                    <icon-image :hoverable="true" :clickable="true" @iconClicked="()=>saveStars(0)" @hovered="()=>starChanger(true,0)" @unhovered="()=>starChanger(false,0)" :address="starIcon1" classes="big"></icon-image>
                                </div>
                            </div>
                        </div>
                    </div> -->
                    <div class="a-pay-form">
                        <div class="pay-form-title">
                                <icon-image address="/assets/site/images/seller-icons/description.svg"></icon-image>
                                <p class="mini-title tLighter mr-1">اگر انتقاد یا پیشنهادی دارید در اینجا بنویسید</p>
                        </div>
                        <div class="pay-form-form p-3">
                            <div class="row">
                                <div class="col-md-12">
                                    <custom-input rows="3" kind="area" container="full-width" classes="full-width" v-bind:theModel.sync="comment.desc" placeholder="توضیحات"></custom-input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="a-pay-form">
                        <div class="pay-form-title">
                        </div>
                        <div class="pay-form-form p-3">
                            <button class="purple-btn" @click="submitComment">ثبت نظر</button>
                            <p class="mini-title mr-5">نظر شما پس از مشاهده و تأیید توسط ادمین ثبت خواهد شد.</p>
                        </div>
                    </div>
                </div>
                <div class="successful-comment" v-else>
                    <p class="green">
                        نظر شما با موفقیت ارسال شده و پس از تأیید ادمین ثبت خواهد شد
                    </p>
                    <router-link to="/profile/orders">
                        <button class="purple-btn mt-4 w-50">بازگشت به صفحه سفارشات</button>
                    </router-link>
                </div>
    </div>    
</template>
<script>
import IconImage from "../../../Common/icon"
import CustomInput from "../../../Common/CustomInput"
import CustomButton from "../../../Common/customButton"
import {ref,inject,computed, onMounted, watch, reactive} from "@vue/composition-api"
import Service from "../../../../utils/service"
export default {
    components:{
        IconImage,
        CustomInput,
        CustomButton
    },
    setup(props,context){
        const stateValues = inject('stateValues')
        const global = inject('global')
        const comment = reactive({
            desc:{value:null,valid:true},
            score:null
        })
        const successfulComment = ref(false)
        const authService = computed(()=>{
            return Service(true)
        })

        const seller = ref({name:'',id:''})

        onMounted(()=>{
            authService.value.receive('buy/order/'+context.root.$route.params.id,{},(s,d)=>{
                seller.value = {name:d.data.seller_name,id:d.data.seller_id}
            },(s,e)=>{

            })
            saveStars(0)
        })

        const savedStars = ref(-1)
        const starIcon1 = ref('/assets/common/icons/star.svg')
        const starIcon2 = ref('/assets/common/icons/star.svg')
        const starIcon3 = ref('/assets/common/icons/star.svg')
        const starIcon4 = ref('/assets/common/icons/star.svg')
        const starIcon5 = ref('/assets/common/icons/star.svg')

        const starChanger = (which,index) => {
            switch (index) {
                case 0:
                    if(which){
                        starIcon1.value = '/assets/common/icons/star-gold.svg'
                        starIcon2.value = '/assets/common/icons/star.svg'
                        starIcon3.value = '/assets/common/icons/star.svg'
                        starIcon4.value = '/assets/common/icons/star.svg'
                        starIcon5.value = '/assets/common/icons/star.svg'
                    }
                    else{
                        starIcon1.value = '/assets/common/icons/star.svg'
                        starIcon2.value = '/assets/common/icons/star.svg'
                        starIcon3.value = '/assets/common/icons/star.svg'
                        starIcon4.value = '/assets/common/icons/star.svg'
                        starIcon5.value = '/assets/common/icons/star.svg'
                    }
                    break;
                case 1:
                    if(which){
                        starIcon1.value = '/assets/common/icons/star-gold.svg'
                        starIcon2.value = '/assets/common/icons/star-gold.svg'
                        starIcon3.value = '/assets/common/icons/star.svg'
                        starIcon4.value = '/assets/common/icons/star.svg'
                        starIcon5.value = '/assets/common/icons/star.svg'
                    }
                    else{
                        starIcon2.value = '/assets/common/icons/star.svg'
                        starIcon1.value = '/assets/common/icons/star.svg'
                        starIcon3.value = '/assets/common/icons/star.svg'
                        starIcon4.value = '/assets/common/icons/star.svg'
                        starIcon5.value = '/assets/common/icons/star.svg'
                    }
                    break;
                case 2:
                    if(which){
                        starIcon1.value = '/assets/common/icons/star-gold.svg'
                        starIcon2.value = '/assets/common/icons/star-gold.svg'
                        starIcon3.value = '/assets/common/icons/star-gold.svg'
                        starIcon4.value = '/assets/common/icons/star.svg'
                        starIcon5.value = '/assets/common/icons/star.svg'
                    }
                    else{
                        starIcon4.value = '/assets/common/icons/star.svg'
                        starIcon5.value = '/assets/common/icons/star.svg'
                        starIcon3.value = '/assets/common/icons/star.svg'
                        starIcon2.value = '/assets/common/icons/star.svg'
                        starIcon1.value = '/assets/common/icons/star.svg'
                    }
                    break;
                case 3:
                    if(which){
                        starIcon1.value = '/assets/common/icons/star-gold.svg'
                        starIcon2.value = '/assets/common/icons/star-gold.svg'
                        starIcon3.value = '/assets/common/icons/star-gold.svg'
                        starIcon4.value = '/assets/common/icons/star-gold.svg'
                        starIcon5.value = '/assets/common/icons/star.svg'
                    }
                    else{
                        starIcon5.value = '/assets/common/icons/star.svg'
                        starIcon4.value = '/assets/common/icons/star.svg'
                        starIcon3.value = '/assets/common/icons/star.svg'
                        starIcon2.value = '/assets/common/icons/star.svg'
                        starIcon1.value = '/assets/common/icons/star.svg'
                    }
                    break;
                case 4:
                    if(which){
                        starIcon5.value = '/assets/common/icons/star-gold.svg'
                        starIcon1.value = '/assets/common/icons/star-gold.svg'
                        starIcon2.value = '/assets/common/icons/star-gold.svg'
                        starIcon3.value = '/assets/common/icons/star-gold.svg'
                        starIcon4.value = '/assets/common/icons/star-gold.svg'
                    }
                    else{
                        starIcon5.value = '/assets/common/icons/star.svg'
                        starIcon4.value = '/assets/common/icons/star.svg'
                        starIcon3.value = '/assets/common/icons/star.svg'
                        starIcon2.value = '/assets/common/icons/star.svg'
                        starIcon1.value = '/assets/common/icons/star.svg'
                    }
                    break;
                default:
                    break;

            }
            // if(savedStars.value != -1 && !which){
            //     saveStars(savedStars.value)
            // }
        }
        const saveStars = (index) => {
                switch (index) {
                    case 0:
                            starIcon1.value = '/assets/common/icons/star-gold.svg'
                            starIcon2.value = '/assets/common/icons/star.svg'
                            starIcon3.value = '/assets/common/icons/star.svg'
                            starIcon4.value = '/assets/common/icons/star.svg'
                            starIcon5.value = '/assets/common/icons/star.svg'
                            savedStars.value = 0
                        break;
                    case 1:
                            starIcon1.value = '/assets/common/icons/star-gold.svg'
                            starIcon2.value = '/assets/common/icons/star-gold.svg'
                            starIcon3.value = '/assets/common/icons/star.svg'
                            starIcon4.value = '/assets/common/icons/star.svg'
                            starIcon5.value = '/assets/common/icons/star.svg'
                            savedStars.value = 1
                        break;
                    case 2:
                            starIcon1.value = '/assets/common/icons/star-gold.svg'
                            starIcon2.value = '/assets/common/icons/star-gold.svg'
                            starIcon3.value = '/assets/common/icons/star-gold.svg'
                            starIcon4.value = '/assets/common/icons/star.svg'
                            starIcon5.value = '/assets/common/icons/star.svg'
                            savedStars.value = 2
                        break;
                    case 3:
                            starIcon1.value = '/assets/common/icons/star-gold.svg'
                            starIcon2.value = '/assets/common/icons/star-gold.svg'
                            starIcon3.value = '/assets/common/icons/star-gold.svg'
                            starIcon4.value = '/assets/common/icons/star-gold.svg'
                            starIcon5.value = '/assets/common/icons/star.svg'
                            savedStars.value = 3
                        break;

                    case 4:
                            starIcon5.value = '/assets/common/icons/star-gold.svg'
                            starIcon1.value = '/assets/common/icons/star-gold.svg'
                            starIcon2.value = '/assets/common/icons/star-gold.svg'
                            starIcon3.value = '/assets/common/icons/star-gold.svg'
                            starIcon4.value = '/assets/common/icons/star-gold.svg'
                            savedStars.value = 4
                        break;
                    default:
                        break;
                }
            }

        const submitComment = () => {
            let f = new FormData()
            f.append('message',comment.desc.value)
            authService.value.transmit('buy/order/comment/'+ context.root.$route.params.id,f,(s,d)=>{
                successfulComment.value = true
            },(s,e)=>{
                
            })
        }
        return {successfulComment,submitComment,seller,savedStars,saveStars,global,comment,starIcon1,starIcon2,starIcon3,starIcon4,starIcon5,starChanger}
    }
}
</script>
<style>
.pay-page{
    background-color: #fff;
    padding: 2rem 1rem 2rem 1rem;
    font-size: 0.75rem;
    font-weight: lighter;
}

.pay-form{
    background-color: #fff;
    padding: 2rem 1rem 2rem 1rem;
    z-index: 1;
}

.a-pay-form{
    margin-top: 1.5rem;
    position: relative;
}

.pay-form-title{
    width: 22%;
    display: inline-block;
    position: absolute;
    top:37%;
    right:0px;
}

.pay-form-form{
    width: 75%;
    position: relative;
    right: 23%;
    display: inline-block;
    background-color: #F3F3F3;
    border-radius: 4px;
    border:1px solid rgba(127, 127, 127, 0.2);
    box-shadow:0px 0px 6px rgba(127, 127, 127, .1);
    padding:0.8rem 1rem 0.8rem 1rem;
}

.green{
        color: #0d9e00;
        font-weight: normal;
        font-size: 1.1rem;
}

.successful-comment{
    text-align: center;
    padding:5rem 2rem 5rem 2rem;
}

.score p{
    font-size: 1rem;
    margin-left: 10px;
    position: relative;
    top:3px;
}

</style>