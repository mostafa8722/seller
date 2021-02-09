<template>
        <div class="row a-comment pb-5">
            <div class="col-2 pb-3">
                <p class="commentor">{{theComment.user}}</p>
                <!-- <p class="tLighter">خرید این محصول را توصیه می کنم</p> -->
            </div>
            <div class="col-10 pb-3">
                <!-- <p>
                    <image-icon address="/assets/site/images/seller-icons/star-gold.svg"></image-icon>
                    <image-icon address="/assets/site/images/seller-icons/star-gold.svg"></image-icon>
                    <image-icon address="/assets/site/images/seller-icons/star-gold.svg"></image-icon>
                    <image-icon address="/assets/site/images/seller-icons/star-gold.svg"></image-icon>
                </p>                 -->
                <p class="tLighter">{{theComment.message}}</p>
            </div>
            <div class="row a-comment-reply w-100 comment-reply pb-3" v-if=theComment.reply>
                <div class="col-2 p-0 pr-3 pb-4 a-reply">
                    <p class="commentor mt-2 mb-4">{{theShop}}</p>
                    <!-- <p class="tLighter">خرید این محصول را توصیه می کنم</p> -->
                </div>
                <div class="col-8 pb-4">
                    <!-- <p>
                        <image-icon address="/assets/site/images/seller-icons/star-gold.svg"></image-icon>
                        <image-icon address="/assets/site/images/seller-icons/star-gold.svg"></image-icon>
                        <image-icon address="/assets/site/images/seller-icons/star-gold.svg"></image-icon>
                        <image-icon address="/assets/site/images/seller-icons/star-gold.svg"></image-icon>
                    </p>                 -->
                    <p class="tLighter mt-2 mb-4">{{theComment.reply}}</p>
                </div>
            </div>
        </div>    
</template>
<script>
import ImageIcon from "../../../Common/icon"
export default {
    components:{
        ImageIcon
    },
    props:['theComment','theShop']
}
</script>
<style scoped>
    p{
        margin: 0px;
    }
    .a-comment{
        border: 1px solid rgba(127, 127, 127, 0.2);
        padding-top: 1rem;       
        margin-bottom: 8px;
        border-radius: 6px;
        padding:2.5rem 1rem 0rem 1rem;
    }
    .tLighter{
        font-size: 0.9rem;
    }
    .a-comment-reply{
           padding-top: 3rem;       
           background-color: rgba(127, 127, 127, 0.075);
           position: relative;
           right: 15px;
           border-radius: 5px;
    }
    .comment-reply{
        padding-right: 4%;
        padding-top: 9px;
    }
    .a-reply{
        border-right: 1px solid rgba(127, 127, 127, 0.2);
    }
</style>