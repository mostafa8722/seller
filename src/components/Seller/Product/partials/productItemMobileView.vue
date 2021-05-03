<template>
  <v-card class="productCard container" v-if="browserSize===`mobile`">
    <div class="row" style="height: 100%;">
      <div class="col-4 proCol">
        <img class="item-picture"
             :src="(theProduct.image != null ? theProduct.image : '/assets/site/images/express.png')" alt="picture">
      </div>
      <div class="col-8">
        {{ theProduct.name }}<br>
        قیمت:
        {{ theProduct.price }}<br>
        قیمت با تخفیف:
        {{ (theProduct.price - theProduct.price * theProduct.discount / 100) }} تومان <br>
        <v-row>
          <v-col>
            <image-icon address="/assets/site/images/seller-icons/red-trash.svg" :clickable="true" @iconClicked="deleteMe"
                        classes="mid mr-3 actionIcon"> </image-icon>
          </v-col>
          <v-col>
            <image-icon address="/assets/site/images/seller-icons/purple-pen.svg" :clickable="true" @iconClicked="editMe"
                        classes="mid mr-3 actionIcon">
            </image-icon>
          </v-col>
          <v-col>
            <div>
              <switches text-enabled="موجود" text-disabled="ناموجود" theme="bulma" color="default" v-model="enabled"></switches>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
  </v-card>
</template>

<script>

import ImageIcon from "../../../Common/icon";
import Switches from 'vue-switches';

export default {
  name: "productItemMobileView",
  props: ['theProduct', 'browserSize'],
  components: {
    ImageIcon,
    Switches
  },
  methods: {
    deleteMe: function () {
      this.$emit('deleteMe', this.theProduct.id)
    },
    editMe: function () {
      this.$router.push('/seller/product/' + this.theProduct.id)
    }
  }
}
</script>

<style scoped>
.item-picture {
  width: 100%;
}

.productCard {
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

.proCol {
  align-self: center;
  padding-right: 0px !important;
  padding-left: 0px !important;

}
</style>