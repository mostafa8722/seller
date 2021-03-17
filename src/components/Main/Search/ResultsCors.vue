<template>
    <div class="result-page">
        
    </div>
</template>
<script>
import CustomInput from "../../Common/CustomInput"
import NewInput from "../../Common/NewCustomInput"
import IconImage from "../../Common/icon"
import ShopThumb from "../Layout/ShopThumb"
import Service from "../../../utils/service-cors"
import CustomButton from "../../Common/customButton"
import AddressModal from "../../Common/AddressModal"
import {ref,inject, computed, onMounted,reactive,watch} from "@vue/composition-api"
import currencyFormatter from "../../use/fomatCurrency"
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
import axios from 'axios'
import $ from 'jquery'
export default {
    components:{
        CustomInput,
        IconImage,
        ShopThumb,
        CustomButton,
        AddressModal,
        VueSlider,
        NewInput
    },
    setup(props,context){
        // console.log("props",context.root.$route.query.category_id)
        // context.root.$router.push({path:'/search', query: {category_id:2}})
        const categories = ref([])
        const districts = ref([])
        const shopResults = ref([])
        const productResults = ref([])
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
        const productName = computed(()=>{
            if(context.root.$route.query.product_name){
                return context.root.$route.query.product_name
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
        const searchProduct = ref({value:null,valid:true})
        const searchAddress = computed(()=>{
            if(context.root.$route.query.address){
                return {value:context.root.$route.query.address,valid:true}
            }
            else
                return {value:null,valid:true}
        })
        const selectedAddress = ref({valid:true,value:null})
        const shopQuery = reactive({value:null,valid:true})
        const productQuery = reactive({value:null,valid:true})
        
        onMounted(async ()=>{
            // loading.value = true
            // getDistricts()
            // getCategories()
            getUserAddresses()
            // // doSearch()
            doSearch()
            // var xhr = new XMLHttpRequest();
            // xhr.withCredentials = true;

            // xhr.addEventListener("readystatechange", function() {
            // if(this.readyState === 4) {
            //     console.log(this.responseText);
            // }
            // });

            // xhr.open("GET", "https://api.golpino.com/api/user/address");
            // xhr.setRequestHeader("Authorization", "Bearer " + cookieFinder());

            // xhr.send();
            // var xhr2 = new XMLHttpRequest();
            // xhr2.withCredentials = true;

            // xhr2.addEventListener("readystatechange", function() {
            // if(this.readyState === 4) {
            //     console.log(this.responseText);
            // }
            // });

            // xhr2.open("GET", "https://gol.aminabedi.com/api/user/address");
            // xhr2.setRequestHeader("Authorization", "Bearer " + cookieFinder());

            // xhr2.send();


            // var requestOptions = {
            //     method: 'GET',
            //     redirect: 'follow',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Accept': 'application/json',
            //         'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiYTRhYzk4ZjkyYmUyZGVkZWI3MWI0MDMzNGVlNDliZjkyYzBkNTNmN2ExODM1N2ZjODIwZGNhNTVjYjc1NWM1YjMyZTY4OTJlNWQ5YmJjMDAiLCJpYXQiOiIxNjE1MzY0NjY4LjEyODM3MCIsIm5iZiI6IjE2MTUzNjQ2NjguMTI4MzczIiwiZXhwIjoiMTY0NjkwMDY2OC4xMjIxNzMiLCJzdWIiOiI2MiIsInNjb3BlcyI6W119.oVGCFU1P9_YNt1UovesXETRzGiVV2p2iNKF9nfD-t2zpboKyrIUdR56mfPY_4JHNsxuU_ZDqzGlPtZCto-glR1zjBF53Hq4YwjWRZKlXWgBTuYs-FNKoHDiFb8H0-MCuWMwqtZJv3bAg2HlTTDZdHvWEhp3WmbJ3VDoUkEoGySnwc_lVYsQFd2xzwWC4c8S4Fiff-6GMEJkkaYi6FSLof69XisQ4cW28SqO97GxfNvP7WIPyeMMV_2Rid4GjkO6fxDrTVrd1o-qBpED2mkBrxkHIB_GVEWb7-Frwcao5TaTCsha1Q-nQ8iZl_IXBIRWN4LWzmb9DHpD2lzXFAqrcyc60XVCHTCx9V7wRU22nwutl8OIwd-fW2d30pigpFqdzeCYhYC3H9xRwPWkBtBJRNN1kqErsbS28ELXV5ZzfaBflA2P63sjVPt8NqGDndjTDTy66Ewyg__umBqxFpAhflhhPwHdj9LZsdsJiX7OBpWV2s18ZKJlu4Y04jDmJNfD5ti8srwbH0oSb0npeeZhXZLo6D_vF0Pki5sa_ylwhPZJaFLReCAYGBZenwW1E8dnJV27WCIYAh-XYeA_XBUut_d3HIt07HEfYUYwSR86bs_v1T_3XMldKDxKYYazvYK6_2OmOXN9OOGtYFcHhUsdPCOKWTw27hk47B_irQwsLppU'
            //     }
            // };

            // fetch("https://gol.aminabedi.com/api/user/address", requestOptions)
            // .then(response => response.text())
            // .then(result => console.log(result))
            // .catch(error => console.log('error', error));
            
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
        watch(productQuery,(n,o)=>{
            if(n.d != ''){
                theService.value.receive('search/productname?product_name='+n.id,{},(s,d)=>{
                    if(s == 200){
                        productResults.value = d.data
                        productResults.value.map((sh)=>{
                            sh.text = 'گل فروشی ' + sh.name + '(' + sh.number + ' محصول مشابه)'
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
                                selectedCategory.value = {value:aCat,valid:true}
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
        const selectProduct = (productShop)=>{
            searchProduct.value = productShop
            context.root.$router.push('/shop/'+productShop.id)
            productQuery.value = ''
            productQuery.id = ''
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
                if(productQuery.id){
                    if(productQuery.id != ''){
                        if(sQuery != ""){
                            sQuery = sQuery+"&"
                        }
                        sQuery = sQuery + 'product_name=' + productQuery.id
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
                    query = {...query,shop:searchShop.value.name}
                }
                if(searchProduct.value.value != null){
                    query = {...query,shop:searchProduct.value.name}
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
            if(productName.value != null){
                    if(query != '')
                        query = query + '&product_name=' + productName.value
                    else
                        query = query + 'product_name=' + productName.value
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
        return {selectedAddress,showAll,loading,refreshSearch,selectedCategory,selectedDistrict,selectDistrict,displayChange,grid,priceMarks,priceMax,priceMin,formatToolTip,priceRange,sortFilter,sortFilters, typeFilter,typeFilters,gotUserAddresses,isLoggedIn,loginToAddAddress,searchCategory,searchDistrict,searchShop,searchAddress,sendAddress,userAddresses,result,shops,categories,districts,addresses,doSearch,selectShop,selectProduct,productResults,productQuery,searchProduct,shopResults,shopQuery,theQuery}
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

.mycol-2{
    flex: 0 0 19.9%;
    max-width: 19.9%;
}

</style>
