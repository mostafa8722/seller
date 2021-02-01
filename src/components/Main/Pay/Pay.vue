<template>
    <div class="pay-page">
        <div class="row">
            <div class="col-md-8">
                <div class="pay-form">
                    <div class="a-pay-form" v-if="cartErrors != null">
                        <div class="pay-form-title">
                               <p class="cartError">لطفا به موارد زیر دقت کنید</p>
                        </div>
                        <div class="pay-form-form">
                            <div class="row">
                                <div class="col-7">
                                    <p class="cartError mini-title" v-for="(e,i) in cartErrors" :key="i">
                                        {{e}}
                                    </p>
                                </div>
                                <div class="col-5">
                                    <button @click="redirectToSearch" class="purple-btn full-width">بازگشت به صفحه جست و جو</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="a-pay-form">
                        <div class="pay-form-title">
                                <icon-image address="/assets/site/images/seller-icons/user.svg"></icon-image>
                                <p class="mini-title tLighter mr-1">اطلاعات کاربری</p>
                        </div>
                        <div class="pay-form-form">
                            <div class="d-flex justify-content-between">
                                <p class="mini-title tNormal">نام</p>
                                <p class="mini-title tLighter">{{global.user.value.name}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="a-pay-form">
                        <div class="pay-form-title">
                                <icon-image address="/assets/site/images/seller-icons/address.svg"></icon-image>
                                <p class="mini-title tLighter mr-1">آدرس انتخاب شده</p>
                        </div>
                        <div class="pay-form-form">
                            <div class="row">
                                <div class="col-md-7">
                                    <custom-input kind="radio" :selectItems="userAddresses" name="address" v-bind:theModel.sync="address"></custom-input>
                                </div>
                                <div class="col-md-5">
                                    <custom-button toggle="modal" target="#addressModal" float="left" classes="new-address-btn" iconSize="mid" label="ثبت آدرس جدید" icon="/assets/site/images/seller-icons/plus.svg"></custom-button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <address-modal :districts="districts" @addressComplete="sendAddress"></address-modal>
                    <div class="a-pay-form" v-if="discount_id == null">
                        <div class="pay-form-title">
                                <icon-image address="/assets/site/images/seller-icons/price-tag.svg"></icon-image>
                                <p class="mini-title tLighter mr-1">کد تخفیف</p>
                        </div>
                        <div class="pay-form-form">
                            <div class="row">
                                <div class="col-md-4">
                                    <p>اگر کد تخفیف دارید در این بخش وارد کرده و دکمه ی اعمال را بزنید</p>
                                </div>
                                <div class="col-md-8">
                                    <div class="fancy-input">
                                        <input v-model="discountName" class="pl-2" type="text">
                                        <button @click="()=>submitDiscount(false)">اعمال کد</button>
                                    </div>
                                    <p class="discount-error" v-if="discountError.show">{{discountError.text}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="a-pay-form">
                        <div class="pay-form-title">
                                <icon-image address="/assets/site/images/seller-icons/description.svg"></icon-image>
                                <p class="mini-title tLighter mr-1">توضیحات سفارش</p>
                        </div>
                        <div class="pay-form-form p-3">
                            <div class="row">
                                <div class="col-md-12">
                                    <custom-input rows="3" kind="area" container="full-width" classes="full-width" v-bind:theModel.sync="orderDesc" placeholder="توضیحات"></custom-input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="a-pay-form">
                        <div class="pay-form-title">
                                <icon-image address="/assets/site/images/seller-icons/close.svg"></icon-image>
                                <p class="mini-title tLighter">زمان تحویل</p>
                        </div>
                        <div class="pay-form-form delivery-time">
                            <div class="time-table">
                                <div class="intervals">
                                    <div @click="()=>timeIntervalHandler(0)" id="interval0" class="time-interval active-interval">
                                        <p>سه شنبه</p>
                                        <p>4 شهریور</p>
                                    </div><div @click="()=>timeIntervalHandler(1)" id="interval1" class="time-interval">
                                        <p>سه شنبه</p>
                                        <p>4 شهریور</p>
                                    </div><div @click="()=>timeIntervalHandler(2)" id="interval2" class="time-interval">
                                        <p>سه شنبه</p>
                                        <p>4 شهریور</p>
                                    </div><div @click="()=>timeIntervalHandler(3)" id="interval3" class="time-interval">
                                        <p>سه شنبه</p>
                                        <p>4 شهریور</p>
                                    </div><div @click="()=>timeIntervalHandler(4)" id="interval4" class="time-interval">
                                        <p>سه شنبه</p>
                                        <p>4 شهریور</p>
                                    </div>
                                </div>
                                <div class="hours p-3">
                                    <custom-input kind="radio" container="hour-interval" :selectItems="userAddresses" name="address" v-bind:theModel.sync="address"></custom-input>
                                </div>
                            </div>
                        </div>
                        <div class="a-pay-form">
                            <div class="pay-form-title">
                                    <icon-image address="/assets/site/images/seller-icons/close.svg"></icon-image>
                                    <p class="mini-title tLighter">درگاه پرداخت</p>
                            </div>
                            <div class="pay-form-form">
                                <div class="row">
                                    <div class="col-md-5">
                                        <custom-input kind="radio" :selectItems="methods" name="paymentMethod" v-bind:theModel.sync="paymentMethod"></custom-input>
                                    </div>
                                    <div class="col-md-7">
                                        <div class="gateways">
                                            <icon-image address="/assets/site/images/seller-icons/up.svg" classes="gigantic"></icon-image>
                                            <icon-image address="/assets/site/images/seller-icons/up.svg" classes="gigantic"></icon-image>
                                        </div>
                                        <custom-input kind="tick" name="credit" v-bind:theModel.sync="useCredit" :label="'استفاده از اعتبار ( اعتبار شما '+credit + ' تومان است)'"></custom-input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
            <div class="col-md-4">
                <div class="cart">
                    <div class="cart-header">
                        <icon-image address="/assets/site/images/seller-icons/up.svg" classes="mid"></icon-image>
                        <h6 class="mini-title tNormal p-2">سبد خرید</h6>
                    </div>
                    <div class="a-buy">
                        <div class="shop-title">
                            <p class="mini-title">گل محمدی (میرداماد)</p>
                        </div>
                        <div class="cart-items">
                            <cart-item @cartChanged="cartChanged" v-for="(theItem,i) in cartItems" :key="i" :theItem="theItem"></cart-item>
                        </div>
                        <div class="cart-summary p-3">
                            <div class="cart-summary-item">
                                <div class="summary-title">
                                    <p class="mini-title">جمع سفارش</p>
                                </div>
                                <div class="connecting-line"></div>
                                <div class="summary-value">
                                    <p class="mini-title">{{total}} تومان</p>
                                </div>
                            </div>
                            <div class="cart-summary-item">
                                <div class="summary-title">
                                    <p class="mini-title">تخفیف</p>
                                </div>
                                <div class="connecting-line"></div>
                                <div class="summary-value">
                                    <p class="mini-title">{{discount}} تومان</p>
                                </div>
                            </div>
                            <div class="cart-summary-item">
                                <div class="summary-title">
                                    <p class="mini-title">هزینه ارسال</p>
                                </div>
                                <div class="connecting-line"></div>
                                <div class="summary-value">
                                    <p class="mini-title">{{deliveryCost}} تومان</p>
                                </div>
                            </div>
                            <div class="cart-summary-item">
                                <div class="summary-title">
                                    <p class="mini-title">مالیات</p>
                                </div>
                                <div class="connecting-line"></div>
                                <div class="summary-value">
                                    <p class="mini-title">{{tax}} تومان</p>
                                </div>
                            </div>
                            <div class="cart-summary-item mt-3">
                                <div class="summary-title">
                                    <p class="mini-title tNormal">قابل پرداخت</p>
                                </div>
                                <div class="connecting-line"></div>
                                <div class="summary-value">
                                    <p class="mini-title tNormal">{{payable}} تومان</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- <button class="edit-cart-btn">ویرایش سبد خرید</button> -->
                    <button class="buy-btn" @click="doPay">تأیید نهایی سفارش</button>
                    <button class="deleteCart mt-1 full-width" @click="deleteCart">حذف سبد خرید</button>
                    <!-- <button class="deleteCart mt-1 full-width" @click="test">تست</button> -->
                </div>
            </div>
        </div>
    </div>    
</template>
<script>
import IconImage from "../../Common/icon"
import CustomInput from "../../Common/CustomInput"
import CustomButton from "../../Common/customButton"
import {ref,inject,computed, onMounted, watch} from "@vue/composition-api"
import CartItem from "../Layout/CartItem"
import AddressModal from "../../Common/AddressModal"
import Service from "../../../utils/service"
import currencyFormatter from "../../use/fomatCurrency"
import $ from 'jquery'
export default {
    components:{
        IconImage,
        CustomInput,
        CustomButton,
        CartItem,
        AddressModal
    },
    setup(props,context){
        const methods = ref([{text:"آنلاین",value:1}])
        const paymentMethod=ref(1)
        const discountError = ref({show:false,text:''})
        const address = ref({value:null,valid:true})
        const useCredit = ref(false)
        const credit = ref(765)
        const stateValues = inject('stateValues')
        const global = inject('global')
        const currentCart = ref(null)
        const orderDesc = ref({value:null,valid:true})
        const cartItems = computed(()=>{
            return stateValues.shoppingCart.value
        })
        const theService = computed(()=>{
            return Service(false)
        })
        const authService = computed(()=>{
            return Service(true)
        })
        const activeCart = ref((context.root.$route.params.id) ? context.root.$route.params.id : false)
        const userAddresses = ref(null)
        const getUserAddresses = (def) => {
            authService.value.receive('user/address',{},(s,d)=>{
                if(s == 200){
                    userAddresses.value = d.data
                    if(userAddresses.value.length>0){
                        userAddresses.value.map((addr)=>{
                            addr.value = addr.id
                            addr.text = addr.name + " : " + addr.address
                        })
                    }
                    else{
                        cartErrors.value = []
                        cartErrors.value.push('شما هیچ آدرس ثبت شده ای ندارید.لطفا دست کم یک آدرس اضافه کنید!')
                    }
                    
                }
                if(userAddresses.value.length>0){
                    if(def == "default")
                    address.value.value = userAddresses.value[0].id + ""
                else
                    address.value.value = def + ""
                }
            },(s,e)=>{

            })
        }

        watch(address.value,(n,o)=>{
            if(activeCart.value == false){
                evaluateCart(false)
            }
            activeCart.value = false
        })

        const districts = ref(null)

        const getDistricts = () =>{
            theService.value.receive('search/district',{},(s,d)=>{
                if(s == 200){
                    districts.value = d.data
                    districts.value.map((dis)=>{
                        dis.value = dis.id
                        dis.text = dis.name
                    })
                }
            })
        }

        const sendAddress = (ad) => {
            let f = new FormData()
            f.append('name',ad.name.value)
            f.append('district_id',ad.district_id)
            f.append('lat',ad.lat)
            f.append('long',ad.long)
            f.append('address',ad.address.value)
            authService.value.transmit('user/address',f,(s,d)=>{
                if(s == 200){
                    getUserAddresses("default")
                    $(function () {
                        $('#addressModal').modal('toggle');
                    });
                }
            },(s,e)=>{

            })
        }

        onMounted(()=>{
            getDistricts()
            let x = null

            if(activeCart.value != false){
                currentCart.value = activeCart.value
                authService.value.receive('/buy/order/active',{},(s,d)=>{
                    if(s == 200){
                        x = d.data.order.address_id
                        let aps = d.data.product
                        aps.map((ap)=>{
                            ap.name = ap.product_name
                            ap.quantity = ap.number
                            ap.id = ap.product_id
                        })
                        stateValues.setCart(aps)
                        payable.value = currencyFormatter(d.data.order.payable + "")
                        total.value = currencyFormatter(d.data.order.amount + "")
                        tax.value = currencyFormatter(d.data.order.tax + "")
                        discount.value = d.data.order.discount
                        discount_id.value = d.data.order.discount_id
                        deliveryCost.value = currencyFormatter(d.data.order.delivery_cost + "")
                        currentCart.value = d.data.order.id
                        getUserAddresses(x)
                    }
                },(s,e)=>{
                })
            }
            // if(x != null){
                
            //     alert(x)
            // }
                
            else{
                getUserAddresses("default")
            }
                
        })

        //CART
        const cartErrors = ref(null)
        const payable = ref(0)
        const total = ref(0)
        const tax = ref(0)
        const discount = ref(0)
        const deliveryCost = ref(0)
        const discountName = ref(null)
        const discount_id = ref(null)
        const hasSetDiscount = ref(false)
        const submitDiscount = (id) => {
            let f = new FormData()
            f.append('name',discountName.value)
            if(discountName.value != null && discountName.value != ''){
                authService.value.transmit('buy/discount/check/'+((id == false) ? currentCart.value : id),f,(s,d)=>{
                    discountError.value.show = false
                    cartErrors.value = null
                    payable.value = currencyFormatter(d.data.payable + "")
                    total.value = currencyFormatter(d.data.amount + "")
                    tax.value = currencyFormatter(d.data.tax + "")
                    discount.value = d.data.discount
                    deliveryCost.value = currencyFormatter(d.data.delivery_cost + "")
                    currentCart.value = d.data.id
                    hasSetDiscount.value = discountName.value
                },(s,e)=>{
                        if(e.response.data.error.invalid_params){
                            if(e.response.data.error.invalid_params[0].field == 'name'){
                                discountError.value.show = true
                                discountError.value.text = e.response.data.error.invalid_params[0].message
                            }
                        }
                })
            }
        }
        const evaluateCart = (shallPay) => {
            let productsToBuy = []
            let quantities = []
            cartItems.value.map((c)=>{
                    productsToBuy.push(c.id)
                    quantities.push(c.quantity)
            })
            let basketToSend = ((orderDesc.value.value!=null)?{number:quantities,product_id:productsToBuy,desc:orderDesc.value.value} : {number:quantities,product_id:productsToBuy})
            authService.value.transmit('buy/checkbasket/'+address.value.value,basketToSend,(s,d)=>{
                cartErrors.value = null
                payable.value = currencyFormatter(d.data.payable + "")
                total.value = currencyFormatter(d.data.amount + "")
                tax.value = currencyFormatter(d.data.tax + "")
                discount.value = d.data.discount
                discount_id.value = d.data.discount_id
                deliveryCost.value = currencyFormatter(d.data.delivery_cost + "")
                currentCart.value = d.data.id
                if(shallPay){
                    if(hasSetDiscount.value != false){
                        let f = new FormData()
                        f.append('name',hasSetDiscount.value)
                        authService.value.transmit('buy/discount/check/'+ d.data.id ,f,(ns,nd)=>{
                            cartErrors.value = null
                            payable.value = currencyFormatter(nd.data.payable + "")
                            total.value = currencyFormatter(nd.data.amount + "")
                            tax.value = currencyFormatter(nd.data.tax + "")
                            discount.value = nd.data.discount
                            deliveryCost.value = currencyFormatter(nd.data.delivery_cost + "")
                            currentCart.value = nd.data.id
                            if(cartErrors.value == null){
                                    authService.value.transmit('pay/check/' + nd.data.id , {} , (nns,nnd)=>{
                                        if(nns == 200){
                                            if(nnd.data.success == true){
                                                window.location.href = 'https://api.golpino.com/api/pay/'+ nd.data.id
                                            }
                                        }
                                    },(nns,nne)=>{

                                    })
                                }
                        },(nse,ne)=>{

                        })
                    }
                    else{
                        if(cartErrors.value == null){
                                    authService.value.transmit('pay/check/' + d.data.id , {} , (nns,nnd)=>{
                                        if(nns == 200){
                                            if(nnd.data.success == true){
                                                window.location.href = 'https://api.golpino.com/api/pay/'+ d.data.id
                                            }
                                        }
                                    },(nns,nne)=>{

                                    })
                                }
                    }
                }
                else if(hasSetDiscount.value != false){
                    let f = new FormData()
                    f.append('name',hasSetDiscount.value)
                    authService.value.transmit('buy/discount/check/'+ d.data.id ,f,(ns,nd)=>{
                            cartErrors.value = null
                            payable.value = currencyFormatter(nd.data.payable + "")
                            total.value = currencyFormatter(nd.data.amount + "")
                            tax.value = currencyFormatter(nd.data.tax + "")
                            discount.value = nd.data.discount
                            deliveryCost.value = currencyFormatter(nd.data.delivery_cost + "")
                            currentCart.value = nd.data.id
                        },(nse,ne)=>{

                        })
                }
            },(s,e)=>{
                if(e.response.status == 400){
                    if(e.response.data.error.invalid_params){
                        cartErrors.value = []
                        e.response.data.error.invalid_params.map((eip)=>{
                            cartErrors.value.push(eip.message)
                            if(eip.message == "فروشگاه خارج از محدوده شماست"){
                                global.alertToggle("لطفا آدرسی در محدوده ی فروشگاه انتخاب کنید")
                            }
                        })
                    }
                }
            })
        }
        const cartChanged = (v)=>{
            evaluateCart(false)
            activeCart.value = false
        }
        const deleteCart = ()=> {
            authService.value.receive('/buy/order/active',{},(s,d)=>{
                    if(s == 200){
                        if(d.data.order.id){
                            let deleteId = d.data.order.id
                            authService.value.remove('/buy/order/'+currentCart.value , {} , (s,d)=>{
                                if(s == 200){
                                    stateValues.setCart([])
                                    context.root.$router.push('/')
                                }
                            },(s,e)=>{

                            })
                        }
                        else{
                            stateValues.setCart([])
                            context.root.$router.push('/')
                        }
                    }
                },(s,e)=>{
                })
        }
        //TIMES        
        const timeIntervalHandler = (id)=>{
            let intervals = document.getElementsByClassName('time-interval')
            for (let [key, value] of Object.entries(intervals)) {
                value.classList.remove('active-interval')
            }
            document.getElementById('interval'+id).classList.add('active-interval')
        }

        // PAY
        const doPay = ()=>{
            evaluateCart(true)
        }

        const test = () => {
            theService.value.receive('pay/test',{},(s,d)=>{
                console.log(test,d.data)
            },(s,e)=>{
                console.log({e})
            })
        }

        const redirectToSearch = ()=>{
            stateValues.emptySearch(true)
            context.root.$router.push('/search')
        }


        return {discountError,discount_id,discountName,submitDiscount,orderDesc,activeCart,redirectToSearch,global,sendAddress,districts,test,doPay,cartChanged,payable,tax,deliveryCost,total,discount,cartErrors,deleteCart,userAddresses,address,timeIntervalHandler,methods,paymentMethod,credit,useCredit,cartItems}
    }
}
</script>
<style>
.pay-page{
    background-color: #ECE8E8;
    padding: 2rem 6rem 2rem 6rem;
    font-size: 0.75rem;
    font-weight: lighter;
}

.pay-form{
    background-color: #fff;
    padding: 2rem 3rem 2rem 3rem;
    z-index: 1;
}

.a-pay-form{
    margin-top: 1.5rem;
    position: relative;
}

.pay-form-title{
    width: 22%;
    display: inline-block;
    position: absolute;
    top:37%;
    right:0px;
}

.pay-form-form{
    width: 75%;
    position: relative;
    right: 23%;
    display: inline-block;
    background-color: #F3F3F3;
    border-radius: 4px;
    border:1px solid rgba(127, 127, 127, 0.2);
    box-shadow:0px 0px 6px rgba(127, 127, 127, .1);
    padding:0.8rem 1rem 0.8rem 1rem;
}

.new-address-btn{
    background-color: #F8F8F8 !important;
    border:none !important;
    box-shadow: 0px 0px 4px rgba(127, 127, 127, .2);
}

.fancy-input{
    width: 100%;
    position: relative;
    height: 40px;
}

.discount-error{
    color:#ff3629;
}

.fancy-input input{
    background-color: #F8F8F8;
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
    border-right: 1px solid #772CE8;
    border-top: 1px solid #772CE8;
    border-bottom: 1px solid #772CE8;
    border-left: none;
    width:75%;
    position: absolute;
    top: 0px;
    right: 0px;
    height:30px;
    box-shadow: 0px 0px 4px 1px #772ce85d;
}

.fancy-input button{
    background-color: #772CE8;
    border-bottom-left-radius: 4px;
    border-top-left-radius: 4px;
    color: white;
    border: none;
    position: absolute;
    right: 75%;
    top:0px;
    height:30px;
    width: 25%;
}

.delivery-time{
    padding: 0px;
}

.time-interval{
    width: 20%;
    margin:0px !important;
    padding-top: 8px;
    border:none;
    background-color: #F9F9F9;
    border-left: 1px solid #F3F3F3;
    display: inline-block;
    text-align: center;
    border: 1px solid rgba(127, 127, 127, 0.4);
}

.time-interval:hover{
    cursor: pointer;
}

.active-interval{
    border-top: 4px solid #772CE8;
    background-color: #F3F3F3;
    border-bottom: none;
}

.hour-interval{
    border-bottom: 1px solid rgba(127, 127, 127, 0.4);
    margin-top: 10px;
    padding:8px 0px 8px 0px;
}

.gateways{
    text-align: center;
}

/* THE CART */

.cart-header{
    background-color: #F3F3F3;
    text-align: center;
}

.a-buy{
    background-color: #fff;
}

.shop-title{
    border-bottom: 1px solid rgba(127, 127, 127, 0.25);
    padding:0.7rem;
    text-align: center;
    font-weight: normal;
}

.cart-items{
    border-bottom: 1px solid rgba(127, 127, 127, 0.25);
}

.cart-summary-item{
    width: 100%;
    height: 30px;
    margin-bottom: 10px;
}

.cart-summary-item div{
    display: inline-block;
}

.summary-title{
    width: 30%;
    text-align: center;
}

.summary-value{
    width: 30%;
    text-align: center;
}

.connecting-line{
    height: 50%;
    width: 35%;
    border-bottom: 1px solid rgba(127, 127, 127, 0.2);
}

.edit-cart-btn{
    width: 100%;
    background: none;
    color: #772CE8;
    border: 1px solid #772CE8;
    border-radius: 3px;
    margin-top: 1rem;
    padding-top: 0.7rem;
    padding-bottom: 0.7rem;
}

.cartError{
    color: #ff5959;
}

.buy-btn{
    width: 100%;
    padding-top: 0.7rem;
    padding-bottom: 0.7rem;
    background-color: #772CE8;
    border:none;
    color: #fff;
    border-radius: 3px;
    margin-top: 0.3rem;
}

.deleteCart{
    border: 1px solid #ff5959;
    color: #ff5959;
    border-radius: 4px;
    background: none;
    padding: 0.6rem;
}

.deleteCart:hover{
    color: #fff;
    background-color: #ff5959;
}



</style>