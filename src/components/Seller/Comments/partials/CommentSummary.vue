<template>


      <div>
        <v-col :cols="12">
          <v-textarea style="background-color: #D1C4E9!important;" filled hide-details  :value="replyText" placeholder="متن پاسخ" />
        </v-col>
        <v-col :cols="12">
          <button style="float: left;margin-bottom: 10px" @click="()=>reply" class="purple-btn ml-1">ارسال </button>
        </v-col>
      </div>



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