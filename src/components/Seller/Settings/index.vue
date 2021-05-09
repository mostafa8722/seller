<template>
  <div class="container">
    <div class="container mt-3 settings">
      <div class="">

        <v-row style="margin-bottom: 20px">
          <v-col :cols="3">
            <v-btn elevation="0" style="background-color: #F5F5F5" @click="openTab('1')" id="1btn">عمومی</v-btn>

          </v-col>
          <v-col :cols="3">
            <v-btn elevation="0" style="background-color: #F5F5F5" @click="openTab('2')" id="2btn">مالی</v-btn>
          </v-col>
          <v-col :cols="3">
            <v-btn elevation="0" style="background-color: #F5F5F5" @click="openTab('3')" id="3btn">شرایط ارسال</v-btn>
          </v-col>
          <v-col :cols="3">
            <v-btn elevation="0" style="background-color: #F5F5F5" @click="openTab('4')" id="4btn">ساعات کاری</v-btn>
          </v-col>
        </v-row>

        <div id="1" class="w3-container city">
          <div class="general-settings" v-if="activeMenu == 0">

            <p>{{ descs.fields[0].name }}</p>
            <v-row>
              <v-col>
                <v-text-field disabled dense filled :value="descs.fields[0].value.value"/>
              </v-col>
            </v-row>

            <p>{{ descs.fields[1].name }}</p>
            <v-row>
              <v-col>
                <v-text-field dense filled v-model="descs.fields[1].value.value"/>
              </v-col>
            </v-row>

            <p>آدرس مغازه</p>
