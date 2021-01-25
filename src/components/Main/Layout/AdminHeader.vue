<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">ادمین گلپینو</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <router-link :to="{name:'Golpino Display Categories Page'}">
                        <a class="nav-link" href="#">دسته بندی <span class="sr-only">(current)</span></a>
                    </router-link>
                </li>
                <li class="nav-item active">
                    <router-link :to="{name:'Golpino Display Ranges Page'}">
                    <a class="nav-link" href="#">محدوده ی خدمات <span class="sr-only">(current)</span></a>
                    </router-link>
                </li>
                <li class="nav-item active">
                    <router-link :to="{name:'Golpino Display Distances Page'}">
                    <a class="nav-link" href="#">فاصله ها <span class="sr-only">(current)</span></a>
                    </router-link>
                </li>
                <li class="nav-item active">
                    <router-link :to="{name:'Golpino Display Tags Page'}">
                    <a class="nav-link" href="#">تگ <span class="sr-only">(current)</span></a>
                    </router-link>
                </li>
                <li class="nav-item active">
                    <router-link :to="{name:'Golpino Display Attributes Page'}">
                    <a class="nav-link" href="#">خصوصیت <span class="sr-only">(current)</span></a>
                    </router-link>
                </li>
                <li class="nav-item active">
                    <router-link :to="{name:'Golpino Display Districts Page'}">
                        <a class="nav-link" href="#">منطقه <span class="sr-only">(current)</span></a>
                    </router-link>
                </li>
                <li class="nav-item active">
                    <router-link :to="{name:'Golpino Admin Orders Page'}">
                        <a class="nav-link" href="#">سفارش ها <span class="sr-only">(current)</span></a>
                    </router-link>
                </li>                    
                <li class="nav-item active">
                    <router-link :to="{name:'Golpino Display Discounts Page'}">
                        <a class="nav-link" href="#">تخفیف ها <span class="sr-only">(current)</span></a>
                    </router-link>
                </li>                    
                <li class="nav-item active">
                    <router-link :to="{name:'Golpino Verify Shops Page'}">
                        <a class="nav-link" href="#">فروشگاه ها <span class="sr-only">(current)</span></a>
                    </router-link>
                </li>                    
                <li class="nav-item active" @click="logout">
                    <a class="nav-link" href="#">خروج <span class="sr-only">(current)</span></a>
                </li>                    
            </ul>
        </div>
    </nav>
</template>
<script>
export default {
    methods:{
        logout:function(){
            this.$cookies.set('Golpino_admin','')
            this.$router.push('/')
            this.global.setUserType('wanderer')
            this.global.toggleLogin(false)
        }
    },
    inject:['global']
}
</script>