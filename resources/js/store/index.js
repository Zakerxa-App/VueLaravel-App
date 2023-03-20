import { createStore } from 'vuex';
import Auth from './modules/auth';
import Count from './modules/count';
import User from './modules/user';
const store = createStore({
    modules: { Auth, Count, User },
    state() {
        return {
            auth: localStorage.getItem('auth') || null,
            globalNoti: '',
            authUser: null,
            csrf: ''
        }
    },
    getters: {
        auth(state) {
            return state.auth;
        },
        authUser(state) {
            return state.authUser;
        },
        globalNoti(state) {
            return state.globalNoti;
        },
        csrf(state) {
            return state.csrf;
        }
    },
    mutations: {
        updateAuthorize(state, payload) {
            if (payload) localStorage.setItem('auth', payload);
            state.auth = localStorage.getItem('auth') || null;
        },
        removeAuthorize(state) {
            localStorage.removeItem('auth');
            state.auth = null;
            state.authUser = null;
        },
        globalMessage(state, payload) {
            state.globalNoti = payload ? payload : '';
        },
        removeGlobalMessage(state) {
            console.log("REmove Global Message");
            state.globalNoti = '';
        },
        updatecsrf(state, payload) {
            state.csrf = payload
        }
    },
    actions: {
        csrf({ state, commit, rootState }) {
            return new Promise((resolve, reject) => {
                fetch('api/v1/csrf').then(res => res.json()).then(res => {
                    console.log(res);
                    if (res != state.csrf) {
                        console.log("New session store", res)
                        commit('updatecsrf', res)
                        resolve(res);
                    } else reject(state.csrf);
                })
            })
        }
    }
});


export default store;