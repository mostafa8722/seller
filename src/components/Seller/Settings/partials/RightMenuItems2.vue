<template>
    <router-link :to="'/seller/ssettings/' + theItem.to">
        <div class="d-flex justify-content-between mini-menu-item pt-2 pb-2 pl-3 mt-2 mb-2" :class=" active ? 'mini-active' : ''">
            <div class="mini-title pl-3 pr-3">
                <icon-image :address="'/assets/site/images/seller-icons/' + theItem.icon"></icon-image>    
                <p class="mini-title mr-2">{{theItem.text}}</p>
            </div>
            <icon-image address="/assets/site/images/seller-icons/left-arrow.svg" classes="mid"></icon-image>
        </div>
    </router-link>
</template>
<script>
import IconImage from '../../Common/icon'
export default {
    props:['theItem'],
    components:{
        IconImage
    },    
    computed:{
        active:function(){
            return (this.$route.fullPath.includes(this.theItem.to) ? true : false)
        }
    }
}
</script>
<style scoped>
.mini-menu-item{
    font-weight: normal;
}

.mini-menu-item:hover{
    cursor: pointer;
}

p{
    margin:0px;
}

.mini-active{
    border-right: 4px solid #772CE8;
}

a{
    color: #000;
    text-decoration:none;
}
</style>