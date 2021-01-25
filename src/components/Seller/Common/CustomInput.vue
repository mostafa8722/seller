<template>
    <div v-if="kind=='dropDown'" class="shownInput">
        <select class="hiddenInput" :name="name" ref="theInput" v-model="myModel">
            <option v-for="(option,i) in selectItems" :value="option.value" :key="i">{{option.text}}</option>
        </select>
        <div class="select-facade" @click="selectToggle">
            <p class="mini-title">{{selectValue}}</p>
            <image-icon address="/assets/site/images/seller-icons/expand.svg" classes="small ml-2"></image-icon>
            <div class="select-options" v-if="selectShow">
                <div class="select-option" v-for="(option,i) in selectItems" :key="i" @click="()=>changeSelect(option.value)">
                    <p class="mini-title">{{option.text}}</p>
                </div>
            </div>
        </div>
    </div>
    <div v-else-if="kind=='text'" :class="'shownInput text-input ' + container">
        <image-icon v-if="icon!=''" :address="icon" classes="mid text-input-icon" ></image-icon>
        <label v-if="label != ''" :for="id">{{label}}</label>
        <input :disabled="deactive" :id="id" type="text" :class="'custom-text ' + classes" v-model="myModel" :placeholder="placeholder">
    </div>
    <div v-else-if="kind=='area'" :class="'shownInput text-input ' + container">
        <image-icon v-if="icon!=''" :address="icon" classes="mid text-input-icon" ></image-icon>
        <label v-if="label != ''" :for="id">{{label}}</label>
        <textarea :id="id" type="text" :class="'custom-text ' + classes" v-model="myModel" :placeholder="placeholder"></textarea>
    </div>
    <div v-else-if="kind=='tag'" :class="'shownInput text-input ' + container">
        <label v-if="label != ''" :for="id">{{label}}</label>
        <div class="tagManager row m-0">
            <input :id="id" type="text" :class="'hidden-text col-5 ' + classes" @input="(e)=>suggest(e)" v-model="myModel" :placeholder="placeholder">
            <div class="tags col-7">
                <slot></slot>
            </div>
            <div v-if="possibles.length>0" class="suggestions col-5 p-0">
                <div v-for="(p,i) in possibles" @click="()=>addTag(p)" class="suggestion p-0" :key="i">
                    {{p.text}}
                </div>
            </div>
        </div>
    </div>
    <div v-else-if="kind=='tick'" :class="'shownInput check-input ' + container">
        <div class="shownCheckBox mr-1 mini-title" @click="toggleCheck">
            <div class="tick mini-title" v-if="myModel"></div>
        </div>
        <label v-if="label != ''" :for="id">{{label}}</label>
        <input :id="id" ref="checkBox" :name="name" type="checkbox" :class="'hiddenInput ' + classes" v-model="myModel" :value="value">
    </div>
    <div v-else-if="kind == 'toggle'" class="shownInput toggle-input" :class="container">
        <div class="shownToggle mr-2 mini-title" @click="toggleCheck" :class="myModel ? 'activatedToggleBar' : ''">
            <div class="toggle mini-title" :class="myModel ? 'activatedToggle' : 'deactivatedToggle'"></div>
        </div>
        <label v-if="label != ''" :for="id">{{label}}</label>
        <input :id="id" ref="checkBox" :name="name" type="checkbox" :class="'hiddenInput ' + classes" v-model="myModel" :value="value">
    </div>
</template>
<script>
import ImageIcon from '../Common/icon'
export default {
    props:{
        kind:{
            type:String,
            required:true
        },
        selectItems:{
            default:()=>([])
        },
        theModel:{
            required:true
        },
        name:{
            type:String
        },
        icon:{
            type:String,
            default:''
        },
        placeholder:{
            type:String,
            default:''
        },
        classes:{
            type:String,
            default:''
        },
        container:{
            type:String,
            default:''
        },
        label:{
            type:String,
            default:''
        },
        suggestions:{
            default:()=>([])
        },
        value:{
            required:false
        },
        deactive:{
            type:Boolean,
            default:false
        }
    },
    components:{
        ImageIcon
    },
    data:function(){
        return{
            myModel:this.theModel,
            selectShow:false,
            id:null,
            possibles:[]
        }
    },
    methods:{
        selectToggle:function(){
            this.selectShow=!this.selectShow
        },
        changeSelect:function(v){
            this.myModel=v
        },
        suggest(e){
            if(e.target.value != ""){
            this.possibles = this.suggestions.filter((s)=>{
                return s.text.includes(e.target.value)
            })
            }
            else{
                this.possibles = []
            }
        },
        addTag(t){
            this.$emit('addTag',t)
            this.myModel=""
            this.possibles=[]
        },
        toggleCheck(){
            this.myModel = !this.myModel
        }
    },
    watch:{
        myModel:function(v,ov){
            this.$emit('update:theModel',v)
        }
    },
    computed:{
        selectValue:function(){
            return this.myModel
        }
    },
    mounted(){
        this.id = this._uid
    }
}
</script>
<style scoped>
label{
    font-size: 0.9rem;
    font-weight: lighter;
}
.shownInput{
    display: inline-block;
    width: auto;
    position: relative;
    height: auto;
}

