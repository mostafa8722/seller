<template>
    <div class="result-page">
        <div class="search-bar pt-2 pl-2 pr-2 pb-0">
            <div class="row">
                <div class="search-bar-section" :class="((searchAddress.value == null || searchAddress.value.value == null) ? 'col-3' : 'col-4')">
                    <custom-input inputClass="tNormal" labelClass="tLighter" kind="dropDown" container="full-width" v-bind:theModel.sync="selectedCategory" :selectItems="categories" classes="no-border no-background" placeholder="دسته بندی"></custom-input>
                </div>
                <div class="col-3 search-bar-section" v-if="searchAddress.value == null || searchAddress.value.value == null">
                    <custom-input :placeholder="(selectedDistrict.value == null ? 'منطقه' : '')" inputClass="tNormal" kind="searchInput" container="full-width mt-2" extraClasses="barely-visible" v-bind:theModel.sync="selectedDistrict" :suggestions="districts" @addTag="selectDistrict" classes="no-border">
                                    <p class="shopName" v-if="selectedDistrict.value != null">{{selectedDistrict.value.name}}</p>
                                </custom-input>
                </div>
                <div class="search-bar-section" :class="((searchAddress.value == null || searchAddress.value.value == null) ? 'col-3' : 'col-4')">
                    <custom-input :placeholder="(searchShop.value == null ? 'فروشگاه' : '')" kind="searchInput" :suggestions="shopResults" @addTag="selectShop" labelClass="tLighter" container="full-width mt-2" v-bind:theModel.sync="shopQuery" classes="block no-border full-width">
                       <p class="shopName" v-if="searchShop.value != null">{{searchShop.name}}</p>
                    </custom-input>
                </div>
                <div :class="((searchAddress.value == null || searchAddress.value.value == null) ? 'col-3' : 'col-4')">
                    <div class="h-100 w-100 d-flex justify-content-center align-items-center">
                        <button class="purple-btn" @click="refreshSearch">جستجو</button>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-between container" v-if="gotUserAddresses">
                <!-- <custom-input inputClass="tNormal" labelClass="tLighter mini-title" kind="dropDown" container="half-width mb-2 mt-2" classes="no-border no-background full-width mini-title" v-bind:theModel.sync="searchAddress" :selectItems="userAddresses" placeholder="آدرس"></custom-input> -->
                <div class="logical-width">
                    <custom-input label="انتخاب آدرس" inputClass="tNormal" labelClass="tLighter mini-title" kind="dropDown" container="full-width mb-2 mt-2" classes="no-border logical-width no-background barely-visible mini-title" v-bind:theModel.sync="selectedAddress" :initial="true" :selectItems="userAddresses" placeholder="آدرس"></custom-input>
                </div>
                <custom-button @clicked="loginToAddAddress" float="left" label="افزودن آدرس جدید" icon="/assets/site/images/seller-icons/plus.svg" classes="add-address-btn mt-2" toggle="modal" :target="(isLoggedIn ? '#addressModal' : '')"></custom-button>
            </div>
        </div>
        <address-modal :initial="false" :districts="districts" @addressComplete="sendAddress"></address-modal>
        <div class="results mt-5" v-if="result">
            <h1 class="mini-title"> گلفروشی های تهران</h1>
            <p class="mini-title tLighter" v-if="theQuery.district && theQuery.district != null"> | منطقه ی {{theQuery.district}}</p>
            <p class="mini-title tLighter" v-if="theQuery.category && theQuery.category != null"> | دسته بندی {{theQuery.category}}</p>
            <p class="mini-title tLighter" v-if="theQuery.district && theQuery.shop != null"> | فروشگاه {{theQuery.shop}}</p>
            <p class="tLighter mt-1">{{shops.length}} مورد یافت شد</p>
        </div>
        <div class="full-width d-flex justify-content-center" :class="(!result ? 'mt-5' : '')" v-if="loading">
            <div class="dot-bricks"></div>
        </div>
        <div class="results-results mt-4" v-if="result && !loading">
            <div class="row">
                <div class="col-3">
                    <div class="filters">
                        <div class="filter-section">
                            <p class="tNormal p-0 mb-2">نمایش</p>
                            <div class="d-flex justify-content-between">
                                <custom-button @clicked="()=>displayChange(true)" label="پنجره ای" icon="/assets/site/images/seller-icons/grid.svg" classes="add-address-btn mt-2"></custom-button>
                                <custom-button @clicked="()=>displayChange(false)" label="خطی" icon="/assets/site/images/seller-icons/row.svg" classes="add-address-btn mt-2"></custom-button>
                            </div>
                        </div>
                        <div class="filter-section">
                            <p class="tNormal p-0 mb-2">فیلتر ها</p>
                            <custom-input kind="radio" :selectItems="typeFilters" name="filter" v-bind:theModel.sync="typeFilter" classes="ml-2" container="tLighter mb-1"></custom-input>
                        </div>
                        <div class="filter-section">
                            <p class="tNormal p-0 mb-2">مرتب سازی</p>
                            <custom-input kind="radio" :selectItems="sortFilters" name="filter" v-bind:theModel.sync="sortFilter" classes="ml-2" container="tLighter mb-1"></custom-input>
                        </div>
                        <div class="filter-section price-section">
                            <p class="tNormal">محدوده ی قیمت (تومان)</p>
                            <vue-slider :silent="true" :tooltip-formatter="formatToolTip" :min="0" :max="1000000" v-model="priceRange" :enable-cross="false"></vue-slider>
                            <p class="mt-2">از {{priceMin}} تومان</p>
                            <p>تا {{priceMax}} تومان</p>
                        </div>
                    </div>
                </div>
                <div class="col-9">
                    <div class="row" v-if="grid">
                        <div class="col-3 mb-2" v-for="(shop,i) in shops" :key="i">
                            <shop-thumb :theShop="shop"></shop-thumb>
                        </div>
                    </div>
                    <div v-else class="row">
                        <div class="col-12 mb-2" v-for="(shop,i) in shops" :key="i">
                            <shop-thumb :grid="false" :theShop="shop"></shop-thumb>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="no-result mt-5 p-5" v-else-if="!result && !loading">
            <div class="no-result-message">
                <p>جستجوی شما نتیجه ای در بر نداشت</p>
            </div>
            <div class="no-result-huide mt-4">
                <p>تلاش کنید :</p>
                <p>- آدرس را غیر فعال کنید</p>
                <p>- از عبارات متداول تر استفاده کنید</p>
                <p>- املای عبارات وارد شده را بررسی کنید</p>
                <p>پیشنهاد :</p>
                <p @click="showAll" class="link-like">برای مشاهده ی تمام محصولات گل می توانید روی لینک کلیک کنید</p>
            </div>
        </div>
    </div>
