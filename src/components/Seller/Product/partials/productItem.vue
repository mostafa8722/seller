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
          <image-icon address="/assets/site/images/seller-icons/purple-pen.svg" :clickable="true" @iconClicked="editMe"
                      classes="mid mr-3">
          </image-icon>
        </v-col>
        <v-col>
          <span v-if="enabled" style="color: limegreen">موجود</span>
          <span v-else style="color: red">ناموجود</span>
        </v-col>
        <v-col @click="changeRemain" cols="2">
          <switches theme="bulma" color="default" v-model="enabled"></switches>
        </v-col>
      </v-row>


    </td>
  </tr>


</template>
<script>
import ImageIcon from '../../../Common/icon'
import Switches from 'vue-switches';
import Service from "../../../../utils/seller-service";
var moment = require('jalali-moment');

export default {
  props: ['theProduct', 'browserSize'],
  components: {
    ImageIcon,
    Switches
  },
  methods: {
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
    if (this.theProduct.remain > 0) {
      this.enabled = true
    } else {
      this.enabled = false
    }
  },
  computed: {
    authService() {
      return Service(true)
    }
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