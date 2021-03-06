<template>
    <div v-if="kind=='dropDown'" class="shownInput" :class="container">
        <select class="hiddenInput" :name="name" ref="theInput">
            <option v-for="(option,i) in selectItems" :value="option.value" :key="i">{{option.text}}</option>
        </select>
        <p class="label" v-if="label != ''" :class="labelClass">{{label}}</p>
        <div class="select-facade mt-2" :class="classes + (!inputModel.valid ? ' invalid ' : '')" @click="(e)=>selectToggle(e)">
            <p class="mini-title select-value" :class="inputClass">{{(valueToDisplay == '' ? ( placeholder ? placeholder : '') : valueToDisplay)}}</p>
            <image-icon v-if="!deactive" address="/assets/site/images/seller-icons/expand.svg" classes="small ml-2"></image-icon>
            <div class="select-options" :class="(selectShow ? 'select-show' : 'select-hide')">
                <div class="select-option option-text" :id="'selector' + id + i" v-for="(option,i) in selectItems" :key="i" @click="()=>dropDownFacadeSelected(option)">
                    <p class="mini-title">{{option.text}}</p>
                </div>
            </div>
        </div>
        <p v-if="!inputModel.valid" class="error-message">{{(inputModel.message ? inputModel.message : '')}}</p>
    </div>
    <div v-else-if="kind=='text'" :class="'shownInput text-input ' + container">
        <image-icon v-if="icon!=''" :address="icon" classes="mid text-input-icon" ></image-icon>
        <label v-if="label != ''" :for="id">{{label}}</label>
        <input :disabled="deactive" :id="id" :type="theType" :class="'custom-text ' + classes + (!inputModel.valid ? ' invalid ' : '')" @change="(e)=>changeInputValue(e)" :placeholder="placeholder">
        <p v-if="!inputModel.valid" class="error-message">{{(inputModel.message ? inputModel.message : '')}}</p>
    </div>
    <div v-else-if="kind=='area'" :class="'shownInput text-input ' + container">
        <image-icon v-if="icon!=''" :address="icon" classes="mid text-input-icon" ></image-icon>
        <label v-if="label != ''" :for="id">{{label}}</label>
        <textarea :rows="rows" :id="id" type="text" :class="'custom-text ' + classes" @change="(e)=>changeInputValue(e)" :placeholder="placeholder"></textarea>
        <p v-if="!inputModel.valid" class="error-message">{{(inputModel.message ? inputModel.message : '')}}</p>
    </div>
    <div v-else-if="kind=='tag'" :class="'shownInput text-input ' + container">
        <label v-if="label != ''" :for="id">{{label}}</label>
        <div :class="'tagManager row m-0 ' + extraClasses">
            <input  autocomplete="off" :id="id" type="text" :class="'hidden-text col-5 ' + classes"  @focus="(e)=>suggestAll(e)" @input="(e)=>suggest(e)" v-model="myModel.id" :placeholder="placeholder">
            <div class="tags col-7">
                <slot></slot>
            </div>
            <div v-if="possibles.length>0" class="suggestions col-5 p-0">
                <div v-for="(p,i) in possibles" @click="()=>addTag(p)" class="suggestion" :key="i">
                    {{p.text}}
                </div>
            </div>
        </div>
    </div>
    <div v-else-if="kind=='searchInput'" :class="'shownInput text-input ' + container">
        <label v-if="label != ''" :for="id" :class="labelClass">{{label}}</label>
        <div :class="'tagManager row m-0 ' + extraClasses">
            <input autocomplete="off" :id="id" type="text" :class="'hidden-text full-width ' + classes" @focus="(e)=>suggestAllPossibles(e)" @input="(e)=>suggestPossibles(e)" @change="(e)=>changeInputValue(e)" :placeholder="placeholder">
            <div class="searchInputResult">
                <div @click="resetSearch">
                    <slot></slot>
                </div>
            </div>
            <div :class="(possibles.length>0 ? 'possibles-show' : 'possibles-hide')" class="suggestions full-width p-0">
                <div v-for="(p,i) in possibles" @click="()=>addTag(p)" class="suggestion" :key="i">
                    {{p.text}}
                </div>
            </div>
        </div>
    </div>
    <div v-else-if="kind=='tick'" :class="'shownInput check-input ' + container">
        <div class="shownCheckBox mr-1 mini-title" @click="toggleTick">
            <div class="tick mini-title" v-if="inputModel.value"></div>
        </div>
        <label class="mini-title" v-if="label != ''" :for="id">{{label}}</label>
        <input :id="id" ref="checkBox" :name="name" type="checkbox" :class="'hiddenInput ' + classes" :value="value">
    </div>
    <div v-else-if="kind == 'radio'" class="radio-group">
        <p v-if="label != ''" class="mini-title">{{label}}</p>
        <div class="shownRadio" :class="container" v-for="(option,i) in selectItems"  :key="i">
            <input type="radio" :id="id + i" class="hiddenInput" :name="name" :value="option.value">
            <div class="actual-radio mini-title ml-2" @click="()=>selectRadioInput(option)">
                <div class="circle-radio" :id="id + 'circle' + i" :class="classes + (inputModel.value == option.value ? ' selected-radio' : '')"></div>
            </div>
            <p class="mini-title">{{option.text}}</p>
        </div>
    </div>
    <div v-else-if="kind == 'toggle'" class="shownInput toggle-input" :class="container">
        <div class="shownToggle mr-2 mini-title" @click="toggleInput" :class="inputModel.value ? 'activatedToggleBar' : ''">
            <div class="toggle mini-title" :class="inputModel.value ? 'activatedToggle' : 'deactivatedToggle'"></div>
        </div>
        <label v-if="label != ''" :for="id">{{label}}</label>
        <input :id="id" ref="checkBox" :name="name" type="checkbox" :class="'hiddenInput ' + classes" :value="value">
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
        initialEdit:{
            required:false
        },
        selectItems:{
            default:()=>([])
        },
        theModel:{
            required:false
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
        extraClasses:{
            type:String
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
        },
        rows:{
            default:7
        },
        inputClass:{
            type:String,
            default:''
        },
        labelClass:{
            type:String,
            default:''
        },
        initial:{
            required:false
        },
        theType:{
            type:String,
            default:'text'
        },
        inputModel:{
            required:true
        }
    },
    components:{
        ImageIcon
    },
    data:function(){
        return{
            selectShow:false,
            id:null,
            possibles:[],
            initiation:(this.initial ? true : false),
        }
    },
    methods:{
        // NEW METHODS
        changeInputValue : function(e){
            this.$emit('update:inputModel', {valid:true,value:e.target.value})
        },
        dropDownFacadeSelected:function(v){
            // this.valueToDisplay = v.text
            this.$emit('update:inputModel', {valid:true,value:v})
        },
        toggleTick : function() {
            this.$emit('update:inputModel', {valid:true,value:!this.inputModel.value})
        },
        selectRadioInput : function(v){
            this.$emit('update:inputModel', {valid:true,value:v.value})
        },
        toggleInput : function(){
            this.$emit('update:inputModel', {valid:true,value:!this.inputModel.value})
        },
        suggestAllPossibles : function(e){
            e.stopPropagation()
            this.$emit('update:inputModel', {valid:true,value:null})
            this.possibles = this.suggestions
        },
        suggestPossibles : function(e){
            e.stopPropagation()
            if(e.target.value != ""){
                this.possibles = this.suggestions.filter((s)=>{
                    return s.text.includes(e.target.value)
                })
            }
            else{
                this.possibles = []
            }
        },
        // NEW METHODS END
        selectToggle:function(e){
            e.stopPropagation()
            if(!this.deactive)
            this.selectShow=!this.selectShow
        },
        changeSelect:function(v){
            this.$emit("newSelect",v)
            // this.$emit('update:theModel',{valid:true,value:v})
            // console.log("vvvvvvv",v)
            // this.$emit('update:theModel',{valid:true,value:v})
            this.myModel.value=v
        },
        resetSearch(){
            this.$emit('addTag', {value:null,valid:true,id:null})
            document.getElementById(this.id).focus()
        },
        suggest(e){
            e.stopPropagation()
            if(this.suggestions.length<1){
                setTimeout(()=>{
                    if(e.target.value != ""){
                        this.possibles = this.suggestions.filter((s)=>{
                            return s.text.includes(e.target.value)
                        })
                    }
                    else{
                        this.possibles = []
                    }
                },1000)
            }
            else{
                if(e.target.value != ""){
                        this.possibles = this.suggestions.filter((s)=>{
                            return s.text.includes(e.target.value)
                        })
                    }
                    else{
                        this.possibles = []
                    }
            }
        },
        suggestAll(e){
            e.stopPropagation()
            this.myModel.value = null
            if(this.myModel.id){
                this.myModel.id = null
            }
            if(e.target.value == ''){
                this.possibles = this.suggestions
            }
        },
        suggestNone(e){
            e.stopPropagation()
            this.possibles = []
        },
        addTag(t){
            this.$emit('addTag',t)
            setTimeout(()=>{
                document.getElementById(this.id).value = ''
            },10)
            this.possibles=[]
        },
        toggleCheck(){
            this.myModel = !this.myModel
        },
        selectRadio(i){
            document.getElementById(this.id + i).checked = true
            this.myModel.value = document.getElementById(this.id + i).value
            let circles = document.getElementsByClassName('circle-radio')
            for (let [key, value] of Object.entries(circles)) {
                value.classList.remove('selected-radio')
            }
            document.getElementById(this.id + 'circle' + i).classList.add('selected-radio')
        },
        refreshSearch(){
            this.$emit('update:theModel',{valid:true,value:null,id:null})
        }
    },
    watch:{
        myModel:function(v,ov){
            // this.initiation = false
            this.$emit('update:theModel',v)
        },
        selectItems:function(v,ov){
            if(this.initiation){
                // this.$emit('update:theModel',{valid:true,value:v[0]})
                // this.changeSelect(v[0])
                // this.myModel.value=v[0]
                this.initiation = false
            }
        }
    },
    computed:{
        // NEW COMPUTES
        valueToDisplay:function(){
            let v = ''
            this.selectItems.map((it)=>{
                if(this.selectItems.length>0){
                    if(this.inputModel.value.value == it.value){
                        v = it.text
                    }
                }
            })
            return v
        },
        // NEW COMPUTES END
        selectValue:function(){
            return (this.myModel.value && this.myModel.value.text) ? this.myModel.value.text : this.placeholder
        },
        initialValue:function(){
            if(this.initial && this.selectItems.length>0){
                return this.selectItems[0]
            }
            else{
                return selectValue
            }
        },
        myModel:function(){
            // if(typeof this.theModel.value != 'undefined'){
                return this.theModel
            // }
            // if (this.initial && this.selectItems.length>0){
            //     this.$emit('update:theModel',this.selectItems[0])
            //     return {valid:true,value:this.selectItems[0]}
            // }
            // else{
            //     console.log("thisselect",this.selectItems[0])
            //     return {valid:true,value:this.selectItems[0]}
            // }
                
        }
    },
    mounted(){
        this.id = this._uid
        $(".shownInput" ).parents().click((e)=>{
            if(this.selectShow){
                this.selectShow = false
            }
        })
        $('.hidden-text').parents().click((e)=>{
            if(!e.target.classList.contains('hidden-text')){
                if((this.kind == 'searchInput' || this.kind =='tag') && this.possibles && this.possibles.length && this.possibles.length>0){
                    this.possibles = []
                    this.$emit('update:inputModel',{valid:true,value:null})
                }
            }
        })
    }
}
</script>
<style scoped>
p{
    margin: 0 !important;
}

