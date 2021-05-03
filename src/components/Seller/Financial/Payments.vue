<template>
    <v-row style="margin-top: 10px;">
      <v-col :cols="12" :sm="12" :md="6" :lg="6" >
        <v-card style="padding: 20px;">
          <v-row>
            <v-col>
              فروش محصولات
            </v-col>
            <v-col>

            </v-col>
          </v-row>
          <v-row>
            <v-col>
              هزینه ارسال
            </v-col>
            <v-col>

            </v-col>
          </v-row>
          <hr>
          <v-row>
            <v-col>
              جمع مبالغ واریزی
            </v-col>
            <v-col>

            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col :cols="12" :sm="12" :md="6" :lg="6">
        <v-card style="padding: 20px;">
          <v-row>
            <v-col>
              مبلغ تسویه نشده (طلب شما از گلپینو)
            </v-col>
            <v-col>

            </v-col>
          </v-row>
          <v-row>
            <v-col>
              مشاهده سفارشات تسویه نشده
            </v-col>

          </v-row>
          <hr>
          <v-row>
            <v-col>
              فرایند تسویه حساب شما چگونه است ؟
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
</template>
<script>
import payment from "./partials/payment"
import IconImage from "../Common/icon"
import {ref} from "@vue/composition-api"
import CustomInput from "../Common/CustomInput"
export default {
    components:{
        payment,
        IconImage,
        CustomInput
    },
    setup(){
        const model=ref("")
        return {model}
    }
}
</script>
<style scoped>
.payments{
    background-color: #fff;
    min-height: 80vh;
    font-weight: lighter;
}

h1,h2{
    font-size: 1rem;
    font-weight: normal;
}

table{
    width: 100%;
    margin-top: 20px;
}

th{
    padding:6px 2px 6px 2px;
    border-top: 1px solid rgba(127, 127, 127 , 0.4);
    border-bottom: 1px solid rgba(127, 127, 127 , 0.4);
    font-weight: normal;
    text-align: center;
}

.table-nav{
    text-align: left;
}

.page-btn{
    width: 25px;
    height: 25px;
    text-align: center;
    background-color: #fff;
    border: 1px solid #000;
    color: #000;
}

.page-btn:hover{
    background-color: #772CE8;
    color: #fff;
    cursor: pointer;
}

.nav-btn{
    background: none;
    border:nonde;
    border: none;
}

.nav-btn:hover{
    cursor: pointer;
}

.next{
    color: #772CE8;
}

.prev{
    color:rgba(127, 127, 127 , 0.7)
}
</style>
