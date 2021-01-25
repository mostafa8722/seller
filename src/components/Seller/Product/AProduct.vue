<template>
<div class="container product-page">
    <p>محصولات>اضافه کردن محصول >مشاهده ی محصول</p>
    <div class="a-product">
        <p>نمایش محصول</p>
        <div class="row mt-1 theProduct">
            <div class="col-md-12 col-lg-4">
                <div class="row">
                    <div class="col-12 small-locker mb-2">
                        <img :src="theProduct.images[0]" class="product-image" alt="">
                    </div>
                    <div class="col-3 small-locker" v-for="(image,i) in theProduct.images" :key="i">
                        <img :src="image" alt="" class="product-image">
                    </div>
                </div>
            </div>
            <div class="col-md-12 col-lg-8 pt-2 pl-5">
                <div class="tool-bar d-flex justify-content-between">
                    <p class="mini-title">{{theProduct.name}}</p>
                    <div class="tools">
                        <icon-image address="/assets/site/images/seller-icons/plus.svg"></icon-image>
                        <icon-image address="/assets/site/images/seller-icons/plus.svg"></icon-image>
                        <icon-image address="/assets/site/images/seller-icons/plus.svg"></icon-image>
                    </div>
                </div>
                <div class="rating">
                    <icon-image address="/assets/site/images/seller-icons/plus.svg"></icon-image>
                    <icon-image address="/assets/site/images/seller-icons/plus.svg"></icon-image>
                    <icon-image address="/assets/site/images/seller-icons/plus.svg"></icon-image>
                    <icon-image address="/assets/site/images/seller-icons/plus.svg"></icon-image>
                    <icon-image address="/assets/site/images/seller-icons/plus.svg"></icon-image>
                    <p class="mini-title ml-2">0 بازدید</p>
                </div>
                <div class="price">
                    <p class="mini-title final">115000 تومان</p>
                    <p class="mini-title ml-3 initial">140000تومان</p>
                    <p class="mini-title ml-3 discount">15% تخفیف</p>
                </div>
                <div class="product-desc">
                    <h6>توضیحات</h6>
                    <p class="desc">{{theProduct.desc}}</p>
                    <div class="colors">
                        <p>رنگ بندی</p>
                        <div class="a-color"></div>
                        <div class="a-color"></div>
                        <div class="a-color"></div>
                    </div>
                </div>
                <div class="comments p-2">
                    <p class="mini-title">نظرات</p><p class="mini-title">(1)</p>
                    <div class="a-comment row">
                        <div class="col-1">
                            <div class="commenter-locker">
                                <img src="/assets/site/images/popular.png" alt="">
                            </div>
                        </div>
                        <div class="col-11">
                            <p class="commenter">محمد نقوی الحسینی</p>
                            <p class="comment">سلام گلش عالی بود خیلی </p>
                            <div class="comment-tools">
                                <p class="mini-title">دیروز نوشته |</p>
                                <button>پاسخ</button>|
                                <button>حذف</button>|
                                <button>لایک کردن</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import { ref } from "@vue/composition-api";
import IconImage from "../Common/icon"

export default {
    components:{
        IconImage
    },
    setup(){
       const theProduct = ref({
           name:'گل رز هلندی',
           desc:'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.',
           images:["/assets/site/images/seller-icons/sample2.svg","/assets/site/images/seller-icons/sample2.svg","/assets/site/images/seller-icons/sample2.svg","/assets/site/images/seller-icons/sample2.svg"]
       })

       return {theProduct}
    }
}
</script>
<style>
.a-product{
    background-color: #fff;
    padding:1rem 0.6rem 1rem 0.6rem;
    font-weight: lighter;
}

.theProduct{
    padding:2rem 1rem 1rem 1rem;
}

.tool-bar p{
    font-size: 1.2rem;
    font-weight: normal;
}

.product-image{
    width:100%;
}

.small-locker{
    padding:0px 5px 0px 5px;
}

.product-desc{
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(127,127,127, 0.3);
}

.final{
    font-size: 1.2rem;
    font-weight: normal;
}

.initial{
    text-decoration: line-through;
}

.discount{
    color:rgba(255, 0, 0, 0.9)
}

.a-color{
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    display: inline-block;
}

.commenter{
    font-weight: normal;
}

.commenter-locker{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
}

.commenter-locker img{
    width: 100%;
}

.comment-tools button{
    border:none;
    background:none;
    color: #9F9F9F;
}

.comment-tools p{
    border:none;
    background:none;
    color: #9F9F9F;
}
</style>