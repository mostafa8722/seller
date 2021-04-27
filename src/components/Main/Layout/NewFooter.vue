<template>
    <div class="theFooter">
        <div class="theFooter-box">
            <div class="footer-top">
                <!-- <custom-link classes="ml-5" url="aaa" title="پیدا کردن گلفروشی نزدیک" sub="محدوده ی خود را مشخص کن" iconSize="huge" icon="/assets/site/images/seller-icons/find-store.svg"></custom-link> -->
                <custom-link classes="ml-5" url="aaa" title="تماس با پشتیبانی" sub="021-26403285" iconSize="huge" icon="/assets/site/images/seller-icons/phone.svg"></custom-link>
                <custom-link classes="ml-5" url="aaa" title="پست الکترونیک" sub="info@golpino.com" iconSize="huge" icon="/assets/site/images/seller-icons/letter.svg"></custom-link>
            </div>
            <div class="row footer-footer">
                <div class="col-md-2 col-lg-2 col-12 col-sm-12 p-0">
                    <h5>گلپینو</h5>
                    <custom-link url="/about" title="درباره ما" classes="full-width mt-2"></custom-link>
                    <custom-link url="https://golpino.com/mag/" :isLonely="true" title="مجله ی گلپینو" classes="full-width mt-2"></custom-link>
                    <custom-link url="/contact" title="تماس با ما" classes="full-width mt-2"></custom-link>
                    <custom-link url="/sponsors" title="حامیان ما" classes="full-width mt-2"></custom-link>
                    <custom-link url="/terms-and-conditions" title="قوانین و مقررات" classes="full-width mt-2"></custom-link>
                    <custom-link url="http://efgol.ir/" :isLonely="true" title="اتحادیه ی گل و گیاه" classes="full-width mt-2"></custom-link>
                    <!-- <custom-link url="aaa" title="حامیان ما" classes="full-width mt-2"></custom-link> -->
                </div>
                <div class="col-md-2 col-lg-2 col-12 col-sm-12 p-0">
                    <h5>راهنمایی</h5>
                    <custom-link url="/faq" title="سوالات متداول" classes="full-width mt-2"></custom-link>
                    <custom-link url="https://golpino.com/mag/6345-2/" :isLonely="true" title="ثبت نام فروشندگان" classes="full-width mt-2"></custom-link>
                    <!-- <custom-link url="aaa" title="شرایط و قوانین" classes="full-width mt-2"></custom-link>
                    <custom-link url="aaa" title="حریم خصوصی" classes="full-width mt-2"></custom-link> -->
                </div>
                <div class="col-md-2 col-lg-2 col-12 col-sm-12 p-0">
                    <h5>به ما اعتماد کنید</h5>
                    <a referrerpolicy="origin" target="_blank" href="https://trustseal.enamad.ir/?id=174664&amp;Code=sBAMFHgGag7oTgxHYQIX"><img referrerpolicy="origin" src="https://Trustseal.eNamad.ir/logo.aspx?id=174664&amp;Code=sBAMFHgGag7oTgxHYQIX" alt="" style="cursor:pointer" id="sBAMFHgGag7oTgxHYQIX"></a>
                    <img id='jxlzsizpapfuapfujzpergvj' style='cursor:pointer' onclick='window.open("https://logo.samandehi.ir/Verify.aspx?id=195573&p=rfthpfvldshwdshwjyoexlao", "Popup","toolbar=no, scrollbars=no, location=no, statusbar=no, menubar=no, resizable=0, width=450, height=630, top=30")' alt='logo-samandehi' src='https://logo.samandehi.ir/logo.aspx?id=195573&p=nbpdbsiyujynujynyndtqfti' />
                </div>
                <div class="col-md-2 col-lg-2 col-12 col-sm-12 p-0">
                    <!-- <h5>اپلیکشن فروشنده ها</h5> -->
                    <div class="row">
                        <!-- <div class="col-7 mt-3">
                            <p>دریافت اپلیکشن فروشندگان برای مدیریت بهتر محصولات</p>
                        </div>
                        <div class="col-5 appstore">
                            <div class="appstore-image">
                                <img src="/assets/site/images/google-play.png" alt="">
                            </div>
                            <div class="appstore-image">
                                <img src="/assets/site/images/google-play.png" alt="">
                            </div>
                        </div> -->
                        <h5>دریافت مجله ی ماهانه</h5>
                        <div class="row mt-2 full-width">
                            <div class="col-8">
                                <custom-input kind="text" container="full-width" classes="full-width" v-bind:theModel.sync="email" placeholder="ایمیل"></custom-input>
                            </div>
                            <div class="col-4">
                                <button class="purple-btn full-width">ارسال</button>
                            </div>
                        </div>
                        <div class="mt-3 full-width d-flex justify-content-center">
                            <custom-link :isLonely="true" url="https://instagram.com/golpinocom" iconSize="enormous" icon="/assets/site/images/seller-icons/instagram.svg" classes=""></custom-link>
                            <custom-link :isLonely="true" url="https://aparat.com/golpino" iconSize="enormous" icon="/assets/site/images/seller-icons/aparat.svg" classes=""></custom-link>
                            <custom-link :isLonely="true" url="https://t.me/golpino" iconSize="enormous" icon="/assets/site/images/seller-icons/telegram.svg" classes=""></custom-link>
                            <custom-link :isLonely="true" url="https://www.facebook.com/Golpinocom" iconSize="enormous" icon="/assets/site/images/seller-icons/facebook.svg" classes=""></custom-link>
                            <custom-link :isLonely="true" url="https://linkedin.com/company/golpino/" iconSize="enormous" icon="/assets/site/images/seller-icons/linkedin.svg" classes=""></custom-link>
                            <custom-link :isLonely="true" url="https://twitter.com/golpino/" iconSize="enormous" icon="/assets/site/images/seller-icons/twitter.svg" classes=""></custom-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-terms">
            <h5 class="mb-3">سامانه ی گلپینو پیشگام در ارسال گل</h5>
            <p class="tLighter">بعید است فردی باشد که از تماشای سرزندگی گل ها ٬ سبزی و جانبخشی گیاهان روح روانش شاداب نگردد و چه بسیارند که مایلند این حس زیبا را به جانداران عزیز تر از جانشان پیشکش نمایند ٬ ما هم جز خیل سینه چاکان  گل و گیاهان بودیم  و همیشه سفارش و ارسال گل و گلدان  برای عزیزانمان  را دشوار می دیدیم. بنابراین چاره در آن دیدیم که این عشق را به بستر وب آورده و سفارش و ارسال این نازنینان را سهل تر کنیم.</p>
            <p class="tLighter">گلپینو به عنوان پیشگام ارتباط با گلفروشان با پشتوانه اتحادیه گل و سپس بستر عظیم طرفه نگار(نرم افزار حسابداری هلو ) شروع به خدمت رسانی نموده ایم ٬ باشد که با همیاری شما عزیزان بتوانیم خدماتمان گسترش داده و علاوه بر تهران به سایر شهرستانها هم خدمت رسانی نماییم.</p>
            <p class="tLighter">همچنین با کمک به درآمد بیشتر خادمان گل وگیاه و کاهش ترافیک و رفت و آمد های بی مورد و همین طور افزایش سبزی سرانه هر منزل رسالت و دین اجتماعی خود را هر چند اندک ادا نماییم.</p>
            <div class="rights pt-3">
                <h6>تمامی حقوق مادی و معنوی این وب سایت متعلق به شرکت گلپینو می باشد . 2020 &copy</h6>
            </div>
        </div>
    </div>    
