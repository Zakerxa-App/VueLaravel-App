require('bootstrap');
window.$ = window.jQuery = require('jquery');
import { createApp } from 'vue';

import App from "./App.vue";
import store from './store';
import vuetify from './vuetify';
import router from './router';
import cookie from './cookie';
import goback from './useful/goback';
import authorize from './authorize';
import Navigation from './components/Navigation.vue';
import { VueMultiImageUpload } from '@zakerxa/vue-multiple-image-upload';
import { VuePagination } from '@zakerxa/vue-laravel-pagination';

import NetworkMeshWire from './components/Network-Mesh-Wire.vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faLanguage, faHome, faHomeUser, faEnvelope, faPersonRunning, faHistory, faEye, faCheckCircle, faEyeSlash, faIdCardClip, faSearch, faBars, faCircleLeft, faCross, faMailForward, faBell, faSignOut, faMobileScreen, faDesktop, faMapLocationDot, faShieldHalved, faRightToBracket, faLock } from '@fortawesome/free-solid-svg-icons';
import { faWindows } from '@fortawesome/free-brands-svg-icons';
import { faCircleXmark, faComment } from '@fortawesome/free-regular-svg-icons';

library.add(faLanguage, faComment, faWindows, faHome, faHomeUser, faMailForward, faCircleLeft, faCross, faSignOut, faBell, faBars, faHistory, faCheckCircle, faEye, faEyeSlash, faPersonRunning, faIdCardClip, faSearch, faShieldHalved, faMapLocationDot, faEnvelope, faMobileScreen, faDesktop, faRightToBracket, faLock)

const app = createApp(App);

import { createI18n } from 'vue-i18n';
import messages from './lang';
const i18n = createI18n({
    locale: 'en', // set locale
    fallbackLocale: 'en', // set fallback locale
    messages
});

app.use(i18n);

// app.config.devtools = false;
// Vue Component
app.component('font-awesome-icon', FontAwesomeIcon);
app.component("vue-pagination", VuePagination);
app.component("vue-multi-image-upload", VueMultiImageUpload);
app.component("Navigation", Navigation);
app.component("NetworkMeshWire", NetworkMeshWire);

// Vue Use
app.use(router).use(store)
    .use({ install: (app, options) => app.config.globalProperties.$ = require('jquery') })
    .use(vuetify)

app.config.productionTip = false;

// Vue Mount
app.mount('#app');

// Vue Error Handler
app.config.errorHandler = (err) => console.log(err);


// Create Global Vue Property
const global = app.config.globalProperties;
global.$csrf = $('meta[name="csrf-token"]').attr('content');
global.$http = authorize;
global.$cookie = cookie;
global.$goBack = goback;

// Global Function
global.$replace = ((e) => { router.replace(e) })

// Global Color
global.$primary = '#2E86C1';
global.$bg = '#fff';
global.$text = '#232';
global.$background = '#3E93E2';
global.$yellow = '#EAF242';


// store.dispatch('gettingAuthUser').then(res => {
//     console.log("Global User", res);
// })




// document.getElementById('homeloading').style.display = 'none';
// $(document).ready(function() {
//     setTimeout(() => {
//         document.getElementById('showLoading').style.display = 'none';
//         document.getElementById('homeloading').style.display = 'block';
//     }, 500);
// });