<!--            <v-row>-->
<!--              <v-col>-->
<!--                <v-text-field dense filled v-model="sellerAddress"/>-->
<!--              </v-col>-->
<!--            </v-row>-->
            <v-row>
              <v-col>
                <custom-field type-label="انتخاب لوکیشن" :modal="!hasAddress" :deactive="shopAddress.deactive"
                              @edit="()=>submitValue('shopAddress')"
                              @activate="()=>activateModel('shopAddress')" theField="آدرس مغازه">
                  <custom-input key="z7"
                                :classes="shopAddress.deactive ? 'deactive block full-width' : 'block full-width'"
                                :deactive="shopAddress.deactive" kind="text" container="full-width"
                                v-bind:theModel.sync="shopAddress.fields[0].value"></custom-input>
                </custom-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <custom-input key="z6" placeholder="محدوده خدمت رسانی"
                              kind="dropDown" container="full-width"
                              :selectItems="serviceRanges"
                              classes="select-facade2"
                              v-bind:theModel.sync="serviceRange.fields[0].value"></custom-input>
              </v-col>
            </v-row>
            <!--            <custom-field :deactive="logoImage.deactive" @edit="()=>submitValue('logoImage')"-->
            <!--                          @activate="()=>activateModel('logoImage')" theField="لوگو">-->
            <div class="row pt-3 pb-3 mt-1">
              <div class="col-3">
                <p>لوگو</p>
              </div>
              <div class="col-4">
                <input type="file" accept="image" @change="(e)=>getImage(e,1)">
              </div>
              <div class="col-5 seller-logo-locker" style="    text-align-last: center;">
                <img v-if="theImage.logo != null" :src="theImage.logo" alt="image">
              </div>
            </div>
            <div class="row pt-3 pb-3 mt-1">
              <div class="col-3">
                <p>بنر</p>
              </div>
              <div class="col-4">
                <input type="file" accept="image" @change="(e)=>getImage(e,2)">
              </div>
              <div class="col-5 seller-logo-locker"  style="    text-align-last: center;">
                <img v-if="theImage.banner != null" :src="theImage.banner" alt="image">
              </div>
            </div>
            <div class="row pt-3 pb-3 mt-1">
              <div class="col-3">
                <p>جواز</p>
              </div>
              <div class="col-4">
                <input type="file" accept="image" @change="(e)=>getImage(e,3)">
              </div>
              <div class="col-5 seller-logo-locker"  style="    text-align-last: center;">
                <img v-if="theImage.licence != null" :src="theImage.licence" alt="image">
              </div>
            </div>
            <!--            </custom-field>-->
            <address-modal :districts="districts" @addressComplete="setAddress"></address-modal>

            <!--            <custom-field type-label="انتخاب محدوده خدمت رسانی" :deactive="serviceRange.deactive" @edit="()=>submitValue('serviceRange')"-->
            <!--                          @activate="()=>activateModel('serviceRange')" theField="محدوده ی خدمات رسانی">-->
            <!--              <custom-input key="z6" :classes="serviceRange.deactive ? 'deactive block half-width' : 'block half-width'"-->
            <!--                            :deactive="serviceRange.deactive" kind="dropDown" container="full-width"-->
            <!--                            :selectItems="serviceRanges"-->
            <!--                            v-bind:theModel.sync="serviceRange.fields[0].value"></custom-input>-->
            <!--            </custom-field>-->


            <v-btn color="#772CE8" outlined style="margin-top: 20px;float: left;background: #682AD5;color: white;" @click="submitGeneral">ذخیره

            </v-btn>

          </div>
        </div>
        <div id="2" class="w3-container city" style="display:none">
          <!--          <div class="financial-settings" v-if="activeMenu == 5">-->
          <div class="financial-settings">
            <p>اطلاعات حساب بانکی خود را وارد کنید</p>
            <div class="bank-tabs">
              <div class="mini-title half-width bank-tab bank-tab-active" @click="()=>bankTabHandler(1)" id="bankTab1">
                <p>افزودن حساب جدید</p>
              </div>
              <div class="mini-title half-width bank-tab" @click="()=>bankTabHandler(2)" id="bankTab2">
                <p>ویرایش حساب</p>
              </div>
            </div>
            <div class="bank-form">
              <custom-input v-if="editBankAccount" kind="dropDown" label="حساب بانکی" container="half-width mt-4"
                            v-bind:theModel.sync="bankToEdit" :selectItems="accounts"
                            placeholder="حساب بانکی"></custom-input>
              <custom-input kind="dropDown" label="بانک مربوطه" container="full-width mt-4"
                            v-bind:theModel.sync="aBankAccount.bank" :selectItems="bankNames"
                            placeholder="بانک مربوطه"></custom-input>
              <custom-input kind="text" label="شماره حساب" container="full-width mt-4"
                            v-bind:theModel.sync="aBankAccount.accountNo" classes="block full-width"></custom-input>
              <custom-input kind="text" label="شماره شبا" container="full-width mt-4"
                            v-bind:theModel.sync="aBankAccount.shebaNo" classes="block full-width"></custom-input>
              <custom-input kind="text" label="شماره کارت" container="full-width mt-4"
                            v-bind:theModel.sync="aBankAccount.cardNo" classes="block full-width"></custom-input>
            </div>
            <button class="purple-btn mt-4 full-width" @click="submitFinancials">ثبت اطلاعات حساب</button>
          </div>
        </div>
        <div id="3" class="w3-container city" style="display:none">

          <p>زمان آماده سازی (دقیقه)</p>
          <v-row>
            <v-col cols="6">
              <v-text-field dense filled v-model="preparationTime.fields[0].value.value"/>
            </v-col>
          </v-row>
          <br><br>
          <v-row>
            <v-col cols="1"/>
            <v-col cols="3">
              <div>
                مسافت (متر)
              </div>
            </v-col>
            <v-col cols="3">
              <div>
                هزینه (تومان)
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="1"><input id="sendCostCheckBox0" type="checkbox"></v-col>
            <v-col cols="3">
              <div>
                از 0 تا 2000
              </div>
            </v-col>
            <v-col cols="3">
              <v-text-field v-model="sendCosts.value[0]" filled/>
            </v-col>
           <v-col> <v-btn style="background: #682AD5;color: white;" @click="submitPosting(0)">ثبت</v-btn></v-col>
          </v-row>
          <v-row>
            <v-col cols="1"><input id="sendCostCheckBox1" type="checkbox"></v-col>
            <v-col cols="3">
              <div>
                از 2000 تا 4000
              </div>
            </v-col>
            <v-col cols="3">
              <v-text-field v-model="sendCosts.value[1]" filled/>
            </v-col>
            <v-col><v-btn style="background: #682AD5;color: white;" @click="submitPosting(1)">ثبت</v-btn></v-col>
          </v-row>
          <v-row>
            <v-col cols="1"><input id="sendCostCheckBox5" type="checkbox"></v-col>
            <v-col cols="3">
              <div>
                از 4000 تا 6000
              </div>
            </v-col>
            <v-col cols="3">
              <v-text-field v-model="sendCosts.value[5]" filled/>
            </v-col>
           <v-col> <v-btn style="background: #682AD5;color: white;" @click="submitPosting(5)">ثبت</v-btn></v-col>
          </v-row>
          <v-row>
            <v-col cols="1"><input id="sendCostCheckBox6" type="checkbox"></v-col>
            <v-col cols="3">
              <div>
                از 6000 تا 8000
              </div>
            </v-col>
            <v-col cols="3">
              <v-text-field v-model="sendCosts.value[6]" filled/>
            </v-col>
           <v-col> <v-btn style="background: #682AD5;color: white;" @click="submitPosting(6)">ثبت</v-btn></v-col>
          </v-row>
          <v-row>
            <v-col cols="1"><input id="sendCostCheckBox7" type="checkbox"></v-col>
            <v-col cols="3">
              <div>
                از 8000 تا 10000
              </div>
            </v-col>
            <v-col cols="3">
              <v-text-field v-model="sendCosts.value[7]" filled/>
            </v-col>
            <v-col><v-btn style="background: #682AD5;color: white;" @click="submitPosting(7)">ثبت</v-btn></v-col>
          </v-row>
          <v-row>
            <v-col cols="1"><input id="sendCostCheckBox8" type="checkbox"></v-col>
            <v-col cols="3">
              <div>
                از 10000 تا 100000
              </div>
            </v-col>
            <v-col cols="3">
              <v-text-field v-model="sendCosts.value[8]" filled/>
            </v-col>
            <v-col><v-btn style="background: #682AD5;color: white;" @click="submitPosting(8)">ثبت</v-btn></v-col>
          </v-row>
        </div>
        <div id="4" class="w3-container city" style="display:none">

          <v-row>
            <v-col cols="1"/>
            <v-col cols="3">
              <div>
                روز
              </div>
            </v-col>
            <v-col cols="3">
              <div>
                از ساعت
              </div>
            </v-col>
            <v-col cols="3">
              <div>
                تا ساعت
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="1"><input id="workTimesCheckBox0" type="checkbox"></v-col>
            <v-col cols="2">
              <div>شنبه</div>
            </v-col>
            <v-col cols="3">
              <v-text-field v-model="workTimes[0].open_at" filled/>
            </v-col>
            <v-col cols="3">
              <v-text-field v-model="workTimes[0].close_at" filled/>
            </v-col>
            <v-col><v-btn style="background: #682AD5;color: white;" @click="submitWorkDaysAndHours(0)">ثبت</v-btn></v-col>
          </v-row>
          <v-row>
            <v-col cols="1"><input id="workTimesCheckBox1" type="checkbox"></v-col>
            <v-col cols="2">
              <div>یکشنبه</div>
            </v-col>
            <v-col cols="3">
              <v-text-field filled v-model="workTimes[1].open_at"/>
            </v-col>
            <v-col cols="3">
              <v-text-field filled v-model="workTimes[1].close_at"/>
            </v-col>
            <v-col><v-btn style="background: #682AD5;color: white;" @click="submitWorkDaysAndHours(1)">ثبت</v-btn></v-col>
          </v-row>
          <v-row>
            <v-col cols="1"><input id="workTimesCheckBox2" type="checkbox"></v-col>
            <v-col cols="2">
              <div>دوشنبه</div>
            </v-col>
            <v-col cols="3">
              <v-text-field filled v-model="workTimes[2].open_at"/>
            </v-col>
            <v-col cols="3">
              <v-text-field filled v-model="workTimes[2].close_at"/>
            </v-col>
            <v-col><v-btn style="background: #682AD5;color: white;" @click="submitWorkDaysAndHours(2)">ثبت</v-btn></v-col>
          </v-row>
          <v-row>
            <v-col cols="1"><input id="workTimesCheckBox3"  type="checkbox"></v-col>
            <v-col cols="2">
              <div>سه شنبه</div>
            </v-col>
            <v-col cols="3">
              <v-text-field filled v-model="workTimes[3].open_at"/>
            </v-col>
            <v-col cols="3">
              <v-text-field filled v-model="workTimes[3].close_at"/>
            </v-col>
            <v-col><v-btn style="background: #682AD5;color: white;" @click="submitWorkDaysAndHours(3)">ثبت</v-btn></v-col>
          </v-row>
          <v-row>
            <v-col cols="1"><input id="workTimesCheckBox4" type="checkbox"></v-col>
            <v-col cols="2">
              <div>چهارشنبه</div>
            </v-col>
            <v-col cols="3">
              <v-text-field filled v-model="workTimes[4].open_at"/>
            </v-col>
            <v-col cols="3">
              <v-text-field filled v-model="workTimes[4].close_at"/>
            </v-col>
            <v-col><v-btn style="background: #682AD5;color: white;" @click="submitWorkDaysAndHours(4)">ثبت</v-btn></v-col>
          </v-row>
          <v-row>
            <v-col cols="1"><input id="workTimesCheckBox5" type="checkbox"></v-col>
            <v-col cols="2">
              <div>پنج شنبه</div>
            </v-col>
            <v-col cols="3">
              <v-text-field filled v-model="workTimes[5].open_at"/>
            </v-col>
            <v-col cols="3">
              <v-text-field filled v-model="workTimes[5].close_at"/>
            </v-col>
            <v-col><v-btn style="background: #682AD5;color: white;" @click="submitWorkDaysAndHours(5)">ثبت</v-btn></v-col>
          </v-row>
          <v-row>
            <v-col cols="1"><input id="workTimesCheckBox6" type="checkbox"></v-col>
            <v-col cols="2">
              <div>جمعه</div>
            </v-col>
            <v-col cols="3">
              <v-text-field filled v-model="workTimes[6].open_at"/>
            </v-col>
            <v-col cols="3">
              <v-text-field filled v-model="workTimes[6].close_at"/>
            </v-col>
            <v-col><v-btn style="background: #682AD5;color: white;" @click="submitWorkDaysAndHours(6)">ثبت</v-btn></v-col>
          </v-row>

        </div>


        <!--        <div class="col-md-4 col-sm-12 right-bar">-->
        <!--               <div class="top-right p-3 d-flex justify-content-between">-->
        <!--                 <div class="user">-->
        <!--                   <div class="mini-title">-->
        <!--                     <rounded-image src="/assets/site/images/popular.png" kind="mid"></rounded-image>-->
        <!--                     <p class="mini-title">محمد نقوی</p>-->
        <!--                   </div>-->
        <!--                   <p>mohamad.naghavi71@gmail.com</p>-->
        <!--                 </div>-->
        <!--                 <image-icon address="/assets/site/images/seller-icons/three-dots.svg"></image-icon>-->
        <!--               </div>-->
        <!--               <div class="mid-right p-3">-->
        <!--                 <div class="d-flex justify-content-between">-->
        <!--                   <p class="mini-title">شماره حساب های شما</p>-->
        <!--                   <image-icon address="/assets/site/images/seller-icons/three-dots.svg"></image-icon>-->
        <!--                 </div>-->
        <!--                 <div class="mini-title up-locker">-->
        <!--                   <img src="/assets/site/images/seller-icons/up.svg" alt="image">-->
        <!--                 </div>-->
        <!--                 <div class="mini-title">-->
        <!--                   <p>بانک ملت</p>-->
        <!--                   <p class="mini-title mr-1">4405</p>-->
        <!--                   <p class="mini-title mr-1">4405</p>-->
        <!--                   <p class="mini-title mr-1">4405</p>-->
        <!--                   <p class="mini-title mr-1">4405</p>-->
        <!--                 </div>-->
        <!--                 <div>-->
        <!--                   <p>شماره شبا</p>-->
        <!--                   <p>1231243425636453632423123</p>-->
        <!--                 </div>-->
        <!--               </div>-->
        <!--          <div class="menu-right pt-3">-->
        <!--            <menu-item v-for="(item,i) in menuItems" :id="i" :key="i" :active="activeMenu" @selected="activateMenu"-->
        <!--                       :theItem="item"></menu-item>-->
        <!--          </div>-->
        <!--        </div>-->
        <div class=" main-section pt-3">


          <!--                   <h3>اطلاعات فروشگاه</h3>-->

          <!-- <div class="section-divider">
              <p>اطلاعات شخصی</p>
          </div>
          <custom-field :deactive="model.deactive" @edit="()=>activateModel(i)" @activate="()=>activateModel(i)" v-for="(model,i) in basicModels.fields" :key="i" :theField="model.name">
              <custom-input :classes="model.deactive ? 'deactive block full-width' : 'block full-width'" :deactive="model.deactive" kind="text" container="full-width" v-bind:theModel.sync="model.value"></custom-input>
          </custom-field> -->

          <!--            <p>اطلاعات اولیه همچون آدرس و ساعات کاری را وارد کنید</p>-->


          <!--            <custom-field :deactive="descs.deactive" @edit="()=>submitValue('descs')"-->
          <!--                          @activate="()=>activateModel('descs')" theField="توضیحات فروشگاه">-->
          <!--              <div class="row p-2">-->
          <!--                <div class="col-4">-->
          <!--                  <custom-input labelClass="tLighter mini-title" key='z12'-->
          <!--                                :classes="descs.deactive ? 'deactive full-width' : ' full-width'"-->
          <!--                                :deactive="descs.deactive" kind="text" container="full-width mt-1 ml-1"-->
          <!--                                v-bind:theModel.sync="descs.fields[0].value"-->
          <!--                                :label="descs.fields[0].name"></custom-input>-->
          <!--                </div>-->
          <!--                <div class="col-8">-->
          <!--                  <custom-input labelClass="tLighter mini-title" key='z22'-->
          <!--                                :classes="descs.deactive ? 'deactive full-width' : ' full-width'"-->
          <!--                                :deactive="descs.deactive" kind="area" rows="2" container="full-width mt-1 ml-1"-->
          <!--                                v-bind:theModel.sync="descs.fields[1].value"-->
          <!--                                :label="descs.fields[1].name"></custom-input>-->
          <!--                </div>-->
          <!--              </div>-->
          <!--            </custom-field>-->


          <!--          <div class="notif-settings" v-if="activeMenu == 1">-->
          <!--            <h3>تنظیمات اعلان ها</h3>-->
          <!--            <p>فقط اعلان هایی را که فعال کرده اید از طریق ایمیل دریافت خواهید نمود.</p>-->
          <!--            <h4 class="mt-4">هشدارهای امنیتی</h4>-->
          <!--            <custom-input container="mt-3 full-width" v-for="(model , i) in notifModels" :key="'n' + i"-->
          <!--                          :deactive="model.value" kind="toggle" v-bind:theModel.sync="model.value"-->
          <!--                          :label="model.label"></custom-input>-->
          <!--            <h4 class="mt-4">اخبارها</h4>-->
          <!--            <p>فقط اعلان هایی را که فعال کرده اید از طریق ایمیل دریافت خواهید نمود.</p>-->
          <!--            <custom-input container="mt-3 full-width" v-for="(model , i) in newsModels" :key="'u' + i"-->
          <!--                          :deactive="model.value" kind="toggle" v-bind:theModel.sync="model.value"-->
          <!--                          :label="model.label"></custom-input>-->
          <!--          </div>-->


        </div>
      </div>
    </div>

  </div>
