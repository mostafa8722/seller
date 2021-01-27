<template>
        <div class="row a-comment">
            <div class="col-3">
                <p class="commentor">محمد</p>
                <p class="tLighter">خرید این محصول را توصیه می کنم</p>
            </div>
            <div class="col-6">
                <p>
                    <image-icon address="/assets/site/images/seller-icons/star-gold.svg"></image-icon>
                    <image-icon address="/assets/site/images/seller-icons/star-gold.svg"></image-icon>
                    <image-icon address="/assets/site/images/seller-icons/star-gold.svg"></image-icon>
                    <image-icon address="/assets/site/images/seller-icons/star-gold.svg"></image-icon>
                </p>                
                <p class="tLighter">لورم ایپسوم متن ساختگی این یک متن ساخته شده است.</p>
            </div>
        </div>    
</template>
<script>
import ImageIcon from "../../../Common/icon"
export default {
    components:{
        ImageIcon
    }
}
</script>
<style scoped>
    .a-comment{
        border-bottom: 1px solid rgba(127, 127, 127, 0.2);
        padding-top: 1rem;
    }
    .tLighter{
        font-size: 0.9rem;
    }
</style>