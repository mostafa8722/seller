<template>
    <div class="admin-page">
        <h3>افزودن کد تخفیف</h3>
        <div class="admin-form mt-4">
            <div class="admin-tab">
                <div class="row">
                    <div class="col-6">
                        <custom-input kind="text" key="1" container="full-width mt-3" classes="full-width" v-bind:theModel.sync="discount.name" label="نام" placeholder="نام کد"></custom-input>
                    </div>
                    <div class="col-6">
                        <custom-input kind="text" key="2" container="full-width mt-3" classes="full-width" v-bind:theModel.sync="discount.value" label="مقدار" placeholder="مقدار کد"></custom-input>
                    </div>
                    <div class="col-6">
                        <custom-input kind="text" key="3" container="full-width mt-3" classes="full-width" v-bind:theModel.sync="discount.percent" label="درصد" placeholder="درصد تخفیف"></custom-input>
                    </div>
                    <div class="col-6">
                        <custom-input kind="text" key="4" container="full-width mt-3" classes="full-width" v-bind:theModel.sync="discount.number" label="تعداد" placeholder="تعداد تخفیف"></custom-input>
                    </div>
                    <div class="col-6">
                        <custom-input kind="text" key="5" container="full-width mt-3" classes="full-width" v-bind:theModel.sync="discount.min" label="حداقل" placeholder="حداقل"></custom-input>
                    </div>
                    <div class="col-6">
                        <custom-input kind="text" key="6" container="full-width mt-3" classes="full-width" v-bind:theModel.sync="discount.max" label="حداکثر" placeholder="حداکثر"></custom-input>
                    </div>
                    <div class="col-6 mt-4">
                        <date-picker label="زمان شروع"  v-model="discount.begins" color="#9147FF"></date-picker>
                    </div>
                    <div class="col-6 mt-4">
                        <date-picker label="زمان پایان"  v-model="discount.ends" color="#9147FF"></date-picker>
                    </div>
                </div>
            </div>
            <div class="adminSend">
                <button class="purple-btn" @click="addDiscount">ارسال</button>
            </div>
        </div>
    </div>    
