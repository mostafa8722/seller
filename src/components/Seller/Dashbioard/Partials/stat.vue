<template>
<div class="stat p-3">
    <div class="stat-stat">
        <p class="stat-title">{{title}}</p>
        <p class="stat-value">{{value}}</p>
        <div class="d-flex justify-content-center">
            <span class="stat-percent d-flex align-items-center mr-3">{{percent}}%</span>
            <image-icon :address="icon"></image-icon>    
            <p>نسبت به ماه گذشته</p>
        </div>
    </div>
    <div class="stat-icon">
        <image-icon :address="icon"></image-icon>
    </div>
</div>
</template>
<script>
import ImageIcon from '../../Common/icon'
export default {
    components:{
        ImageIcon
    },
    props:{
        icon:{
            type:String,
            required:true
        },
        title:{
            type:String,
            required:true
        },
        value:{
            type:String,
            required:true
        },
        percent:{
            type:String,
            required:true
        }
    },
    methods:{
        
    }
}
</script>
<style scoped>
.stat{
    background-color: #fff;
    -webkit-box-shadow: 0 0 10px #fff;
        box-shadow: 0 0 10px #fff;
        position: relative;
}
.stat-stat{
    display: inline-block;
}

.stat-icon{
    display: inline-block;
    position: absolute;
    top:10%;
    left:8%;
}

.stat-percent{
    background-color: #00C92F;
    color: #fff;
    border-radius: 5px;
    padding-left: 12px;
    padding-right: 12px;
    font-size: 1.1rem;
}

</style>