<template>
    <div class="home-content" id="home-content">
                        <!-- SCROLL TOP -->
        <div class="scroll-top fixed-top" v-show="sct" @click="scrollToTheTop">
            <span class="icon-double-arrow"></span>
            <p class="mini-title ml-1">بازگشت به بالا</p>
        </div>
        <!-- TOP BANNER -->
        <div class="top-banner" id="golpino">
            <div class="top-locker">
                <img src="/assets/site/images/gol.jpg" alt="" class="top-image">
            </div>
            <!-- <div class="shadow-banner"></div> -->
            <div class="head-banner">
                <h1>گل پینو کامل ترین مرجع سفارش آنلاین گل</h1>
                <p class="mt-3">ما همیشه در دسترس هستیم تا گل های سفارشی شما در کمتر از ۱ ساعت   , از نزدیک ترین گلفروشی به شما , و با بهترین کیفیت به دست شما برسد . مزیت ما همکاری با ۳۰۰ گلفروشی و با پشتوانه اتحادیه گل و گیاه می باشد</p>
            </div>
                    <div class="search-bar pt-1 pr-2 pl-2 pb-0">
                        <div class="row w-100">
                            <div class="search-bar-section p-2" :class="((searchAddress.value == null || searchAddress.value.value == null) ? 'mycol-2' : 'col-3')">
                                <custom-input inputClass="tNormal" labelClass="tLighter" kind="dropDown" container="full-width" v-bind:theModel.sync="searchCategory" :selectItems="categories" classes="no-border light-facade" placeholder="دسته بندی"></custom-input>
                            </div>
                            <div class="mycol-2 search-bar-section p-2" v-if="searchAddress.value == null || searchAddress.value.value == null">
                                <custom-input :placeholder="(searchDistrict.value == null ? 'منطقه' : '')" inputClass="tNormal" kind="searchInput" container="full-width mt-2" extraClasses="barely-visible" v-bind:theModel.sync="searchDistrict" :suggestions="districts" @addTag="selectDistrict" classes="no-border">
                                    <p class="shopName" v-if="searchDistrict.value != null">{{searchDistrict.name}}</p>
                                </custom-input>
                            </div>
                            <div class="search-bar-section p-2" :class="((searchAddress.value == null || searchAddress.value.value == null) ? 'mycol-2' : 'col-3')">
                                <custom-input :nofilter="true" placeholder="نام فروشگاه" kind="searchInput" :suggestions="shopResults" @addTag="selectShop" extraClasses="barely-visible" labelClass="tLighter p-1" container="full-width mt-2" v-bind:theModel.sync="shopQuery" classes="block full-width">
                                    <p class="shopName" v-if="searchShop.value != null">{{searchShop.name}}</p>
                                </custom-input>
                            </div>
                            <div class="search-bar-section p-2" :class="((searchAddress.value == null || searchAddress.value.value == null) ? 'mycol-2' : 'col-3')">
                                <custom-input :nofilter="true" placeholder="نام محصول" kind="searchInput" :suggestions="productResults" @addTag="selectProduct" extraClasses="barely-visible" labelClass="tLighter p-1" container="full-width mt-2" v-bind:theModel.sync="productQuery" classes="block full-width">
                                    <p class="shopName" v-if="searchProduct.value != null">{{searchShop.name}}</p>
                                </custom-input>
                            </div>
                            <div :class="((searchAddress.value == null || searchAddress.value.value == null) ? 'mycol-2' : 'col-3')">
                                <div class="h-100 w-100 d-flex justify-content-center align-items-center">
                                    <button class="purple-btn" @click="doSearch">جستجو</button>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between container" v-if="gotUserAddresses">
                            <div class="logical-width">
                                <custom-input label="انتخاب آدرس" @newSelect="newAddressSelection" inputClass="tNormal" labelClass="tLighter mini-title" kind="dropDown" container="full-width mb-2 mt-2" classes="no-border logical-width barely-visible mini-title" v-bind:theModel.sync="searchAddress" :initial="true" :selectItems="userAddresses" placeholder="آدرس"></custom-input>
                            </div>
                            
                            <!-- <button type="button" class="add-address-btn" data-toggle="modal" data-target="#addressModal">Launch demo modal</button> -->
                            <custom-button @clicked="loginToAddAddress" float="left" label="افزودن آدرس جدید" icon="/assets/site/images/seller-icons/plus.svg" classes="add-address-btn mt-2" toggle="modal" :target="(isLoggedIn ? '#addressModal' : '')"></custom-button>
                        </div>
         
                    </div>
        </div>
        <address-modal :districts="districts" @addressComplete="sendAddress"></address-modal>
        <!-- CATEGORIES -->
        <div class="banner-categories d-flex justify-content-around pb-2">
            <my-carousel classes="no-padding">
                <div class="category" @click="()=>searchSampleCategory(cat.name)" v-for="(cat,index) in categories" :key="index">
                    <div class="category-locker mb-1">
                        <img :src="cat.image" class="category-image" alt="">
                    </div>
                    <p>{{cat.name}}</p>
                </div>
            </my-carousel>
        </div>
        <!-- SLOGEN -->
        <div class="slogen row mt-5 pr-5 pl-5">
            <span class="pb-4 col-12"><h3 class="mini-title why pb-3">چرا گلپینو؟</h3></span>
            <div class="col-lg-4 col-md-6 slogen-item">
                <div class="p-3">
                    <img src="/assets/site/images/why1.jpg" alt="" class="slogen-image mb-5">
                    <h5>ارسال از نزدیک ترین به شما</h5>
                    <p>شما با انتخاب و سفارش  گل از نزدیک ترین گلفروشی به محل مورد نظرتان  ,هم دسته گل تازه تری دریافت می کنید و هم در کوتا هترین زمان به ممکن به دست شما خواهد رسید.</p>
                </div>
            </div>
            <div class="col-lg-4 col-md-6 slogen-item">
                <div class="p-3">
                    <img src="/assets/site/images/why2.jpg" alt="" class="slogen-image mb-5">
                    <h5>پشتیبانی ۲۴ ساعته </h5>
                    <p>شما در هر ساعت شبانه روز می توانید سفارش خود را ثبت نمایید و با مشخص نمودن زمان مورد نظر به دست خود یا عزیزانتان برسانید</p>
                </div>
            </div>
            <div class="col-lg-4 col-md-6 slogen-item">
                <div class="p-3">
                    <img src="/assets/site/images/why3.jpg" alt="" class="slogen-image mb-5">
                    <h5>ضمانت تازگی و ارسال به موقع</h5>
                    <p>سفارش از نزدیک ترین محل به علاوه نظارت و پشتیبانی گلپینو به همراه اتحادیه گل و گیاه این تضمین را به شما می دهد که سفارش شما طبق تصویر به دستتان می رسد .</p>
                </div>
            </div>
        </div>
        <!-- TOP SHOPS -->
        <div class="shope pt-1 pb-0">
            <div class="pl-4 mb-4 pr-2">
                <h2 class="mini-title mr-4">فروشگاه های برتر گلپینو</h2>
                <router-link to="/search"><p class="mini-title mr-3 ml-1">مشاهده ی همه</p></router-link>
                <span class="icon-more"></span>
            </div>
            <div class="carousel-container">
                <my-carousel>
                    <div class="shop-carousel-item" v-for="(shop,i) in sampleShops" :key="i">
                        <shop-thumb :theShop="shop"></shop-thumb>
                    </div>
                </my-carousel>
            </div>
        </div>
        <!-- HALF BANNERS -->
        <div class="half-banners container mt-4">
            <div class="d-flex justify-content-between">
                <div class="half-banner p-3">
                    <div class="half-locker">
                        <img src="/assets/site/images/medicine.jpg" alt="" class="half-image">
                    </div>
                    <!-- <button @click="()=>searchSampleCategory(4)" class="see-banner pl-4 pr-4 pt-1 pb-1">به زودی</button> -->
                    <button class="see-banner pl-4 pr-4 pt-1 pb-1">به زودی</button>
                </div>
                <div class="half-banner p-3">
                    <div class="half-locker">
                        <img src="/assets/site/images/vases.jpg" alt="" class="half-image">
                    </div>
                    <button class="see-banner pl-4 pr-4 pt-1 pb-1">به زودی</button>
                </div>
            </div>
        </div>
                <!-- DISCOUNT BANNERS -->
        <!-- <div class="discount-banners pt-5 pb-4 mt-4">
             <div class="pl-4 mb-4">
                <h2 class="mini-title">حراجی گلپینو</h2>
                <p class="mini-title ml-5">مشاهده ی همه</p>
                <span class="icon-more"></span>
            </div>
            <div class="row pl-5">
                <div class="col-lg-2 col-md-11 timer pt-3 pr-0 pl-0 pb-1">
                    <h4 class="mb-5">زمان باقی مانده</h4>
                    <div>
                        <div class="row">
                            <div class="col-4 hurry">
                                <div class="ring-container mini-title">
                                    <div class="ringring mini-title"></div>
                                    <div class="circle mini-title"></div>
                                </div>
                            </div>
                            <div class="col-8 hurry-up">
                                <h6 class="mini-title">بشتابید!</h6>
                            </div>
                        </div>
                        <p>فقط 13 محصول باقی مانده است</p>
                        <div class="timer-timer mt-5 d-flex justify-content-around pl-2 pr-2">
                            <div class="timer-time mini-title">
                                <div class="timer-show mb-3 pt-2">{{remTime.s}}</div>
                                <p>ثانیه</p>
                            </div>
                            <div class="timer-time mini-title">
                                <div class="timer-show mb-3 pt-2">{{remTime.m}}</div>
                                <p>دقیقه </p>
                            </div>
                            <div class="timer-time mini-title">
                                <div class="timer-show mb-3 pt-2">{{remTime.h}}</div>
                                <p>ساعت</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-10 col-md-12"> -->
                    <!-- <Carousel  factor="1.7" sizes="big">
                        <Discount v-for="(discount,index) in discounts" :theDiscount="discount" :key="index"></Discount>
                    </Carousel> -->
                    <!-- <my-carousel>
                        <div class="time-discount-carousel">
                            <Discount></Discount>
                        </div>
                        <div class="time-discount-carousel">
                            <Discount></Discount>
                        </div>
                        <div class="time-discount-carousel">
                            <Discount></Discount>
                        </div>
                        <div class="time-discount-carousel">
                            <Discount></Discount>
                        </div>
                        <div class="time-discount-carousel">
                            <Discount></Discount>
                        </div>
                        <div class="time-discount-carousel">
                            <Discount></Discount>
                        </div>
                        <div class="time-discount-carousel">
                            <Discount></Discount>
                        </div>
                    </my-carousel>
                </div>
            </div>
        </div> -->
                <!-- PRESENT EXPRESS BANNER -->
        <div class="row season-banner">
            <!-- <div class="row"> -->
                <div class="col-4 season-banner-pic-locker">
                </div>
                <div class="col-8 season-banner-text">
                    <!-- <div class="w-100 h-100 d-flex flex-column justify-content-center align-items-center"> -->
                        <h2>اشتراک گل</h2>
                        <p>دیگر نیازی نیست برای خرید گل به بازار گل یا گلفروشی بروید .با اشتراک گل گلپینو هر هفته ٬ برای محل کارتان یا منزلتان گل تازه دریافت کنید . کافیست یک بار وقت بگذارید و گل های مورد نیازتان را برای هر هفته انتخاب کنید</p>
                        <p class="mt-5">ارسال رایگان و قیمت بازار گل از مزیت های اشتراک گل گلپینو می باشد</p>
                        <div class="mt-3 w-100">
                            
                                <a href="https://golpino.com/mag/coffee/">
                                    <button class="season-primary mt-5">
                                        اشتراک گل  
                                    </button>
                                </a>
                            <!-- <button class="season-secondary mt-5">اشتراک گل</button> -->
                        </div>                    
                    <!-- </div> -->
                </div>
            <!-- </div> -->
        </div>
        <!-- PRESENT EXPRESS BANNER -->
        <!-- <div class="present-banner mt-0 pt-0 pb-5">
            <div class="row p-0 present-express">
                <div class="present-locker col-4 offset-1 p-0" id="present-image">
                    <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                            <img class="d-block w-100" src="/assets/site/images/express.png" alt="First slide">
                            </div>
                            <div class="carousel-item">
                            <img class="d-block w-100" src="/assets/site/images/express.png" alt="Second slide">
                            </div>
                            <div class="carousel-item">
                            <img class="d-block w-100" src="/assets/site/images/express.png" alt="Third slide">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="present-desc col-6 p-2 pl-5 pt-4 pb-3 pr-3">
                    <h2 >گلپینو اکسپرس</h2>
                    <div class="present-attrs mt-4">
                        <div class="present-attr">
                            <div class="present">
                                <div class="present-loader mini-title" id="loader1">
                                    <div class="present-loading mini-title"></div>
                                </div>
                                <p class="present-title mini-title"> انتخاب قیمت </p>
                            </div>
                            <div class="present mt-1">
                                <div class="present-loader mini-title" id="loader2">
                                    <div class="present-loading mini-title"></div>
                                </div>
                                <p class="present-title mini-title">انتخاب محصول</p>
                            </div>
                            <div class="present mt-1">
                                <div class="present-loader mini-title" id="loader3">
                                    <div class="present-loading mini-title"></div>
                                </div>
                                <p class="present-title mini-title">انتخاب آدرس</p>
                            </div>
                        </div>
                        <div class="present-desc mt-2" id="present-desc">
                            <p>
                            {{matn}}
                            </p>
                        </div>
                    </div>
                    <div class="present-tools d-flex justify-content-start">
                        <button class="tool-active" data-toggle="modal" data-target="#expressModal" @click="modalHandle">سفارشات اکسپرس</button>
                        <button class="tool-more">جزئیات بیشتر</button>
                    </div>
                </div>
            </div>
        </div> -->
        <!-- Modal -->
