<template>
    <div class="page p-5">
        <div class="send-complaint" v-if="step == 1">
            <icon-image address="/assets/site/images/seller-icons/close.svg"></icon-image>
            <h1 class="mini-title">ثبت شکایت</h1>
            <div class="d-flex justify-content-between faq mt-4">
                <p class="mini-title">
                    لطفا پیش از ارسال ایمیل یا تماس تلفنی، لطفا سوالات متداول را مشاهده کنید.
                </p>
                <button class="faq-btn">پرسش های متداول</button>
            </div>
            <div class="complaint-form mt-3 pt-3">
                <p>لطفا اطلاعات زیر را تکمیل کنید</p>
                <div class="row mt-4">
                    <div class="col-6">
                        <custom-input kind="text" container="full-width" classes="full-width" v-bind:theModel.sync="theComplaint.user.name" label="نام و نام خانوادگی *" placeholder="نام و نام خانوادگی"></custom-input>
                    </div>
                    <div class="col-6">
                        <custom-input kind="text" container="full-width" classes="full-width" v-bind:theModel.sync="theComplaint.user.phone" label="تلفن تماس *" placeholder="تلفن تماس"></custom-input>
                    </div>
                    <div class="col-6 mt-3">
                        <custom-input kind="dropDown" label="موضوع شکایت" container="half-width" v-bind:theModel.sync="theComplaint.type" :selectItems="complaintTypes" labe="موضوع شکایت" placeholder="موضوع شکایت را انتخاب کنید"></custom-input>
                    </div>
                    <div class="col-12 mt-3">
                        <custom-input kind="area" rows="7" classes="full-width" label="متن پیام" container="full-width" v-bind:theModel.sync="theComplaint.text" placeholder="متن پیام"></custom-input>
                    </div>
                </div>
                <div class="actually-send">
                    <button class="purple-btn mt-2">ثبت شکایت</button>
                </div>
            </div>
        </div>
        <div class="successful-complaint" v-if="step==2">
            <div class="d-flex justify-content-between">
                <div class="success-message">
                    <p class="green">شکایت شما با موفقیت ثبت گردید</p>
                    <div class="mt-3">
                        <p class="mini-title title">موضوع شکایت :</p>
                        <p class="mini-title">لورم ایپسوم با متن ساختگی</p>
                    </div>
                    <div class="mt-1 mb-4">
                        <p class="mini-title title">شماره ی پیگیری :</p>
                        <p class="mini-title">1231254353465</p>
                    </div>
                    <a href="#">بازگشت به صفحه ی اصلی</a>
                </div>
                <icon-image address="/assets/site/images/seller-icons/close.svg"></icon-image>
            </div>
            <div class="mt-3 guide">
                <p>همکاران ما شکایت شما را بررسی نموده و به زودی به شما اطلاع رسانی خواهند کرد. همچنین می توانید وضعیت شکایت خود را از طریق صفحه ی <a href="">پیگیری شکایت </a>بررسی کنید</p>
            </div>
        </div>
        <div class="retrace">
            <icon-image address="/assets/site/images/seller-icons/close.svg"></icon-image>
            <h1 class="mini-title mb-2">بررسی شکایت</h1>
            <p>لطفا کد پیگیری خود را وارد نمایید.</p>
            <div class="row mt-4">
                <div class="col-12">
                    <custom-input kind="text" container="full-width" classes="full-width" v-bind:theModel.sync="theComplaint.user.name" label="کد پیگیری" placeholder="کد پیگیری"></custom-input>
                </div>
            </div>
            <div class="actually-send">
                <button class="purple-btn mt-2" @click="sendComplaint">ثبت شکایت</button>
            </div>
        </div>
    </div>    
</template>
<script>
import IconImage from "../../Common/icon"
import CustomInput from "../../Common/CustomInput"
import {ref} from "@vue/composition-api"
import useValidate from "../../use/validate"
export default {
    components:{
        IconImage,
        CustomInput
    },
    setup(){
        const complaintTypes = ref([{text:'دیرکرد',value:1},{text:'خرابی',value:2}])
        const theComplaint = ref({text:"",type:{text:"",value:""},user:{name:"",phone:""}})
        const step = ref(1)
        const sendComplaint = ()=>{
            let email = RegExp('^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/')
            alert(useValidate({value:theComplaint.value.user.name,regex:email},"regex"))
        }

        return{complaintTypes,theComplaint,step,sendComplaint}
    }
}
</script>
<style scoped>
/* STEP ONE */
    h1{
        font-weight: normal;
        font-size: 1.2rem;
    }

    .send-complaint{
        margin-left: auto;
        margin-right: auto;
        background-color: #fff;
        padding:1.2rem 3rem 1rem 3rem;
        border-radius: 5px;
        box-shadow: 0px 0px 5px rgba(127, 127, 127, 0.5);
    }

    .faq-btn{
        background: none;
        color:#772CE8;
        border: 1px solid rgba(127, 127, 127, 0.4);
        border-radius: 6px;
        padding:5px 12px 5px 12px;
    }

    .complaint-form{
        border-top: 1px solid rgba(127, 127, 127, 0.4);
    }

    .actually-send{
        text-align: left;
    }
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

    /* STEP THREE */
    .retrace{
            margin-left: auto;
            margin-right: auto;
            background-color: #fff;
            padding:1.2rem 3rem 1rem 3rem;
            border-radius: 5px;
            box-shadow: 0px 0px 5px rgba(127, 127, 127, 0.5);
            max-width: 40%;
    }

</style>