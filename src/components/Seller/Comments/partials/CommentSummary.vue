<template>


  <div>
    <v-col :cols="12">
<!--      <v-text-field style="background-color: #D1C4E9!important;" filled hide-details :v-model="replyText"-->
<!--                  placeholder="متن پاسخ"/>-->

      <custom-input style="background-color:  #D1C4E9!important;" kind="area"  placeholder="پاسخ فروشنده"
                    container="full-width" v-bind:theModel.sync="replyText"
                    classes="block full-width"></custom-input>

    </v-col>
    <v-col :cols="12">
      <v-btn v-if="status===`notAnswered`" style="float: left;margin-bottom: 10px" @click="reply" class="purple-btn ml-1">ارسال</v-btn>
      <div v-if="status===`Answered`" style="color: limegreen"><p>پاسخ داده شد</p></div>
    </v-col>
  </div>


</template>
<script>
import {ref} from "@vue/composition-api";
import CustomInput from "../../Common/CustomInput";

export default {
  props: ["theComment" ],
  data() {
    return {
      replyText: '',
      status:'notAnswered'
    }
  },
  components: {CustomInput},
  methods: {
    verifyMe: function (v) {
      this.$emit('verifyMe', {id: this.theComment.id, verify: v})
    },
    reply: function () {
      this.$emit('replyComment', {id: this.theComment.id, text: this.replyText})
      this.status= 'Answered'

    }
  },
  setup(props, context) {
    const replyText = ref({value:null,valid:true})
    return {replyText}
  }

};
</script>
<style scoped>
td {
  border: 1px solid rgba(127, 127, 127, 0.2);
  white-space: nowrap;
  width: 25%;
  padding: 0.5rem;
}

tr {
  width: 100%;
}

.order-locker img {
  width: 50%;
}

</style>