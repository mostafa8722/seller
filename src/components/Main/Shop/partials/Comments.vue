<template>
    <div>
        <h3>امتیازات و نظرات</h3>
        <p>امتیازات و نظرات مشتریان را راجع به محصولات مشاهده کنید</p>
        <div class="row">
            <div class="col-6">
                <p class="overall">4.8</p>
                <image-icon v-for="(r,i) in fullStars" :key="i" address="/assets/site/images/seller-icons/star-gold.svg"></image-icon>
                <p class="overall">440 نظر</p>
            </div>
            <div class="col-6">
                <div class="each-star-detail">
                    <p class="mini-title">5</p>
                    <image-icon address="/assets/site/images/seller-icons/star-gold.svg"></image-icon>
                    <div class="detail">
                        <div class="detail-filler" id="df5"></div>
                    </div>
                </div>
                <div class="each-star-detail">
                    <p class="mini-title">4</p>
                    <image-icon address="/assets/site/images/seller-icons/star-gold.svg"></image-icon>
                    <div class="detail">
                        <div class="detail-filler" id="df4"></div>
                    </div>
                </div>
                <div class="each-star-detail">
                    <p class="mini-title">3</p>
                    <image-icon address="/assets/site/images/seller-icons/star-gold.svg"></image-icon>
                    <div class="detail">
                        <div class="detail-filler" id="df3"></div>
                    </div>
                </div>
                <div class="each-star-detail">
                    <p class="mini-title">2</p>
                    <image-icon address="/assets/site/images/seller-icons/star-gold.svg"></image-icon>
                    <div class="detail">
                        <div class="detail-filler" id="df2"></div>
                    </div>
                </div>
                <div class="each-star-detail">
                    <p class="mini-title">1</p>
                    <image-icon address="/assets/site/images/seller-icons/star-gold.svg"></image-icon>
                    <div class="detail">
                        <div class="detail-filler" id="df1"></div>
                    </div>
                </div>
            </div>
        </div>
        <a-comment></a-comment>
        <a-comment></a-comment>
        <a-comment></a-comment>
        <a-comment></a-comment>
        <a-comment></a-comment>
    </div>
</template>
<script>
import ImageIcon from "../../../Common/icon"
import AComment from './AComment'
export default {
    components:{
        ImageIcon,
        AComment
    },
    data:()=>({
        stars:4.1
    }),
    computed:{
        fullStars:function(){
            let fulls = []
            for(let i = 1 ; i<=this.stars ; i++)
                fulls.push(i)
            return fulls
        }
    }
}
</script>
<style scoped>
.each-star-detail .detail{
    height: 15px;
    background-color: rgba(127, 127, 127, 0.4);
    border-radius: 10px;
    overflow: hidden;
    display: inline-block;
    width: 300px;
    position: relative;
    top: 6px;
    margin-right: 12px;
}

.each-star-detail .mini-title{
    width: 10px;
    margin-left: 5px;
    text-align: center;
    position: relative;
    top: 2px;
}


.detail-filler{
    background-color: #9147FF;
    height: 100%;
    width: 50%;
}
</style>