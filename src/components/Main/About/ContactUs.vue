<template>
  <div class="contact-page p-5">
    <div class="contact-us">
      <h1 class="mini-title">تماس با ما</h1>
      <p class="mt-3">
        برای پیگیری و سوال در مورد سفارش و یا ارسال پیام بهتر است از فرم زیر
        استفاده نمایید
      </p>
      <div class="contact-form mt-3 pt-3">
        <p>لطفا اطلاعات زیر را تکمیل کنید</p>
        <div class="row mt-4">
          <div class="col-6">
            <custom-input
              kind="dropDown"
              container="full-width"
              v-bind:theModel.sync="theComplaint.type"
              :selectItems="complaintTypes"
              label="موضوع"
              placeholder="موضوع درخواست را انتخاب کنید"
            ></custom-input>
          </div>
          <div class="col-6">
            <custom-input
              kind="text"
              container="full-width"
              classes="full-width"
              v-bind:theModel.sync="theComplaint.user.name"
              label="نام و نام خانوادگی"
              placeholder="نام و نام خانوادگی"
            ></custom-input>
          </div>
          <div class="col-6 mt-3">
            <custom-input
              kind="text"
              container="full-width"
              classes="full-width"
              v-bind:theModel.sync="theComplaint.user.email"
              label="آدرس ایمیل *"
              placeholder="آدرس ایمیل"
            ></custom-input>
          </div>
          <div class="col-6 mt-3">
            <custom-input
              kind="text"
              container="full-width"
              classes="full-width"
              v-bind:theModel.sync="theComplaint.user.phone"
              label="تلفن تماس *"
              placeholder="تلفن تماس"
            ></custom-input>
          </div>
          <div class="col-12 mt-3">
            <custom-input
              kind="area"
              rows="7"
              classes="full-width"
              label="متن پیام"
              container="full-width"
              v-bind:theModel.sync="theComplaint.text"
              placeholder="متن پیام"
            ></custom-input>
          </div>
        </div>
        <div class="upload-box" id="dropBox" @dragleave="(e)=>dragLeaveHandler(e)" @dragover="(e)=>dragOverHandler(e)"  @drop="(e)=>dropHandler(e)">
          <p> تصویر مورد نظر خود را جهت بارگذاری داخل کادر بیاندازید</p>
          <p>حداکثر 50 مگابایت</p>
          <custom-button
            label="انتخاب عکس"
            iconSize="big"
            classes="file-btn"
            @clicked="openInput"
            icon="/assets/site/images/seller-icons/upload.svg"
          ></custom-button>
          <div class="file-show" v-if="files != ''">
            <img :src="img" alt="image">
          </div>
          <div class="image-error" v-if="imageError != ''">
            <p>{{imageError}}</p>
          </div>
        </div>
        <input
          type="file"
          id="img"
          ref="getImage"
          class="hiddenInput"
          @change="(e) => addImage(e)"
          name="img"
          accept="image/*"
        />
        <div class="actually-send">
          <button class="purple-btn mt-2" @click="sendComplaint">ثبت شکایت</button>
        </div>
      </div>
    </div>
    <div class="our-info mt-3">
      <h1 class="mini-title">اطلاعات گلپینو</h1>
      <div class="row mt-3">
        <div class="info-section col-md-6">
          <h2 class="mt-2">دفتر مرکزی</h2>
          <p>تهران - خیابان میرداماد - خیابان نساء - کوچه ی زرنگار - پلاک 35 - ساختمان طرفه نگار</p>
        </div>
        <div class="info-section col-md-6 p-0">
          <div id="map">
                <l-map
                    v-if="mapOptions.showMap"
                    :zoom="mapOptions.zoom"
                    :center="mapOptions.center"
                    :options="mapOptions.mapOptions"
                    style="height: 100%;width:100%;"
                    @update:center="centerUpdate"
                    @update:zoom="zoomUpdate"
                >
                    <l-tile-layer
                        :url="mapOptions.url"
                    />
                    <l-marker :lat-lng="mapOptions.golpino">
                        <l-icon
                        :icon-size="[40,40]"
                        icon-url="/assets/site/images/seller-icons/loc.svg"
                        />
                    </l-marker>
                </l-map>
          </div>
          <div class="contact-info d-flex justify-content-between mt-1 pt-2">
              <div class="row m-0">
                    <div class="col-3">
                        <icon-image address="/assets/site/images/seller-icons/phone.svg" classes="big"></icon-image>
                    </div>
                    <div class="col-9">
                        <p>تلفن های تماس</p>
                        <p>021-26403285</p>
                    </div>
              </div>
              <div class="row m-0">
                    <div class="col-3">
                        <icon-image address="/assets/site/images/seller-icons/letter.svg" classes="big"></icon-image>
                    </div>
                    <div class="col-9">
                        <p>آدرس ایمیل</p>
                        <p>info@golpino.com</p>
                    </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IconImage from "../../Common/icon";