<!-- <div class="modal fade" id="expressModal" tabindex="-1" role="dialog" aria-labelledby="expressModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-md" role="document">
            
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="expressModalLongTitle">گلپينو اکسپرس</h5>
                <button class="btn btn-danger" data-dismiss="modal">بستن</button>
            </div>
            <div class="modal-body">
                <div class="expressOne">
                    <div class="step-title">
                        <PercentageCircle size="large" :percent="stepMaster.p"/>
                        <h4 class="step-title-header mt-3">{{stepMaster.name}}</h4>
                        <p class="step-title-desc mt-1">{{stepMaster.desc}}</p>
                    </div>
                    <div class="stepOne" v-if="step == 1">
                        <div class="row">
                            <div class="col-6 step-price-range mt-2">
                                <div class="price-range p-2" id="range1" @click="chooseRange(1)">کمتر از 300 هزار تومان</div>
                            </div>
                            <div class="col-6 step-price-range mt-2">
                                <div class="price-range p-2" id="range2" @click="chooseRange(2)">از 300 تا 500 هزار تومان</div>
                            </div>
                            <div class="col-6 step-price-range mt-2">
                                <div class="price-range p-2" id="range3" @click="chooseRange(3)">از 500 هزار تا یک میلیون تومان</div>
                            </div>
                            <div class="col-6 step-price-range mt-2">
                                <div class="price-range p-2" id="range4" @click="chooseRange(4)">بیش از یک میلیون تومان</div>
                            </div>
                        </div>
                    </div>
                    <div class="stepTwo" v-if="step == 2">
                        <Carousel factor="2.5"  sizes="small">
                            <Product v-for="(p,i) in expressProducts" v-on:addToBasket="chooseProduct" :key="i" :theProduct="p"></Product>
                        </Carousel>
                    </div>
                    <div class="stepThree" v-show="step == 3">
                        <p>لطفا آدرس دلخواه خود را انتخاب کنید</p>
                        <div class="modalAddress" v-for="(address,index) in addresses" :key="index">
                            <p>ارسال به آدرس</p>
                            <p>{{address.address}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <div class="modal-tools">
                        <button type="button" class="btn btn-primary step-next" @click="()=>steps(1)">{{nextStep}}</button>
                        <p class="step-prev mt-1" @click="()=>steps(-1)">بازگشت به مرحله قبل</p>
                </div>
            </div>
            </div>
        </div>
        </div> -->
                <!-- SAMPLE PRODUCTS -->
        <div class="shope mt-5 pt-1 pb-0">
            <div class="pl-4 mb-4 mr-4 pr-2 flower-party">
                <h2 class="mini-title">گل پارتی</h2>
                <!-- <img src="/assets/site/images/flower.svg" alt=""> -->
            </div>
            <div class="carousel-container golparty">
                <div class="row">
                    <div class="col-2 p-0">
                        <img src="/assets/site/images/golparty.jpg" alt="golparty">
                    </div>
                    <div class="col-10 p-0">
                        <my-carousel>
                            <div class="product-carousel-item" v-for="(sp,i) in sampleProducts" :key="i">
                                <product-thumb @addToBasket="addProductToCart" :theProduct="sp"></product-thumb>
                            </div>
                        </my-carousel>
                    </div>
                </div>
            </div>
        </div>
        <!-- DAILY DISCOUNT -->
        <div class="mco-text mt-5 mb-4 pr-5 pl-5 pt-2">
            <h2 class="pl-3 pr-3 pb-1">خرید آنلاین گل و گیاه</h2>
            <p class="p-3 pb-0 mb-0">
                <span>خرید گل برای عزیزان امری بسیار زیبا و ماندگار است . سعی ما در فروشگاه آنلاین گل و گیاه گُل پینو بر این است که تا جای ممکن سرویس‌هایی ارائه کنیم تا افراد با سلیقه‌های مختلف را برای سفارش آنلاین گل راضی نگه داریم و با قیمت های مناسب و کیفیت بالا، رضایت شما عزیزان را فراهم کنیم.</span>    
            </p>
            <p class="pl-3 pr-3 pt-0 mt-0">انواع گل های مناسبتی ، دسته گل ، باکس گل ، سبد گل ، جام گل و تزئینات ماشین عروس ... تنها بخشی از خدمات گلپینو به شما عزیزان است.</p>
        </div>
        <div class="daily-discount pt-5">
            <div class="container">
                <h2 class="mini-title">تخفیف های روزانه</h2>
                <p class="mini-title mr-3 ml-1">مشاهده ی همه</p>
                <span class="icon-more"></span>
            </div>
            <div class="container mt-4">
                <div class="row">
                    <div class="col-5 p-0">
                        <div class="row">
                            <div class="col-4 p-1"  v-for="(dd,index) in tempStaticShops" :key="index">
                                <daily-discount v-if="index<6" :theShop="dd"></daily-discount>
                            </div>
                            <!-- <div class="col-4 p-0">
                                <daily-discount></daily-discount>
                            </div>
                            <div class="col-4 p-0">
                                <daily-discount></daily-discount>
                            </div> -->
                        </div>
                        <!-- <div class="row">
                            <div class="col-4 p-0">
                                <daily-discount></daily-discount>
                            </div>
                            <div class="col-4 p-0">
                                <daily-discount></daily-discount>
                            </div>
                            <div class="col-4 p-0">
                                <daily-discount></daily-discount>
                            </div>
                        </div> -->
                    </div>
                    <div class="col-7 discount-locker pr-0 pl-5 pb-2">
                        <img src="/assets/site/images/daily.png" alt="image">
                    </div>
                </div>
            </div>
            <!-- <Carousel  factor="1">
                <daily-discount></daily-discount>
                <daily-discount></daily-discount>
                <daily-discount></daily-discount>
                <daily-discount></daily-discount>
                <daily-discount></daily-discount>
                <daily-discount></daily-discount>
                <daily-discount></daily-discount>
                <daily-discount></daily-discount>
                <daily-discount></daily-discount>
                <daily-discount></daily-discount>
                <daily-discount></daily-discount>
                <daily-discount></daily-discount>
                <daily-discount></daily-discount>
                <daily-discount></daily-discount>
            </Carousel> -->
        </div>
        <!-- BLOGS -->
        <div class="blog-banner p-2 pt-0">
            <div class="container">
                <div class="blog-title">
                    <h2>مطالب مرتبط با وبلاگ گلپینو</h2>
                </div>
                <div class="articles mt-4 row">
                    <div v-for="(article,i) in articles" :key="i" class="col-lg-4 col-md-6 article pt-5 pl-3 pr-3">
                        <Article :theArticle="article"></Article>     
                    </div>
                </div>
                <div class="blog-footer">
                    <a href="https://www.golpino.com/mag/"><button>مطالب بیشتر</button></a>
                </div>
            </div>
        </div>
        <div class="complaints d-flex justify-content-around p-2">
            <div class="mini-title">
                <p class="mini-title">رسیدگی و پیگیری شکایات همه روزه از طریق اتحادیه ی گلفروشی</p>
            </div>
            <button class="complaint-button pl-4 pr-4">ثبت شکایت<span class="icon-left-arrow ml-3"></span></button>
        </div>
                <!-- first carousel
        <div class="container mt-5">
            <Carousel factor="1">
                <Product></Product>
                <Product></Product>
                <Product></Product>
                <Product></Product>
                <Product></Product>
                <Product></Product>
                <Product></Product>
            </Carousel>
        </div> -->
    </div>
</template>
<script>
import MyCarousel from "../Layout/MyCarousel"
import MyMock from "../Layout/Mock"
import Carousel from '../Layout/Caroo'
import ShopThumb from '../Layout/ShopThumb'
import Discount from '../Layout/Discount'
import DailyDiscount from '../Layout/DailyDiscount'
import Article from '../Home/partials/Article'
import ProductThumb from '../Layout/ProductThumb'
import AddressModal from "../../Common/AddressModal"
import CustomInput from "../../Common/CustomInput"
import CustomButton from "../../Common/customButton"
import PercentageCircle from "vue-css-percentage-circle"
import axios from "axios"
import $ from 'jquery'
import {ref,computed,onMounted,inject,watch, reactive} from "@vue/composition-api"
import Service from "../../../utils/service"
// import WPService from "../../../utils/WordpressService"
import currencyFormatter from '../../use/fomatCurrency'

export default {
    data:()=>({
        loader:0,
        w:0,
        nextLoader:false,
        loader:1,
        images:['https://developer.mozilla.org/static/img/opengraph-logo.72382e605ce3.png','data:image/jpeg;base64,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'],
        imgSrc:"https://developer.mozilla.org/static/img/opengraph-logo.72382e605ce3.png",
        matn:"لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.",
        scrollTop:0,
        visible:false,
        countScroll:0,
        topShops:[],
        dailyDiscounts:[],
        selectCategories:[],
        discounts:[],
        expTime:{Y:"",M:"",D:"",H:"",Mi:"",S:""},
        currentTime:new Date(),
        myModal:false,
        step:1,
        sct:false,
        sampleShop:{name:"گلفروشی محمدی",address:{address:"سعادت آباد"},banner:"https://golpino.com/uploads/shop-images/1600249947.jpeg"},
        ranges:[{min:0,max:300},{min:300,max:500},{min:500,max:1000},{min:1000,max:2000}],
        expressProducts:[],
        basket:[],
        nextStep:"ادامه",
        addresses:[],
    }),
    setup(props,context){
        const sampleCategories = ref([{name:'باکس گل',id:3,image:'1.jpg'},{name:'دسته ی گل',id:4,image:'2.jpg'},{name:'شاخه ی گل',id:5,image:'3.jpg'},{name:'سبد گل',id:6,image:'4.jpg'},{name:'رز جاودان',id:13,image:'8.jpg'},{name: "تاج گل", id: 11,image:'5.jpg'},{name: "گل آرایی ماشین عروس", id: 12,image:'7.jpg'},{name: "جام گل", id:14,image:'9.jpg' }])
        const sampleShops = ref(null)
        const category = ref({value:"",valid:true})
        const results = ref(true)
        const global = inject('global')
        const stateValues = inject('stateValues')
        const addresses = ref([{text:'میرداماد - خیابان مطهری - کوچه ی علیاری - پلاک 5',value:1},{text:'میرداماد - خیابان مطهری - کوچه ی علیاری - پلاک 5',value:2},{text:'میرداماد - خیابان مطهری - کوچه ی علیاری - پلاک 5',value:3}])
        const querry = ref("سینشتبنمیابنمساشبنیتن")
        const authService = ref(Service(true))
        const theService = computed(()=>{
            return Service(false)
        })

        const searchCategory = ref({valid:true,value:null})
        const searchShop = ref({valid:true,value:null})
        const searchProduct = ref({valid:true,value:null})
        const searchDistrict = ref({valid:true,value:null})
        const searchAddress = reactive({valid:true,value:null})
        const addressInitiation = ref(true)

        const newAddressSelection = (val) => {
            // searchAddress.value = val
            // alert("x")
        }

        const shopQuery = reactive({value:null,valid:true})
        const productQuery = reactive({value:null,valid:true})

        watch(shopQuery,(n,o)=>{
            if(n.d != ''){
                theService.value.receive('search/sellername?name='+n.id,{},(s,d)=>{
                    if(s == 200){
                        
                        shopResults.value = d.data
                        shopResults.value.map((sh)=>{
                            sh.text = sh.name
                            sh.value = sh.id
                        })
                    }
                    
                },errorHandler)
            }
        })
        watch(productQuery,(n,o)=>{
            if(n.d != ''){
                theService.value.receive('search/productname?product_name='+n.id,{},(s,d)=>{
                    if(s == 200){
                        productResults.value = d.data
                        productResults.value.map((sh)=>{
                            sh.text = 'گل فروشی ' + sh.name + '(' + sh.number + ' محصول مشابه)'
                            sh.value = sh.id
                        })
                    }
                    
                },errorHandler)
            }
        })
        
        //component
        const categories = ref(null)
        const districts = ref(null)
        const shopResults = ref([])
        const productResults = ref([])
        const userAddresses = ref([])
        const sampleProducts = ref([])
        const articles = ref([
            {image:'https://golpino.com/mag/wp-content/uploads/j8hlcszm8iwn.jpg',title:'کامل ترین لیست معرفی انواع گیاهان آپارتمانی',sum:'اگه برای محیط خونه خودتون و یا محیط شرکت به دنبال خرید گیاهان آپارتمانی زیبا هستید اما اونها رو نمیشناسید و یا با گونه های مختلف و زیبای اونها آشنایی ندارید لیست معرفی انواع گیاهان آپارتمانی رو تا آخر نگاه کنید و اون رو از دست ندید.',url:'https://golpino.com/mag/introducing-plants/'},
            {image:'https://golpino.com/mag/wp-content/uploads/20_base-image_d2c7c9318f5a0a9cdd5bd62d097dd2f430deadd1.jpg',title:'کامل ترین لیست انواع گل ها',sum:'به دنبال لیستی کامل از اسامی گل ها هستید؟ ما در مجله گلپینو لیستی کامل از انواع گل ها به همراه اسامی انگلیسی آنها و عکس آماده کرده ایم تا بیشتر با انواع مختلف گل ها آشنا بشید. این لیست را تا آخر ببینید و مطمئن باشید که نام هیچ گلی را در این لیست از دست نمی دهید.',url:'https://golpino.com/mag/flowers-list/'},
            {image:'https://golpino.com/mag/wp-content/uploads/plants0025.jpg',title:'گیاه هوازی تیلاندسیا گیاهی بدون نیاز به خاک',sum:'تیلاندسیا چیست؟ گیاه هوازی تیلاندسیا از گیاهان بومی مناطق آمریکای جنوبی است.این گیاه در کشورهای پرو، مکزیک و کلمبیا رشد می کند. در این مناطق تیلاندسیا با استفاده از رطوبت هوا رشد خود را ادامه می دهد و نیازی به خاک ندارد.',url:'https://golpino.com/mag/tillandsia/'}
        ])
        onMounted(()=>{
            theService.value.receive('search?category_id=12',{},(s,d)=>{
                if(s==200){
                    sampleShops.value = d.data
                }
            },(s,e)=>{
                
            })
            // theWPS.value.receive('get_recent_posts/',{},(s,d)=>{
            //     if(s == 200){
            //         articles.value = [d.posts[5],d.posts[6],d.posts[7]]
            //     }
            // },(s,e)=>{

            // })
           theService.value.receive('search/seller/112', {} , (s,d)=>{
                    let samples = []
                    samples = d.data.products
                    samples = samples.slice(0,20)
                    samples.map((p)=>{
                        p.formattedPrice = currencyFormatter(p.price + "")
                    })
                    sampleProducts.value = [...sampleProducts.value,...samples]
                    sampleProducts.value = shuffle(sampleProducts.value)
                },(s,e)=>{

                })

            getCategories()
            getDistricts()
            if(isLoggedIn.value){
                getUserAddresses()
            }
            
        })

        const errorHandler = (s,e)=>{

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
            },errorHandler)
//                         axios.get('https://api.golpino.com/api/search/category', {}, {
//    headers: {
//           // remove headers
//         }
//       }).then(res => {
//         console.log(res);
//       }).catch(err => {
//         console.log(err.response);
//       });
        }

        const getDistricts = () =>{
            theService.value.receive('search/district',{},(s,d)=>{
                if(s == 200){
                    districts.value = d.data
                    districts.value.map((dis)=>{
                        dis.value = dis.id
                        dis.text = dis.name
                    })
                }
            },errorHandler)
        }
        const gotUserAddresses = ref(false)
        const getUserAddresses = () => {
            authService.value.receive('user/address',{},(s,d)=>{
                if(s == 200 && d.data.length>0){

                        let xx = d.data[0]
                        xx.value = d.data[0].id
                        xx.text = d.data[0].name + " : " + d.data[0].address
                        searchAddress.value = xx     

                    userAddresses.value = d.data
                    userAddresses.value.map((addr)=>{
                        addr.value = addr.id
                        addr.text = addr.name + " : " + addr.address
                    })
                    userAddresses.value = [{value:null,text:'غیر فعال',id:null}].concat(userAddresses.value)
                }
                gotUserAddresses.value = true
            },errorHandler)
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
        const x = computed(()=>{
            return cookieFinder()
        })
        const isLoggedIn = computed(()=>{
            return global.user.value.isLoggedIn
        })
        watch(isLoggedIn,(n,o)=>{
            if(n){
                authService.value = Service(true)
                getUserAddresses()
            }
            // setTimeout(()=>{
            //     authService.value = Service(true)
            //     getUserAddresses()
            // },1000)
        })

        const loginToAddAddress = () => {
            if(!isLoggedIn.value){
                global.alertToggle('لطفا برای افزودن آدرس ابتدا وارد حساب کاربری شوید')
            }
        }

        // form
        const selectDistrict = (di) => {
            searchDistrict.value = di
        }
        const selectShop = (shop)=>{
            searchShop.value = shop
            context.root.$router.push('/shop/'+shop.id)
            shopQuery.value = ''
            shopQuery.id = ''
        }
        const selectProduct = (productShop)=>{
            searchProduct.value = productShop
            context.root.$router.push('/shop/'+productShop.id)
            productQuery.value = ''
            productQuery.id = ''
        }
        const addSuccess = (s,d) => {
            console.log({d})
        }
        const failedOperation = (s,e) => {
            console.log({e})
        }
        const sendAddress = (ad) => {
            let f = new FormData()
            f.append('name',ad.name.value)
            f.append('district_id',ad.district_id)
            f.append('lat',ad.lat)
            f.append('long',ad.long)
            f.append('address',ad.address.value)
            authService.value.transmit('user/address',f,(s,d)=>{
                if(s == 200){
                    getUserAddresses()
                    $(function () {
                        $('#addressModal').modal('toggle');
                    });
                }
            },failedOperation)
        }

        const redirectToSearch = () => {
            // if(s == 200){
                let sQuery = ""
                let query = {}
                if(searchCategory.value.value != null){
                    query = {category:searchCategory.value.value.name} 
                    sQuery = sQuery + "category=" + searchCategory.value.value.name
                }
                if(searchDistrict.value.value != null){
                    query = {...query,district:searchDistrict.value.value.name}
                    if(sQuery != "")
                        sQuery = sQuery + "&" 
                    sQuery = sQuery + "district=" + searchDistrict.value.name
                }
                // if(searchDistrict.value.value != null){
                //     query = query + 'address_id=' + searchAddress.value.value
                // }
                if(searchShop.value.value != null){ 
                    query = {...query,shop:searchDistrict.value.name}
                }
                if(searchAddress.value != null){
                    if(searchAddress.value.value != null){
                        if(sQuery != "")
                            sQuery = sQuery + "&" 
                        sQuery = sQuery + "address=" + searchAddress.value.value
                    }
                }
                if(shopQuery.id){
                    if(shopQuery.id != ''){
                        if(sQuery != ""){
                            sQuery = sQuery+"&"
                        }
                        sQuery = sQuery + 'name=' + shopQuery.id
                    }
                }
                if(productQuery.id){
                    if(productQuery.id != ''){
                        if(sQuery != ""){
                            sQuery = sQuery+"&"
                        }
                        sQuery = sQuery + 'product_name=' + productQuery.id
                    }
                }
                // stateValues.setShops(d.data,query)
                // context.root.$router.push({path:'/search',query:{category_id:searchCategory.value.value.value,name:null,district_id:null}})
                context.root.$router.push('/search?'+sQuery)
            // }
        }
        //basket
        const addProductToCart = (theProduct) => {
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
                                            context.root.$router.push('/user/payment/' + d.data.order.id)
                                        },1000)
                                    }
                    }
                    
                },(s,e)=>{

                })
            }
            else
                stateValues.addToCart(theProduct)
        }

        // rubbish FUNCTION

        const searchSampleCategory = (sname)=>{
            searchCategory.value = {value:{name:sname},valid:true}
            redirectToSearch()
        }

        const doSearch = () => {
            // theService.value.receive('/search?' + (searchCategory.value == null ? '' : 'category_id=' + searchCategory)
            // + (searchDistrict.value == null ? '' : 'district_id=' + searchDistrict)
            // + (searchShop.value == null ? '' : 'name=' + searchShop)
            // )
            // theService.value.receive('search',{category_id:searchCategory.value.value.value,name:searchShop,district_id:searchDistrict},redirectToSearch,errorHandler)
            // let query = ''

            // if(searchCategory.value.value != null){
            //     if(searchCategory.value.value.value != null)
            //     query = query + 'category_id=' + searchCategory.value.value.value 
            // }
            
            // if(searchAddress.value == null || searchAddress.value.value == null){
            //     if(searchDistrict.value.value != null){
            //         if(query != '')
            //             query = query + '&district=' + searchDistrict.value.value
            //         else
            //             query = query + 'district=' + searchDistrict.value.value
            //     }
            // }
            // if(shopQuery.id != null && shopQuery.id != ''){
            //     if(query != '')
            //         query = query + '&name=' + shopQuery.id
            //     else
            //         query = query + 'name=' + shopQuery.id
            // }
            
            // if(searchAddress.value != null){
            //     if(searchAddress.value.value != null){
            //         if(query != '')
            //             query = query + '&address=' + searchAddress.value.value
            //         else
            //             query = query + 'address=' + searchAddress.value.value
            //     }
            //     theService.value.receive('search?' + query,{},redirectToSearch,errorHandler)    
            // }
            redirectToSearch()

            
            // theService.value.receive('search?' + query,{},redirectToSearch,errorHandler)
        }

        // THIS CODE IS TEMP
        const tempStaticShops = [
            {id:33,address:"خیابان پاسداران بوستان 2 فرخی یزدی پلاک 55",name:"گلستان شاهرخی",logo:"https://api.golpino.com/credential/seller-image/33_base-image_98cf4a631c8bf49d584234c8b7b09b0ba9ba0a0e.png",discount:20},
            {id:36,address:"انتهای اتوبان ارتش شرق شهرک لاله",name:"گل سیتی",logo:"https://api.golpino.com/credential/seller-image/36_base-image_6e709db41b3904e96e85fc2f0998e1437cb602c6.jpg",discount:10},
            {id:40,address:"شهرک گلستان(راه آهن) ، بلوار گلها پائین تر از میدان اتریش ، نبش بنفشه هشتم ، پلاک ۱٢٢",name:"گل گل فام",logo:"https://api.golpino.com/credential/seller-image/40_base-image_1fc54873a132d3698f2f8777bdee32d490904e0e.jpg",discount:15},
            {id:73,address:"میدان منیریه ، خیابان معیری ، خیابان معتمدی ، نبش کوچه پروانه",name:"مرادی",logo:"https://api.golpino.com/credential/seller-image/73_base-image_8f1f9a9bbe0bee8e88400b55763531886253b6d9.png",discount:18},
            {id:51,address:"مجیدیه شمالی ، میدان ملت ، خیابان قلیچ خانی ، خیابان برادران شهید محمدی",name:"نگین",logo:"https://api.golpino.com/credential/seller-image/51_base-image_27fb62b51b318dcfa8bba835bbc764c69541d096.png",discount:9},
            {id:57,address:"بزرگراه زین الدین ، بلوار پناهی نیا ، بعد از میدان هروی ، جنب خیابان بیتا",name:"گل الهام",logo:"https://api.golpino.com/credential/seller-image/57_base-image_911a04792d2158c92b55e8fb846bc289ffa50190.png",discount:15},
        ]
        const shuffle = (array) => {
            let currentIndex = array.length, temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }
        // THIS CODE IS TEMP END

        return{tempStaticShops,articles,gotUserAddresses,addProductToCart,newAddressSelection,sampleProducts,sampleCategories,searchSampleCategory,sampleShops,loginToAddAddress,isLoggedIn,searchDistrict,districts,searchShop,selectShop,searchProduct,selectProduct,selectDistrict,categories,category,results,querry,sendAddress,searchCategory,userAddresses,searchAddress,doSearch,shopQuery,shopResults,productResults,productQuery}
    },
    components:{
        Carousel,
        ShopThumb,
        Discount,
        DailyDiscount,
        Article,
        ProductThumb,
        PercentageCircle,
        MyCarousel,
        MyMock,
        CustomInput,
        AddressModal,
        CustomButton
    },
    methods:{
        getAddresses() {
                axios
                .get("https://golpino.com/api/user/addresses")
                .then(response => {
                    this.addresses = response.data.data
                })
                .catch(error => this.errorNotify(error));
        },
        getUser(){
            axios({ url: "/profile/show", baseURL: "https://golpino.com/api/user" }).then(response=>{
                  this.user = response.data.data
              }
            );
        },
        steps(v){
            switch (v) {
                case 1:
                    if(this.step<3)
                        this.step++
                    else
                        this.handlePayment()
                    break;
                case -1:
                    if(this.step>1)
                        this.step--
                    break;
                default:
                    break;
            }
            let els = document.getElementsByClassName('large')
            els[0].firstChild.innerHTML = "مرحله" + " " + this.step + " " + "از 3"
        },
        presentAnimator(){
            setInterval(this.sumWidth, 50);
        },
        sumWidth(){
            if(this.w<100){
                this.w++
                this.loaderElement.childNodes[0].style.width=this.w + '%'
            }
            else{
                this.w=0
                this.nextLoader=true
                if(this.loader==1){
                    this.loader=2
                    this.imgSrc=this.images[1]
                    $('#carouselExampleSlidesOnly').carousel(2)
                }
                else if(this.loader==2){
                    this.loader=3
                    this.imgSrc=this.images[0]
                    $('#carouselExampleSlidesOnly').carousel(3)
                }
                else if(this.loader==3){
                    this.loader=1    
                    this.imgSrc=this.images[1]
                    $('#carouselExampleSlidesOnly').carousel(1)
                }
            }
        },
        getTopShops(){
                axios
                .get("/shops/top")
                .then(response => {
                    if (response.data.data !== null) {
                        this.topShops = response.data.data
                        
                    }
                })
                .catch(error => this.errorNotify(error));
        },
        getDiscounts(){
                            axios
                .get("/products/under-the-price")
                .then(response => {
                    if (response.data.data !== null) {
                        this.discounts = response.data.data
                        
                        let today = new Date().toLocaleDateString('fa-IR');
                        
                        let expdArray = this.discounts[0].expired_at.split(" ")
                        let expdDate = expdArray[0].split("-")
                        let expdTime = expdArray[1].split(":")
                        this.expTime.Y = expdDate[0]
                        this.expTime.M = expdDate[1]
                        this.expTime.D = expdDate[2]
                        this.expTime.H = expdTime[0]
                        this.expTime.Mi = expdTime[1]
                        // let ed = new Date(this.expTime.Y, this.expTime.M , this.expTime.D , this.expTime.H , this.expTime.Mi)
                        // 

            // var diff = new Date(today.getTime() - ed.getTime());
            // 
                    }
                })
                .catch(error => this.errorNotify(error));
        },
        getDailyDiscounts(){
                        axios
                .get("/shops/has-discount")
                .then(response => {
                    if (response.data.data !== null) {
                        this.dailyDiscounts = response.data.data
                    }
                })
                .catch(error => this.errorNotify(error))
        },
        getDistricts(){
                        axios
                .get("/common/get-districts")
                .then(response => {
                    if (response.data.data !== null) {
                        response.data.data.map((d)=>{
                            this.districts.push({text:d.name,value:d.name})
                        })
                    }
                })
                .catch(error => this.errorNotify(error))
        },
        getCurrentTime(){
            this.currentTime = new Date()
        },
        modalHandle(){
            let els = document.getElementsByClassName('large')
            els[0].firstChild.style.fontSize="0.7rem"
            els[0].style.margin="auto"
            els[0].firstChild.style.paddingTop="12%"
            els[0].firstChild.style.paddingLeft="12%"
            els[0].firstChild.style.color="#000000"
            els[0].firstChild.innerHTML = "مرحله" + " " + this.step + " " + "از 3"
        },
        scrollToTheTop(){
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        },
        chooseRange(i){
            let ranges = document.getElementsByClassName('price-range')
            for(let x=0 ; x<ranges.length;x++){
                ranges[x].classList.remove("active-range")
            }
            document.getElementById("range"+i).classList.add("active-range")
        },
        chooseProduct(product){
                this.basket.push(product);
                localStorage.setItem("basket", JSON.stringify(this.basket));
        },
        exprssGet(){
                                    axios
                .get("/products/467")
                .then(response => {
                    this.expressProducts.push(response.data.data)
                    this.expressProducts.push(response.data.data)
                    // this.expressProducts.push(response.data.data)
                    // this.expressProducts.push(response.data.data)
                })
                .catch(error => this.errorNotify(error))
        },
        handlePayment(){
            let f = new FormData()
            f.append("basket",this.basket)
            f.append("address_id",this.addresses[0].id)
            f.append("user",this.user)
            f.append("discount", '')
            axios.post("https://golpino.com/api/site/payments",f)
        }
    },
    mounted(){
        // this.presentAnimator()
        // let e = document.getElementsByClassName('wrapper')
        // setInterval(this.getCurrentTime, 1000)
        // for (let i=0 ; i<e.length ; i++){
        //     e[i].style.overflowX = 'visible'
        // }
        // this.getUser()
        // this.global.increment()
        // $cookies.set('cook',1)
        // console.log(this.global)
    },
    computed:{
        loaderElement:function () {
            return document.getElementById('loader'+this.loader)
        },
        remTime:function(){
            // let today = new Date().toLocaleDateString('fa-IR')
            let today = this.currentTime
            let hour = ""
            let minute = ""
            if(parseInt(this.expTime.Mi) - today.getMinutes() >=0){
                minute = parseInt(this.expTime.Mi) - today.getMinutes()
                hour = parseInt(this.expTime.H) - today.getHours()
            }
            else{
                minute = 60 + parseInt(this.expTime.Mi) - today.getMinutes()
                hour = parseInt(this.expTime.H) - today.getHours() -1
            }
            let second = 60 - today.getSeconds()
            return {h:hour,m:minute,s:second}
        },
        stepMaster(){
            if(this.step == 1){
                this.nextStep = "ادامه"
                return {name:"مرحله ی اول",desc:"انتخاب قیمت",p:33}
            }
            else if(this.step == 2){
                this.nextStep = "ادامه"
                this.exprssGet()
                return {name:"مرحله ی دوم",desc:"انتخاب محصول",p:66}
            }
            else if(this.step == 3){
                this.getUser()
                this.getAddresses()
                this.nextStep = "پرداخت"
                return {name:"مرحله ی سوم",desc:"انتخاب آدرس",p:100}
            }
        }
    },
    watch:{

    },
    created(){
        // window.addEventListener('scroll', this.scrollListener)      
        // this.getTopShops()
        // this.getDiscounts()
        // this.getDailyDiscounts()
        // this.getCategories()
        // this.getDistricts()
        let comp = this
        $(window).bind('mousewheel', function(event) {
            if (event.originalEvent.wheelDelta >= 0) {
                comp.sct = true
            }
            else {
                comp.sct = false
            }
        });
        
    },
    destroyed(){
        // window.removeEventListener('scroll', this.scrollListener)
    },
    inject:['global'],
}
</script>
<style scoped>
.search-bar{
    background-color: #EEEEEE;
    width: 75%;
    border:1px solid rgba(127, 127, 127, 0.2);
    border-radius: 6px;
    position: absolute;
    top:52%;
    z-index: 0;
    right:12.5%;
    background-color: #fff;
}

