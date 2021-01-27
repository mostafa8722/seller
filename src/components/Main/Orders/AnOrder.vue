<template>
        <!-- <div class="container pt-5">
            <div class="row">
                <div class="col-5">
                    <div class="whole-status">
                        <div class="order-status mini-title">
                            <div class="order-status-title">
                                <p class="mini-title m-0">وضعیت سفارش</p>
                            </div>
                            <div class="order-status-icon">
                                <img :src="'/assets/site/images/seller-icons/order/' + statusIcon" alt="status">
                            </div>
                            <div class="order-status-status">
                                {{orderStatus}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-7">
                    <div class="whole-status">
                        <div class="order-status mini-title">
                            <div class="order-status-title">
                                <p class="mini-title m-0">شرح سفارش</p>
                            </div>
                            <div class="order-desc">
                                <table>
                                    <tr>
                                        <th>تصویر محصول</th>
                                        <th>نام محصول</th>
                                        <th>تعداد</th>
                                        <th>قیمت</th>
                                    </tr>
                                    <order-item v-for="(item,i) in items" :key="i" :theItem="item"></order-item>
                                </table>
                            </div>
                        </div>
                    </div>      
                </div>
            </div>
        </div> -->
    <div class="container">
        <custom-button label="بازگشت" classes="no-border text-big" icon="/assets/site/images/seller-icons/right-arrow.svg" @clicked="backToOrders"></custom-button>
        <div class="order-detail-section">
            <h3 class="mini-title order-section ml-5">جزئیات سفارش</h3>
            <p class="mini-title">{{orderDate}}</p>
        </div>
        <div class="order-detail-section">
            <div>
                <p class="detail-title">تحویل گیرنده :</p>
                <p class="detail-value">{{global.user.value.name}}</p>
                <p class="detail-title"> شماره تماس : </p>
                <p class="detail-value">{{global.user.value.phone}}</p>
            </div>
            <p class="detail-title">آدرس :</p>
            <p class="detail-value">{{orderAddress}}</p>
        </div>
        <div class="order-detail-section">
            <h3 class="order-section">اطلاعات مرسوله</h3>
            <p class="detail-title">وضعیت :</p>
            <p class="detail-value">{{orderStatus}}</p>
            <div class="order-status-icon mini-title">
                <img :src="'/assets/site/images/seller-icons/order/' + statusIcon" alt="status">
            </div>
        </div>
        <div class="order-detail-section">
            <p class="detail-title">مبلغ کل :</p>
            <p class="detail-value">{{theOrder.payable}} تومان</p>
        </div>
        <div class="order-detail-section">
            <p class="detail-title">محصولات</p>
            <order-item v-for="(item,i) in items" :key="i" :theItem="item"></order-item>
        </div>
    </div>
</template>
<script>
import { computed, inject, onMounted, ref} from "@vue/composition-api"
import OrderItem from './partials/OrderItem'
import Service from '../../../utils/service'
import CustomButton from '../../Common/customButton'
import jalalim from 'jalali-moment'
import formattedPrice from "../../use/fomatCurrency"
export default {
    components:{
        OrderItem,
        CustomButton
    },
    setup(props,context){
        const items = ref(null)
        const global = inject('global')
        const theOrderId = computed(()=>{
            return context.root.$route.params.id
        })
        const authService = computed(()=>{
            return Service(true)
        })

        const orderAddress = ref(null)
        const theOrder = ref({status:1})
        const orderStatus = ref('در حال پردازش')

        const statusIcon = ref('processing.svg')

        const orderDate = computed(()=>{
            return (theOrder.value.created_at ? jalalim(theOrder.value.created_at).locale('fa').format('YYYY/MM/DD') : '')
        })
        onMounted(()=>{
            authService.value.receive('buy/order/' + theOrderId.value , {} , (s,d)=>{
                if(s == 200){
                    items.value = d.data.product
                    items.value.map((i)=>{
                        i.price = formattedPrice(i.price + "")
                    })
                    theOrder.value = d.data.order
                    theOrder.value.payable = formattedPrice(theOrder.value.payable + "")
                    getAddress(theOrder.value.address_id)
                    switch (parseInt(theOrder.value.status)) {           
                        case 1:
                            statusIcon.value = 'processing.svg' 
                            orderStatus.value = 'درحال پردازش'         
                            break;
                        case 2:
                            statusIcon.value = 'processing.svg'
                            orderStatus.value = 'درحال پردازش'       
                            break;
                        case 3:
                            statusIcon.value = 'error.svg'
                            orderStatus.value = 'رد شده'
                            break;
                        case 4:
                            statusIcon.value = 'preparing.svg'
                            orderStatus.value = 'در حال آماده سازی'
                            break;
                        case 5:
                            statusIcon.value = 'delivering.svg'
                            orderStatus.value = 'در حال ارسال'
                            break;
                        case 6:
                            statusIcon.value = 'delivered.svg'
                            orderStatus.value = 'تحویل داده شد'
                            break;
                        case 7:
                            statusIcon.value = 'error.svg'
                            orderStatus.value = 'لغو شده'
                            break;
                        default:
                            break;
                    }
                }
            },(s,e)=>{

            })
        })

        const getAddress = (id) => {
            authService.value.receive('user/address',{},(s,d)=>{
                if(s == 200 && d.data.length>0){
                    d.data.map((addr)=>{
                        if(addr.id == id){
                            orderAddress.value =  addr.address
                        }
                    })
                }
            },(s,e)=>{

            })
        }

        const backToOrders = () => {
            context.root.$router.push('/profile/orders')
        }
        return {global,orderAddress,theOrder,items,statusIcon,orderStatus,backToOrders,orderDate}
    }
}
</script>
<style scoped>
h3{
    font-size: 1rem;
}
.order-status{
    border: 1px solid rgba(127, 127, 127, 0.45);
    border-radius: 10px;
    overflow: hidden;
    height: 400px;
}

.order-status-title{
    background-color: rgba(127, 127, 127, 0.25);
    padding: 1.1rem;

}

.order-status-icon{
    margin-right: 50%;
    width: 75px;
}

.order-status-icon img{
    width: 100%;
}

.order-status-status{
    border-top: 1px solid rgba(127, 127, 127, 0.2);
    padding: 1rem;
}

.order-detail-section{
    border-bottom: 1px solid rgba(127, 127, 127, 0.25);
    width: 100%;
    margin-top: 10px;
    padding: 1rem;
}

.detail-title{
    display: inline-block;
    color: rgba(127, 127, 127, 0.8);
    margin-left: 8px;
}
.detail-value{
    display: inline-block;
    margin-left: 30px;
}
</style>