.hiddenInput{
    position: absolute;
    visibility: hidden;
}

/* SELECT */

.select-facade{
    border:1px solid rgba(127, 127, 127, 0.4);
    border-radius: 5px;
    padding:4px 10px 4px 10px;
    min-width: 50px;
    position: relative;
}

.select-facade p{
    margin:0px;
}

.select-facade .small{

}

.select-options{
    max-height: 60px;
    overflow-y: scroll;
    overflow-x: hidden;
    width: 100%;
    position: absolute;
    background-color: #fff;
    box-shadow: 0px 0px 7px rgba(127, 127, 127, 0.3);
    border-right: 1px solid rgba(127, 127, 127, 0.3);
    border-left: 1px solid rgba(127, 127, 127, 0.3);
    border-bottom: 1px solid rgba(127, 127, 127, 0.3);
    top: 100%;
    left: 0px;
}

.select-option{
    padding:2px 6px 1px 0px;
    border-bottom: 1px solid rgba(127, 127, 127, 0.1);
}

.select-option:hover{
    background-color: #a1d6ff;
    cursor: pointer;
}

/* TEXT INPUT */
.text-input{
    position: relative;
}

.text-input-icon{
    position: absolute;
    right:6px;
    top:30%;
}

.custom-text{
    border:1px solid rgba(127, 127, 127, 0.3);
    color:rgba(0, 0, 0, 0.8);
    border-radius: 6px;
    padding:5px 30px 5px 0px;
    font-size: 0.85rem;
    font-weight: lighter;
}
 /* tag intput */
 .tagManager{
     border:1px solid rgba(127, 127, 127, 0.3);
     background-color: #fff;
     border-radius: 6px;
     padding: 4px 1px 4px 4px;
     position: relative;
 }

 .hidden-text{
     color:rgba(127, 127, 127, 0.4);
     border:none;
     height: 100%;
 }

 .suggestions{
     position: absolute;
     top: 100%;
     right:1px;
     background-color: #fff;
     border:1px solid rgba(127, 127, 127, 0.4);
     border-bottom-left-radius: 6px;
     border-bottom-right-radius: 6px;
 }
 .suggestion{
     border-bottom: 1px solid rgba(127, 127, 127, 0.4);
     color: rgba(127, 127, 127, 1);
     font-size: 0.8rem;
     padding-right: 5px;
 }

 .suggestion:hover{
     background-color: #772CE8;
     color: #fff;
     cursor: pointer;
 }

 /* CHECKBOX */
 .shownCheckBox{
     width: 17px;
     height: 17px;
     border-radius: 2px;
     padding:0px;
     border:1px solid rgba(127, 127, 127, 0.35);
     position: relative;
     top:0.4rem;
 }

 .tick{
     width: 11px;
     height:11px;
     background-color: #8e56e3;
     position: absolute;
     border-radius: 2px;
     top:2px;
     right: 2px;
 }
 /* TOGGLE */
 .shownToggle{
     width: 40px;
     height: 10px;
     background-color: rgba(127, 127, 127, 0.4);
     position: relative;
     border-radius: 5px;
 }

 .shownToggle:hover{
     cursor: pointer;
 }

 .activatedToggleBar{
     background-color: rgba(119,44,232,.33);
 }

 .activatedToggle{
     background-color: rgb(119,44,232);
     box-shadow: 0px 0px 6px rgba(119,44,232,0.7);
     right:65%;
 }

 .deactivatedToggle{
     background-color: #fff;
     box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.3);
     right:0px;
 }

 .toggle{
     position: absolute;
     top:-5px;
     width: 20px;
     height: 20px;
     border-radius: 50%;
     transition: right 0.3s ease-out;
     -moz-transition: right 0.3s ease-out;
 }

 .no-border{
     border:none !important;
 }
</style>