</template>
<script>
import CustomInput from "../../Common/CustomInput"
import IconImage from "../../Common/icon"
import ShopThumb from "../Layout/ShopThumb"
import Service from "../../../utils/service"
import CustomButton from "../../Common/customButton"
import AddressModal from "../../Common/AddressModal"
import {ref,inject, computed, onMounted,reactive,watch} from "@vue/composition-api"
import currencyFormatter from "../../use/fomatCurrency"
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
import $ from 'jquery'
export default {
    components:{
        CustomInput,
        IconImage,
        ShopThumb,
        CustomButton,
        AddressModal,
        VueSlider
    },
    setup(props,context){
        // console.log("props",context.root.$route.query.category_id)
        // context.root.$router.push({path:'/search', query: {category_id:2}})
        const categories = ref([])
        const districts = ref([])
        const shopResults = ref([])
        const userAddresses = ref([])
        const loading = ref(false)
        const global = inject('global')
        const stateValues = inject('stateValues')
        const shops = computed(()=>{
            return stateValues.stateValues.value.searchShops
        })
        const theQuery = computed(()=>{
            return stateValues.stateValues.value.searchQuery
        })
        const result = computed(()=>{
            if(shops.value != null){
                if(shops.value.length > 0)
                    return true
            }
            else
                return false
        })
        const authService = ref(Service(true))
        const theService = computed(()=>{
            return Service(false)
        })
        const addresses = ref([{text:'میرداماد - خیابان مطهری - کوچه ی علیاری - پلاک 5',value:1},{text:'میرداماد - خیابان مطهری - کوچه ی علیاری - پلاک 5',value:2},{text:'میرداماد - خیابان مطهری - کوچه ی علیاری - پلاک 5',value:3}])


        const cookieFinder = () =>
              {
                let match = document.cookie.match(new RegExp('(^| )' + 'Golpino_token' + '=([^;]+)'));
                if (match) {
                 return match[2]
                }
                else{
                    return 'no-auth'
                }
            }
        
        const isLoggedIn = computed(()=>{
            return global.user.value.isLoggedIn
        })
        watch(isLoggedIn,()=>{
            setTimeout(()=>{
                authService.value = Service(true)
                getUserAddresses()
            },500)
        })

        const loginToAddAddress = () => {
            if(!isLoggedIn.value){
                global.alertToggle('لطفا برای افزودن آدرس ابتدا وارد حساب کاربری شوید')
            }
        }

        const selectedCategory = ref({value:null,valid:true})
        const selectedDistrict = ref({value:null,valid:true})
        const shopName = computed(()=>{
            if(context.root.$route.query.name){
                return context.root.$route.query.name
            }
            else
                return null
        })
        const searchCategory = computed(()=>{
            if(context.root.$route.query.category){
                let q = ""
                categories.value.map((aCat)=>{
                    if(aCat.name == context.root.$route.query.category){
                        q = {value:aCat.id,name:aCat.name}
                    }
                })
                return {value:q,valid:true}
            }
            else
                return {value:null,valid:true}
        })
        const searchDistrict = computed(()=>{
            if(context.root.$route.query.district){
                let q = ""
                districts.value.map((aDist)=>{
                    if(aDist.name == context.root.$route.query.district){
                        q = {value:aDist.id,name:aDist.name}
                    }
                })
                return {value:q,valid:true}
            }
            else
                return {value:null,valid:true}
        })
        const searchShop = ref({valid:true,value:null})
        const searchAddress = computed(()=>{
            if(context.root.$route.query.address){
                return {value:context.root.$route.query.address,valid:true}
            }
            else
                return {value:null,valid:true}
        })
        const selectedAddress = ref({valid:true,value:null})
        const shopQuery = reactive({value:null,valid:true})
        
        onMounted(()=>{
            loading.value = true
            getDistricts()
            getCategories()
            getUserAddresses()
            // if(stateValues.stateValues.value.notEmptySearch){
            //     stateValues.emptySearch(false)
                // doSearch()
            // }
        })

        watch(shopQuery,(n,o)=>{
            if(n.id != ''){
                theService.value.receive('search/sellername?name='+n.id,{},(s,d)=>{
                    if(s == 200){
                        shopResults.value = d.data
                        shopResults.value.map((sh)=>{
                            sh.text = sh.name
                            sh.value = sh.id
                        })
                    }
                    
                },errorHandler)
            }
        })

        const errorHandler = (s,e)=>{
            loading.value = false
        }

        const getCategories = () => {
            if(localStorage.G_categories && JSON.parse(localStorage.G_categories).length>0){
                categories.value = JSON.parse(localStorage.G_categories)
                doSearch()
                categories.value.map((aCat)=>{
                        if(aCat.name == context.root.$route.query.category){
                            setTimeout(()=>{
                                selectedCategory.value = {value:aCat,valid:true}
                            },500)
                        }
                    })
            }
            else{
                theService.value.receive('search/category',{},(s,d)=>{
                if(s == 200){
                    categories.value = d.data
                    categories.value.map((c)=>{
                        c.text = c.name
                        c.value = c.id
                    })
                    categories.value = [{value:null,text:'تمامی دسته بندی ها'}].concat(categories.value)
                    categories.value.map((aCat)=>{
                        if(aCat.name == context.root.$route.query.category){
                            selectedCategory.value.value = aCat
                        }
                    })
                    localStorage.G_categories = JSON.stringify(categories.value)
                doSearch()
                }
            },errorHandler)
            }
        }
        const gotUserAddresses = ref(false)
        const getUserAddresses = () => {
            authService.value.receive('user/address',{},(s,d)=>{
                if(s == 200 && d.data.length>0){
                    // let xx = d.data[0]
                    // xx.value = d.data[0].id
                    // xx.text = d.data[0].name + ' : ' + d.data[0].address
                    // searchAddress.value.value = xx
                    if(searchAddress.value.value != null){
                        d.data.map((addr)=>{
                            if(searchAddress.value.value == addr.id){
                                selectedAddress.value.value = {value:addr.id,text:addr.name + ' : ' + addr.address,...addr}
                            }
                        })
                    }
                    userAddresses.value = d.data
                    userAddresses.value.map((addr)=>{
                        addr.value = addr.id
                        addr.text = addr.name + ' : ' + addr.address
                    })
                    userAddresses.value = [{value:null,text:'غیر فعال',id:null}].concat(userAddresses.value)
                }
                gotUserAddresses.value = true
            },errorHandler)
        }

        const getDistricts = () =>{
            if(localStorage.G_districts && JSON.parse(localStorage.G_districts).length>0){
                districts.value = JSON.parse(localStorage.G_districts)
                districts.value.map((aDist)=>{
                    if(aDist.name == context.root.$route.query.district){
                        selectedDistrict.value.value = aDist
                    }
                })
            }
            else{
                theService.value.receive('search/district',{},(s,d)=>{
                    if(s == 200){
                        districts.value = d.data
                        districts.value.map((dis)=>{
                            dis.value = dis.id
                            dis.text = dis.name
                        })
                        districts.value.map((aDist)=>{
                            if(aDist.name == context.root.$route.query.district){
                                selectedDistrict.value.value = aDist
                            }
                        })
                        localStorage.G_districts = JSON.stringify(districts.value)
                    }
                })
            }
        }
        const sendAddress = (ad) => {
            let f = new FormData()
            f.append('name',ad.name.value)
            f.append('district_id',ad.district_id)
            f.append('lat',ad.lat)
            f.append('long',ad.long)
            f.append('address',ad.address.value)
            authService.value.transmit('user/address',f,(s,d)=>{
                if(s == 200){
                    getUserAddresses()
                    $(function () {
                        $('#addressModal').modal('toggle');
                    });
                }
            },errorHandler)
        }
        const selectShop = (shop)=>{
            searchShop.value = shop
            context.root.$router.push('/shop/'+shop.id)
            shopQuery.value = ''
            shopQuery.id = ''
        }
        const refreshSearch = () => {
                let sQuery = ""
                if(selectedCategory.value.value != null){
                    if(selectedCategory.value.value.value != null)
                        sQuery = sQuery + "category=" + selectedCategory.value.value.name
                }
                if(selectedDistrict.value.value != null){
                    if(sQuery != ""){
                        sQuery = sQuery+"&"
                    }
                    sQuery = sQuery + "district=" + selectedDistrict.value.value.name
                }
                if(selectedDistrict.value.value != null){
                    if(sQuery != ""){
                        sQuery = sQuery+"&"
                    }
                    sQuery = sQuery + "district=" + selectedDistrict.value.value.name
                }
                if(selectedAddress.value.value != null){
                    if(selectedAddress.value.value.value!=null){
                        if(sQuery != ""){
                            sQuery = sQuery+"&"
                        }
                        sQuery = sQuery + 'address=' + selectedAddress.value.value.value
                    }
                }
                if(shopQuery.id){
                    if(shopQuery.id != ''){
                        if(sQuery != ""){
                            sQuery = sQuery+"&"
                        }
                        sQuery = sQuery + 'name=' + shopQuery.id
                    }
                }
                
                
                context.root.$router.push('/search?'+sQuery).catch(err => {})
        }
        const updateToSearch = (s,d) => {
            loading.value = false
            if(s == 200){
                let sQuery = ""
                let query = {}
                if(searchCategory.value.value != null){
                    query = {category:searchCategory.value.value.name} 
                }
                if(searchDistrict.value.value != null){
                    query = {...query,district:searchDistrict.value.value.name} 
                }
                if(searchShop.value.value != null){
                    query = {...query,shop:searchDistrict.value.name}
                }
                
                stateValues.setShops(d.data,query)
            }
        }

        const doSearch = () => {
            let query = ''
            loading.value = true
            if(searchCategory.value.value != null){
                if(searchCategory.value.value.value != null)
                query = query + 'category_id=' + searchCategory.value.value.value 
            }
            if(searchAddress.value.value == null || searchAddress.value.value.value == null){
                if(searchDistrict.value.value != null){
                    if(query != '')
                        query = query + '&district_id=' + searchDistrict.value.value.value
                    else
                        query = query + 'district_id=' + searchDistrict.value.value.value
                }
            }
            if(shopName.value != null){
                    if(query != '')
                        query = query + '&name=' + shopName.value
                    else
                        query = query + 'name=' + shopName.value
            }
            if(searchAddress.value.value != null){
                    if(query != '')
                        query = query + '&address_id=' + searchAddress.value.value
                    else
                        query = query + 'address_id=' + searchAddress.value.value
            }

            theService.value.receive('search?' + query,{},updateToSearch,errorHandler)
        }

        const showAll = () =>{
            context.root.$router.push('/search')
        }

        // FILTERS
        const typeFilter = reactive({
            value:null,
            valid:true
        })

        const typeFilters = ref([
            {text:'تخفیف دارها',value:1},
            {text:'گلدان',value:2},
            {text:'گل و گیاه دارویی',value:3},
            {text:'گل آرایی',value:4},
            {text:'تجهیزات باغبانی',value:5}
        ])
        const sortFilter = reactive({
            value:null,
            valid:true
        })
        const querySearch = computed(()=>{
            return context.root.$route.fullPath
        })
        watch(()=>(querySearch.value),(n,o)=>{
            doSearch()
        })

        const sortFilters = ref([
            {text:'ارزان ترین',value:1},
            {text:'گران ترین',value:2},
            {text:'نزدیک ترین',value:3},
            {text:'جدید ترین',value:4},
            {text:'بالاترین امتیاز',value:5}
        ])

        const priceRange = ref([0,1000000])
        const formatToolTip = v => currencyFormatter(v+"")
        const priceMax = computed(()=>{
            return currencyFormatter(priceRange.value[1]+"")
        })
        const priceMin = computed(()=>{
            return currencyFormatter(priceRange.value[0]+"")
        })
        const grid = ref(true)
        const displayChange = (v) => {
            grid.value = v
        }
        const priceMarks = {
            0:'0 تومان',
            500000:'500 هزار تومان',
            1000000:'یک میلیون تومان'
         }

         const selectDistrict = (di) => {
            selectedDistrict.value.value = di
        }
        return {selectedAddress,showAll,loading,refreshSearch,selectedCategory,selectedDistrict,selectDistrict,displayChange,grid,priceMarks,priceMax,priceMin,formatToolTip,priceRange,sortFilter,sortFilters, typeFilter,typeFilters,gotUserAddresses,isLoggedIn,loginToAddAddress,searchCategory,searchDistrict,searchShop,searchAddress,sendAddress,userAddresses,result,shops,categories,districts,addresses,doSearch,selectShop,shopResults,shopQuery,theQuery}
    }
}
</script>
<style scoped>
.result-page{
    background-color: #fafafa;
    padding:3rem 6.5rem 3rem 6.5rem;
    min-height: 160vh;
}
.search-bar{
    background-color: #EEEEEE;
    width: 100%;
    border:1px solid rgba(127, 127, 127, 0.2);
    border-radius: 6px;
}

