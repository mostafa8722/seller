<template>
    <!-- Modal -->
<div class="modal fade" id="addressModal" tabindex="-1" role="dialog" aria-labelledby="addressModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="address-modal-header">
        <div class="full-width d-flex justify-content-between">
            <h5 class="modal-title">ثبت آدرس جدید</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
      </div>
      <div class="modal-body">
        <div id="addressMap">
                <l-map
                ref="map"
                    v-if="mapOptions.showMap"
                    :zoom="mapOptions.zoom"
                    :center="mapOptions.center"
                    :options="mapOptions.mapOptions"
                    style="height: 100%;width:100%;"
                    @update:center="updateCenter"
                    @update:zoom="zoomUpdate"
                >
                    <l-tile-layer
                        :url="mapOptions.url"
                    />
                    <l-marker v-if="setAddress" :lat-lng="markerPosition">
                        <l-icon
                        :icon-size="[40,40]"
                        icon-url="/assets/site/images/seller-icons/target-pin.svg"
                        />
                    </l-marker>
                </l-map>
            <icon-image address="/assets/site/images/seller-icons/loc.svg" v-if="marker" classes="map-marker huge"></icon-image>
            <button class="map-control purple-btn" ref="bt" @click="change">انتخاب موقعیت</button>
          </div>
          <p class="invalid">{{message}}</p>
      </div>
      <div class="modal-footer pt-2 pb-2 pr-4 pl-4">
        <div class="row full-width">
          <div class="col-6 p-0">
            <custom-input kind="text" container="full-width" classes="full-width mr-2" v-bind:theModel.sync="theAddress.name" label="نام آدرس" placeholder="نام آدرس"></custom-input>    
          </div>
          <div class="col-6 p-0 pr-3 pl-2">
            <custom-input kind="searchInput" :suggestions="districts" @addTag="selectDistrict" label="محله" container="full-width" v-bind:theModel.sync="theAddress.district_id" classes="block full-width">
              <p v-if="theDistrict != null">{{theDistrict.name}}</p>
            </custom-input>
          </div>
          <div class="col-12 p-0 pl-3">
            <custom-input kind="text" container="full-width" classes="full-width mr-2" v-bind:theModel.sync="theAddress.address" label="متن آدرس" placeholder="متن آدرس"></custom-input>
          </div>
          <div class="col-12 p-0 pr-3 pl-2">
            <button class="purple-btn mt-3 full-width" @click="send">ذخیره و ثبت</button>
          </div>
        </div>        
      </div>
    </div>
  </div>
</div>
</template>
<script>
import { ref, watch } from "@vue/composition-api";
import CustomInput from "./CustomInput"
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LIcon,LControl } from "vue2-leaflet";
import IconImage from "./icon"
import "leaflet/dist/leaflet.css";
export default {
    components: {
    IconImage,
    LMap,
    LTileLayer,
    LMarker,
     LIcon,
     CustomInput
  },
  data:()=>({
      setAddress:false,
      marker:true,
      theCenter:null,
      message:null,
      theAddress:{
        name:{value:null,valid:true},
        district_id:{id:null,value:null,valid:true},
        lat:null,
        long:null,
        address:{value:null,valid:true}
      },
      markerPosition:null,
      theDistrict:null
  }),
  mounted(){
    // this.$refs.bt.click()
    // alert("ini",this.initial)
    if(this.initial){
      this.theAddress.name.value = this.initial.name
      this.theAddress.lat = this.initial.lat
      this.theAddress.long = this.initial.long
      this.theAddress.address.value = this.initial.address
      // this.theAddress.district_id.value = this.initial.district_id
      this.districts.map((dd)=>{
        console.log(dd.id)
        console.log(this.initial.district_id)
        if(this.initial.district_id == dd.id){
          this.theDistrict = {}
          this.theDistrict.text = dd.name
          this.theDistrict.value = dd.id
          this.theDistrict.name = dd.name
          this.theDistrict.id = dd.id
        }
      })
    }
    setTimeout(()=>{
      if(this.$refs.map)
            this.$refs.map.mapObject.invalidateSize()
        },4000)
  },
  methods:{
      change:function(){
        this.setAddress = true
        this.theAddress.lat=this.theCenter.lat
        this.theAddress.long=this.theCenter.lng
        this.marker=false
        this.markerPosition = latLng(this.theAddress.lat,this.theAddress.long)
      },
      updateCenter:function(c){
        this.$refs.map.mapObject.invalidateSize()
          if(!this.marker){
              this.marker = true
          }
          this.theCenter = latLng(c.lat,c.lng)
          console.log(this.address)
      },
      markerr:function(){
          this.marker = !this.marker
      },
      send:function(){
        if(this.theAddress.lat == null){
          this.message = "لطفا ابتدا موقعیت مورد نظر را یافته و سپس بر روی دکمه ی انتخاب موقعیت کلیک کنید!"
        }
        if(this.theAddress.address.value == null || this.theAddress.address.value == ''){
          this.theAddress.address.valid = false
          this.theAddress.address.message = "لطفا متن آدرس را وارد کنید"
        }
        if(this.theAddress.name.value == null || this.theAddress.name.value == ''){
          this.theAddress.name.valid = false
          this.theAddress.name.message = "لطفا نام آدرس را وارد کنید"
        }
        else if(this.theAddress.lat != null && (this.theAddress.name.value != null || this.theAddress.name.value != '') && (this.theAddress.address.value != null || this.theAddress.address.value != '')){
          this.theAddress.address.valid = true
          this.theAddress.name.valid = true
          this.theAddress.district_id = this.theDistrict.id
          this.$emit('addressComplete',this.theAddress)
        }
      },
      selectDistrict: function(d){
        console.log({d})
        this.theDistrict = d
      }
  },
  inject:['global'],
  props:['districts','initial'],
  setup(props) {
    const style = ref({value:null,valid:true})
    
    watch(props,(n,o)=>{
      if(props.initial){
        mapOptions.value.center = latLng(n.initial.lat,n.initial.long)
      }
    })
    const mapOptions=ref({
        zoom: 13,
      center: (props.initial ? latLng(props.initial.lat,props.initial.long) : latLng(35.76, 51.433611)),
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
        console.log({center})
        console.log({address:address.value})
        mapOptions.value.currentCenter = center;
    }

    return {style,mapOptions,centerUpdate,zoomUpdate ,address};
  }
}
</script>
<style scoped>
#addressMap {
  width: 600px;
  height:300px;
  position: relative;
  margin-left: auto;
  margin-right: auto;
}

#addressMap .map-marker{
  position: absolute;
  z-index: 1111 !important;
  top: 125px;
  right: 275px;
}

.address-modal-header{
    padding:0.5rem 2rem 0.5rem 2rem;
    border-bottom: 1px solid rgba(179,179,179,0.3);
}

.map-control{
  position: absolute;
  z-index: 1111 !important;
  bottom: 5%;
  left: 5%;
}

.modal-dialog{
    max-width: 700px !important;
}
.purple-btn{
  /* padding: 0px !important; */
}

.invalid{
  color: red;
  margin-top: 1rem;
  text-align: center;
  width: 100%;
}
</style>