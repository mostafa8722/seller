<template>
    <div class="a-cart-item">
        <div class="row">
            <div class="col-4">
                <div class="cart-locker">
                    <img src="/assets/site/images/express.png" alt="image">
                </div>
            </div>
            <div class="col-8">
                <div class="d-flex justify-content-between pt-2">
                    <p class="mini-title">گل رز قشنگ</p>
                    <p class="mini-title"> 1 عدد</p>
                </div>
            </div>
        </div>
        <div class="mt-2">45000 تومان</div>
    </div>
</template>
<script>
export default {
    props:['theItem']
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
</style>