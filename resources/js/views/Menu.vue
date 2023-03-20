<template>
  <v-main>
    <v-container v-touch="{ left: () => $replace('/'), right: () => $replace('chat') }">
            <div class="row">
                <div v-if="globalNoti" class="col-12 alert alert-success alert-dismissible fade show" role="alert">
                    <strong>{{ globalNoti }}</strong>, See you again.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>

                <div class="col-12 text-center pt-4 pb-4">
                    Auth User : {{ auth ?? 'Unauthorize' }}
                    <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa error totam sunt fuga molestias et
                        consequuntur repellat asperiores deserunt dolores, officia ea autem quia, voluptatibus animi sit,
                        nostrum ipsam repudiandae!</h4>
                </div>

                <div class="col-12">
                    <button @click="$goBack" class="btn btn-primary">GoBack</button>
                </div>

            </div>
        </v-container>
  </v-main>
</template>

<script>
import {
    mapGetters
} from 'vuex';
export default {
    data: () => ({
        swipeDirection: 'None',
    }),
    methods: {
        increment() {
            this.$store.commit('increment');
        },
        swipe(direction) {
            console.log("here");
            this.swipeDirection = direction;
            console.log(direction);
        },
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

    }
}
</script>


<style></style>
