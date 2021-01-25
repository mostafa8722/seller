<template>
    <div class="custom-link" :class="classes">
        <div class="row">
            <div class="col-3" v-if="icon != ''">
                <icon-image :address="icon" :classes="iconSize"></icon-image>
            </div>
            <div class="col-9" v-if="!isLonely">
                <div class="theLink tNormal" v-if="url!='aaa' && url!='https://golpino.com/mag/'">
                    <router-link :to="url">{{title}}</router-link>
                </div>
                <div class="theLink tNormal" v-else>
                    {{title}}
                </div>
                <div class="sub tLighter" v-if="sub != ''">
                    <p>{{sub}}</p>
                </div>
            </div>
            <a class="col-9" target="_blank" :href="url" v-else>{{title}}</a>
        </div>
    </div>    
</template>
<script>
import IconImage from "./icon"
export default {
    props:{
        icon:{
            type:String,
            default:''
        },
        url:{
            type:String,
            required:true
        },
        title:{
            type:String,
            default:''
        },
        sub:{
            type:String,
            default:''
        },
        classes:{
            type:String,
            default:''
        },
        iconSize:{
            type:String,
            default:'mid'
        },
        isLonely:{
            type:Boolean,
            default:false
        }
    },
    components:{
        IconImage
    },
    methods:{
        goToUrl:function(){
            if(this.isLonely){
                // window.location.href = this.url
                var win = window.open(this.url, '_blank');
                win.focus();
            }
        }
    }
}
</script>
<style scoped>
.custom-link{
    display: inline-block;
}
.theHiddenLink{
    height: 0px;
    width: 0px;
}
.custom-link:hover{
    cursor: pointer;
}

a{
    text-decoration: none;
    color:#000;
}
</style>