import CustomInput from "../../Common/CustomInput";
import CustomButton from "../../Common/customButton";
import { computed, onMounted, ref } from "@vue/composition-api";
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LIcon,LControl } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";
import Service from "../../../utils/service"
export default {
  components: {
    IconImage,
    CustomInput,
    CustomButton,
    LMap,
    LTileLayer,
    LMarker,
     LIcon
  },
  setup(props,context) {
    const theService = computed(()=>{
      return Service(false)
    })
    const imageError = ref('')
    const complaintTypes = ref([
      { text: "دیرکرد", value: 1 },
      { text: "خرابی", value: 2 },
    ]);
    const theComplaint = ref({
      text:{ value:null,valid:true },
      type: { value:null,valid:true },
      user: { name: {value:null,valid:true}, phone: {value:null,valid:true} ,email:{value:null,valid:true}},
    });
    const step = ref(3);
    onMounted(()=>{
      theService.value.receive('contact',{},(s,d)=>{
        d.data.map((c)=>{
          c.text = c.desc
          c.value = c.id
        })
        complaintTypes.value = d.data
      },(s,e)=>{

      })
    })
    const mapOptions=ref({
        zoom: 13,
      center: latLng(35.76, 51.433611),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      golpino: latLng(35.76, 51.433611),
      currentZoom: 11.5,
      currentCenter: latLng(35.76, 51.433611),
      showParagraph: true,
      mapOptions: {
        zoomSnap: 0.5
      },
      showMap: true
    })

    const zoomUpdate = (zoom) => {
        mapOptions.value.currentZoom = zoom;
    }

    const address = ref({lat:0,lng:0})

    const centerUpdate = (center)=> {
        address.value.lat = center.lat
        address.value.lng = center.lng
        mapOptions.value.currentCenter = center;
    }

    const files = ref('')
    const img = ref(null)
    const imgFile = ref(null)
    const  dropHandler = (ev) => {
      console.log('File(s) dropped')
      document.getElementById('dropBox').style.background = '#fff'
      document.getElementById('dropBox').style.color = '#000'
      // Prevent default behavior (Prevent file from being opened)
      ev.preventDefault()

      if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        for (var i = 0; i < ev.dataTransfer.items.length; i++) {
          // If dropped items aren't files, reject them
          if (ev.dataTransfer.items[i].kind === 'file') {
            var file = ev.dataTransfer.items[i].getAsFile()
            files.value = file
            img.value = URL.createObjectURL(file)
          }
        }
      } else {
        // Use DataTransfer interface to access the file(s)
        for (var i = 0; i < ev.dataTransfer.files.length; i++) {
          // console.log("file",ev.dataTransfer.files[i])
          files.value = ev.dataTransfer.files[i]
          img.value = URL.createObjectURL(file)
        }
      }
    }

    const dragOverHandler = (ev) => {
      document.getElementById('dropBox').style.background = '#772CE8'
      document.getElementById('dropBox').style.color = '#fff'

      // Prevent default behavior (Prevent file from being opened)
      ev.preventDefault()
    }
    
    const dragLeaveHandler = (ev) => {
      document.getElementById('dropBox').style.background = '#fff'
      document.getElementById('dropBox').style.color = '#000'

      // Prevent default behavior (Prevent file from being opened)
      ev.preventDefault()
    }

    const sendComplaint = () => {
      let isValid = true
      if(theComplaint.value.user.phone.value == null || theComplaint.value.user.phone.value == ''){
        if(theComplaint.value.user.email.value == null || theComplaint.value.user.email.value == ''){
          isValid = false
          theComplaint.value.user.phone.valid = false
          theComplaint.value.user.email.valid = false
          theComplaint.value.user.phone.message = 'وارد کردن یکی از دو فیلد نام یا ایمیل اجباریست'
          theComplaint.value.user.email.message = 'وارد کردن یکی از دو فیلد نام یا ایمیل اجباریست'
        }
      }
      if(theComplaint.value.text.value == null || theComplaint.value.text.value == ''){
        isValid = false
        theComplaint.value.text.valid = false
        theComplaint.value.text.message = 'لطفا توضیحات خود را وارد کنید'
      }
      if(theComplaint.value.type.value == null){
        isValid = false
        theComplaint.value.type.valid = false
        theComplaint.value.type.message = 'لطفا موضوع را انتخاب کنید'
      }
      if(isValid){
        let f = new FormData()
        if(!(theComplaint.value.user.email.value == null || theComplaint.value.user.email.value == '')){
          f.append('email',theComplaint.value.user.email.value)
        }
        if(!(theComplaint.value.user.phone.value == null || theComplaint.value.user.phone.value == '')){
          f.append('phone',theComplaint.value.user.phone.value)
        }
        if(!(theComplaint.value.user.name.value == null || theComplaint.value.user.name.value == '')){
          f.append('name',theComplaint.value.user.name.value)
        }
        if(!(theComplaint.value.type.value == null || theComplaint.value.type.value == '')){
          f.append('subject_id',theComplaint.value.type.value.value)
        }
        if(files.value != ''){
          f.append('image',files.value)
        }
        f.append('desc',theComplaint.value.text.value)
        theService.value.transmit('contact',f,(s,d)=>{
          context.root.$router.push('/')
        },(s,e)=>{
          if(e.response.data.error.invalid_params){
            e.response.data.error.invalid_params.map((ep)=>{
              if(ep.field == 'phone'){
                theComplaint.value.user.phone.valid = false
                theComplaint.value.user.phone.message = ep.message
              }
              else if(ep.field == 'email'){
                theComplaint.value.user.email.valid = false
                theComplaint.value.user.email.message = ep.message
              }
              else if(ep.field == 'image'){
                imageError.value = ep.message
              }
              else if(ep.field == 'desc'){
                theComplaint.value.text.valid = false
                theComplaint.value.text.message = ep.message
              }
              else if(ep.field == 'subject_id'){
                theComplaint.value.type.valid = false
                theComplaint.value.type.message = ep.message
              }
            })
          }
        })
      }

    }

    const openInput = () => {
        document.getElementById("img").click()
    }

   const addImage = (e) => {
      img.value = URL.createObjectURL(e.target.files[0])
      files.value = e.target.files[0]
    }
    
    return { addImage,openInput,imageError,sendComplaint,complaintTypes,dragLeaveHandler, theComplaint, step,mapOptions,centerUpdate,zoomUpdate,img ,address,files,dragOverHandler,dropHandler};
  },
};
</script>
<style scoped>
.contact-page {
  font-weight: lighter;
}

