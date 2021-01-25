<template>
        <div class="caroo" :class="sizes">
            <div class="indicator right-indicator" id="rightIndicator" @click="moveCarousel(2)">
                <span class="icon-right-arrow"></span>
            </div>
            <div class="caroo-caroo"  v-on:dragstart="(e)=>drag(e)" :id="id">
                <div class="stopper stopper-right" :id="idr"></div>
                <slot></slot>
                <div class="stopper stopper-left" :id="idl"></div>                                                                                                            
            </div>
            <div class="indicator left-indicator" id="leftIndicator"  @click="moveCarousel(1)">
                <span class="icon-left-arrow"></span>
            </div>
        </div>
</template>
<script>
export default {
    data:()=>({
        id:"",
        idr:"",
        idl:""
    }),
    props:['factor','sizes'],
    methods:{
        moveCarousel(value){
            let tmp = document.getElementById(this.id).style.left !="" ? parseInt(document.getElementById(this.id).style.left, 10) : 0

            switch (value) {
                case 1:
                    if(!(this.isInViewport(document.getElementById(this.idl)))){
                        document.getElementById(this.id).style.left= tmp + 20 * this.factor + 'vh'
                    }
                    break;
                case 2:
                    if(!(this.isInViewport(document.getElementById(this.idr)))){
                        document.getElementById(this.id).style.left= tmp - 20 * this.factor + 'vh'
                    }
                    break;            
                default:
                    break;
            }
        },
        isInViewport(element) {
        // const rect = element.getBoundingClientRect();
        // return (
        //     rect.top >= 0 &&
        //     rect.left >= 0 &&
        //     rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        //     rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        // );
                    if(element !== null){
                const rect = element.getBoundingClientRect();
                return (
                    rect.top >= 0 &&
                    rect.left >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
                );
            }
            else{
                return true
            }
        },
        drag(e){
            // let temp = e.x/10
            // let tmp = document.getElementById('momentum').style.left !="" ? parseInt(document.getElementById('momentum').style.left, 10) : 0
            // document.getElementById('momentum').style.left= temp + tmp + 'vh'
        }
    },
    mounted () {
        this.id = this._uid + 'c'
        this.idr = this._uid + 'r'
        this.idl = this._uid + 'l'
    },
//     computed: {
//     cssVars() {
//       return {
//         '--bg-color': this.bgColor,
//         '--height': this.height + 'px'
//       }
//     }
//   }
}
</script>
<style scoped>
.big{
    height: 400px;
}

.medium{
    height: 300px;
}

.small{
    height: 180px;
}

.caroo{
    background-color: white;
    width: 100%;
    padding: 0px;
    overflow: hidden;
    position: relative;
    padding: 20px 0px 0px 0px;
    bottom: 10px;
    margin-bottom: 0px;
}

.caroo-caroo{
    margin: auto;
    margin-bottom: 0px;
    height: 100%;
    width: 200vw;
    position: relative;
    padding: 10px 0px 10px 0px;
    left: 0px;
    bottom: 20px;
    transform: none;
    transition-property: left;
    transition-duration: .5s;
    transition-timing-function: ease-out;
}

.stopper{
    display: inline-block;
    width: 15px;
    height: 30px;
    /* background: none; */
    background: none;
}

.indicator{
    position: absolute;
    font-size: 1.5rem;
    display: inline-block;
    top:35%;
    z-index: 100;
    cursor: pointer;
    box-shadow: 0 2px 10px -4px rgba(0,0,0,.39);
    width: 25px;
    height: 25px;
    border-radius: 50%;
    text-align: center;
    background-color: #fff;
}

.indicator span{
    font-size:0.8rem;
    position: relative;
    bottom: 33%;
}

.right-indicator{
    right:20px;
}
.left-indicator{
    left:20px
}


@media (max-width: 70em){
    .caroo-caroo{
        width: 700vw;
    }
}
/* button {
  color: var(--text-color);
  background-color: var(--bg-color);
  height: var(--height);
} */
</style>