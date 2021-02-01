<template>
    <div>
        <h3>هزینه ی ارسال</h3>
        <div class="a-range" v-for="(theRange,i) in ranges" :key="i">
            <div>
                <p class="mini-title tBold ml-2">محدوده :</p>
                <p class="mini-title tNormal">{{"از " + theRange.from + " "}}</p>
                <p class="mini-title tNormal mr-1">{{"  تا  " + theRange.to + " متر"}}</p>
            </div>
            <custom-input :deactive="theRange.deactive" label="هزینه ی این محدوده" inputClass="tNormal" kind="text" container="half-width mb-2 mt-4 ml-5" classes="mid-width mr-3" v-bind:theModel.sync="ranges[i]" placeholder="هزینه"></custom-input>
            <custom-button @clicked="()=>toggleActive(i)" classes="field-button" float="left" icon="/assets/site/images/seller-icons/left-arrow-purple.svg" iconSize="small ml-2" :label="theRange.deactive ? 'ویرایش' : 'ثبت'"></custom-button>
        </div>
    </div>    
</template>
<script>
import CustomInput from "../../../Common/CustomInput"
import CustomButton from "../../../Common/customButton"
import { computed, inject, onMounted, reactive, ref} from "@vue/composition-api"
import Service from "../../../../utils/seller-service"
export default {
    components:{
        CustomInput,
        CustomButton
    },
    setup(){
        const ranges = ref([])

        const authService = computed(()=>{
            return Service(true)
        })

        onMounted(()=>{
            authService.value.receive('seller/base/distance',{},(s,d)=>{
                if(s == 200){
                    if(d.data != [] && d.data != null){
                        // ranges.ranges = d.data
                        d.data.map((r)=>{
                            let x = r
                            x.deactive = true
                            x.value = null
                            x.valid = true
                            ranges.value.push(x)
                        })
                        authService.value.receive('seller/base/sendcost',{},(s,d)=>{
                            if(s == 200){
                                if(d.data != null){
                                    if(d.data.length>0){
                                        d.data.map((c)=>{
                                            ranges.value.map((r)=>{
                                                if(r.id == c.distance_id){
                                                    r.value = c.cost
                                                }
                                            })
                                        })
                                    }
                                }
                            }
                        },(s,e)=>{})
                    }
                }
            },(s,e)=>{})
        })

        const global = inject('global')
        
        const toggleActive = (i) => {
            if(!ranges.value[i].deactive){
                let f = new FormData()
                f.append('distance_id',ranges.value[i].id)
                f.append('cost',ranges.value[i].value)
                authService.value.transmit('seller/base/sendcost',f,(s,d)=>{
                    if(s == 200){
                        global.alertToggle('اطلاعات با موفقیت افزوده شد!')
                        ranges.value[i].deactive = !ranges.value[i].deactive
                    }
                },(s,e)=>{
                    global.alertToggle('عملیات ناموفق!')
                })
            }
            else
            ranges.value[i].deactive = !ranges.value[i].deactive
        }

        return {ranges,toggleActive}
    }
}
</script>
<style scoped>
.a-range{
    padding:1.5rem 0.5rem 1.5rem 0.5rem;
    border-bottom: 1px solid rgba(127, 127, 127, 0.3);
}
</style>