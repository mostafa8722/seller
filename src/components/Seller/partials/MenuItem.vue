<template>
<router-link
            :to="to ? to : ''">
    <div :class="'menu-item mt-2 pr-2 ' + isActive" ref="item" @click="activate">
        <icon-image  :address="icon"></icon-image>
        <p class="mini-title m-2 item-title">{{title}}</p>
    </div>
</router-link>
</template>
<script>
import IconImage from '../Common/icon'
export default {
    components:{
        IconImage
    },
    props:{
        icon:{
            type:String,
            required:true
        },
        title:{
            type:String,
            required:true
        },
        id:{
            type:String,
            default:""
        },
        active:{
            type:String,
            default:""
        },
        to:{
            required:false
        }
    },
    computed:{
        isActive : function(){
            if(this.active == this.id)
                return 'activeMenuItem'
            else
                return ''
        }
    },
    methods:{
        activate:function(){
            this.$emit('activated',this.id)
        }
    }
}
</script>
<style>
.menu-item{
    background: none;
    color: #fff;
    cursor: pointer;
    width: 100%;
}


.item-title{
    color: #fff;
}

.menu-item:hover{
    background-color: #28405c;
}

.activeMenuItem{
    background-color: #28405c;
    border-right: 4px solid #17FEFF;
}
</style>