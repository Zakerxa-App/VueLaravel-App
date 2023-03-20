<template>
    <v-main class="container" v-touch="{ left: () => $replace('register'), right: () => $replace('/') }">
        <div class="row justify-content-center d-flex align-items-center" :style="{ height: `calc(100vh - ${vAppBar}px )` }">
            <div class="col-11 col-sm-8 col-md-6 col-lg-4 text-center position-relative">
                <div v-show="loginLoading" class="overlayLoading">
                    <div class="row">
                        <p class="text-muted">Loading . . .</p>
                    </div>
                </div>
                <v-card class="p-3 pt-4 pb-5 border shadow-sm" style="border-radius: 4px">
                    <v-form @submit.prevent="login" v-model="validate">
                        <h3 class="fw-bold pb-3 pt-3">{{ $t('account.login') }}</h3>
                        <!-- Login Errors -->
                        <p v-if="loginErrors" class="alert alert-danger small p-2">
                            {{ loginErrors }}
                        </p>
                        <!-- GlobalNoti -->
                        <p v-if="globalNoti" class="alert alert-success small p-2">
                            {{ globalNoti }}
                        </p>

                        <v-text-field :label="$t('account.email')" v-model="email" :model-value="email"
                            :rules="[rules.required,rules.email]" variant="outlined" :hint="$t('account.rules.hint') + ' name@gmail.com'">
                        </v-text-field>

                        <v-text-field class="mt-2" :label="$t('account.password')" :type="checkPassword" v-model="password"
                            :model-value="password" @keyup="checkPass" variant="outlined" counter
                            :rules="[rules.required, rules.min]" :hint="$t('account.rules.hint')+' password1234'">
                            <font-awesome-icon v-show="showicon" @click="eyecheck()" :icon="checkIcon"
                                class="text-end position-absolute pt-2 pb-2"
                                style="margin-right: 10px; cursor: pointer; bottom: 10px; right: 0"></font-awesome-icon>
                        </v-text-field>

                        <div class="mt-2">
                            <v-btn :disabled="!validate" :loading="loading" block color="success"
                                class="pt-1 text-light fw-bold w-100" style="height: 45px" type="submit">
                                {{ $t('btn.login') }}</v-btn>
                        </div>

                        <div class="mt-3 pb-3">
                            <router-link
                                class="v-btn v-btn--elevated pt-1 v-theme--dark v-btn--density-default v-btn--size-default v-btn--variant-elevated fw-bold w-100"
                                to="/register" style="height: 45px">
                                <span class="v-btn__overlay"></span>
                                <span class="v-btn__underlay"></span>
                                <span class="v-btn__content text-light"> {{ $t('btn.register') }} </span>
                            </router-link>
                        </div>
                    </v-form>
                </v-card>
            </div>
        </div>
    </v-main>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            left: '<---------',
            validate: false,
            showicon: false,
            loginLoading: false,
            checkPassword: "password",
            checkIcon: "fa-solid fa-eye-slash",
            checkState: true,
            password: "",
            email: "",
            rules: {
                required: (value) => !!value || this.$t('account.rules.required'),
                counter: (value) => value.length <= 30 || "Max 30 characters",
                min: (v) => v.length >= 6 || this.$t('account.rules.min'),
                email: (value) => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return pattern.test(value) || this.$t('account.rules.invalidEmail');
                },
            },
        };
    },
    methods: {
        eyecheck() {
            this.checkState = !this.checkState;
            if (this.checkState) {
                this.checkPassword = "password";
                this.checkIcon = "fa-solid fa-eye-slash";
            } else {
                this.checkPassword = "text";
                this.checkIcon = "fa-solid fa-eye";
            }
        },
        checkPass() {
            if (this.password.length >= 1) this.showicon = true;
            else this.showicon = false;
        },
        login(e) {
            if (!this.validate) return;
            e.preventDefault();
            this.loginLoading = true;
            this.$store
                .dispatch("csrf")
                .then((res) => this.ready(res))
                .catch((res) => this.ready(res));
        },
        ready(csrf) {
            this.$store
                .dispatch("login", {
                    email: this.email,
                    password: this.password,
                    _token: csrf,
                })
                .then(() => this.redirect())
                .catch(() => this.redirect());
        },
        redirect() {
            this.clearData();
            this.loginLoading = false;
            if (this.$store.state.auth) this.$replace('/');
        },
        clearData() {
            this.$store.commit("removeGlobalMessage");
            this.showicon = false;
            this.password = "";
            this.email = "";
        },
    },
    watch: {
        $route(to, from) {
            this.$store.commit("clearLoginError");
        },
    },
    computed: mapGetters(["auth", "loginErrors", "globalNoti"]),
    props: ['vAppBar'],
    mounted() {
        this.checkPass();
    },
};
</script>

<style lang="scss">
.v-messages {
    flex: none;
}

.overlayLoading {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 9999;
    border: none;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.749);

    div {
        justify-content: center;
        position: absolute;
        align-items: center;
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
    }
}
</style>
