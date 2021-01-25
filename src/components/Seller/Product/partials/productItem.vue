<template>
    <tr>
        <td><div class="item-locker"><img class="item-picture" :src="(theProduct.image != null ? theProduct.image : '/assets/site/images/express.png')" alt="picture"></div></td>
        <td>{{theProduct.name}}</td>
        <td>تک گل ها</td>
        <td>{{theProduct.price}}</td>
        <td>{{(theProduct.price - theProduct.price*theProduct.discount/100)}} تومان<span class="discount">{{theProduct.discount}}</span></td>
        <td>{{theProduct.remain}}</td>
        <td>{{theProduct.created_at}}</td>
        <td><image-icon address="/assets/site/images/seller-icons/red-trash.svg" :clickable="true" @iconClicked="deleteMe" classes="mid mr-3"></image-icon><image-icon address="/assets/site/images/seller-icons/purple-pen.svg" :clickable="true" @iconClicked="editMe" classes="mid mr-3"></image-icon><image-icon address="/assets/site/images/seller-icons/three-dots.svg" classes="mid mr-3"></image-icon></td>
    </tr>
</template>
<script>
import ImageIcon from '../../../Common/icon'
export default {
    props:['theProduct'],
    components:{
        ImageIcon
    },
    methods:{
        deleteMe:function(){
            this.$emit('deleteMe',this.theProduct.id)
        },
        editMe:function(){
            this.$router.push('/seller/product/' + this.theProduct.id)
        }
    }
}
</script>
<style scoped>
.item-locker{
    width: 40%;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: -2px 2px 8px 0px rgba(127, 127 , 127 , .2);
}

.item-picture{
    width: 75%;
}

.discount{
    background-color: rgba(127, 127 , 127 , .8);
    color: #fff;
    padding:3px;
    border-radius: 5px;
    margin-right: 5px;
}

tr{
    width: 100%;
    border-bottom: 1px solid rgba(127, 127 , 127 , .2);
}

td{
    width: 12.5%;
    padding:20px 0px 20px 0px;
}

</style>