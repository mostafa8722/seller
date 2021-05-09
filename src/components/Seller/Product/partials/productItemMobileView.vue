<template>
  <div class="productCard container" v-if="browserSize===`mobile`" elevation="0">

    <div class="row" style="height: 100%;">
      <div class="col-4 proCol">
        <img class="item-picture"
             :src="(theProduct.image != null ? theProduct.image : '/assets/site/images/express.png')" alt="picture">
      </div>
      <div class="col-8">
        <v-row>
          <v-col cols="7">
            <span style="font-weight: initial">{{ theProduct.name }}</span><br>
          </v-col>
          <v-col cols="2">
            <span v-if="enabled" style="color: limegreen">موجود</span>
            <span v-else style="color: red">ناموجود</span>
          </v-col>
          <v-col @click="changeRemain" cols="2">
            <!--           text-enabled="موجود" text-disabled="ناموجود"-->
            <switches theme="bulma" color="default" v-model="enabled"></switches>
          </v-col>
        </v-row>
        <span style="font-weight: initial;" >
          {{
            (theProduct.price - theProduct.price * theProduct.discount / 100).toFixed(2)
          }}تومان</span>
        <span style="text-decoration: line-through;" >{{ theProduct.price }}تومان</span>


<br>
<!--        <v-row>-->
<!--          <v-col>-->
<!--            <span>توضیحات</span>-->
<!--          </v-col>-->
<!--        </v-row>-->
<!--        <v-row >-->
<!--          <v-col v-if="theProduct.desc !== null">-->
<!--            {{theProduct.desc}}-->
<!--          </v-col>-->
<!--        </v-row>-->

<!--          <v-col>-->
<!--            <image-icon address="/assets/site/images/seller-icons/red-trash.svg" :clickable="true"-->
<!--                        @iconClicked="deleteMe"-->
<!--                        classes="mid mr-3 actionIcon"></image-icon>-->
<!--          </v-col>-->
<!--          <v-col>-->
<!--            <image-icon address="/assets/site/images/seller-icons/purple-pen.svg" :clickable="true"-->
<!--                        @iconClicked="editMe"-->
<!--                        classes="mid mr-3 actionIcon">-->
<!--            </image-icon>-->
<!--          </v-col>-->

<!--        </v-row>-->
      </div>
    </div>
    <hr>
  </div>
</template>

<script>

import ImageIcon from "../../../Common/icon";
import Switches from 'vue-switches';
import Discount from "../../../Main/Layout/Discount";
import Service from "../../../../utils/seller-service";

export default {
  name: "productItemMobileView",
  props: ['theProduct', 'browserSize'],
  components: {
    Discount,
    ImageIcon,
    Switches
  },
  methods: {
    deleteMe: function () {
      this.$emit('deleteMe', this.theProduct.id)
    },
    editMe: function () {
      this.$router.push('/seller/product/' + this.theProduct.id)
    },
    changeRemain() {


      let f = new FormData()
      if (this.enabled) {
        f.append('remain', 0)
      }
      this.authService.transmit('seller/product/' + this.theProduct.id, f, () => {
        alert("تغییرات ثبت شد")
      }, (s, er) => {
        console.log({er})
      })


    },
    getProduct(id) {
      this.authService.receive('seller/product/' + id, {}, (s, d) => {

            console.log(d.data)
            this.focusedProduct = d.data.product
          }
          , (s, e) => {
            console.log("this is error", e)
          })
    }
  },
  mounted() {


    if (this.theProduct.remain > 0) {
      this.enabled = true
    } else {
      this.enabled = false
    }
  },
  data() {
    return {
      myOptions: {
        layout: {
          color: 'black',
          backgroundColor: 'lightgray',
          selectedColor: 'white',
          selectedBackgroundColor: 'green',
          borderColor: 'black',
          fontWeight: 'normal',
          fontWeightSelected: 'bold',
          squareCorners: false,
          noBorder: false
        },

        items: {
          delay: .4,
          preSelected: 'unknown',
          disabled: false,
          labels: [
            {name: 'ناموجود', color: 'white', backgroundColor: 'red'},
            {name: 'موجود', color: 'white', backgroundColor: 'green'}
          ]
        }
      },
      enabled: true,
      focusedProduct: {}
    }
  },
  computed: {
    authService() {
      return Service(true)
    }
  }
}
</script>
<style>
.vue-switcher-theme--bulma.vue-switcher-color--default div {
  background-color: limegreen;
}
.vue-switcher-theme--bulma.vue-switcher-color--default.vue-switcher--unchecked div {
  background-color: #e8e8e8;
}
</style>
<style scoped>
.item-picture {
  width: 100%;
}

.productCard {
  background-color: white;
  /*margin-bottom: 10px;*/
  /*height: 100px;*/
  /*margin-bottom: 20px;*/
  /*margin-top: 20px;*/
}

.actionIcon {
  width: 20px;
  height: 20px;
  margin-top: 20px;
}

.proCol {
  align-self: center;
  padding-right: 0px !important;
  padding-left: 0px !important;

}
</style>