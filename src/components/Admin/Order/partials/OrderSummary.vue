<template>
  <tr class="product">
    <td class="small-cell">{{theOrder.id}}</td>
    <td class="small-cell">{{theOrder.seller_name}}</td>
    <td class="mid-cell"><p>{{theOrder.address}}</p></td>
    <td class="small-cell">{{theOrder.user_phone}}</td>
    <!-- <td>{{theOrder.amount}}</td>
    <td>{{theOrder.discount}}</td> -->
    <td class="small-cell">{{theOrder.delivery_cost}}</td>
    <td class="small-cell">{{theOrder.payable}}</td>
    <td class="small-cell"><Etiquette :status="parseInt(theOrder.status)"></Etiquette></td>
    <td class="large-cell"><button @click="reviseOrder" class="purple-btn ml-2">ثبت وضعیت</button><custom-input placeholder="انتخاب وضعیت" inputClass="tNormal" labelClass="tLighter" kind="dropDown" container="half-width" v-bind:theModel.sync="status" :selectItems="stati" classes="no-border light-facade"></custom-input></td>
    <td class="small-cell"><router-link :to="{name:'Golpino Admin Order Page' , params:{id:theOrder.id}}"><button class="purple-btn ml-2">مشاهده سفارش</button></router-link></td>
  </tr>
</template>
<script>
import { ref } from "@vue/composition-api"
import Etiquette from './etiquette'
import CustomInput from '../../../Common/CustomInput'
export default {
  props: ["theOrder"],
  components:{
    Etiquette,
    CustomInput
  },
  data:()=>({
    status:{value:null,valid:true},
    stati:[{value:1,text:'پرداخت شده'},
      {value:2,text:'قبول شده'},
      {value:3,text:'رد شده'},
      {value:4,text:'در حال آماده سازی'},
      {value:5,text:'در حال ارسال'},
      {value:6,text:'تحویل داده شده'}
    ]
  }),
  methods:{
    reviseOrder:function(){
      this.$emit('reviseOrder',{id:this.theOrder.id,status:this.status.value.value})
    }
  }
};
</script>
<style scoped>
td {
  border: 1px solid rgba(127, 127, 127, 0.2);
  white-space: nowrap;
  padding: 0.5rem;
}

tr {
  width: 100%;
}

.order-locker img{
    width: 50%;
}

.small-cell{
  width: 5%;
}

.mid-cell{
  width:12vw;
}

.mid-cell p{
  white-space: pre-wrap;
  overflow: hidden;
}

.large-cell{
  width: 23%;
}

</style>