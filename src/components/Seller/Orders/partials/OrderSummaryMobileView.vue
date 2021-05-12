<template>
  <div class="productCard container"  v-if="browserSize===`mobile`" style="background-color: #F5F5F5">
    <v-card elevation="2"  style="height: 100%; margin: 5px;padding: 25px">

      <v-row>
        <v-col cols="6">
          آدرس:
          {{theOrder.address}}
        </v-col>
<!--        <v-col cols="6">-->
<!--          <router-link style="float: left" :to="{name:'Golpino Seller Order Page' , params:{id:theOrder.id}}"><button class="purple-btn ml-2">مشاهده سفارش</button></router-link>-->
<!--        </v-col>-->


      </v-row>
      <v-row>
        <v-col >
          شماره موبایل:
          {{theOrder.user_mobile}}
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          زمان سفارش:
        </v-col>
        <v-col>

          {{theOrder.time}}
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          قابل پرداخت :
          {{theOrder.payable}}
        </v-col>
        <v-col>
          هزینه ارسال:
          {{theOrder.delivery_cost}}
        </v-col>
      </v-row>
      <v-row>
        <v-col style="align-self: flex-end;" :cols="3">
          <Etiquette :status="parseInt(theOrder.status)"></Etiquette>
        </v-col>
        <v-col>
          <custom-input placeholder="انتخاب وضعیت" inputClass="tNormal" labelClass="tLighter" kind="dropDown" container="half-width" v-bind:theModel.sync="status" :selectItems="stati" classes="no-border light-facade"></custom-input>
          <v-btn outlined  @click="reviseOrder" >ثبت وضعیت</v-btn>

        </v-col>
      </v-row>

    </v-card>
  </div>
</template>

<script>
import Etiquette from "./etiquette";
import CustomInput from "../../../Common/CustomInput";
import jalalim from "jalali-moment";

export default {
  name: "OrderSummaryMobileView",
  props: ['theOrder','browserSize'],
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
  },
  computed:{
    theDate:function(){
      return jalalim(this.theOrder.pay_time).locale('fa').format('YY/MM/DD')
    }
  }
}
</script>

<style scoped>
.item-picture{
  width: 100%;
}
.productCard{
  background-color: white;
  /*height: 100px;*/
  /*margin-bottom: 20px;*/
  /*margin-top: 20px;*/
}
.actionIcon {
  width: 20px;
  height: 20px;
  margin-top: 20px;
}
.proCol{
  align-self: center;
  padding-right: 0px!important;
  padding-left: 0px!important;

}
</style>