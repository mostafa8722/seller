<template>
    <div class="container pt-3">
        <h1>مالی</h1>
        <div class="container payments mt-2 p-4">
            <div class="d-flex justify-content-between">
                <h2>تراکنش های مالی</h2>
                <custom-input placeholder="جستجو" icon="/assets/site/images/seller-icons/search.svg" kind="text" v-bind:theModel.sync="model"></custom-input>
            </div>
            <table>
                <tr>
                    <th>شماره فاکتور<icon-image address="/assets/site/images/seller-icons/arrow-up.svg" classes="small"></icon-image><icon-image address="/assets/site/images/seller-icons/arrow-down.svg" classes="small"></icon-image></th>
                    <th>نام مشتری<icon-image address="/assets/site/images/seller-icons/arrow-up.svg" classes="small"></icon-image><icon-image address="/assets/site/images/seller-icons/arrow-down.svg" classes="small"></icon-image></th>
                    <th>مجموع<icon-image address="/assets/site/images/seller-icons/arrow-up.svg" classes="small"></icon-image><icon-image address="/assets/site/images/seller-icons/arrow-down.svg" classes="small"></icon-image></th>
                    <th>سود شرکت<icon-image address="/assets/site/images/seller-icons/arrow-up.svg" classes="small"></icon-image><icon-image address="/assets/site/images/seller-icons/arrow-down.svg" classes="small"></icon-image></th>
                    <th>خالص دریافتی<icon-image address="/assets/site/images/seller-icons/arrow-up.svg" classes="small"></icon-image><icon-image address="/assets/site/images/seller-icons/arrow-down.svg" classes="small"></icon-image></th>
                    <th>تاریخ تسویه<icon-image address="/assets/site/images/seller-icons/arrow-up.svg" classes="small"></icon-image><icon-image address="/assets/site/images/seller-icons/arrow-down.svg" classes="small"></icon-image></th>
                    <th>وضعیت<icon-image address="/assets/site/images/seller-icons/arrow-up.svg" classes="small"></icon-image><icon-image address="/assets/site/images/seller-icons/arrow-down.svg" classes="small"></icon-image></th>
                    <th>اقدامات<icon-image address="/assets/site/images/seller-icons/arrow-up.svg" classes="small"></icon-image><icon-image address="/assets/site/images/seller-icons/arrow-down.svg" classes="small"></icon-image></th>
                </tr>
                <payment></payment>
                <payment></payment>
                <payment></payment>
                <payment></payment>
            </table>
            <div class="table-nav mt-4">
                <div class="pages">
                    <button class="nav-btn prev">قبلی</button>
                    <button class="page-btn active">1</button>
                    <button class="page-btn">2</button>
                    <button class="page-btn">3</button>
                    <button class="nav-btn next">بعدی</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import payment from "./partials/payment"
import IconImage from "../Common/icon"
import {ref} from "@vue/composition-api"
import CustomInput from "../Common/CustomInput"
export default {
    components:{
        payment,
        IconImage,
        CustomInput
    },
    setup(){
        const model=ref("")
        return {model}
    }
}
</script>
<style scoped>
.payments{
    background-color: #fff;
    min-height: 80vh;
    font-weight: lighter;
}

h1,h2{
    font-size: 1rem;
    font-weight: normal;
}

table{
    width: 100%;
    margin-top: 20px;
}

th{
    padding:6px 2px 6px 2px;
    border-top: 1px solid rgba(127, 127, 127 , 0.4);
    border-bottom: 1px solid rgba(127, 127, 127 , 0.4);
    font-weight: normal;
    text-align: center;
}

.table-nav{
    text-align: left;
}

.page-btn{
    width: 25px;
    height: 25px;
    text-align: center;
    background-color: #fff;
    border: 1px solid #000;
    color: #000;
}

.page-btn:hover{
    background-color: #772CE8;
    color: #fff;
    cursor: pointer;
}

.nav-btn{
    background: none;
    border:nonde;
    border: none;
}

.nav-btn:hover{
    cursor: pointer;
}

.next{
    color: #772CE8;
}

.prev{
    color:rgba(127, 127, 127 , 0.7)
}
</style>
