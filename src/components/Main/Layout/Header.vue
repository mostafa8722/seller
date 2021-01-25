<template>
    <div class="section" id="site-header">
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
        <nav class="navbar navbar-expand-lg navbar-light nav-purple">
            <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <router-link
                            to=""
                            class="nav-link btn-login"
                            data-toggle="modal"
                            data-target="#userAuthModal"
                            v-if="user === null"
                        >
                            <i class="fa fa-user"></i>
                            ورود / عضویت
                            <span class="sr-only">(current)</span>
                        </router-link>
                        <a
                            href="/user-panel"
                            class="nav-link btn-login"
                            v-else-if="user !== null && !hasShop()"
                        >
                            <i class="fa fa-user"></i>
                            {{
                                user.full_name !== null
                                    ? user.full_name
                                    : user.mobile
                            }}
                            <span class="sr-only">(current)</span>
                        </a>
                    </li>
                    <li class="nav-item btn-login">
                        <a
                            href="/seller-panel"
                            class="nav-link btn-login"
                            v-if="user && hasShop()"
                        >
                            <i class="fa fa-shopping-basket"></i>
                            فروشگاه
                        </a>
                        <router-link
                            style="border:none"
                            class="nav-link btn-login"
                            to="/seller"
                            v-if="!user"
                        >
                            <i class="fa fa-shopping-basket"></i>
                            ثبت فروشگاه
                        </router-link>
                    </li>
                </ul>
                <div
                    style="width:30%;margin-right: 20%"
                    class="position-relative"
                    v-if="$route.path !== '/'"
                >
                    <i
                        class="fa fa-search position-absolute"
                        style="top:50%;right:10px;transform: translateY(-50%);color: #8b8b8b99;"
                        @click="searching"
                    ></i>
                    <input
                        type="text"
                        class="form-control form-control-sm"
                        v-model="search"
                        @keydown.enter="searching"
                        style="padding-right:30px"
                        placeholder="جستجو نام گل یا گل فروشی"
                    />
                </div>
            </div>
            <router-link to="/" class="navbar-brand">
                <img src="/assets/site/images/logo.png" width="80" alt="logo" />
            </router-link>
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
            search: null
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
            axios({ url: "/profile/show"}).then(response=>{
                this.user = response.data.data
                console.log("user",this.user)
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
.btn-login {
    background: #fff;
    border-radius: 3px;
    font-size: 12px;
    color: #3c3c3c !important;
}

ul.navbar-nav li {
    margin-right: 10px;
}

#site-header {
    z-index: 1000;
    position: relative;
}

.forget-password,
.single-code {
    cursor: pointer;
}

.modal-header .close {
    margin: 0 !important;
    padding: 0 !important;
}

.modal-title {
    margin: 0 auto !important;
    font-weight: normal;
}

.modal-dialog {
    padding: 40px;
}
.modal-open .modal {
    background: #000000ad;
}
</style>
