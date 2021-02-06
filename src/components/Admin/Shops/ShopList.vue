<template>
    <div class="pt-5 pl-3 pr-3">
        <div class="summary">
            <h3 class="tNormal">سفارشات</h3>
            <div class="search-section row">
                <div class="col-3">
                    <custom-input kind="text" container="full-width" classes="full-width pb-2 pr-1" v-bind:theModel.sync="shopMobile" label="جستجوی کاربر" placeholder="شماره موبایل"></custom-input>
                </div>
                <div class="col-3">
                    <custom-input kind="searchInput" @addTag="selectDistrict" container="full-width" classes="full-width pb-2 pr-1" :suggestions="districts" v-bind:theModel.sync="theDistrict" label="منطقه" :placeholder="(theDistrict.value != null ? '' : 'منطقه')">
                        <p v-if="theDistrict.value != null">{{theDistrict.value.name}}</p>    
                    </custom-input>    
                </div>
                <div class="col-3">
                    <custom-input kind="dropDown" container="full-width" classes="full-width pb-0" :selectItems="categories" v-bind:theModel.sync="theCategory" label="دسته بندی" placeholder="دسته بندی"></custom-input>    
                </div>
                <div class="col-2 mt-1 pt-4">
                    <button class="purple-btn" @click="search">جستجو</button>
                </div>
            </div>
            <table class="mt-2">
                <tr>
                    <th class="small-cell">نام فروشگاه</th>
                    <th>نام فروشنده</th>
                    <th class="small-cell">شماره تلفن</th>
                    <th class="small-cell">آدرس</th>
                    <th class="small-cell">منطقه</th>
                    <th>گزینه ها</th>
                </tr>
                <one-shop @goToPanel="goToPanel" v-for="(shop,i) in shops" :key="i" :theShop="shop"></one-shop>
            </table>
        </div>
    </div>
</template>
<script>
import { computed, inject, onMounted, ref} from "@vue/composition-api"
import OneShop from './partials/OneShopRow'
import Service from '../../../utils/admin-service'
import CustomInput from '../../Common/CustomInput'
export default {
    components:{
        OneShop,
        CustomInput
    },
    setup(props,context){
        const shops = ref(null)
        const shopMobile = ref({value:null,valid:true})
        const districts = ref([])
        const categories = ref([])
        const theCategory = ref({value:null,valid:true})
        const theDistrict = ref({value:null,valid:true})
        const theService = computed(()=>{
            return Service(false)
        })

        const global = inject('global')

        onMounted(()=>{
            theService.value.receive('admin/category',{},(s,d)=>{
                if(s == 200){
                    let x = d.data
                    x.map((c)=>{
                        c.text = c.name
                        c.value = c.id
                    })
                    categories.value = x
                    categories.value = [{value:null,text:'تمامی دسته بندی ها'}].concat(categories.value)
                }
            },(s,e)=>{

            })
            theService.value.receive('admin/district/1',{},(s,d)=>{
                if(s == 200){
                    let x = d.data
                    x.map((xd)=>{
                        xd.text = xd.name
                        xd.value = xd.id
                    })
                    districts.value = x
                }
            },(s,e)=>{

            })
            getAllShops()
        })

        const selectDistrict = (v) =>{
            theDistrict.value.value = v
        }

        const getAllShops = ()=>{
            theService.value.receive('admin/seller/search',{},(s,d)=>{
                if(s==200){
                    shops.value = d.data
                }
            },(s,e)=>{
                
            })
        }


        const search = () => {
            let q = ""
            if(theCategory.value.value != null){
                if(theCategory.value.value.value != null)
                    q = 'category_id=' + theCategory.value.value.value
            }
            if(theDistrict.value.value != null){
                q = (q == "" ? q : q+"&") + 'district_id=' + theDistrict.value.value.value
            }
            if(shopMobile.value.value != null){
                q = (q == "" ? q : q+"&") + 'mobile=' + shopMobile.value.value
            }
            theService.value.receive('admin/seller/search?'+q,{},(s,d)=>{
                if(s==200){
                    shops.value = d.data
                }
            },(s,e)=>{
                
            })
        }

        const goToPanel = (id) => {
            theService.value.receive('admin/seller/return/token/'+id,{},(s,d)=>{
                $cookies.set("Golpino_seller",d.data,2147483647)
                global.toggleLogin(true)
                global.setUserType('seller')
                let routeData = context.root.$router.resolve({name: 'Golpino Seller Settings'})
                window.open(routeData.href, '_blank')
            },(s,e)=>{

            })
        }


        return {search,selectDistrict,theCategory,theDistrict,districts,categories,shops,shopMobile,goToPanel}
    }
}
</script>
<style scoped>
.summary{
    background-color: #fff;
    font-size: 0.9rem;
    font-weight: lighter;
    min-height: 50vh;
    /* width: 100vw; */
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
    width: 5%;
    padding:0.5rem 1rem 0.5rem 1rem;
}
</style>