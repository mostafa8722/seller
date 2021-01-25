<template>
    <div class="user-address">
        <div>
            <p class="mini-title tNormal">عنوان آدرس : </p>
            <p class="mini-title tLighter">{{theAddress.name}}</p>
        </div>
        <div class="row mt-4">
            <div class="col-9">
                <icon-image address="/assets/site/images/seller-icons/shoploc.svg"></icon-image>
                <p class="mini-title tLighter mr-2">{{theAddress.address}}</p>
            </div>
            <div class="col-3">
                <button class="red-btn" @click="deleteMe">حذف</button>
            </div>
        </div>
    </div>    
</template>
<script>
import IconImage from '../../../Common/icon'
export default {
    props:['theAddress'],
    components:{
        IconImage
    },
    methods:{
        deleteMe:function(){
            this.$emit('deleteMe',this.theAddress.id)
        }
    }
}
</script>
<style scoped>
    .user-address{
        margin:10px;
        border: 1px solid rgba(127, 127, 127, 0.25);
        border-radius: 5px;
        padding: 1.2rem;
    }
</style>