.search-bar .row{
    border-bottom: 1px solid rgba(127, 127, 127, 0.15);
}

.purple-btn{
    width: 60%;
}
.search-bar-section{
    border-left: 1px solid rgba(127, 127, 127, 0.15);
    padding: 0.2rem 0.8rem 0.4rem 0.8rem;
}

.results h1{
    font-size: 1.3rem;
    font-weight: normal;
}

.no-result{
    background-color: #fff;
    width: 100%;
    border-radius: 6px;
}

.no-result-message{
    background-color: #FFF3EF;
    border-radius: 6px;
    border: 1px solid #FFCDBA;
    width: 100%;
    color: #e6997c;
    padding:1rem 2rem 1rem 2rem;
}

.link-like{
    color: #69b9ff;
}

.link-like:hover{
    cursor: pointer;
    text-decoration: underline;
}

.filters{
    width: 100%;
    height: 100vh;
    /* position: sticky;
    top: 10vh;
    right:0px; */
}

.filter-section{
    width: 100%;
    padding: 0.8rem 1.2rem 0.8rem 1.2rem;
    background-color: #fff;
    border: 1px solid rgba(127, 127, 127, 0.15);
    border-radius: 5px;
    font-size: 0.85rem;
    margin-bottom: 1.5rem;
}

.price-section{
    font-size: 0.8rem;
    font-weight: lighter;
}
</style>