</template>
<script>
import CustomLink from "../../Common/CustomLink"
import CustomInput from "../../Common/CustomInput"
import {ref} from "@vue/composition-api"
export default {
    components:{
        CustomLink,
        CustomInput
    },
    setup(){
        const email = ref({value:"",valid:true})

        return {email}
    }
}
</script>
<style scoped>
 .theFooter{
     background-color: #DBDBDB;
     width: 100%;
     overflow: hidden;
     font-family: IRANSans;
 }

 .theFooter-box{
     padding: 1rem 5rem 0.5rem 5rem;
 }

 .footer-top{
     border-bottom: 1px solid rgba(127,127,127,0.3);
     padding: 0.5rem 0px 0.5rem 0px;
 }

 .footer-footer{
     padding: 2rem 0px 0.5rem 0px;
 }

.union{
    font-weight: lighter;
    font-size: 0.8rem;
}

.union a{
    color: #000;
}

 .appstore{
     border-bottom: 1px solid rgba(127,127,127,0.3);
 }

 .appstore-image img{
     width: 100%;
 }

 .footer-terms{
    background-color: #C4C4C4;
    padding: 1rem 5rem 1rem 5rem;
    text-align: center;
 }


.rights{
    border-top: 1px solid rgba(127,127,127,0.4);
    text-align: center;
}

</style>