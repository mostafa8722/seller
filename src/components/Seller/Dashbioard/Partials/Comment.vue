<template>
  <div class="a-comment pt-3 pb-3">
    <div class="user">
        <div class="mini-title user-locker">
            <rounded-image
            src="/assets/site/images/popular.png"
            kind="big"
            ></rounded-image>
        </div>
        <div class="mini-title user-detail">
            <p class="user-user">محمد نقوی</p>
            <p>13 تیر 1398</p>
            <div class="mini-title">
            <image-icon
            v-for="i in [1, 2, 3, 4, 5]"
            :key="i"
            :address="
                '/assets/site/images/seller-icons/' +
                (i <= stars ? 'star-gold.svg' : 'star.svg')
            "
            ></image-icon>
        </div>
        </div>          
    </div>
    <p class="comment-content mt-2">
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
    </p>
    <div class="d-flex justify-content-between mt-4">
        <div class="orders">
            <p class="mini-title">سفارش های مشتری :</p>
            <div class="order" v-for="i in [1,2,3]" :key="i">
                <p>گل رز</p>
            </div>
        </div>
        <div class="actions" v-if="answerable">
            <button class="answer" @click="answerComment">پاسخ</button>
            <button class="purple-btn">پاسخ داده شده</button>
        </div>
    </div>
    <div class="actuallyAnswer full-width" v-if="!answerable">
                <div class="mini-title seller-locker">
                    <rounded-image
                    src="/assets/site/images/popular.png"
                    kind="big"
                    ></rounded-image>
                </div>
                <div class="mini-title seller-answer">
                    <custom-input container="mt-3 full-width" classes="full-width no-border"  kind="area" v-bind:theModel.sync="answer" placeholder="پاسخ خود را اینجا بنویسید"></custom-input>
                </div>
                <div id="actuallyAnswer">
                    <button class="answer" @click="actuallyAnswerComment">پاسخ</button>
                </div>
    </div>
  </div>
</template>
<script>
import RoundedImage from "../../Common/roundImage";
import ImageIcon from "../../Common/icon";
import CustomInput from "../../Common/CustomInput"
export default {
  components: {
    RoundedImage,
    ImageIcon,
    CustomInput
  },
  props: ["theComment","answerable"],
  data: () => ({
    stars: 3,
    answer:""
  }),
  methods:{
      answerComment:function(){
          this.$emit("answer",this.theComment)
      },
      actuallyAnswerComment:function(){
          this.$emit("actuallyAnswer",this.answer)
      }
  }
};
</script>
<style scoped>
.a-comment{
    font-weight: lighter;
    font-size: 0.9rem;
    border-bottom: 1px solid rgba(127, 127, 127, 0.25);
    height: auto;
}

.user{
    position: relative;
}

.actuallyAnswer{
    position: relative;
}

.user-locker{
    position: absolute;
    width:55px;
    top: 10px;
    right: 5px;
}

.seller-locker{
    position: absolute;
    width:55px;
    top: 15px;
    right: 5px;
}

.user-user{
    font-weight: normal;
}

.user-detail{
    position: relative;
    right: 55px;
}

.seller-answer{
    position: relative;
    right: 55px;
    width: 60%;
}

p{
    margin: 0px;
}

.comment-content{
    padding-right: 55px;
    font-size: 0.8rem;
}

.orders{
    padding-right: 55px;
}

.order{
    background-color: rgba(206, 206, 206, 0.32);
    color: #9147FF;
    border-radius: 15px;
    text-align: center;
    padding:2px 20px 2px 20px;
    display: inline-block;
    font-size: 0.75rem;
    font-weight: normal;
    margin-left: 15px;
}

.answer{
    color: #9147FF;
    border-radius: 5px;
    border:1px solid #9147FF;
    background: none;
    padding:4px 25px 4px 25px;
}

.answer:hover{
    background-color: #9147FF;
    color: #fff;
}
#actuallyAnswer{
    text-align: left;
}
</style>