.mycol-2{
    flex: 0 0 19.9%;
    max-width: 19.9%;
}

.search-bar .row{
    border-bottom: 1px solid rgba(127, 127, 127, 0.15);
}

.purple-btn{
    width: 80%;
}
.search-bar-section{
    border-left: 1px solid rgba(127, 127, 127, 0.15);
}
html {
  scroll-behavior: smooth;
}

.home-content{
    font-family: 'iransans';
    overflow: hidden;
    font-weight: 1;
}

.shope{
    background-color: #fff;
}

.mini-title{
    display: inline-block;
}

.scroll-top{
    background-color: #000000;
    color: #fff;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    top:80vh;
    display: inline-block;
    width: 10vw;
    right: 90vw;
    padding: 4px 8px 3px 2px;
    height: 40px;
    z-index: 100;
    cursor: pointer;
}

/* TOP BANNER */
.why{
    border-bottom: 4px solid #9147FF;
    display: inline-block;
}

.top-banner{
    width: 100vw;
    height: 65vh;
    /* overflow: hidden; */
    position: relative;
}

.top-locker{
    width: 100%;
}

.top-image{
    width: 100%;
}

.shadow-banner{
    width: 65vw;
    height: 60vh;
    position: absolute;
    top:-10%;
    right:0px;
    background-color: coral;
    opacity: 0.4;
}