.hiddenInput{
    position: absolute;
    visibility: hidden;
}

.image-error p{
  color:#ff3629;
}


.contact-page h1 {
  font-weight: bold;
  font-size: 1.2rem;
  border-bottom: 4px solid #772CE8;
  padding-bottom: 0.5rem;
}

.contact-page h2 {
  font-size: 1.1rem;
  font-weight: normal;
}

.contact-us {
  margin-left: auto;
  margin-right: auto;
  background-color: #fff;
  padding: 1.2rem 3rem 1rem 3rem;
  border-radius: 4px;
  box-shadow: 0px 0px 5px rgba(127, 127, 127, 0.5);
}

.contact-form {
  border-top: 1px solid rgba(127, 127, 127, 0.4);
}

.actually-send {
  text-align: left;
}

.hiddenInput {
  position: absolute;
  visibility: hidden;
}

.file-btn {
  color: #772CE8;
  border: 1px solid rgba(127, 127, 127, 0.25);
  font-size: 0.8rem;
  font-weight: lighter;
  background-color: #fff;
}

.upload-box {
  margin-top: 0.8rem;
  padding: 1rem 1rem 1rem 1rem;
  border: 1px dashed rgba(127, 127, 127, 0.35);
  border-radius: 6px;
  text-align: center;
}

.our-info {
  background-color: #F7F7F7;
  box-shadow: 0px 0px 5px rgba(127, 127, 127, 0.2);
  border-radius: 6px;
  border: 1px solid rgba(127, 127, 127, 0.25);
  padding: 2rem 3rem 2rem 3rem;
}

.info-section {
}

#map {
  width: 500px;
  height:400px;
  position: relative;
}


.contact-info{
    border-radius: 5px;
    border:1px solid rgba(127, 127, 127, 0.2);
    width: 100%;
}

.contact-info .row{
    width: 49%;
}

.contact-info .row .col-3{
    padding:0px;
    text-align: left;
}

.file-show{
  border:1px dashed #772CE8;
  width: 20%;
  margin-top: 1.5rem;
}

.file-show img{
  width: 100%;
}
</style>