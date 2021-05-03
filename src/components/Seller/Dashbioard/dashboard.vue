<template>
  <div class="menu-section pb-4">
    <v-snackbar top color="#AB47BC"
        v-model="snackbar"
                timeout="1000"
    >
      شما یک سفارش جدید دارید

      <template v-slot:action="{ attrs }">
        <v-btn
            color="pink"
            text
            v-bind="attrs"
            @click="snackbar = false"
        >
          مشاهده
        </v-btn>
      </template>
    </v-snackbar>
    <v-row>
      <!--      <v-col :cols="12" :md="6" :lg="6" :sm="12">-->
      <!--        <v-card>-->
      <!--          <div class="notif-prompt p-2"  v-if="orders.length > global.state.value.seenOrders-1"   >-->
      <!--            <icon-image address="/assets/site/images/seller-icons/attention.svg"></icon-image>-->
      <!--            <p class="mini-title">شما {{orders.length - global.state.value.seenOrders}}  سفارش جدید دارید</p>-->
      <!--            <a href="/seller/orders">مشاهده</a>-->
      <!--          </div>-->
      <!--        </v-card>-->
      <!--      </v-col>-->
      <v-col cols="4">


        <v-btn width="130px" depressed color="#772CE8">
          <svg style="width:20px;height:20px;color: white" viewBox="0 0 24 24">
            <path fill="currentColor"
                  d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/>
          </svg>
          <a style="color: white;font-size: 10px" href="tel:+900300400">
            تماس با پشتیبانی
          </a>
        </v-btn>

      </v-col>
      <v-col cols="4">
        <v-btn width="130px" depressed color="#772CE8">
          <svg style="width:20px;height:20px;color: white" viewBox="0 0 24 24">
            <path fill="currentColor"
                  d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z"/>
          </svg>
          <a style="color: white;font-size: 10px" :href="`/shop/` +global.user.value.sellerId">
            مشاهده فروشگاه
          </a>
        </v-btn>
      </v-col>
      <v-col cols="4">
        <v-btn width="130px" depressed color="#772CE8">
          <svg style="width:20px;height:20px;color: white" viewBox="0 0 24 24">
            <path fill="currentColor"
                  d="M17,13H13V17H11V13H7V11H11V7H13V11H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z"/>
          </svg>
          <a style="color: white;font-size: 10px" :href="`/seller/product`">
            محصول اضافه کنید
          </a>
        </v-btn>
      </v-col>
    </v-row>






    <v-row>
      <v-col :cols="12" :md="4" :lg="4" :sm="12">
        <v-card style="height: 200px">

          <v-card-title>وضعیت سفارشات</v-card-title>

          <table>

            <tr>
              <th>امروز</th>
              <th>یک هفته اخیر</th>
              <th>یک ماه اخیر</th>
            </tr>
            <tr>
              <td>...</td>
              <td>{{lastWeekOrders.length}}</td>
              <td>...</td>
            </tr>

          </table>

        </v-card>
      </v-col>
      <v-col :cols="12" :md="4" :lg="4" :sm="12">
        <v-card style="height: 200px">

          <v-card-title>وضعیت محصولات</v-card-title>

          <table>

            <tr>
              <th>موجود</th>
              <th>ناموجود</th>
            </tr>
            <tr>
              <td>{{ products.length }}</td>
              <td>{{ products.filter(item => item.remain === 0).length }}</td>
            </tr>

          </table>

        </v-card>
      </v-col>
      <v-col :cols="12" :md="4" :lg="4" :sm="12">
        <v-card style="height: 200px">

          <v-card-title>وضعیت مالی</v-card-title>
          <table>

            <tr>
              <th>کل فروش</th>
              <th>پرداخت شده</th>
            </tr>
            <tr>
              <td>...</td>
              <td>...</td>
            </tr>

          </table>


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
    const todayOrders = ref(null)
    const lastWeekOrders = ref(null)
    const lastMonthOrders = ref(null)
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
      var date1 = new Date("06/30/2019");
      var today = new Date();
      var Difference_In_Time = today.getTime() - date1.getTime();
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      console.log(Difference_In_Days)

      authService.value.receive('seller/order', {}, (s, d) => {
        if (s == 200) {
          orders.value = d.data

          lastWeekOrders.value =[]
          var moment = require('jalali-moment');
          orders.value.map((p) => {
            p.time2 = moment(p.time.toString().substr(0, 10), 'YYYY-MM-DD').format('MM/DD/YYYY')
            var orderTime = new Date(p.time2)
            var today = new Date();
            var Difference_In_Time = today.getTime() - orderTime.getTime();
            var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
            console.log(today)
            console.log(orderTime)
            console.log(Difference_In_Days)

            if (Difference_In_Days < 7 ) {
              lastWeekOrders.value.push(p)
            }
            if (Difference_In_Days > 7 && Difference_In_Days <30) {
              lastMonthOrders.value.push(p)
            }

          })

        }

      }, (s, e) => {
        console.log("this is error", e)
      })

      authService.value.receive('seller/base', {}, (s, d) => {
        if (s == 200) {
            global.user.value.name = d.data.name

          if (d.data.status != 4) {
            this.verified = false
          }
        }
      }, (s, e) => {
      })
      // getOrders()
      getProducts()
      // unseenProducts.value = orders.length - global.state.value.seenOrders


    })
    return {products, orders, global,lastWeekOrders}
  },
  data() {
    return {
      snackbar: true,

    }
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


.row {
  margin-left: 0px !important;
  margin-right: 0px !important;
}
table {
  border-collapse: collapse;
  width: 80%;
  margin: auto;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>