</template>
<script>
import CustomInput from "../../Common/CustomInput"
import {ref,computed,inject,onMounted, reactive} from "@vue/composition-api"
import Service from "../../../utils/admin-service"
import VuePersianDatetimePicker from 'vue-persian-datetime-picker';
// import {useRoute} from "vue-router"
export default {
    components:{
        CustomInput,
        datePicker:VuePersianDatetimePicker
    },
    setup(props,context){
        // component
        const cities = ref([{text:'دیرکرد',value:1},{text:'خرابی',value:2}])
        const global = inject('global')
        const edit = ref(false)
        const theService = computed(()=>{
            return Service(false)
        })

        onMounted(() => {
            if(context.root.$route.params.id){
                edit.value = true
                theService.value.receive('admin/discount/'+context.root.$route.params.id,{},getDiscountToEdit,failedAdd)
            }
        })

        const discount = reactive({
            name:{value:null,valid:true},
            value:{value:null,valid:true},
            percent:{value:null,valid:true},
            number:{value:null,valid:true},
            min:{value:null,valid:true},
            max:{value:null,valid:true},
            begins:null,
            ends:null
        })
        let discountToEdit = {}

        const getDiscountToEdit = (s,d) =>{
            edit.value = true
            discount.name.value = d.data.name
            discount.value.value = d.data.value
            discount.percent.value = d.data.percent
            discount.number.value = d.data.number
            discount.min.value = d.data.min
            discount.max.value = d.data.max
            let gBegins = d.data.start_at.substring(0,10)
            let gEnds = d.data.expired_at.substring(0,10)
            gBegins = gBegins.split('-')
            gEnds = gEnds.split('-')
            gBegins = gregorian_to_jalali(parseInt(gBegins[0]),parseInt(gBegins[1]),parseInt(gBegins[2]))
            gEnds = gregorian_to_jalali(parseInt(gEnds[0]),parseInt(gEnds[1]),parseInt(gEnds[2]))
            discount.begins = "" + gBegins[0] + "/" + gBegins[1] + "/" + gBegins[2]
            discount.ends = "" + gEnds[0] + "/" + gEnds[1] + "/" + gEnds[2]
            discountToEdit.name = d.data.name
            discountToEdit.value = d.data.value
            discountToEdit.min = d.data.min
            discountToEdit.max = d.data.max
            discountToEdit.percent = d.data.percent
            discountToEdit.number = d.data.number
            discountToEdit.begins = d.data.start_at
            discountToEdit.ends = d.data.expired_at
        }

        function gregorian_to_jalali(gy, gm, gd) {
            let g_d_m, jy, jm, jd, gy2, days;
            g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
            gy2 = (gm > 2) ? (gy + 1) : gy;
            days = 355666 + (365 * gy) + ~~((gy2 + 3) / 4) - ~~((gy2 + 99) / 100) + ~~((gy2 + 399) / 400) + gd + g_d_m[gm - 1];
            jy = -1595 + (33 * ~~(days / 12053));
            days %= 12053;
            jy += 4 * ~~(days / 1461);
            days %= 1461;
            if (days > 365) {
                jy += ~~((days - 1) / 365);
                days = (days - 1) % 365;
            }
            if (days < 186) {
                jm = 1 + ~~(days / 31);
                jd = 1 + (days % 31);
            } else {
                jm = 7 + ~~((days - 186) / 30);
                jd = 1 + ((days - 186) % 30);
            }
            return [jy, jm, jd];
        }

        const jalali_to_gregorian = (jy, jm, jd) => {
            let sal_a, gy, gm, gd, days;
            jy += 1595;
            days = -355668 + (365 * jy) + (~~(jy / 33) * 8) + ~~(((jy % 33) + 3) / 4) + jd + ((jm < 7) ? (jm - 1) * 31 : ((jm - 7) * 30) + 186);
            gy = 400 * ~~(days / 146097);
            days %= 146097;
            if (days > 36524) {
                gy += 100 * ~~(--days / 36524);
                days %= 36524;
                if (days >= 365) days++;
            }
            gy += 4 * ~~(days / 1461);
            days %= 1461;
            if (days > 365) {
                gy += ~~((days - 1) / 365);
                days = (days - 1) % 365;
            }
            gd = days + 1;
            sal_a = [0, 31, ((gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            for (gm = 0; gm < 13 && gd > sal_a[gm]; gm++) gd -= sal_a[gm];
            return [gy, gm, gd];
        }

        const gregorianEnds = computed(()=>{
            if(discount.ends == null)
                return null
            let x = discount.ends.split('/')
            
            return jalali_to_gregorian(parseInt(x[0]),parseInt(x[1]),parseInt(x[2]))
        })

        const gregorianBegins = computed(()=>{
            if(discount.ends == null)
                return null
            let x = discount.begins.split('/')
            
            return jalali_to_gregorian(parseInt(x[0]),parseInt(x[1]),parseInt(x[2]))
        })

        // FORM
        const successfullAdd = (s,d) => {
            if(s == 200){
                global.alertToggle('با موفقیت افزوده شد!')
            }
        }

        const failedAdd = (server,e) => {
            if(!server){
                e.response.data.error.invalid_params.map((ip)=>{
                for (const [key, value] of Object.entries(discount)) {
                        if(typeof value === 'object' && value !== null){
                            if(key == ip.field){
                            value.valid = false
                            value.message = ip.message
                            }
                        }
                        else{
                            if(key == ip.field){
                            error.value = ip.message
                            }
                        }
                    }
                })
            } 
        }
        const addDiscount = () => {
            if(edit.value){
                let f = new FormData()
                if(discountToEdit.name != discount.name.value)
                    f.append("name",discount.name.value)
                if(discountToEdit.value != discount.value.value)
                    f.append("value",parseInt(discount.value.value))
                if(discountToEdit.percent != discount.percent.value)
                    f.append("percent",parseInt(discount.percent.value))
                if(discountToEdit.number != discount.number.value)
                    f.append("number",parseInt(discount.number.value))
                if(discountToEdit.min != discount.min.value)
                    f.append("min",parseInt(discount.min.value))
                if(discountToEdit.max != discount.max.value)
                    f.append("max",parseInt(discount.max.value))
                
                let begins =""+ (gregorianBegins.value[0]>=10 ? gregorianBegins.value[0] : '0'+gregorianBegins.value[0]) + "-" + (gregorianBegins.value[1]>=10 ? gregorianBegins.value[1] : '0'+gregorianBegins.value[1]) + "-" + (gregorianBegins.value[2]>=10 ? gregorianBegins.value[2] : '0'+gregorianBegins.value[2])
                let ends =""+ (gregorianEnds.value[0]>=10 ? gregorianEnds.value[0] : '0'+gregorianEnds.value[0]) + "-" + (gregorianEnds.value[1]>=10 ? gregorianEnds.value[1] : '0'+gregorianEnds.value[1]) + "-" + (gregorianEnds.value[2]>=10 ? gregorianEnds.value[2] : '0'+gregorianEnds.value[2])
                if(!discountToEdit.begins.includes(begins))
                f.append("start_at",begins)
                if(!discountToEdit.ends.includes(ends))
                f.append("expired_at",ends)
                
                theService.value.transmit('admin/discount/'+context.root.$route.params.id,f,successfullAdd,failedAdd)
            }
            else{
                let f = new FormData()
                if(discount.name.value!=null)
                f.append("name",discount.name.value)
                if(discount.value.value!=null)
                f.append("value",parseInt(discount.value.value))
                if(discount.percent.value!=null)
                f.append("percent",parseInt(discount.percent.value))
                if(discount.number.value!=null)
                f.append("number",parseInt(discount.number.value))
                if(discount.min.value!=null)
                f.append("min",parseInt(discount.min.value))
                if(discount.max.value!=null)
                f.append("max",parseInt(discount.max.value))
                
                let begins =""+ (gregorianBegins.value[0]>=10 ? gregorianBegins.value[0] : '0'+gregorianBegins.value[0]) + "-" + (gregorianBegins.value[1]>=10 ? gregorianBegins.value[1] : '0'+gregorianBegins.value[1]) + "-" + (gregorianBegins.value[2]>=10 ? gregorianBegins.value[2] : '0'+gregorianBegins.value[2])
                let ends =""+ (gregorianEnds.value[0]>=10 ? gregorianEnds.value[0] : '0'+gregorianEnds.value[0]) + "-" + (gregorianEnds.value[1]>=10 ? gregorianEnds.value[1] : '0'+gregorianEnds.value[1]) + "-" + (gregorianEnds.value[2]>=10 ? gregorianEnds.value[2] : '0'+gregorianEnds.value[2])
                f.append("start_at",begins)
                f.append("expired_at",ends)
                theService.value.transmit('admin/discount',f,successfullAdd,failedAdd)
            }
        }

        return {addDiscount,discount,discountToEdit}
    }
}
</script>
<style scoped>
.admin-page{
    padding:2rem 5rem 2rem 5rem;
}

.admin-tab-bar{
    background-color: #fff;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
}

.admin-tab-bar .active{
    background-color: rgba(127, 127, 127, 0.1);
}

.admin-form{
    border-radius: 8px;
    background-color: rgba(127, 127, 127, 0.1);
    border:1px solid rgba(127, 127, 127, 0.2);
    min-height: 70vh;
}
.admin-tab-button{
    display: inline-block;
    min-width:10%;
    padding-top:1rem;
    margin-left: 3rem;
    padding-right: 1rem;
    padding-left: 1rem;
    text-align: center;
}

.admin-tab{
    padding:1.5rem 2rem 1.5rem 2rem;
    border-bottom: 1px solid rgba(127, 127, 127, 0.3);
    min-height: 50vh;
}

.adminSend{
    padding:1.5rem 2rem 1.5rem 2rem;
    text-align: left;
}


.admin-tab-button:hover{
    cursor: pointer;
}

.admin-locker{
    width: 15%;
    margin:1rem;
    border:2px dashed #9147FF;
    padding:0.3rem;
}

.admin-locker img{
    width: 100%;
}
</style>