.head-banner{
    width: 100%;
    text-align: center;
    position: absolute;
    top:20%;
    right:0px;
    padding: 0px 20% 0px 20%;
    color: #fff;
}

.head-banner h1{
    font-size: 2.25rem;
}

.banner-search-search{
    background-color: #fff;
    position: absolute;
    top:60%;
    padding: 0px;
    border-radius: 7px;
    z-index: 1;
}

.search-section{
    width: 24%;
    display: inline-block;
    margin:0px;
}

#searchCat{
    border-right: 1px solid #e3e3e3;
    border-left: 1px solid #e3e3e3;
}

#searchShop{
    border-left: 1px solid #e3e3e3;
}

.shopName{
    font-size: 0.85rem;
    font-weight: lighter;
}

.search-action{
    text-align: center;
}

.search-action button{
    box-shadow: 4px 4px 15px -4px rgba(145, 71, 255,0.7);
    cursor: pointer;
}

#searchAc button{
    background-color: #9147FF;
    color: #fff;
    border:none;
    border-radius: 4px;
    padding: 5px 45px 5px 45px;
    position: relative;
    bottom: 1rem;
}

/* CATEGORIES */
.banner-categories{
    background-color: #fff;
    width: 100%;
}

.category{
    text-align: center;
}

.category:hover{
    color: salmon;
    cursor: pointer;
}

