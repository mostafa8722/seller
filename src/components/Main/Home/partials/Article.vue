<template>
    <div class="article-article" @click="goToMag">
        <div class="article-locker">
            <img :src="theArticle.image" alt="" class="article-image">
        </div>
        <div class="article-title mt-2">
            <h5 class="mini-title">{{theArticle.title}}</h5>
            <span class="icon-circle-right mr-1"></span>
        </div>
        <div class="article-content mt-2">
            <p>{{theArticle.sum}}</p>
            <p class="article-detail">مدت خواندن 2 دقیقه</p>
        </div>
    </div>    
</template>
<script>
export default {
    // props:['image','link','sum'],
    // methods:{
    //     goToMag:function(){
    //         window.location.href = this.link
    //     }
    // }
    props:['theArticle'],
    methods:{
        goToMag:function(){
            window.location.href = this.theArticle.url
        }
    }
}
</script>
<style scoped>
.mini-title{
    display: inline-block;
}

.article-article{
    width: 100%;
}

.article-article:hover{
    cursor: pointer;
}

.article-locker{
    border-radius: 6px;
    width: 100%;
    overflow: hidden;
}

.article-image{
    width: 100%;
}

.article-title span{
    float: left;
}

.article-detail{
    color:#c4c4c4;
}
</style>