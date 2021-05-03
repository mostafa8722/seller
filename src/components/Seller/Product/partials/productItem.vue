<template>
  <tr v-if="browserSize===`desktop`">
    <td>
      <div class="item-locker"><img class="item-picture"
                                    :src="(theProduct.image != null ? theProduct.image : '/assets/site/images/express.png')"
                                    alt="picture"></div>
    </td>
    <td>{{ theProduct.name }}</td>
    <td>{{ theProduct.category_name }}</td>
    <td>{{ theProduct.price }}</td>
    <td>{{ (theProduct.price - theProduct.price * theProduct.discount / 100).toFixed(3) }} تومان<span class="discount">{{
        theProduct.discount
      }}</span>
    </td>
    <td>{{ theProduct.remain }}</td>
    <td>{{ theProduct.created_at  }}</td>
    <td>
      <v-row>
        <v-col>
          <image-icon address="/assets/site/images/seller-icons/red-trash.svg" :clickable="true" @iconClicked="deleteMe"
                      classes="mid mr-3">
          </image-icon>
        </v-col>
        <v-col>
          <image-icon address="/assets/site/images/seller-icons/purple-pen.svg" :clickable="true" @iconClicked="editMe"
                      classes="mid mr-3">
          </image-icon>
        </v-col>
        <div>
          <switches text-enabled="موجود" text-disabled="ناموجود" theme="bulma" color="default" v-model="enabled"></switches>
        </div>
      </v-row>


    </td>
  </tr>


</template>
<script>
import ImageIcon from '../../../Common/icon'
import Switches from 'vue-switches';
var moment = require('jalali-moment');

export default {
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
      enabled: true
    }
  },
  mounted() {
    var moment = require('jalali-moment');
    console.log(moment('1989-01-24', 'YYYY-MM-DD').locale('fa').format('YYYY/MM/DD'))
  }
}
</script>
<style scoped>


.item-locker {
  width: 40%;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: -2px 2px 8px 0px rgba(127, 127, 127, .2);
}

.item-picture {
  width: 100%;
}

.discount {
  background-color: rgba(127, 127, 127, .8);
  color: #fff;
  padding: 3px;
  border-radius: 5px;
  margin-right: 5px;
}

tr {
  width: 100%;
  border-bottom: 1px solid rgba(127, 127, 127, .2);
}

td {
  width: 12.5%;
  padding: 20px 0px 20px 0px;
}

</style>
<style>
.toggle-switch li label {
  border: 1px solid;
  border-top-left-radius: 5px;
  font-size: 12px !important;
  border-bottom-left-radius: 5px;
  height: 35px !important;
  background-color: white;
}

.toggle-switch {
  direction: ltr;
  width: 100px !important;
  background-color: white;
}

.toggle-switch li label {
  border: 1px solid;
  border-top-left-radius: 0px;
  font-size: 12px !important;
  border-bottom-left-radius: 0px;
  height: 35px !important;

}
</style>