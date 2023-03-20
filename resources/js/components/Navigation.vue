<template>
    <v-app-bar class="position-fixed w-100"
        :style="{ background: (appNav == 'info' ? '#00f' : (appNav == '' ? '#000' : appNav)) }"
        style="top:0;height: 2px;z-index:10007;" :elevation="2"></v-app-bar>

    <v-app-bar style="top:2px!important;height:auto;" ref="vAppBar">
        <template v-slot:prepend>
            <div class="text-center" style="background-color: transparent;">
               <h3 class="fw-bold mb-0 p-3">Zakerxa</h3>
            </div>
        </template>
        <template v-slot:append>

            <!-- Dark Mode -->
            <DarkMode />

            <!-- Language -->
            <Language />

            <!-- Login & Logout -->
            <v-btn class="p-0">
                <div v-if="auth" @click="logout" class="nav-link pr-3 pl-3 fw-bold position-relative"
                    :style="{ color: $background }" active-class="active" aria-current="page">
                    <font-awesome-icon class="position-relative" style="font-size: x-large;top:2px;"
                        icon="fas fa-right-to-bracket" />
                    <span class="d-inline-block position-relative" style="top: -2px"> <span
                            class="d-none d-sm-block ml-1">Logout</span></span>
                </div>
                <router-link v-else class="nav-link pr-3 pl-3 fw-bold position-relative" :style="{ color: $background }"
                    active-class="active" aria-current="page" to="/login">
                    <font-awesome-icon class="position-relative" style="font-size: x-large;top:2px;"
                        icon="fa-solid fa-lock" />
                    <span class="d-inline-block position-relative" style="top: -2px"> <span
                            class="d-none d-sm-block ml-1">Login</span></span>
                </router-link>
            </v-btn>

        </template>
    </v-app-bar>

    <v-bottom-navigation v-if="$route.name != 'Chat' && $route.name != 'Login' && $route.name != 'Register'" :elevation="5" v-model="value" :bg-color="appNav" grow mode="shift">
        <v-btn theme="zplus" v-for="(route, i) in router" :key="i" :value="i" active-class="active" aria-current="page"
            :to="route.path" @click="$replace(route.path)">
            <v-icon><font-awesome-icon :icon="route.icon" /></v-icon>
            <span>{{ route.name }}</span>
        </v-btn>
    </v-bottom-navigation>
</template>

<script>
import DarkMode from '../settings/DarkMode.vue'
import Language from '../settings/Language.vue';
import { onMounted } from 'vue'
import { useDisplay } from 'vuetify'
export default {
    setup() {
        const { mobile } = useDisplay()

        onMounted(() => {
            console.log("Sa", mobile.value) // false
        })
    },
    data() {
        return {
            title: '<Zakerxa/>',
            value: 0,
            navIcon: 'navbar-toggler-icon',
            navTran: 'transform: rotateZ(0deg);',
            navCheck: false,
            vAppBar: '',
            router: [
                {
                    name: 'Menu',
                    icon: 'fa-brands fa-windows',
                    path: '/menu'
                },
                {
                    name: 'Home',
                    icon: 'fa-solid fa-house-user',
                    path: '/'
                },
                {
                    name: 'Chat',
                    icon: 'fa-regular fa-comment',
                    path: '/chat'
                }
            ],
        }
    },
    methods: {
        logout() {
            this.$store
                .dispatch('logout')
                .then(() => this.$to('/'))
                .catch(() => console.log('Unauthorize User'))
        }
    },
    computed: {
        auth() {
            return this.$store.state.auth
        },
        appNav() {
            switch (this.value) {
                case 0:
                    return 'info'
                case 1:
                    return ''
                case 2:
                    return 'yellow'
                default:
                    return ''
            }
        },
        background() {
            switch (this.value) {
                case 0:
                    return ''
                case 1:
                    return 'info'
                case 2:
                    return ''
                default:
                    return ''
            }
        }
    },
    components: {
        DarkMode,
        Language
    },
    props: ['user'],
    mounted() {
        this.$vuetify.display.mobile ? this.$emit('navHeight', this.$refs.vAppBar.extensionHeight) : this.$emit('navHeight', this.$refs.vAppBar.height);
      // fetch('/api/v1/session').then(res => res.json()).then(res => this.checkDevice(res.device))
    }
}
</script>

<style lang="scss">

.v-toolbar__content {
    height: auto !important;
}

.nav-link {
    &:active {
        transition: border-bottom 0.2s;
        color: #3e93e2;
    }
}

.exact-active {
    font-weight: bold;
    cursor: pointer;
    color: #3e93e2 !important;
}

@media screen and (min-width: 768px) {}
</style>
