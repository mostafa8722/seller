<template>
    <div class=" p-5">
        <div class=" summary">
            <h3 class="tNormal">نظرات</h3>



          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-right">
                  نام
                </th>
                <th class="text-right">
                  متن نظر
                </th>
                <th class="text-right">تاریخ</th>
                <th class="text-right">گزینه ها</th>
              </tr>
              </thead>
              <tbody>
              <tr
                  v-for="item in comments"
                  :key="item.name"
              >
                <td style="white-space: normal">{{item.user}}</td>
                <td style="white-space: normal">{{item.message}}</td>
                <td style="white-space: normal">{{item.date}}</td>
                <comment-summary @reply="sendReply"  :the-comment="item"></comment-summary>
              </tr>
              </tbody>
            </template>
          </v-simple-table>



<!--            <table class="mt-2">-->
<!--                <tr>-->
<!--                    <th>نام</th>-->
<!--                    <th>متن نظر</th>-->
<!--                    <th>نام فروشگاه</th>-->
<!--                    <th>تاریخ</th>-->
<!--                    <th>گزینه ها</th>-->
<!--                </tr>-->
<!--                <comment-summary @verifyMe="verifyComment" v-for="(c,i) in comments" :key="i" :theComment="c"></comment-summary>-->
<!--            </table>-->
        </div>
    </div>
</template>
<script>
import { computed, inject, onMounted, ref} from "@vue/composition-api"
import Service from '../../../utils/seller-service'
import CustomInput from '../../Common/CustomInput'
import CommentSummary from "./partials/CommentSummary"
import jalalim from "jalali-moment"
export default {
    components:{
        CustomInput,
        CommentSummary
    },
    setup(){
        const theService = computed(()=>{
            return Service(false)
        })
      const authService = computed(() => {
        return Service(true)
      })
        const comments = ref(null)
        const global = inject('global')
        onMounted(()=>{
          authService.value.receive('seller/order/comment/all',{},(s,d)=>{
                comments.value = d.data
                comments.value.map((c)=>{
                    c.date = jalalim(c.created_at).locale('fa').format('YYYY/MM/DD')
                })
            },(s,e)=>{

            })
        })

      const sendReply = (t) => {
        let f = new FormData()
        f.append('message',t.text)
        theService.value.transmit('seller/order/comment/reply/'+t.id,f,(s,d)=>{
          global.alertToggle('موفقیت آمیز بود!')
        },(s,e)=>{

        })
      }


        return {comments,sendReply}
    },
  methods:{
    // verifyMe:function(v){
    //   this.$emit('verifyMe',{id:this.theComment.id,verify:v})
    // }
  }
}
</script>
<style scoped>
.summary{
    background-color: #fff;
    font-size: 0.9rem;
    font-weight: lighter;
    min-height: 50vh;
}

.search-section{
    border-bottom: 1px solid rgba(127,127,127,0.2);
    padding-bottom: 0.5rem;
}

table{
    border-collapse: separate;
    border-spacing: 0px;
    width: 100%;
    table-layout: auto;
    text-align: center;
}

td{
    border: 1px solid rgba(127,127,127,0.2);
    white-space: nowrap;
    padding-right: 1rem;
}

tr{
    width: 100%;
}

.big-cell{
    width: 75%;
    padding:0.5rem 1rem 0.5rem 1rem;
}

.small-cell{
    width: 25%;
    padding:0.5rem 1rem 0.5rem 1rem;
}
</style>