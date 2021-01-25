<template>
    <div class="page">
        <admin-header v-if="global.user.value.isLoggedIn"></admin-header>
        <router-view></router-view>
    </div>
</template>

<script>
import IconImage from '../components/Common/icon'
import AdminHeader from '../components/Main/Layout/AdminHeader'
export default {
    components:{
        IconImage,
        AdminHeader
    },
    data:()=>({
        showModal:false
    }),
    inject:['global'],
    methods:{
        toggleModal:function(){
            this.showModal=!this.showModal
        }
    }
}
</script>
<style scoped>
html{
    background-color: #101924;
}
button:hover{
    cursor: pointer;
}

.page{
    width: 100%;
    padding: 0px;
    min-height: 100vh;
}


</style>