import cookie from '../../cookie';
import authorize from '../../authorize';
export default {
    state() {
        return {
            loginLimit: cookie.getCookie('loginCount') || null,
            loginCount: 1,
            loginError: '',
            registerError: ''
        }
    },
    getters: {
        loginErrors(state) {
            return state.loginError;
        },
        registerErrors(state) {
            return state.registerError;
        }
    },
    mutations: {
        loginTimes(state) {
            if (state.loginCount == 5) {
                // console.log("Set Cookie ", state.loginCount);
                state.loginCount = 1;
                cookie.setCookie('loginCount', 'Login Limited', 1 * 60 * 1000);
                state.loginLimit = cookie.getCookie('loginCount');
            }
        },
        loginError(state, res) {
            state.loginCount++;
            if (res) {
                // CSRF Errors Message
                state.loginError = res;

                res.password ? state.loginError = res.password[0] : '';
                res.email ? state.loginError = res.email[0] : '';
            } else state.loginError = '';
        },
        registerError(state, res) {
            if (res) {
                res.password ? state.registerError = res.password[0] : '';
                res.email ? state.registerError = res.email[0] : '';
                res.username ? state.registerError = res.username[0] : '';
                res.phone ? state.registerError = res.phone[0] : '';
                res.message ? state.registerError = res.message : '';
            } else state.registerError = '';
        },
        clearRegisterError(state) {
            state.registerError = '';
        },
        clearLoginError(state) {
            state.loginError = '';
        }
    },
    actions: {
        login({ state, commit, rootState }, forms) {

            if (forms.email.startsWith('09')) forms.email = forms.email.substring(1);
            else if (forms.email.startsWith('+959')) forms.email = forms.email.substring(3);

            if (state.loginCount < 5) {
                // if users is login too many,We will stop login temporary
                if (cookie.getCookie('loginCount')) {
                    state.loginError = 'Too many login.Try again later.';
                    return null;
                }

                return new Promise((resolve, reject) => {
                    fetch('api/user/login', {
                            method: 'post',
                            headers: {
                                "Accept": 'application/json',
                                "Content-Type": 'application/json',
                            },
                            credentials: "same-origin",
                            body: JSON.stringify(forms)
                        })
                        .then(res => res.json())
                        .then(res => {

                            if (res.message == 'CSRF token mismatch.') return reject(commit('loginError', 'CSRF token mismatch.'));
                            else if (res.response == 'success') resolve(commit('updateAuthorize', res.token, { root: true }));
                            else reject(commit('loginError', res.errors));

                        })
                        .catch(err => reject(commit('loginError', err.errors)))
                });
            } else {
                if (state.loginCount == 5) commit('loginTimes');
                state.loginCount++;
                state.loginError = 'Too many login.Try again later.';
            }

        },
        register({ commit, state, Rootstate }, payload) {
            return new Promise((resolve, reject) => {
                fetch('/api/user/register', {
                        method: 'post',
                        headers: {
                            "Accept": 'application/json',
                            "Content-Type": 'application/json',
                            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr('content')
                        },
                        credentials: "same-origin",
                        body: JSON.stringify(payload)
                    })
                    .then(res => res.json())
                    .then(res => {

                        if (res.message == 'CSRF token mismatch.') reject(commit('registerError', res));
                        else if (res.response == 'success') resolve(commit('globalMessage', 'Please check your email.\n', { root: true }));
                        else reject(commit('registerError', res.errors));

                    })
                    .catch(err => reject(commit('registerError', err.errors)))
            })
        },
        logout({ commit, state, rootState }) {
            return new Promise((resolve, reject) => {
                authorize('api/user/logout').then(res => {
                    if (res.data.response == 'logout') {
                        commit('removeAuthorize', '', { root: true })
                        commit('globalMessage', 'Good Bye', { root: true })
                        resolve();
                    } else reject('Unauthorize');
                })
            })
        }
    }

}