label{
    font-size: inherit;
    font-weight: normal;
    
}

.label{
    font-weight: normal;
    overflow: hidden;
}

.invalid{
    background-color: #ffcac2 !important;
}

.error-message{
    color:#ff3629;
    font-size: 0.9rem;
    font-weight: lighter;
    margin-top: 7px !important;
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
    position: relative;
    min-width: 80px;
    font-weight: lighter;
    background-color: #fff;
}

.select-facade:hover{
    cursor: pointer;
}

.big-select{
    width:150px;
}

.huge-select{
    width: 250px;
}

.small-select{
    width: 100px;
}



.select-facade .small{
    position: absolute;
    left:5%;
    top:40%;
}

.select-options{
    overflow-y: scroll;
    overflow-x: hidden;
    width: 100%;
    position: absolute;
    background-color: #fff;
    box-shadow: 0px 0px 7px rgba(127, 127, 127, 0.3);
    border-right: 1px solid rgba(127, 127, 127, 0.3);
    border-left: 1px solid rgba(127, 127, 127, 0.3);
    border-bottom: 1px solid rgba(127, 127, 127, 0.3);
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
    transition: max-height 0.3s ease-out;
    top: 100%;
    left: 0px;
    min-width: 80px;
    z-index: 101;
}

.select-show{
    max-height: 100px;
    opacity: 1;
}

