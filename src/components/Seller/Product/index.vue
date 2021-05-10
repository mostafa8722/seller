<template>
  <div class="container products-page pt-4" @resize="console.log('test')">
    <p class="mt-3" style="font-weight: bold">محصولات</p>
    <div class="d-flex justify-content-between">

    </div>
    <div style="overflow: hidden!important;position: fixed!important;bottom: 100px!important;width: fit-content!important;z-index: 200!important;left: 20px!important;border-radius: 30px!important;">
      <router-link :to="{name:'Golpino Seller Product Form'}">
        <custom-button classes="add-button" icon="/assets/site/images/seller-icons/white-plus.svg"
                       label="افزودن محصول"></custom-button>
      </router-link>
    </div>
    <v-row style="margin-top: 20px;">

      <v-col>
        تعداد محصولات موجود: {{ products.length }}
      </v-col>
      <v-col>
        تعداد محصولات ناموجود: {{ products.filter(item => item.remain === 0).length }}
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="10" :sm="6" :md="6" :lg="6">
        <v-text-field v-model="searchTerm" placeholder="جستجوی محصولات"/>
      </v-col>
    </v-row>

    <div class="products mt-2">
      <div class="product-tools d-flex justify-content-between">
        <div class="mini-title">


          <!--                <custom-input placeholder="جستجوی محصول" icon="/assets/site/images/seller-icons/search.svg" kind="text" v-bind:theModel.sync="model"></custom-input>                -->
        </div>
<!--        <div class="mini-title">-->
<!--          <p class="mini-title">-->
<!--            نمایش 1 تا 10 از 100 محصول-->
<!--          </p>-->
<!--          <custom-button classes="list-nav-button" icon="/assets/site/images/seller-icons/right-arrow.svg"-->
<!--                         iconSize="mid"></custom-button>-->
<!--          <custom-button classes="list-nav-button" icon="/assets/site/images/seller-icons/left-arrow.svg"-->
<!--                         iconSize="mid"></custom-button>-->
<!--        </div>-->
      </div>
      <div class="products-table mt-2 desktopPro">
        <table>
          <tr>
            <th>تصویر
              <icon-image address="/assets/site/images/seller-icons/arrow-up.svg" classes="mid"></icon-image>
              <icon-image address="/assets/site/images/seller-icons/arrow-down.svg" classes="mid"></icon-image>
            </th>
            <th>نام محصول
              <icon-image address="/assets/site/images/seller-icons/arrow-up.svg" classes="mid"></icon-image>
              <icon-image address="/assets/site/images/seller-icons/arrow-down.svg" classes="mid"></icon-image>
            </th>
            <th>دسته بندی
              <icon-image address="/assets/site/images/seller-icons/arrow-up.svg" classes="mid"></icon-image>
              <icon-image address="/assets/site/images/seller-icons/arrow-down.svg" classes="mid"></icon-image>
            </th>
            <th>قیمت
              <icon-image address="/assets/site/images/seller-icons/arrow-up.svg" classes="mid"></icon-image>
              <icon-image address="/assets/site/images/seller-icons/arrow-down.svg" classes="mid"></icon-image>
            </th>
            <th>قیمت با تخفیف
              <icon-image address="/assets/site/images/seller-icons/arrow-up.svg" classes="mid"></icon-image>
              <icon-image address="/assets/site/images/seller-icons/arrow-down.svg" classes="mid"></icon-image>
            </th>
            <th>تعداد
              <icon-image address="/assets/site/images/seller-icons/arrow-up.svg" classes="mid"></icon-image>
              <icon-image address="/assets/site/images/seller-icons/arrow-down.svg" classes="mid"></icon-image>
            </th>
            <th>تاریخ
              <icon-image address="/assets/site/images/seller-icons/arrow-up.svg" classes="mid"></icon-image>
              <icon-image address="/assets/site/images/seller-icons/arrow-down.svg" classes="mid"></icon-image>
            </th>
            <th>اقدامات
              <icon-image address="/assets/site/images/seller-icons/arrow-up.svg" classes="mid"></icon-image>
              <icon-image address="/assets/site/images/seller-icons/arrow-down.svg" classes="mid"></icon-image>
            </th>
          </tr>
          <product-item browser-size="desktop"  v-for="(p,i) in products.filter(product => {
        return product.name.toLowerCase().includes(this.searchTerm);
      })" :key="i" :theProduct="p"></product-item>
        </table>
      </div>
      <div class="mobilePro">
        <product-item-mobile-view browser-size="mobile"  v-for="(p,i) in products.filter(product => {
        return product.name.toLowerCase().includes(this.searchTerm);
      })" :key="i"
                                  :theProduct="p"/>
      </div>


    </div>

  </div>
</template>
<script>
import {ref, onMounted, computed} from "@vue/composition-api";
import CustomButton from '../Common/customButton'
import IconImage from '../Common/icon'
import CustomInput from '../Common/CustomInput'
import ProductItem from './partials/productItem'
import Service from "../../../utils/seller-service"
import ProductItemMobileView from "./partials/productItemMobileView";


export default {

  data: () => ({
    searchTerm: ''
  }),

  components: {
    ProductItemMobileView,
    CustomButton,
    CustomInput,
    IconImage,
    ProductItem
  },
  created() {
    console.log(this.products)
    // this.browserWidth = window.innerWidth
  },
  setup() {
    onMounted(() => {
      getProducts()
    })

    const authService = computed(() => {
      return Service(true)
    })
    const products = ref(null)

    const getProducts = () => {
      authService.value.receive('seller/product', {}, (s, d) => {
        if (s == 200)
          products.value = d.data
          var moment = require('jalali-moment');
          products.value.map((p) => {
            p.created_at = moment(p.created_at.toString().substr(0, 10), 'YYYY-MM-DD').locale('fa').format('YYYY/MM/DD')
          })




      }, (s, e) => {
      })
    }
    const model = ref(null)

    const deleteProduct = (id) => {
      authService.value.remove('seller/product/' + id, {}, (s, d) => {
        if (s == 200)
          getProducts()
      }, (s, e) => {

      })
    }


    return {products, model, deleteProduct}
  },
}
</script>
<style scoped>


@media only screen and (max-width: 800px) {

  .desktopPro {
    display: none;
  }

  .products {
    background-color: transparent;
  }

}

@media only screen and (min-width: 800px) {
  .mobilePro {
    display: none;
  }

  .desktopPro {
    /*display: none;*/
    width: 96%;
  }

  .products {
    background-color: white;
  }

}


.listHeader {
  /*width: 600px;*/
  /*text-align: -webkit-center;*/
}


.products-page {
  font-weight: lighter;
  font-size: 0.8rem;
}

h2 {
  font-weight: lighter;
  font-size: 1.2rem;
}

.list-nav-button {
  border: none;
}


.products {

  padding: 12px 18px 0px 18px;
}

.product-table {
  width: 100%;
}

table {
  border-collapse: collapse;
  border-spacing: 20px 10px;
  width: 100%;
  font-size: 0.75rem;
}


th {
  /* background-color: #c8c8c8; */
  cursor: pointer;
}

td, th {
  border: none!important;
  font-family: inherit!important;
  font-size: 12px!important;
  text-align: center!important;
  background-color: white!important;
}
</style>