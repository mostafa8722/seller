<template>
  <div class="menu-section pb-4">

    <v-row>
      <v-col :cols="12" :md="6" :lg="6" :sm="12">
        <v-card>
          <div class="notif-prompt p-2"  v-if="orders.length > global.state.value.seenOrders-1"   >
            <icon-image address="/assets/site/images/seller-icons/attention.svg"></icon-image>
            <p class="mini-title">شما {{orders.length - global.state.value.seenOrders}}  سفارش جدید دارید</p>
            <a href="/seller/orders">مشاهده</a>
          </div>
        </v-card>
      </v-col>
      <v-col :cols="6" :md="3" :lg="3" :sm="6">


        <v-btn outlined color="#772CE8">
          <a style="color: #772CE8" href="tel:+900300400">
            تماس با پشتیبانی
          </a>
        </v-btn>

      </v-col>
      <v-col :cols="6" :md="3" :lg="3" :sm="6">
        <v-btn outlined color="#772CE8">
          <a style="color: #772CE8" href="tel:+900300400">
            مشاهده فروشگاه
          </a>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card style="height: 200px">

          <v-card-title>وضعیت محصولات</v-card-title>
          <div>
            تعداد محصولات موجود: {{ products.length }}
          </div>

          <div>
            تعداد محصولات ناموجود: {{ products.filter(item => item.remain === 0).length }}
          </div>

        </v-card>
      </v-col>
    </v-row>
    <!--     <div class="section-top container">-->


    <!--     </div>-->
    <!--     <div class="row container">-->
    <!--         <div class="col-md-6 col-lg-3 p-1">-->
    <!--             <stat title="عودت" value="1800" percent="11" icon="/assets/site/images/seller-icons/plus.svg"></stat>-->
    <!--         </div>-->
    <!--         <div class="col-md-6 col-lg-3 p-1">-->
    <!--             <stat title="عودت" value="1800" percent="11" icon="/assets/site/images/seller-icons/plus.svg"></stat>-->
    <!--         </div>-->
    <!--         <div class="col-md-6 col-lg-3 p-1">-->
    <!--             <stat title="عودت" value="1800" percent="11" icon="/assets/site/images/seller-icons/plus.svg"></stat>-->
    <!--         </div>-->
    <!--         <div class="col-md-6 col-lg-3 p-1">-->
    <!--             <stat title="عودت" value="1800" percent="11" icon="/assets/site/images/seller-icons/plus.svg"></stat>-->
    <!--         </div>-->
    <!--     </div>-->
    <!--     <div class="row container charts">-->
    <!--         <div class="col-md-12 p-1 col-lg-5 chart-col">-->
    <!--             <div class="a-chart">-->
    <!--                 <span><h6>فروش روزانه</h6></span>-->
    <!--                <div class="doughChart-container">-->
    <!--                    <doughnut-chart :chartData="data" :options="options"></doughnut-chart>-->
    <!--                </div>-->
    <!--                <span class="doughChart-stats">-->
    <!--                     <table>-->
    <!--                        <tr>-->
    <!--                            <th>فروش امروز</th>-->
    <!--                        </tr>-->
    <!--                        <tr>-->
    <!--                            <td>566000 تومان</td>-->
    <!--                        </tr>-->
    <!--                    </table>-->
    <!--                    <table>-->
    <!--                        <tr>-->
    <!--                            <th><p class="pt-5 m-0">مجموع محصول فروخته شده</p></th>-->
    <!--                        </tr>-->
    <!--                        <tr>-->
    <!--                            <td>188 گل</td>-->
    <!--                        </tr>-->
    <!--                    </table>-->
    <!--              </span>-->
    <!--             </div>-->
    <!--         </div>-->
    <!--         <div class="col-md-12 p-1 col-lg-7 chart-col">-->
    <!--             <div class="a-chart">-->
    <!--                <span class="d-flex justify-content-between mb-4">-->
    <!--                    <h6 class="mini-title">بررسی اجمالی سفارشات</h6>-->
    <!--                    <custom-input kind="dropDown" :selectItems="items" v-bind:theModel.sync="model"></custom-input>    -->
    <!--                </span>-->
    <!--                <div class="lineChart-container">-->
    <!--                    <line-chart :chartData="data" :options="options" height="150%"></line-chart>-->
    <!--                </div>-->
    <!--             </div>-->
    <!--         </div>-->
    <!--     </div>-->
    <!--     <div class="row container-fluid mt-1">-->
    <!--         <div class="col-lg-7 col-md-12 p-1 transactions">-->
    <!--             <div class="p-2 selling-stat">-->
    <!--                <div class="d-flex justify-content-between p-3">-->
    <!--                    <h6 class="mini-title">نقل و انتقالات</h6>-->
    <!--                    <icon-image address="/assets/site/images/seller-icons/three-dots.svg"></icon-image>-->
    <!--                </div>-->
    <!--                <table>    -->
    <!--                    <tr>-->
    <!--                        <th>شماره سفارش</th>-->
    <!--                        <th>بنام</th>-->
    <!--                        <th>تاریخ</th>-->
    <!--                        <th>مبلغ</th>-->
    <!--                        <th>وضعیت سفارش</th>-->
    <!--                    </tr>-->
    <!--                    <transaction></transaction>-->
    <!--                    <transaction></transaction>-->
    <!--                    <transaction></transaction>-->
    <!--                    <transaction></transaction>-->
    <!--                </table>-->
    <!--             </div>-->
    <!--         </div>-->
    <!--         <div class="col-lg-5 col-md-12 p-1 recents">-->
    <!--             <div class="p-2 selling-stat">-->
    <!--                <div class="d-flex justify-content-between p-3">-->
    <!--                    <h6 class="mini-title">خریدهای اخیر</h6>-->
    <!--                    <icon-image address="/assets/site/images/seller-icons/three-dots.svg"></icon-image>-->
    <!--                </div>-->
    <!--                <table>-->
    <!--                <tr>-->
    <!--                    <th>محصول</th>-->
    <!--                    <th>مشتری</th>-->
    <!--                    <th>دسته بندی</th>-->
    <!--                    <th>مبلغ</th>-->
    <!--                </tr>-->
    <!--                <recent></recent>-->
    <!--                <recent></recent>-->
    <!--                <recent></recent>-->
    <!--                <recent></recent>-->
    <!--                <recent></recent>-->
    <!--                </table>-->
    <!--             </div>-->
    <!--         </div>-->
    <!--     </div>-->
  </div>