.category-locker{
    height: 12vh;
}

.category-image{
    height: 100%;
}
/* SLOGEN */
.slogen span{
    text-align: center;
}

.slogen-item{
    height: 63vh;
    margin-bottom: 2rem;
}

.slogen-item div{
    background-color: #fff;
    border-radius: 7px;
    width: 100%;
    text-align: center;
    height: 100%;
    box-shadow: 0px 3px 15px rgba(0,0,0,0.1);
}

.slogen-image{
    width: 70%;
}

/* SHOP CAROUSEL */
.shop-carousel-item{
    min-width:18vw;
    max-width: 18vw;
    padding: 0px 10px 0px 10px;
}
.product-carousel-item{
    min-width:18vw;
    max-width: 18vw;
    padding: 0px 10px 0px 10px;
}



/* HALF BANNERS */
.half-banners{
    /* background-color: #EAEDED; */
}

.row{
    margin-left: 0 !important;
    margin-right: 0 !important;
}

.half-banner{
    height: 100%;
    border-radius: 5px;
    background-color: #fff;
    width: 49%;
    position: relative;
}

.half-locker{
    width: 100%;
    height: 100%;
    border-radius: 5px;
    padding: 0px;
    overflow:hidden;
}

.half-image{
    width: 100%;
    transition: transform .3s ease-out;
}

