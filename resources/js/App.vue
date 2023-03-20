<template>
    <div v-if="loading" class="loading">
        <div class="row d-flex align-items-center p-0 m-0" style="height:100vh;width:100vw;">
            <div class="col-12 text-center p-0">
                <h3 class="fw-bold">{{ loadingIcon }}</h3>
            </div>
        </div>
    </div>
    <div v-else>
        <v-app align="center">

            <Navigation @navHeight="handleNavHeight" :user="authUser" />

            <v-card :style="{ background: background }">

                <router-view :style="{ 'padding-top': vAppBar + 'px' }" :vAppBar="vAppBar" v-slot="{ Component, route }">
                    <transition name="bounce" mode="out-in">
                        <component :is="Component" :key="$route.path" />
                    </transition>
                </router-view>

            </v-card>
        </v-app>
    </div>
</template>

<script>
import Footer from './components/Footer.vue';
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            loadingIcon: '<Zakerxa/>',
            loading: true,
            scrollPosition: '',
            scrollDown: true,
            vAppBar:'',
            windowSize: {
                x: 0,
                y: 0,
            },
        }
    },
    components: {
        Footer
    },
    created() {
        window.addEventListener('scroll', this.handleScroll);
    },
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        onResize() {
            this.windowSize = {
                x: window.innerWidth,
                y: window.innerHeight
            }
        },
        handleScroll() {
            var currentScrollPosition = window.scrollY;
            if (currentScrollPosition > this.scrollPosition) {
                if (currentScrollPosition >= 320) this.scrollDown = false;
            } else this.scrollDown = true;
            this.scrollPosition = currentScrollPosition;
        },
        handleNavHeight(e){
          console.log(e);
          this.vAppBar = e;
        }
    },
    computed: {
        ...mapGetters(['authUser'])
    },
    watch: {
        $route(to, from) {
            this.$store.dispatch('gettingAuthUser').then(() => {
                if (!this.authUser) this.$store.commit('removeAuthorize');
            }).catch(() => {
                if (!this.authUser) this.$store.commit('removeAuthorize');
            })
        }
    },
    created() {

    },
    mounted() {
        this.onResize()
        document.addEventListener('DOMContentLoaded', () => setTimeout(() => this.loading = false, 200));
        console.log(this.$vuetify.display.mobileBreakpoint)
        this.$nextTick(() => this.vAppBar = this.$refs.vAppBar);
    },
    beforeRouteUpdate(to, from, next) {
        this.$router.app.$nextTick(() => {
            to.meta.loading = true;
            setTimeout(() => {
                to.meta.loading = false;
                next();
            }, 1000);
        });
    },

}
</script>

<style lang="scss">
* {
    scroll-behavior: smooth;
    padding: 0;
    margin: 0;
}

.main {
    min-height: 100vh;
}

.loading {
    z-index: 10;
    position: fixed;
    height: 100vh;
    width: 100vw;
}


.bounce-enter-active {
    animation: bounce-in 0.2s;
}

.bounce-leave-active {
    animation: bounce-in 0.2s reverse;
}

@keyframes bounce-in {
    0% {
        transform: scale(0);
    }

    50% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(1);
    }
}

</style>