</template>
<script>
import {ref, onMounted, watch, computed, inject} from "@vue/composition-api";
import Stat from './Partials/stat'
import CustomButton from '../Common/customButton'
import DoughnutChart from './Partials/DoughnutChart'
import IconImage from '../Common/icon'
import Transaction from './Partials/transaction'
import Recent from './Partials/recent'
import CustomInput from '../Common/CustomInput'
import LineChart from './Partials/LineChart.vue'
import Service from "../../../utils/seller-service";
import axios from "axios";
import global from "../../../state/global";

export default {
  components: {
    Stat,
    CustomButton,
    DoughnutChart,
    Transaction,
    Recent,
    CustomInput,
    IconImage,
    LineChart
  },
  setup() {
    function callSupport() {
      // CALL SUPPORT HERE
      console.log("call support")
      this.$emit('newOrder')
    }

    // const items = [{text: 'ماهانه', value: 'ماهانه'}, {text: 'سالانه', value: 'سالانه'}, {
    //   text: 'روزانه',
    //   value: 'روزانه'
    // }, {text: 'text2', value: 'value2'}, {text: 'text2', value: 'value2'}, {text: 'text2', value: 'value2'}]
    // const model = ref("ماهانه")
    // watch(model, (newValue, oldValue) => {
    //   change()
    // })
    // const data = ref({
    //   datasets: [{
    //     data: [10, 20, 30],
    //     backgroundColor: [
    //       'rgba(255, 99, 132, 0.2)',
    //       'rgba(54, 162, 235, 0.2)',
    //       'rgba(255, 206, 86, 0.2)'
    //     ]
    //   }],
    //   labels: [
    //     'Red',
    //     'Yellow',
    //     'Blue'
    //   ]
    // });
    // function change() {
    //   data.value = {
    //     datasets: [{
    //       data: [25, 5, 35],
    //     }],
    //     labels: [
    //       'Red',
    //       'Yellow',
    //       'Blue'
    //     ],
    //     color: [
    //       'red',
    //       'yellow',
    //       'blue'
    //     ]
    //   }
    // }
    // const options = {
    //   legend: {position: 'bottom'},
    //   responsive: true
    // };
    // const style = {
    //   height: `10px`,
    //   position: 'relative'
    // }





    const authService = computed(() => {
      return Service(true)
    })
    const products = ref(null)
    const orders = ref(null)
    const global = inject('global')





    const getProducts = () => {
      authService.value.receive('seller/product', {}, (s, d) => {
        if (s == 200)
          products.value = d.data
      }, (s, e) => {
      })
    }
    onMounted(() => {

      authService.value.receive('seller/order', {}, (s, d) => {
        if (s == 200) {
          orders.value = d.data
        }

      }, (s, e) => {
        console.log("this is error", e)
      })


      // getOrders()
      getProducts()
      // unseenProducts.value = orders.length - global.state.value.seenOrders


    })
    return {products,orders,global}
  }
}
</script>
<style scoped>
.notif-prompt {
  background-color: rgba(255, 158, 12, .22);
  width: 100%;
  display: block;
  border-radius: 6px;
}

.notif-prompt a {
  color: #772CE8;
  margin: 0px;
  width: 100px;
  float: left;
}

.support-button {
  border: 1px solid #772CE8;
  color: #772CE8;
  background: none;
  font-size: 0.75rem;
  font-weight: lighter;
}

.section-title {
  font-weight: lighter;
  display: inline-block;
}

.chart-col {
  position: relative;
  height: 50vh;
}

.doughChart-container {
  width: 65% !important;
  max-height: 70% !important;
}

.doughChart-stats {
  position: absolute;
  width: 40%;
  left: 0px;
  top: 25%;
  font-size: 0.75rem;
}

.a-chart {
  background-color: #fff;
  padding: 14px 22px 4px 22px;
  width: 100%;
  height: 100%;
}

.lineChart-container {
  height: 90% !important;
}

.transactions {
  padding-right: 2px;
  font-size: 0.9rem;
}

.transactions div {
  background-color: #fff;
}

.recents {
  padding-left: 2px;
  font-size: 0.8rem;
}

.recents div {
  background-color: #fff;
}

.selling-stat {
  height: 40vh;
  overflow: scroll;
  padding-bottom: 15px;
}

table {
  margin: 0px !important;
}

th {
  padding: 0px 12px 0px 0px;
  margin: 0px 4px 0px 0px;
}

td {
  padding: 0px 12px 0px 0px;
}

.row {
  margin-left: 0px !important;
  margin-right: 0px !important;
}
</style>