</template>
<script>
import {ref, onMounted, computed, inject, watch, reactive} from "@vue/composition-api"
import RoundedImage from '../../Common/roundImage'
import ImageIcon from '../../Common/icon'
import CustomField from './partials/SettingsField'
import CustomInput from '../../Common/CustomInput'
import MenuItem from './partials/RightMenuItem'
import Service from "../../../utils/seller-service"
import AddressModal from "../../Common/AddressModal"
import $ from 'jquery'

export default {
  components: {
    RoundedImage,
    ImageIcon,
    CustomField,
    CustomInput,
    MenuItem,
    AddressModal
  },
  setup() {
    onMounted(() => {
      getBanks()
      getFinancials()
      getSellerInfos()
      document.getElementById('1btn').style.borderBottom = '3px solid #682AD5'
    })

    const authService = computed(() => {
      return Service(true)
    })

    const editBankAccount = ref(false)
    const bankToEdit = ref({value: null, valid: true})
    watch(bankToEdit.value, (n, o) => {
      aBankAccount.value.bank.value = n.value.bank_id
      aBankAccount.value.accountNo.value = n.value.account
      aBankAccount.value.cardNo.value = n.value.card
      aBankAccount.value.shebaNo.value = n.value.sheba
    })

    const global = inject('global')
    const basicModels = ref({
      fields: [{
        name: "نام و نام خانوادگی",
        value: {value: null, valid: true},
        deactive: true
      }, {name: "نام کاربری", value: {value: null, valid: true}, deactive: true}, {
        name: "نام کاربری",
        value: {value: null, valid: true},
        deactive: true
      }, {name: "شماره ثابت", value: {value: null, valid: true}, deactive: true}, {
        name: "شماره موبایل",
        value: {value: null, valid: true},
        deactive: true
      }, {name: "تاریخ تولد", value: {value: null, valid: true}, deactive: true}, {
        name: "جنسیت",
        value: {value: null, valid: true},
        deactive: true
      }]
    })
    const secondaryModels = ref({
      fields: [{
        addressModal: true,
        name: "آدرس فروشگاه",
        value: {value: null, valid: true},
        deactive: true
      }, {name: "آپلود جواز کسب", value: {value: null, valid: true}, deactive: true}, {
        name: "ساعات کاری",
        value: {value: null, valid: true},
        deactive: true
      }, {name: "محدوده ی ارسال", value: {value: null, valid: true}, deactive: true}, {
        name: "روش ارسال",
        value: {value: null, valid: true},
        deactive: true
      }]
    })
    const menuItems = ref([{text: 'اطلاعات شخصی', icon: 'user.svg', active: true}, {
      text: 'اعلان ها',
      icon: 'black-bell.svg',
      active: false
    }, {text: 'فعالیت حساب', icon: 'activity.svg', active: false}, {
      text: 'تنظیمات امنیتی',
      icon: 'lock.svg',
      active: false
    }, {text: 'تغییر رمز عبور', icon: 'shield.svg', active: false}, {
      text: 'اطلاعات حساب',
      icon: 'dollar.svg',
      active: false
    }])
    const notifModels = ref([{
      label: "هر وقت با فعالیت غیر معمول روبرو شدید به من اطلاع دهید",
      value: {value: false, valid: true},
      name: 'unusual-activity'
    }, {
      label: "هر وقت شخص دیگری با مشخصات من وارد شد اطلاع دهید",
      value: {value: false, valid: true},
      name: 'break-in'
    }])
    const newsModels = ref([{
      label: "درباره ی فروش و خبر های جدید از طریق ایمیل اطلاع دهید",
      value: {value: false, valid: true},
      name: 'news'
    }, {
      label: "درباره ی بروز رسانی های جدید به من اطلاع دهید",
      value: {value: false, valid: true},
      name: 'update'
    }, {
      label: "درباره ی نکات استفاده از حساب به من ایمیل بزنید",
      value: {value: false, valid: true},
      name: 'guide'
    },])
    const financialModels = ref([{name: "بانک", value: {value: null, valid: true}, deactive: true}, {
      name: "شماره حساب",
      value: {value: null, valid: true},
      deactive: true
    }, {name: "شماره شبا", value: {value: null, valid: true}, deactive: true}, {
      name: "شماره کارت",
      value: {value: null, valid: true},
      deactive: true
    }])
    const aBankAccount = ref({
      bank: {value: null, valid: true},
      accountNo: {value: null, valid: true},
      shebaNo: {value: null, valid: true},
      cardNo: {value: null, valid: true}
    })
    const workTime = ref({
      edit: false,
      deactive: true,
      fields: [{name: 'از ساعت', value: {value: null, valid: true}}, {
        name: 'تا ساعت',
        value: {value: null, valid: true}
      }]
    })
    const theWorkDay = ref({value: null, valid: true})
    const preparationTime = ref({
      fields: [{name: "زمان آماده سازی", value: {value: null, valid: true}}],
      edit: false,
      deactive: true
    })
    const sendCost = reactive({
      deactive: true,
      edit: false,
      fields: [{value: {value: null, valid: true}, name: 'مسافت'}, {value: {value: null, valid: true}, name: 'هزینه'}]
    })
    const serviceRange = ref({deactive: true, edit: false, fields: [{value: {value: null, valid: true}}]})
    const shopAddress = ref({deactive: true, edit: false, fields: [{value: {value: null, valid: true}}]})
    const descs = ref({
      deactive: true,
      edit: false,
      fields: [{name: 'نام فروشنده', value: {value: global.user.value.name, valid: true}}, {
        name: 'توضیحات فروشگاه',
        value: {value: (global.user.value.seller.desc == '' ? null : global.user.value.seller.desc), valid: true}
      }]
    })
    const logoImage = ref({deactive: true, logo: null, banner: null, licence: null})
    const theImage = ref({logo: null, banner: null, licence: null})
    const fData = ref(new FormData())
    const activeMenu = ref(0)
    const bankNames = ref(null)
    const sellerSendCosts = ref(null)
    const currentForm = ref(null)
    const hasAddress = ref(false)
    const days = [{id: 1, text: "شنبه", value: 1}
      , {id: 2, text: "یک شنبه", value: 2}
      , {id: 3, text: "دو شنبه", value: 3}
      , {id: 4, text: "سه شنبه", value: 4}
      , {id: 5, text: "چهار شنبه", value: 5}
      , {id: 6, text: "پنجشنبه", value: 6}
      , {id: 7, text: "جمعه", value: 7}]
    const sellerWorkTime = ref(null)
    const districts = ref(null)
    const workTimes = ref({
      value: [], valid: true
    })
    const workTimesIds = ref({
      value: [], valid: true
    })
    const sendCosts = ref({value: [null, null, null, null, null, null,null,null,null,null,null], valid: true})
    const sellerAddress = ref(null)


    const activateMenu = (id) => {
      activeMenu.value = id
    }

    watch(theWorkDay.value, (n, o) => {
      if (sellerWorkTime.value != null && sellerWorkTime.value != []) {
        workTime.value.fields[0].value.value = sellerWorkTime.value[n.value.value - 1].open_at
        workTime.value.fields[1].value.value = sellerWorkTime.value[n.value.value - 1].close_at
        workTime.value.id = sellerWorkTime.value[n.value.value - 1].id
      }
    })

    watch(() => sendCost.fields[0].value.value, (n, o) => {
      // let x = false
      // if (n != o) {
      //   if (sellerSendCosts.value != null && sellerSendCosts.value != []) {
      //     sellerSendCosts.value.map((sc) => {
      //       if (n.value == sc.distance_id) {
      //         sendCost.fields[1].value.value = sc.cost
      //         x = true
      //       }
      //     })
      //   }
      // }
      // if (!x) {
      //   sendCost.fields[1].value.value = 'نا معلوم'
      // }
    })

    const getSellerInfos = () => {
      // GET LOGO PICS

      authService.value.receive('seller/base/sendcost', {}, (s, d) => {
        if (s == 200) {

          for (s=0;s<d.data.length;s++) {
            sendCosts.value.value[(d.data[s].distance_id) -1 ] = d.data[s].cost

            if (sendCosts.value.value[(d.data[s].distance_id) -1 ] !== 0){
              document.getElementById('sendCostCheckBox' + ((d.data[s].distance_id) -1)).checked = true
            }

          }




          console.log(sendCosts)
        }
      }, (s, e) => {
      })


      authService.value.receive('seller/base', {}, (s, d) => {
        if (s == 200) {
          if (d.data.specification != null && d.data.desc != null) {
            descs.value.fields[1].value.value = d.data.specification
            descs.value.fields[0].value.value = d.data.name
            console.log(d.data)
          }
          if (d.data.status != 4) {
            this.verified = false
          }
        }
      }, (s, e) => {
      })
      authService.value.receive('seller/base/image', {}, (s, d) => {
        if (s == 200) {
          if (d.data != [] && d.data != null) {
            theImage.value = {logo: d.data.logo, banner: d.data.banner, licence: d.data.licence}
          }
        }
      }, (s, e) => {
      })
      //WORKTIME


      var wId = []
      authService.value.receive('seller/base/worktime', {}, (s, d) => {
        if (s == 200) {

          workTimes.value = d.data
          workTimes.value.map((w) => {
            if (w.open_at === '9:00'){
              w.open_at = '09:00'
            }
          })
          d.data.map((w) => {
            wId.push(w.id)
          })
          workTimesIds.value = wId
          for (let s = 0; s < d.data.length; s++) {
            if (workTimes.value[s].open_at !=='00::00') {
              document.getElementById('workTimesCheckBox' + s).checked = true
            }
          }
        }
      }, (s, e) => {
      })


      // PREPARATION TIME
      authService.value.receive('seller/base/prepare', {}, (s, d) => {
        if (s == 200) {
          if (d.data != [] && d.data != null) {
            preparationTime.value.edit = true
            preparationTime.value.fields[0].value.value = d.data.time
          }
        }
      }, (s, e) => {
      })
      // DISTANCES
      authService.value.receive('seller/base/distance', {}, (s, d) => {
        if (s == 200) {
          if (d.data != [] && d.data != null) {
            sendCost.fields[0].value = {
              valid: true,
              value: {
                text: ' از ' + d.data[0].from + ' تا ' + d.data[0].to,
                value: d.data[0].id,
                id: d.data[0].id,
                distance_id: d.data[0].id
              }
            }
            distances.value = d.data
            distances.value.map((dist) => {
              dist.text = ' از ' + dist.from + ' تا ' + dist.to
              dist.value = dist.id
            })
          }
        }
      }, (s, e) => {
      })
      // GET SEND COSTs
      // authService.value.receive('seller/base/sendcost', {}, (s, d) => {
      //   if (s == 200) {
      //     if (d.data != null) {
      //       if (d.data.length > 0) {
      //         sellerSendCosts.value = d.data
      //         sendCost.fields[1].value = {value: sellerSendCosts.value[0].cost, valid: true}
      //       }
      //     }
      //   }
      // }, (s, e) => {
      // })
      // SERVICE RANGES
      authService.value.receive('seller/base/servicerange', {}, (s, d) => {
        if (s == 200) {
          if (d.data != [] && d.data != null) {
            serviceRanges.value = d.data
            serviceRanges.value.map((se) => {
              se.text = se.value
              se.value = se.id
            })
          }
        }
      }, (s, e) => {
      })
      // get
      authService.value.receive('seller/base/sellerservicerange', {}, (s, d) => {
        if (s == 200) {

          if (d.data != []) {
            serviceRanges.value.map((ser) => {
              if (d.data.service_range_id == ser.id) {
                console.log(ser)
                serviceRange.value = {
                  deactive: true,
                  edit: false,
                  fields: [{value: {value: {value: ser.id, text: ser.text}, valid: true}}]
                }
              }
            })
          }
        }
      }, (s, e) => {
      })

      // ADDRESS
      authService.value.receive('seller/address', {}, (s, d) => {
        if (s == 200) {
          if (d.data != [] && d.data != null) {
            shopAddress.value.fields[0].value.value = d.data.address
            hasAddress.value = true
          }
        }
      }, (s, e) => {
      })
      // DISTRICTS

      authService.value.receive('search/district', {}, (s, d) => {
        if (s == 200) {
          districts.value = d.data
          districts.value.map((di) => {
            di.text = di.name
          })
        }
      }, (s, e) => {
      })
    }

    const distances = ref(null)
    const serviceRanges = ref(null)

    const activateModel = (i) => {
      if (i == 'workTime') {
        workTime.value.deactive = !workTime.value.deactive
      } else if (i == 'ppTime') {
        preparationTime.value.deactive = !preparationTime.value.deactive
      } else if (i == 'sendCost') {
        sendCost.deactive = !sendCost.deactive
      } else if (i == 'serviceRange') {
        serviceRange.value.deactive = !serviceRange.value.deactive
      } else if (i == 'shopAddress') {
        if (!hasAddress.value)
          shopAddress.value.deactive = !shopAddress.value.deactive
      } else if (i == 'logoImage') {
        logoImage.value.deactive = !logoImage.value.deactive
      } else if (i == 'descs') {
        descs.value.deactive = !descs.value.deactive
      } else {
        if (activeMenu.value == 0)
          basicModels.value.fields[i].deactive = !basicModels.value.fields[i].deactive
        if (activeMenu.value == 1)
          secondaryModels.value.fields[i].deactive = !secondaryModels.value.fields[i].deactive
        if (activeMenu.value == 5)
          financialModels.value.fields[i].deactive = !financialModels.value.fields[i].deactive
      }

    }

    const accounts = ref(null)

    const getBanks = () => {
      authService.value.receive('seller/base/banklist', {}, (s, d) => {
        if (s == 200) {
          bankNames.value = d.data
          bankNames.value.map((b) => {
            b.value = b.id
            b.text = b.desc
          })
        }
      }, (s, e) => {
      })
    }
    const successfulOp = (s, d) => {
      if (s == 200) {
        fData.value = new FormData()
        global.alertToggle('اطلاعات با موفقیت افزوده شد!')
      }
    }
    const failedOp = (s, e) => {
      if (!s) {
        global.alertToggle('عملیات ناموفق')
        if (e.response.status == 400) {
          switch (currentForm.value) {
            case 'worktime':
              e.response.data.error.invalid_params.map((param) => {
                if (param.field == 'open_at') {
                  workTime.value.fields[0].value.valid = false
                  workTime.value.fields[0].value.message = param.message
                } else if (param.field == 'close_at') {
                  workTime.value.fields[1].value.valid = false
                  workTime.value.fields[1].value.message = param.message
                }
              })
              break;
            case 'ppTime':
              e.response.data.error.invalid_params.map((param) => {
                preparationTime.value.fields[0].value.valid = false
                preparationTime.value.fields[0].value.message = param.message
              })
              break;
            case 'sendcost':
              e.response.data.error.invalid_params.map((param) => {
                if (param.field == 'distance_id') {
                  sendCost.fields[0].value.valid = false
                  sendCost.fields[0].value.message = param.message
                } else if (param.field == 'cost') {
                  sendCost.fields[1].value.valid = false
                  sendCost.fields[1].value.message = param.message
                }
              })
              break;
            case 'servicerange':
              e.response.data.error.invalid_params.map((param) => {
                serviceRange.value.fields[0].value.valid = false
                serviceRange.value.fields[0].value.message = param.message
              })
              break;
            default:
              break;
          }
        }
      }
    }


    const submitValue = (v, i) => {
      let f = new FormData()
      switch (v) {
        case 'بانک':
          activateModel(i)
          authService.value.transmit('')
          break;
        case 'workTime':
          currentForm.value = 'worktime'
          // activateModel('workTime')
          workTime.value.fields[0].value.valid = true
          workTime.value.fields[1].value.valid = true
          workTime.value.fields[0].value.message = ''
          workTime.value.fields[1].value.message = ''
          f.append('open_at', workTime.value.fields[0].value.value)
          f.append('close_at', workTime.value.fields[1].value.value)
          console.log(workTime.value.id)
          // authService.value.transmit('seller/base/worktime' + '/' + workTime.value.id, f, successfulOp, failedOp)
          break;
        case 'ppTime':
          if (preparationTime.value.fields[0].value.value !== null && preparationTime.value.fields[0].value.value !== '') {
            currentForm.value = 'ppTime'
            activateModel('ppTime')
            preparationTime.value.fields[0].value.valid = true
            preparationTime.value.fields[0].value.message = ''
            f.append('time', preparationTime.value.fields[0].value.value)
            console.log('sent')
            authService.value.transmit('seller/base/prepare', f, successfulOp, failedOp)
          }
          break;
        case 'sendCost':
          // activateModel('sendCost')
          currentForm.value = 'sendcost'
          if (typeof sendCost.fields[0].value.value.id !== 'undefined')
            f.append('distance_id', sendCost.fields[0].value.value.id)
          else
            f.append('distance_id', sendCost.fields[0].value.value.value)
          f.append('cost', sendCost.fields[1].value.value)
          authService.value.transmit('seller/base/sendcost', f, successfulOp, failedOp)
          break;
        case 'serviceRange':
          // activateModel('serviceRange')
          currentForm.value = 'servicerange'
          authService.value.transmit('seller/base/servicerange/' + serviceRange.value.fields[0].value.value.value, {}, successfulOp, failedOp)
          break;
        case 'shopAddress':
          activateModel('shopAddress')
          // f.append('value',serviceRange)
          // authService.value.transmit('seller/base/servicerange',f,successfulOp,failedOp)
          break;
        case 'logoImage':
          activateModel('logoImage')
          authService.value.transmit('seller/base/image', fData.value, successfulOp, failedOp)
          break;
        case 'descs':
          activateModel('descs')


          if (descs.value.fields[1].value.value) {
            f.append('specification', descs.value.fields[1].value.value)
          } else {
            f.append('specification', '...')
          }


          f.append('desc', descs.value.fields[0].value.value)
          console.log(descs.value.fields[1].value.value)
          authService.value.transmit('seller/register/adddesc', f, successfulOp, failedOp)
        case 'شماره کارت':

          break;
        default:
          break;
      }
    }

    const setAddress = (address) => {
      shopAddress.value.fields[0].value = address.name
      let f = new FormData()
      f.append('long', address.long)
      f.append('lat', address.lat)
      f.append('address', address.address.value)
      f.append('district_id', address.district_id)
      authService.value.transmit('seller/address', f, (s, d) => {
        if (s == 200) {
          hasAddress.value = true
          $('#addressModal').modal('toggle')
        }
        successfulOp(s, d)
      }, failedOp)
    }


    const getFinancials = () => {
      authService.value.receive('seller/base/account', {}, (s, d) => {
        if (s == 200) {
          accounts.value = d.data
          accounts.value.map((a) => {
            a.value = a.id
            for (let b of bankNames.value) {
              if (parseInt(b.id) == parseInt(a.bank_id)) {
                a.text = b.desc
                break
              }
            }
          })
        }
      }, (s, e) => {
        if (!s)
          global.alertToggle('عملیات ناموفق')
      })
    }

    const submitFinancials = () => {
      let f = new FormData()
      if (!editBankAccount.value) {
        f.append('bank_id', aBankAccount.value.bank.value.value)
        f.append('account', aBankAccount.value.accountNo.value)
        f.append('sheba', aBankAccount.value.shebaNo.value)
        f.append('card', aBankAccount.value.cardNo.value)
        authService.value.transmit('seller/base/account', f, (s, d) => {
          if (s == 200)
            global.alertToggle('اطلاعات با موفقیت افزوده شد!')
        }, (s, e) => {
          if (!s)
            global.alertToggle('عملیات ناموفق')
        })
      } else {
        if (aBankAccount.value.bank.value != bankToEdit.value.value.bank_id) {
          f.append('bank_id', aBankAccount.value.bank.value.value)
        }

        if (aBankAccount.value.accountNo.value != bankToEdit.value.value.account) {
          f.append('account', aBankAccount.value.accountNo.value)
        }

        if (aBankAccount.value.cardNo.value != bankToEdit.value.value.card) {
          f.append('sheba', aBankAccount.value.shebaNo.value)
        }

        if (aBankAccount.value.shebaNo.value != bankToEdit.value.value.sheba) {
          f.append('card', aBankAccount.value.cardNo.value)
        }
        authService.value.transmit('seller/base/account/' + bankToEdit.value.value.id, f, (s, d) => {
          if (s == 200)
            global.alertToggle('اطلاعات با موفقیت افزوده شد!')
        }, (s, e) => {
          if (!s)
            global.alertToggle('عملیات ناموفق')
        })
      }
    }

    const bankTabHandler = (id) => {
      if (id == 1) {
        document.getElementById('bankTab1').classList.add('bank-tab-active')
        document.getElementById('bankTab2').classList.remove('bank-tab-active')
        editBankAccount.value = false
      } else {
        document.getElementById('bankTab2').classList.add('bank-tab-active')
        document.getElementById('bankTab1').classList.remove('bank-tab-active')
        editBankAccount.value = true
      }
    }

    const getImage = (e, k) => {
      switch (k) {
        case 1:
          logoImage.value.logo = e.target.files[0]
          theImage.value.logo = URL.createObjectURL(e.target.files[0])
          fData.value.append('logo', logoImage.value.logo)
          break;
        case 2:
          logoImage.value.banner = e.target.files[0]
          theImage.value.banner = URL.createObjectURL(e.target.files[0])
          fData.value.append('banner', logoImage.value.banner)
          break;
        case 3:
          logoImage.value.licence = e.target.files[0]
          theImage.value.licence = URL.createObjectURL(e.target.files[0])
          fData.value.append('licence', logoImage.value.licence)
          break;
        default:
          break;
      }
    }

    const openTab = (tagName) => {
      var i;
      var x = document.getElementsByClassName("city");
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
      }
      document.getElementById(tagName).style.display = "block";
      for (let x=1;x<5;x++) {
        if (document.getElementById(x).style.display === 'block') {
          document.getElementById(x+ 'btn').style.borderBottom = '3px solid #682AD5'
        } else {
          document.getElementById(x+ 'btn').style.borderBottom = 'none'
        }
      }
    }

    const submitWorkDaysAndHours = (i) => {
        if (document.getElementById('workTimesCheckBox' + i).checked) {

          let f = new FormData()
          f.append('open_at', workTimes.value[i].open_at)
          f.append('close_at', workTimes.value[i].close_at)
          authService.value.transmit('seller/base/worktime/' + workTimesIds.value[i], f, (s, d) => {
            if (s == 200)
              global.alertToggle('اطلاعات با موفقیت افزوده شد!')
          }, (s, e) => {
            if (!s)
              global.alertToggle('عملیات ناموفق')
          })

        }
        // else{
        //   let f = new FormData()
        //   f.append('open_at', '00:00')
        //   f.append('close_at', '00:01')
        //   authService.value.transmit('seller/base/worktime/' + workTimesIds.value[i], f, (s, d) => {
        //     if (s == 200)
        //       global.alertToggle('اطلاعات با موفقیت افزوده شد!')
        //   }, (s, e) => {
        //     if (!s)
        //       global.alertToggle('عملیات ناموفق')
        //   })
        // }



      // for (let s=1;s<7;s++) {
      //   if (document.getElementById('workTimesCheckBox'+1).checked) {
      //     let f = new FormData()
      //
      //     f.append('open_at', workTimes.value.value[s-1].open)
      //     f.append('close_at', workTimes.value.value[s-1].close)
      //     console.log(f.get('open_at'))
      //     console.log(f.get('close_at'))
      //     authService.value.transmit('seller/base/worktime/' + 1 , f, (s, d) => {
      //       if (s == 200)
      //         global.alertToggle('اطلاعات با موفقیت افزوده شد!')
      //     }, (s, e) => {
      //       if (!s)
      //         global.alertToggle('عملیات ناموفق')
      //     })
      //   }
      // }


    }


    const submitPosting = (i) => {


        if (document.getElementById('sendCostCheckBox' + i).checked) {
          let f = new FormData()

          f.append('distance_id', i+1)
          f.append('cost', parseInt(sendCosts.value.value[i]))
          authService.value.transmit('seller/base/sendcost', f, (s, d) => {
            if (s == 200)
              global.alertToggle('اطلاعات با موفقیت افزوده شد!')
          }, (s, e) => {
            if (!s)
              global.alertToggle('عملیات ناموفق')
          })
        }
        // else {
        //   let f = new FormData()
        //
        //   f.append('distance_id', s)
        //   f.append('cost', 0)
        //   authService.value.transmit('seller/base/sendcost', f, (s, d) => {
        //     if (s == 200)
        //       global.alertToggle('اطلاعات با موفقیت افزوده شد!')
        //   }, (s, e) => {
        //     if (!s)
        //       global.alertToggle('عملیات ناموفق')
        //   })
        //
        // }



    }

    const addAddress = () => {


      if (!hasAddress) {
        let f = new FormData()

        f.append('address', sellerAddress.value)
        authService.value.transmit('seller/address', f, (s, d) => {
          if (s == 200)
            global.alertToggle('اطلاعات با موفقیت افزوده شد!')
        }, (s, e) => {
          if (!s)
            global.alertToggle('عملیات ناموفق')
        })
      }

    }


    return {
      workTimesIds,
      addAddress,
      sellerAddress,
      sendCosts,
      submitPosting,
      workTimes,
      submitWorkDaysAndHours,
      openTab,
      descs,
      hasAddress,
      sellerSendCosts,
      districts,
      theWorkDay,
      days,
      getImage,
      theImage,
      logoImage,
      setAddress,
      shopAddress,
      serviceRange,
      serviceRanges,
      sendCost,
      distances,
      preparationTime,
      workTime,
      bankNames,
      editBankAccount,
      bankTabHandler,
      aBankAccount,
      bankToEdit,
      accounts,
      submitFinancials,
      submitValue,
      menuItems,
      basicModels,
      activateModel,
      secondaryModels,
      activeMenu,
      activateMenu,
      notifModels,
      newsModels,
      financialModels
    }
  }
  ,
  methods: {

    submit() {

      // this.submitWorkDaysAndHours();
      // this.submitValue('workTime');
      // this.submitValue('ppTime');
      // this.submitValue('sendCost');
      // this.submitValue('serviceRange');
    },
    submitGeneral() {
      this.submitValue('descs');
      this.submitValue('logoImage');
      // this.submitValue('shopAddress');
      this.submitValue('serviceRange')
      this.addAddress();
    },
    submitPostingGroup() {
      this.submitValue('ppTime');
      this.submitPosting();
    }
    ,
    changeServiceRange() {
      console.log($('#saturday').val())
    }
    ,
    setWorkDay() {
      // workTime.value.fields[0].value.value = sellerWorkTime.value[n.value.value - 1].open_at
      // workTime.value.fields[1].value.value = sellerWorkTime.value[n.value.value - 1].close_at
      // workTime.value.id = sellerWorkTime.value[n.value.value - 1].id
    }

  }
  ,
  data: () => ({
    workDays: [],
    changedPPTime: null,
    workTimes: [
      {open: 0, close: 0},
      {open: 0, close: 0},
      {open: 0, close: 0},
      {open: 0, close: 0},
      {open: 0, close: 0},
      {open: 0, close: 0},
      {open: 0, close: 0}
    ]
  }),
  created() {
    this.activateModel('workTime');
    this.activateModel('sendCost');
  }


}
</script>
<style>
.select-facade2 {
  border: 1px solid rgba(127, 127, 127, 0.4);
  border-radius: 5px;
  padding: 4px 10px 4px 10px;
  position: relative;
  min-width: 80px;
  font-weight: lighter;
  background-color:rgba(0, 0, 0, 0.06)!important;
}
.general-settings {
  width: 100%;
}