.half-image:hover{
    transform: scale(1.35);
}

.see-banner{
    width: auto;
    border-radius: 18px;
    border:none;
    background-color:#9147FF;
    color: #fff;
    cursor: pointer;
    position: absolute;
    top:50%;
    right:40%;
}

.see-banner:hover{
    background-color: #fff;
    color: #9147FF;
}

/* DISCOUNT-BANNERS */

.discount-banners{
    background-color: #fff;
}

.timer{
    position: relative;
    top:10px;
    border-radius: 6px;
    background-color: #fff;
    box-shadow: 0px 3px 15px rgba(0,0,0,0.15);
    background-color: #fff;
    text-align: center;
    max-height: 330px;
}

.timer p{
    font-size: 0.7rem;
}

.timer-show{
    background-color: #9147FF;
    color: #fff;
    border-radius: 5px;
    height: 40px;
    width: 40px;
    font-size: 1.2rem;
    font-weight: bolder;
}

    
    /* EXPRESS MODAL */
    .modal{
        background-color: rgba(0, 0, 0,0.6);
    }
    
    .step-title{
        text-align: center;
    }
    
    .stepTwo{
        position: relative !important;
        display: block !important;
    }
    
    .price-range{
        border: 1px solid #9147FF;
        color: #9147FF;
        border-radius: 14px;
        font-size: 0.8rem;
        text-align: center;
        cursor: pointer;
    }
    
    .active-range{
        background-color: #9147FF;
        color: #fff;
    }

    .modalAddress{
        border:2px solid #0A7256;
        border-radius: 5px;
        padding: 6px 15px 4px 15px;
    }

    .modal-tools{
        text-align: center;
        width: 100%;
    }

    .step-next{
        text-align: center;
        width: 80%;
        border-radius: 14px;
        background-color: #9147FF;
        color: #fff;
    }

    .step-prev{
        color: #9147FF;
        cursor: pointer;
    }
