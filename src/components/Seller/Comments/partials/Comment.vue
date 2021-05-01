<template>
    <div class="container p-5">
        <div class="container">
            <h3 class="tNormal mb-5">خلاصه سفارش</h3>
            <table>
                <tr>
                    <th>تصویر محصول</th>
                    <th>نام محصول</th>
                    <th>تعداد</th>
                    <th>قیمت</th>
                    <th>آدرس</th>
                    <th>شماره تلفن</th>
                </tr>
                <order-item v-for="(item,i) in products" :key="i" :theItem="item"></order-item>
            </table>
            <div class="mt-5 p-4 comment-reply">
                <div v-if="reply != null">
                    <p class="tBold">پاسخ نظر :</p>
                    {{reply}}
                </div>
                <div v-else>
                    <custom-input rows="3" kind="area" container="full-width" classes="full-width" v-bind:theModel.sync="replyToSend" placeholder="پاسخ"></custom-input>
                    <button class="purple-btn" @click="sendReply">ثبت پاسخ</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { computed, inject, onMounted, ref} from "@vue/composition-api"
import OrderItem from '../../Order/partials/OrderItem'
import Service from '../../../../utils/admin-service'
import CustomInput from "../../../Common/CustomInput"
export default {
    components:{
        OrderItem,
        CustomInput
    },
    setup(props,context){
        const items = ref(null)
        
        const products = ref(null)
        const authService = computed(()=>{
            return Service(true)
        })
        const global = inject('global')
        const reply = ref(null)
        const replyToSend = ref({value:null,valid:true})
        const getComment = () => {
            authService.value.receive('admin/comment/detail/' + context.root.$route.params.id, {} , (s,d)=>{
                products.value = d.data.order.original.data.product
                products.value.map((p)=>{
                    p.user_address = d.data.order.original.data.user_address
                    p.user_phone = d.data.order.original.data.user_phone
                })
                reply.value = d.data.reply
            },(s,e)=>{

            })
        }
        onMounted(()=>{
            getComment()
        })


        const sendReply = () => {
            let f = new FormData()
            f.append('message',replyToSend.value.value)
            if(replyToSend.value.value != null && replyToSend.value.value != ''){
                authService.value.transmit('admin/comment/reply/'+context.root.$route.params.id,f,(s,d)=>{
                    if(s == 200){
                        global.alertToggle('موفقیت آمیز بود!')
                        getComment()
                    }
                },(s,e)=>{
                    global.alertToggle('عملیات ناموفق!')
                })
            }
        }

        return {items,products,reply,replyToSend,sendReply}
    }
}
</script>
<style scoped>
.summary{
    background-color: #fff;
    font-size: 0.9rem;
    font-weight: lighter;
}

table{
    border-collapse: separate;
    border-spacing: 0px;
    width: 100%;
    table-layout: auto;
}

td{
    border: 1px solid rgba(127,127,127,0.2);
    padding-right: 1rem;
    text-align: center;
}

th{
    text-align: center;
    padding: 1rem ;
}

tr{
    width: 100%;
}

.big-cell{
    width: 75%;
    padding:0.5rem 1rem 0.5rem 1rem;
}

.small-cell{
    width: 25%;
    padding:0.5rem 1rem 0.5rem 1rem;
}

.accounts{
    border-top: 1px solid rgba(127,127,127,0.2);
}

.comment-reply{
    background-color: #ECE8E8;
    border-radius: 4px;
}

</style>