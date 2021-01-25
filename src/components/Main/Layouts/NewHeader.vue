<template>
<div>
  <div
            class="modal fade"
            id="userAuthModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="userAuthModalLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog modal-md" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5
                            class="modal-title text-center text-dark"
                            id="userAuthModalLabel"
                        >
                            <i class="fa fa-user"></i>
                            ورود/عضویت
                        </h5>
                        <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="col-md-12" v-if="get_mobile">
                            <p
                                class="help-message text-center font-12 mb-4 text-dark"
                            >
                                برای
                                <span class="text-purple">ورود</span>
                                یا
                                <span class="text-purple"> ثبت نام </span>
                                شماره تلفن همراه خود را وارد نمایید.
                            </p>
                            <div class="form-group">
                                <label for="mobile" class="font-12 text-dark"
                                    >شماره موبایل</label
                                >
                                <input
                                    type="text"
                                    v-model="form.mobile"
                                    class="form-control form-control-sm"
                                    v-on:keyup.enter="handleMobile"
                                    id="mobile"
                                />
                            </div>
                            <submit
                                @click="handleMobile"
                                direction="left"
                                width="125"
                                title="ادامه"
                            />
                        </div>
                        <div class="col-md-12" v-if="get_code">
                            <div class="form-group">
                                <label for="code">کد ارسالی</label>
                                <input
                                    type="text"
                                    v-model="form.code"
                                    v-on:keyup.enter="handleCode"
                                    class="form-control form-control-sm"
                                    id="code"
                                />
                            </div>
                            <submit @click="handleCode" title="ارسال" />
                        </div>
                        <div class="col-md-12" v-if="get_confirm_password">
                            <div class="form-group">
                                <label for="full_name"
                                    >نام و نام خانوادگی</label
                                >
                                <input
                                    type="text"
                                    v-model="form.full_name"
                                    v-on:keyup.enter="handleConfirmPassword"
                                    class="form-control form-control-sm"
                                    id="full_name"
                                />
                            </div>
                            <div class="form-group" v-if="shop_modal">
                                <label for="full_name">نام فروشگاه</label>
                                <input
                                    type="text"
                                    v-model="form.name"
                                    v-on:keyup.enter="handleConfirmPassword"
                                    class="form-control form-control-sm"
                                    id="name"
                                />
                            </div>
                            <div class="form-group">
                                <label for="password">کلمه عبور</label>
                                <input
                                    type="password"
                                    v-model="form.password"
                                    v-on:keyup.enter="handleConfirmPassword"
                                    class="form-control form-control-sm"
                                    id="password"
                                />
                            </div>
                            <div class="form-group">
                                <label for="password_confirmation"
                                    >تکرار کلمه عبور</label
                                >
                                <input
                                    type="password"
                                    v-model="form.password_confirmation"
                                    v-on:keyup.enter="handleConfirmPassword"
                                    class="form-control form-control-sm"
                                    id="password_confirmation"
                                />
                            </div>
                            <submit
                                @click="handleConfirmPassword"
                                title="ارسال"
                            />
                        </div>
                        <div class="col-md-12" v-if="get_password">
                            <div class="form-group">
                                <label for="pass">کلمه عبور</label>
                                <input
                                    type="password"
                                    v-model="form.password"
                                    v-on:keyup.enter="handlePassword"
                                    class="form-control form-control-sm"
                                    id="pass"
                                />
                            </div>
                            <p
                                class="font-11 text-purple forget-password"
                                @click="handleForgetPassword"
                            >
                                رمز عبور خود را فراموش کرده اید؟
                            </p>
                            <p
                                class="text-purple font-11 single-code"
                                @click="handleSingleCode"
                            >
                                ورود با رمز یکبار مصرف
                            </p>
                            <submit @click="handlePassword" title="ارسال" />
                        </div>
                        <div class="col-md-12" v-if="login_by_code">
                            <div class="form-group">
                                <label for="login-by-code">کد ارسالی</label>
                                <input
                                    type="text"
                                    v-model="form.code"
                                    v-on:keyup.enter="handleLoginByCode"
                                    class="form-control form-control-sm"
                                    id="login-by-code"
                                />
                            </div>
                            <submit @click="handleLoginByCode" title="ارسال" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
  <div class="banner-top p-1">
    <p class="mini-title">درصد تخفیف برای برخی از محصولات در فروشگاه های تهران</p>
    <a href="" class="mini-title">مشاهده ی بیشتر</a>
  </div>
    <nav class="navbar navbar-expand-lg navbar-light pl-5 pr-3">
  <a class="navbar-brand" href="#"><span class="icon-circle-right"></span></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item mr-3 active">
        <a class="nav-link" href="#">دسته بندی گل ها<span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item mr-3 active">
        <a class="nav-link" href="#">مناسبت ها</a>
      </li>
      <li class="nav-item mr-3 active">
        <a class="nav-link" href="#">گل ترحیم</a>
      </li>
      <li class="nav-item mr-3 active">
        <a class="nav-link" href="#">حراج شاخه گل</a>
      </li>
    </ul>
    <ul class="navbar-nav ml-auto">
      <li class="nav-item mr-4 active">
        <a class="nav-link pt-1" href="#">
            <img src="/assets/site/images/icon/guide.svg" class="nav-image" alt="">
            <p>راهنما</p>
        </a>
      </li>
      <li class="nav-item mr-4 active">
        <a class="nav-link pt-1" href="#">
            <img src="/assets/site/images/icon/truck.svg" class="nav-image" alt="">
            <p>گلپینو اکسپرس</p>
        </a>
      </li>
      <li class="nav-item mr-4 active">
                                <router-link
                            to=""
                            class="nav-link btn-login pt-1"
                            data-toggle="modal"
                            data-target="#userAuthModal"
                            v-if="user === null"
                        >
                            <img src="/assets/site/images/icon/user.svg" class="nav-image" alt="">
                            <p>ورود / عضویت</p>
                        </router-link>
                                                <a
                            href="/user-panel"
                            class="nav-link btn-login pt-1"
                            v-else-if="user !== null && !hasShop()"
                        >
                            <img src="/assets/site/images/icon/user.svg" class="nav-image" alt="">
                            <p>                            {{
                                user.full_name !== null
                                    ? user.full_name
                                    : user.mobile
                            }}</p>
                        </a>
      </li>
      <li class="nav-item mr-4 active">
        <a class="nav-link pt-1" href="#">
            <div class="cart-count">1</div>
            <img src="/assets/site/images/icon/basket.svg" class="nav-image" alt="">
            <p>سبد خرید</p>
        </a>
      </li>
    </ul>
  </div>
  <!-- <div class="shadow-banner"></div> -->