/* presents */
.present-banner{
    background-color: #fff;
}

/* 3oTEXT */
.mco-text{
    text-align: center;
}

.mco-text p{
    margin:auto;
    width:78%;
    word-wrap: break-word;
}

.mco-text p span{
    text-align: justify;
}

.golparty img{
    width:100%;
    display: inline-block;
    position: relative;
    top:14px;
}

.present-locker{
    overflow: hidden;
    position: relative;
    padding:0px;
    background-color: #EAEDED;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    overflow: hidden;
}

.present-image{
    width: 100%;
    display: inline-block;
    margin:0px;
    padding:0px;
}

.present-desc{
    background-color: #EAEDED;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    overflow: hidden;
}

.present-loader{
    background-color:  #d9d9d9;
    width: 70px;
    height: 4px;
    position: relative;
}

.present-loading{
    background-color:  #9147FF;
    width: 0%;
    height: 100%;
    position: absolute;
    top:0px;
    right:0px;
}

.present-tools button{
    border-radius: 15px;
    padding : 5px 25px 5px 25px;
    margin-left: 15px;
    cursor: pointer;
}

.tool-active{
    background-color:  #9147FF;
    color: #fff;
    border:none;
}

.tool-more{
    color:  #9147FF;
    background-color: none;
    border: 1px solid #9147FF;
}

