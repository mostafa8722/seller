<template>
    <div class="a-cart-item">
        <div class="row">
            <div class="col-4">
                <div class="cart-locker">
                    <img :src="theItem.image" alt="image">
                </div>
            </div>
            <div class="col-8">
                <div class="d-flex justify-content-between pt-2">
                    <p class="mini-title">{{theItem.name}}</p>
                    <div>
                        <button class="quantity quantity-changer" @click="addToQuantity">+</button>
                        <button class="quantity">{{theItem.quantity}} عدد</button>
                        <button class="quantity quantity-changer" @click="subtractFromQuantity">-</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-2 d-flex justify-content-between">
            <p class="mini-title">{{displayedPrice}} تومان</p>
            <button class="removeMe mini-title" @click="removeFromCart">حذف</button>
        </div>
    </div>
</template>
<script>
import CustomButton from '../../Common/customButton'
import currencyFormatter from "../../use/fomatCurrency"
export default {
    props:['theItem'],
    components:{
        CustomButton
    },
    computed:{
        displayedPrice:function(){
            if(this.theItem.price){
                return currencyFormatter(this.theItem.price + "")
            }
            else{
                return 0
            }
        }
    },
    methods:{
        addToQuantity:function(){
            this.stateValues.plusQuantity(this.theItem)
            this.$emit('cartChanged',true)
        },
        subtractFromQuantity:function(){
            this.stateValues.minusQuantity(this.theItem)
            this.$emit('cartChanged',true)
        },
        removeFromCart:function(){
            this.stateValues.removeFromCart(this.theItem)
            this.$emit('cartChanged',true)
        }
    },
    inject:['stateValues']
}
</script>
<style scoped>
.a-cart-item{
    width: 100%;
    border-bottom: 1px solid rgba(127, 127, 127,0.2 );
    padding:0.5rem 1.5rem 0.5rem 1.5rem;
}

.cart-locker{
    width: 80%;
    border-radius: 6px;
    overflow: hidden;
    display: inline-block;
}

.cart-locker img{
    width: 100%;
}

.quantity{
    border:none;
    box-shadow: none;
    color: rgba(127, 127, 127,0.8);
    background: none;
    font-size: 1rem;
}

.quantity-changer{
    font-weight: bold;
}

.removeMe{
    background-color: #ff2929;
    color: #fff;
    border:none;
    border-radius: 4px;
    padding: 0.2rem;
}
</style>