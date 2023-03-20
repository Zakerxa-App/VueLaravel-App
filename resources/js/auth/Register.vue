<template>
    <v-main class="container" v-touch="{ left: () => $replace('/'), right: () => $replace('login') }">
        <div class="row justify-content-center d-flex align-items-center" :style="{height:`calc(100vh - ${vAppBar}px )`}">
            <div class="col-11 col-sm-8 col-md-6 col-lg-4 text-center position-relative">
               <v-card class="p-3 pt-4 pb-4 border shadow-sm">
                <v-form v-if="stateOne" v-model="validate0">
                    <h3 class="fw-bold pb-3">{{ $t('account.register') }}</h3>
                    <p v-if="errors" class="alert alert-danger small p-2">{{errors}}</p>

                    <v-text-field :label="$t('account.fullName')"
                      v-model="form.username"
                      autocomplete="off"
                      variant="outlined"
                      type="text"
                      :placeholder="$t('account.fullName')"
                      :rules="[required,rules.mintext]"
                    >
                    </v-text-field>

                    <v-text-field class="mt-2" :label="$t('account.phone')"
                      v-model="form.phone"
                      autocomplete="off"
                      variant="outlined"
                      type="tel"
                      placeholder="+959XXXXXX"
                      counter
                      maxlength="13"
                      :rules="[required,rules.mintel]"
                    >
                    </v-text-field>

                    <div class="mt-2">
                        <v-btn :disabled="!validate0" color="dark" @click="stateOne=false" class="pt-1 text-light fw-bold w-100" style="height:45px;" type="submit"> {{$t('btn.next')}}</v-btn>
                    </div>

                </v-form>

                <v-form v-else v-model="validate1" @submit.prevent="register">
                    <h3 class="fw-bold pb-3">{{ form.username }}</h3>

                    <v-text-field :label="$t('account.email')"
                      v-model="form.email"
                      :readonly="loading"
                      autocomplete="off"
                      variant="outlined"
                      type="email"
                      placeholder="name@gmail.com"
                      :rules="[required, rules.email]"
                    >
                    </v-text-field>

                    <v-text-field class="mt-2" :label="$t('account.password')"
                      v-model="form.password"
                      :readonly="loading"
                      autocomplete="off"
                      variant="outlined"
                      type="password"
                      :placeholder="$t('account.rules.placeholderPass')"
                      :rules="[required,rules.minpass]"
                      :hint="$t('account.rules.min')"
                      counter
                    >
                    </v-text-field>

                    <!-- <input type="hidden" :value="$csrf" ref="rgcsrf" name="_token"> -->

                    <div class="mt-2">
                        <v-btn :disabled="!validate1"
                          :loading="loading" block color="success"
                          @click="register" class="pt-1 text-light fw-bold w-100" style="height:45px;" type="submit"> {{$t('btn.register')}}</v-btn>
                    </div>
                    <div class="mt-2">
                        <v-btn color="dark" @click="stateOne=true" class="pt-1 text-light fw-bold w-100" style="height:45px;" type="button"> {{$t('btn.back')}}</v-btn>
                    </div>
                </v-form>
               </v-card>
            </div>
        </div>
    </v-main>
    </template>


    <script>
    import { mapGetters } from 'vuex';
    export default {
        data() {
            return {
                registerLoading : false,
                stateOne: true,
                loading: false,
                validate0:false,
                validate1: false,
                form:{
                    username: '',
                    email : '',
                    phone : '',
                    password:'',
                    token : 'user',
                    _token : null
                },
                rules: {
                   counter: value => value.length <= 20 || 'Max 20 characters',
                   minpass: v => v.length >= 6 || this.$t('account.rules.min'),
                   mintext: v => v.length >= 4 || this.$t('account.rules.min4'),
                   mintel: v => v.length >= 11 || this.$t('account.rules.atLeastPhone'),
                   email: value => {
                     const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                     return pattern.test(value) || this.$t('account.rules.invalidEmail')
                   },
                }
            }
        },
        methods:{
            required (v) {
              return !!v ||  this.$t('account.rules.required')
            },
            register(e){
                if (!this.validate1) return
                e.preventDefault();
                this.registerLoading = true;
                this.$store.dispatch('csrf').then(csrf=> this.ready(csrf)).catch(csrf=> this.ready(csrf));
            },
            ready(res){
                // this.form._token = this.$refs.rgcsrf.value;
                this.form._token = res;
                this.$store.dispatch('register',this.form).then((e)=>  this.authRedirect()).catch((e) => this.clearData(e))
            },
            authRedirect () {
                this.clearData();
                this.$router.push(this.$route.query.redirect || '/login')
            },
            clearData(e) {
                console.log(e);
                this.registerLoading = false;
                this.stateOne = true;
                this.forms = {};
            },
        },
        watch:{
            $route (to, from){
            console.log("Now i'm leave register page");
            this.$store.commit('clearRegisterError')
           }
        },
        computed:mapGetters({errors:'registerErrors'}),
        props:['vAppBar'],
        mounted(){
           this.$nextTick(()=>{
            console.log(this.vAppBar)
           })
        }
    }
    </script>


    <style></style>