.select-hide{
    max-height: 0px;
    box-shadow: none;
    border:none;
}

.select-option{
    padding:5px 6px 4px 0px;
    border-bottom: 1px solid rgba(127, 127, 127, 0.1);
}

.select-option p{
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
    max-width: 99%;
    margin:0px;
    min-height: 25px;
}

.select-value{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 90%;
    padding-bottom: 0px;
  margin-right: 10px!important;
}

.select-option:hover{
    background-color: #a1d6ff;
    cursor: pointer;
}

/* TEXT INPUT */
.text-input{
    position: relative;
}

.light-facade{
    font-weight: lighter;
    color: rgba(127, 127, 127, 0.8);
}

::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  opacity: 0.7; /* Firefox */
  font-weight: lighter;
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
.barely-visible{
    border:1px solid rgba(127, 127, 127, 0.1) !important;
}
.custom-text:focus{
    outline:none;
    box-shadow: 0 0 3pt 1pt rgb(119, 44, 232,0.4);
}
.hidden-text:focus{
    outline:none;
}
 /* tag intput */
 .tagManager{
     border:1px solid rgba(127, 127, 127, 0.3);
     background-color: #fff;
     border-radius: 6px;
     padding: 1px;
     position: relative;
 }

 .searchInputResult{
     position: absolute;
     top: 5px;
     right: 10px;
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
     transition: max-height 0.4s ease-out;
     overflow-y: scroll;
     background-color: #fff;
     border:1px solid rgba(127, 127, 127, 0.4);
     border-bottom-left-radius: 6px;
     border-bottom-right-radius: 6px;
     z-index: 101;
 }

 .possibles-show{
     max-height: 110px;
 }


.possibles-hide{
    max-height: 0px;
    border:none;
}

 .suggestion{
     border-bottom: 1px solid rgba(127, 127, 127, 0.4);
     color: rgba(127, 127, 127, 1);
     font-size: 0.8rem;
     padding:0.3rem;
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

 /* RADIO BTN */
 .shownRadio{
     position: relative;
 }

 .actual-radio{
     width: 14px;
     height: 14px;
     background-color: rgba(127, 127, 127, 0.2);
     border-radius: 50%;
     border: 1px solid rgba(127, 127, 127, 0.4);
     position: relative;
     top:4px;
 }

 .circle-radio{
     width: 8px;
     height: 8px;
     position: absolute;
     top: 2px;
     right: 2px;
     background-color: #772CE8;
     border-radius: 50%;
     visibility: hidden;
 }

 .actual-radio:hover{
     cursor: pointer;
 }

 .selected-radio{
     visibility: visible;
 }

 .no-background{
     background: none !important;
 }
</style>