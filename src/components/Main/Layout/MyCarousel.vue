<template>
    <div class="my-carousel-container">
        <div class="right-scroll btn-scroll" @click="scrollLeft">
            <icon-image address="/assets/site/images/seller-icons/right-arrow.svg" classes="mt-2 mid" ></icon-image>
        </div>
        <div class="left-scroll btn-scroll" @click="scrollRight">
            <icon-image address="/assets/site/images/seller-icons/left-arrow.svg" classes="mt-2 mid" ></icon-image>
        </div>
        <div class="my-carousel" :id="id" :class="classes">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import IconImage from "../../Common/icon"
export default {
    components:{
        IconImage
    },
    methods:{
        scrollRight:function(){
            document.getElementById(this.id).scrollBy({
                top:0,
                left:-600,
                behavior: 'smooth'
            })
        },
        scrollLeft:function(){
            document.getElementById(this.id).scrollBy({
                top:0,
                left:600,
                behavior: 'smooth'
            })
        }
    },
    computed:{
        id:function(){
            return 'carousel'+ this._uid
        }
    },
    props:['classes']
}
</script>
<style scoped>
.my-carousel-container{
    width: 100%;
    position: relative;
}

.my-carousel{
    display: flex;
    scroll-snap-type: x mandatory;
    overflow-x: scroll;
    scroll-behavior: smooth;
    padding:10px 0px 10px 0px;
}

.my-carousel-item{
    width: 100%;
    flex-shrink: 0;
    scroll-snap-align: start;
}

.right-scroll{
    right:0px;
}

.left-scroll{
    left:0px;
}

.btn-scroll{
    position: absolute;
    top:20%;
    width: 30px;
    height: 30px;
    background-color: #fff;
    border-radius: 50%;
    z-index: 1;
    text-align: center;
    box-shadow: 0px 0px 4px rgba(127, 127, 127, 0.6);
}

.btn-scroll:hover{
    cursor: pointer;
}

* {
  scrollbar-width: 2px;
  scrollbar-color: gray transparent;
}

/* Works on Chrome/Edge/Safari */
*::-webkit-scrollbar {
  width: 1px;
  height: 3px;
  border-radius: 4px;
}
*::-webkit-scrollbar-track {
  background: transparent;
}
*::-webkit-scrollbar-thumb {
  background-color: rgba(127, 127, 127, 0.5);
  border-radius: 20px;
  border: 1px solid transparent;
}
/* .scrollbars-visible-always {
    /deep/::-webkit-scrollbar {
        width: 0.25rem;
        height: 0.25rem;
    }
} */
</style>
