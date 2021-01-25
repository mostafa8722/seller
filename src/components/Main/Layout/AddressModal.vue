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
      </div>
      <div class="modal-footer pt-2 pb-2 pr-4 pl-4">
        <div class="row full-width">
          <div class="col-4 p-0">
            <custom-input kind="text" container="full-width" classes="full-width mr-2" v-bind:theModel.sync="theAddress.name" label="نام آدرس" placeholder="نام آدرس"></custom-input>    
          </div>
          <div class="col-8 p-0 pr-3 pl-2">
            <custom-input kind="text" container="full-width" classes="full-width mr-2" v-bind:theModel.sync="theAddress.address" label="متن آدرس" placeholder="متن آدرس"></custom-input>
          </div>
        </div>        
        <button class="purple-btn mt-3 full-width" @click="send">ذخیره و ثبت</button>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import { ref } from "@vue/composition-api";
import CustomInput from "../../Common/CustomInput"
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LIcon,LControl } from "vue2-leaflet";
import IconImage from "../../Common/icon"
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
      theAddress:{
        name:{value:null,valid:true},
        district_id:null,
        lat:null,
        long:null,
        address:{value:null,valid:true}
      },
      markerPosition:null
  }),
  mounted(){
    // this.$refs.bt.click()
    setTimeout(()=>{
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
      },
      markerr:function(){
          this.marker = !this.marker
      },
      send:function(){
        this.$emit('addressComplete',this.theAddress)
      }
  },
  inject:['global','initial'],
  setup() {
    const style = ref({value:null,valid:true})

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
  z-index: 112;
  top: 125px;
  right: 275px;
}

.address-modal-header{
    padding:0.5rem 2rem 0.5rem 2rem;
    border-bottom: 1px solid rgba(179,179,179,0.3);
}

.map-control{
  position: absolute;
  z-index: 112;
  bottom: 5%;
  left: 5%;
}

.modal-dialog{
    max-width: 700px !important;
}
.purple-btn{
  /* padding: 0px !important; */
}
</style>