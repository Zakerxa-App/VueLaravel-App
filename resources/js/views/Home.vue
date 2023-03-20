<template>
    <div>

        <v-main class="pt-0" v-if="auth" :style="{ 'min-height': 'calc(100vh - 120px)' }">

            <v-container>
                <div class="row">
                    <div v-if="globalNoti" class="col-12 alert alert-success alert-dismissible fade show" role="alert">
                        <strong>{{ globalNoti }}</strong>, See you again.
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </div>
            </v-container>
            <v-container v-touch="{ left: () => $replace('chat'), right: () => $replace('menu') }" style="min-height:85vh">
                <div class="row">

                    <div class="col-12 text-center pt-4 pb-4">
                        Auth User : {{ auth ?? 'Unauthorize' }}
                        <div class="row">
                            <div>
                                <h1>{{ $t('welcome') }}</h1>
                                <p>{{ $t('hello') }}</p>
                            </div>
                        </div>

                    </div>


                    <div class="col-12">
                        <button @click="$goBack" class="btn btn-primary">GoBack</button>
                    </div>

                    <div v-if="auth" class="col-12">
                        <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa error totam sunt fuga molestias
                            et consequuntur repellat asperiores deserunt dolores, officia ea autem quia, voluptatibus animi
                            sit, nostrum ipsam repudiandae!</h4>
                        <div class="p-2">{{ authUser }}</div>
                    </div>
                </div>
            </v-container>
        </v-main>

        <v-app v-else :style="{ height: `calc(100vh - ${vAppBar}px)` }" v-touch="{ left: () => $replace('chat'), right: () => $replace('menu') }">
            <NetworkMeshWire>
                <section id="hero" :style="{ height: `calc(100vh - 120px)` }">
                    <div class="hero-content">
                        <h1>{{ $t('hero.heroTitle') }}</h1>
                        <p class="fw-bold">{{ $t('hero.heroSubTitle') }}</p>
                        <router-link :to="'/login'" class="btn fw-bold">{{ $t('btn.playNow') }}</router-link>
                    </div>
                </section>
            </NetworkMeshWire>
        </v-app>

    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data: () => ({

    }),
    methods: {
        increment() {
            this.$store.commit('increment');
        }
    },
    computed: {
        ...mapGetters(['count', 'auth', 'authUser', 'globalNoti'])
    },
    watch: {
        $route(to, from) {
            this.$store.commit('globalMessage', null)
        }
    },
    mounted() {
        // setInterval(() => {
        //     fetch('api/2d').then(res=>res.json()).then(res=>console.log(res));
        // }, 11000);

    },
    props:['vAppBar']
}
</script>


<style scoped>
#hero {
    background-size: cover;
    display: flex;
    align-items: center;
}

.hero-content {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    color: #fff;
}

#hero h1 {
    font-size: 3rem;
    font-weight: 700;
    margin: 0;
    line-height:4rem;
}

#hero p {
    font-size: 1.3rem;
    margin: 1.3rem 0 3rem 0;
    line-height: 1.5;
}

#hero .btn {
    position: relative;
    font-size: 1.2rem;
    font-weight: 700;
    text-transform: uppercase;
    background-color: #007bff;
    color: #fff;
    border-radius: 50px;
    padding: 1rem 2.5rem;
    transition: all 0.3s ease-in-out;
    border: none;
}

#hero .btn:hover {
    background-color: #0062cc;
}
</style>