/* ِDAILY DISCOUNT */
.daily-discount{
    background-color: #fff;
    border-radius: 5px;
}

.discount-locker img{
    width: 100%;
}

/* BLOGS */
.blog-banner{
    background-color: #fff;
}

.blog-title{
    text-align: center;
}

.blog-footer{
    text-align: center;
}

.blog-footer button{
    margin-top: 7px;
    width: auto;
    border-radius: 18px;
    border:none;
    background-color:#9147FF;
    color: #fff;
    padding: 5px 34px 5px 34px;
    cursor: pointer;
}

.blog-footer button:hover{
    background-color: #fff;
    color: #9147FF;
    border:1px solid #9147FF;
}

/* complaints */
.complaints{
    background-color: #9147FF;
    color: #fff;
}

.complaint-button{
    background-color: #fff;
    color: #9147FF;
    border-radius: 14px;
    text-align: center;
    border:none;
    cursor: pointer;
}

/* PULSATING CIRCLE */
.hurry{
    position: relative;
    left:13px;
}

.hurry-up{
    text-align: right;
}

.ring-container {
    position: relative;
    top:10px;
    right:100%;
}

.circle {
    width: 10px;
    height: 10px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    top:-20px;
    right:50%;
}

.ringring {
    border: 3px solid red;
    -webkit-border-radius: 30px;
    height: 10px;
    width: 10px;
    position: absolute;
    top:-20px;
    right:50%;
    -webkit-animation: pulsate 1s ease-out;
    -webkit-animation-iteration-count: infinite; 
    opacity: 0.0
}

/* season banner */
.season-banner{
    height: 60vh;
    padding-left: 5rem;
    padding-right: 7rem;
    margin-top: 3rem;
}

.season-banner-pic-locker{
    background-image: url('/assets/site/images/sub.jpg');
    height:100%;
    background-size: 100% 100%;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
}

.season-banner-text{
    background-color: #fff;
    height: 100%;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    padding:4rem 3.5rem 15px 4rem ;
}

.season-banner-text h2{
    font-size: 1.5rem;
    margin-bottom: 2.5rem;
}

.season-primary{
    background-color: #772CE8;
    color: #fff;
    border:none;
    border-radius: 20px;
    box-shadow: 1px 1px 5px 0px rgba(119, 44 , 232, 0.6);
    width: 30%;
    font-size: 0.8rem;
    font-weight: lighter;
    padding-top: 12px;
    padding-bottom: 12px;
    margin-left: 15px;
}

.season-secondary{
    background:none;
    color: #fff;
    border:1px solid #772CE8;
    color: #772CE8;
    border-radius: 20px;
    box-shadow: 1px 1px 5px 0px rgba(119, 44 , 232, 0.6);
    width: 30%;
    font-size: 0.8rem;
    font-weight: lighter;
    padding-top: 12px;
    padding-bottom: 12px;
}


/* temp flower party */
.flower-party{
    position: relative;
}
.flower-party h2{
    border-bottom: 3px solid #fc4444;
    padding-bottom: 7px;
}

.flower-party img{
    width:50px;
    position: absolute;
    bottom: 35px;
    right:5.5rem;
}

@-webkit-keyframes pulsate {
    0% {-webkit-transform: scale(0.1, 0.1); opacity: 0.0;}
    50% {opacity: 1.0;}
    100% {-webkit-transform: scale(1.8, 1.8); opacity: 0.0;}
}


@media (max-width: 70em){
    .timer{
        margin-bottom: 8vh;
    }

}

.carousel-container{
    /* height: 50vh; */
    width: 100vw;
}
</style>