</nav>

</div>
</template>
<script>
export default {
    data() {
        return {
            user: null,
            get_code: false,
            get_password: false,
            get_confirm_password: false,
            login_by_code: false,
            get_mobile: true,
            shop_modal: false,
            search: null,
            fullName:""
        };
    },
    created() {
        this.getUser();
    },
    mounted() {
        this.handleHeaderBackgroundColor();
    },
    watch: {
        $route: {
            handler: function() {
                this.handleHeaderBackgroundColor();
            }
        }
    },
    methods: {
        searching() {
            this.$router.push({
                path: "/shops",
                query: {
                    district: null,
                    category: null,
                    name: this.search
                }
            });
        },
        getUser() {
            axios({ url: "/profile/show", baseURL: "https://golpino.com/api/user" }).then(response=>{
                  this.user = response.data.data
                  this.fullName = this.user.full_name + ""
              }
            );
        },
        handleMobile() {
            axios
                .post("/auth/check-user-exist", this.form)
                .then(response => {
                    this.get_mobile = false;
                    if (response.data === 0) {
                        this.get_code = true;
                    } else {
                        this.get_password = true;
                    }
                })
                .catch(error => this.errorNotify(error));
        },
        handleCode() {
            axios
                .post("/auth/check-code", this.form)
                .then(response => {
                    if (response.data === 1) {
                        this.get_code = false;
                        this.get_confirm_password = true;
                    }
                })
                .catch(error => this.errorNotify(error));
        },
        handleConfirmPassword() {
            axios
                .post("/auth/set-password", this.form)
                .then(response => {
                    if (response.data !== 0) {
                        $cookies.set("user_token", response.data.token);
                        if (response.data.shops.length > 0)
                            $cookies.set(
                                "shops",
                                JSON.stringify(response.data.shops)
                            );
                        location.reload();
                    }
                })
                .catch(error => this.errorNotify(error));
        },
        handlePassword() {
            axios
                .post("/auth/check-password", this.form)
                .then(response => {
                    if (response.data !== 0) {
                        $cookies.set("user_token", response.data.token);
                        if (response.data.shops.length > 0)
                            $cookies.set(
                                "shops",
                                JSON.stringify(response.data.shops)
                            );
                        location.reload();
                    }
                })
                .catch(error => this.errorNotify(error));
        },
        handleForgetPassword() {
            this.get_password = false;
            this.get_code = true;
            axios
                .post(`/auth/send-code/${this.form.mobile}`)
                .then(response => response)
                .catch(error => this.errorNotify(error));
        },
        handleSingleCode() {
            this.login_by_code = true;
            this.get_password = false;
            axios
                .post(`/auth/send-code/${this.form.mobile}`)
                .then(response => response)
                .catch(error => this.errorNotify(error));
        },
        handleLoginByCode() {
            axios
                .post(`/auth/login-by-code`, this.form)
                .then(response => {
                    if (response.data !== 0) {
                        $cookies.set("user_token", response.data.token);
                        if (response.data.shops.length > 0)
                            $cookies.set(
                                "shops",
                                JSON.stringify(response.data.shops)
                            );
                        location.reload();
                    }
                })
                .catch(error => this.errorNotify(error));
        },
        handleShopModal() {
            this.shop_modal = true;
            $("#userAuthModal").modal();
        },
        handleHeaderBackgroundColor() {
            let background_color = "transparent";
            if (this.$route.path !== "/") background_color = "#451093";

            document.querySelector(
                ".nav-purple"
            ).style.background = background_color;
        }
    },
    name: "SiteHeader"
};
</script>
<style scoped>
.mini-title{
  display: inline-block;
}

.banner-top{
  background-color: #000000;
  color: #fff;
  text-align: center;
}

.banner-top a{
  color: #fff;
}

.navbar {
  background-color: #ffffff;
  padding:14px 0px 0px 0px;
  font-size: 0.7rem;
}

.shadow-banner{
    width: 65vw;
    height: 10px;
    position: absolute;
    bottom:0px;
    right:0px;
    background-color: coral;
    opacity: 0.4;
}
.nav-link{
    padding: 0px;
    text-align: center;
}

.cart-count{
    position: absolute;
    top:5px;
    height: 17px;
    width: 17px;
    border-radius: 50%;
    color: #fff;
    background-color: #9147FF;
    text-align: center;
    transition-property: all;
    transition-duration: .1s;
    transition-timing-function:ease-in-out;
}

.nav-link span{
  font-size: 1.2rem;
}

.nav-image{
    position: relative;
    bottom: 0;
    transition-property: all;
    transition-duration: .1s;
    transition-timing-function:ease-in-out;
}

.cart-count{

}

.nav-link:hover .nav-image{
    bottom: 7px;
}

.nav-link:hover .cart-count{
    top:-2px;
}
</style>