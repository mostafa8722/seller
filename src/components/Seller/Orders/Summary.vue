<template>
  <div>
    <p class="mt-3" style="font-weight: bold">سفارشات</p>
    <div>
      <v-simple-table class=" desktopPro">
        <template v-slot:default>
          <thead>
          <tr>
            <th>
              آدرس
            </th>
            <th>
              شماره موبایل
            </th>
            <th>
              هزینه ارسال
            </th>
            <th>
              قابل پرداخت
            </th>
            <th>
              زمان سفارش
            </th>
            <th>
              وضعیت
            </th>
            <th>
              گزینه ها
            </th>
          </tr>
          </thead>
          <tbody>
          <an-order browser-size="desktop" @reviseOrder="reviseOrder" v-for="(order,i) in orders" :key="i"
                    :theOrder="order"></an-order>

          </tbody>
        </template>
      </v-simple-table>
      <div class="mobilePro">
        <order-summary-mobile-view browser-size="mobile" @reviseOrder="reviseOrder" v-for="(order,i) in orders" :key="i"
                                   :theOrder="order"/>
      </div>
    </div>
<!--    <v-btn @click="getLocalStorage">test</v-btn>-->
  </div>
</template>
<script>
import axios from "axios";
import Etiquette from './partials/etiquette'
import {ref, onMounted, watch, computed, reactive, inject} from "@vue/composition-api";
import Service from "../../../utils/seller-service"
import AnOrder from './partials/OrderSummary'
import OrderSummaryMobileView from "./partials/OrderSummaryMobileView";


export default {
  setup(props, context) {

    const orders = ref(null)
    const global = inject('global')

    const authService = computed(() => {
      return Service(true)
    })
    const theService = computed(() => {
      return Service(false)
    })


    const modifyOrders = () => {
      var moment = require('jalali-moment');
      orders.value.map((p) => {
        if (p.time) {
          p.time = moment(p.time.toString().substr(0, 10), 'YYYY-MM-DD').locale('fa').format('YYYY/MM/DD')

        }
      })

      global.state.value.seenOrders = orders.value.length

    }
    const getOrders = async () => {
      authService.value.receive('seller/order', {}, (s, d) => {
        if (s == 200) {
          orders.value = d.data
          modifyOrders()


        }

      }, (s, e) => {
        console.log("this is error", e)
      })
    }


    const getOrder = () => {
      console.log('id', 'test')
      authService.value.receive('seller/order/' + 1687, {}, (s, d) => {
        if (s == 200) {

          console.log(d.data)


        }

      }, (s, e) => {
        console.log("this is error", e)
      })
    }

    const updateLocalStorage = () => {
      localStorage.setItem('test', 'test')
    }
    const getLocalStorage = () => {
      var data = localStorage.getItem('test');
      console.log(data)
    }


    const reviseOrder = (order) => {
      let f = new FormData
      f.append('status', order.status)
      console.log(f.get('status'))
      authService.value.transmit('seller/order/' + order.id, f, (s, d) => {
            alert('تغییر وضعیت انجام شد')
          },
          (s, e) => {

          })
    }
    onMounted(() => {
      updateLocalStorage();
    })


    return {orders, reviseOrder, global, getOrders, modifyOrders, getOrder,getLocalStorage}
  },
  components: {
    OrderSummaryMobileView,
    Etiquette,
    AnOrder
  },
  mounted() {
    this.getOrders();
    // this.modifyOrders();
    // this.getOrder()
  }


}
</script>
<style scoped>


@media only screen and (max-width: 800px) {
  .desktopPro {
    display: none;
  }
}

@media only screen and (min-width: 800px) {
  .mobilePro {
    display: none;
  }
}

.summary {
  background-color: #fff;
  font-size: 0.9rem;
  font-weight: lighter;
  min-height: 50vh;
}

.search-section {
  border-bottom: 1px solid rgba(127, 127, 127, 0.2);
  padding-bottom: 0.5rem;
}

table {
  border-collapse: separate;
  border-spacing: 0px;
  width: 100%;
  table-layout: auto;
  text-align: center;
}

td {
  border: 1px solid rgba(127, 127, 127, 0.2);
  white-space: nowrap;
  padding-right: 1rem;
}

tr {
  width: 100%;
}

td {
  /*border: none!important;*/
  font-family: inherit !important;
  font-size: 12px !important;
  text-align: center !important;
  background-color: white !important;
}

th {
  border: none !important;
  font-family: inherit !important;
  font-size: 12px !important;
  text-align: right !important;
  background-color: white !important;
}

.big-cell {
  width: 75%;
  padding: 0.5rem 1rem 0.5rem 1rem;
}

.small-cell {
  width: 25%;
  padding: 0.5rem 1rem 0.5rem 1rem;
}
</style>