.dropdown {
  direction: ltr !important;
}

.btn-secondary {
  color: #6c757d;
  background-color: #fff;
  border-color: #6c757d;
}

.active {
  color: #682AD5 !important;
}

.tabBtn {
  width: 25%;
  margin-right: 5%;
  color: gray;
  border: 2px solid;
  border-radius: 10px;
  height: 30px;
}

.tabBtn:hover {
  color: #682AD5 !important;;
}

.settings {
  background-color: #F5F5F5;
  font-size: 0.85rem;
  font-weight: lighter;
  position: relative;
}

.section-divider {
  background-color: #E8E8E8;
  border-radius: 4px;
  padding: .2rem 1rem .2rem 1rem;
}

.section-divider p {
  margin: 0px;
}

.deactive {
  background: none !important;
  border: none !important;
  color: #000 !important;
  font-weight: normal !important;
}

.right-bar {
  border-left: 1px solid rgba(127, 127, 127, 0.3);
  /*width:25%;*/
  display: inline-block;
  margin: 0px;
  /*position: absolute;*/
  /*top:0px;*/
  /*right:0px;*/
}

.mid-right {
  border-top: 1px solid rgba(127, 127, 127, 0.3);
  border-bottom: 1px solid rgba(127, 127, 127, 0.3);
}

