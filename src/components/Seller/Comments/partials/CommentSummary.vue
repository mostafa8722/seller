<template>

    <td>

      <v-row>
        <v-col>
          <button @click="()=>verifyMe(true)" class="green-btn ml-1">تآیید</button>
        </v-col>
        <v-col>
          <button @click="()=>verifyMe(false)" class="red-btn ml-1">رد</button>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-textarea :value="replyText" placeholder="متن پاسخ" />
        </v-col>
        <v-col>
          <button @click="()=>reply" class="gray-btn ml-1">ارسال پاسخ</button>
        </v-col>
      </v-row>



    </td>

</template>
<script>
import { ref } from "@vue/composition-api";
export default {
  props: ["theComment"],
  data() {
    return{
      replyText:null
    }
},
  components:{
    
  },
  methods:{
    verifyMe:function(v){
      this.$emit('verifyMe',{id:this.theComment.id,verify:v})
    },
    reply:function(){
      this.$emit('replyComment',{id:this.theComment.id,text : this.replyText})
    }
  }
};
</script>
<style scoped>
td {
  border: 1px solid rgba(127, 127, 127, 0.2);
  white-space: nowrap;
  width:25%;
  padding: 0.5rem;
}

tr {
  width: 100%;
}

.order-locker img{
    width: 50%;
}

</style>