.main-section {
  width: 100%;
  display: inline-block;
  margin: 0px;
  /*position: relative;*/
  /*top: 0px;*/
  /*right:27%;*/
  min-height: 100vh;
}

.bank-form {
  background-color: rgba(127, 127, 127, 0.1);
  padding: 0.1rem 2rem 2rem 2rem;
}

.bank-tab-active {
  background-color: rgba(127, 127, 127, 0.1);
}

.bank-tab {
  text-align: center;
  padding: 1rem 1rem 0px 1rem;
}

#bankTab1 {
  border-top-left-radius: 20px;
}

#bankTab2 {
  border-top-right-radius: 20px;
}

.bank-tab:hover {
  cursor: pointer;
}

.seller-logo-locker img {
  width: 50%;
}


.v-text-field--filled > .v-input__control > .v-input__slot, .v-text-field--full-width > .v-input__control > .v-input__slot, .v-text-field--outlined > .v-input__control > .v-input__slot {
  align-items: stretch;
  min-height: 0px !important;
}

.v-text-field > .v-input__control > .v-input__slot > .v-text-field__slot {
  display: flex;
  flex: 1 1 auto;
  position: relative;
  height: 40px;
}

.workDayRow {
  height: 50px;
}

.workDayCheckBox {
  margin-top: 20%
}

.workDayText {
  margin-top: 10%;
}

table {
  border-collapse: collapse;
  border: none;
}

th,
td {
  border: 1px solid black;
  padding: 4px 16px;
  font-family: Times New Roman;
  font-size: 24px;
  text-align: left;
}

th {
  background-color: #C8C8C8;
  cursor: pointer;
}
</style>
