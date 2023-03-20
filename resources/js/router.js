import { createRouter, createWebHistory } from "vue-router";
import store from "./store";
const auth = store.state.auth;
const routes = [{
        path: "/",
        name: "Home",
        component: require('./views/Home.vue').default,
    },
    {
        path: "/chat",
        name: "Chat",
        component: require('./views/Chatting.vue').default,
        meta: {
            protect: false,
        }
    },
    {
        path: "/menu",
        name: "Menu",
        component: require('./views/Menu.vue').default,
        meta: {
            protect: false,
        }
    },
    {
        path: "/contact",
        name: "Contact",
        component: require('./views/Contact.vue').default
    },
    {
        path: "/login",
        name: "Login",
        component: require('./auth/Login.vue').default
    },
    {
        path: "/register",
        name: "Register",
        component: require('./auth/Register.vue').default
    },
    {
        path: "/:pathMatch(.*)*",
        name: "PageNotFound",
        component: require('./views/PageNotFound.vue').default
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    // set the replace option to true
    linkActiveClass: "active",
    linkExactActiveClass: "exact-active"
});


router.beforeEach((to, from, next) => {
    if ((to.name == 'Login' || to.name == 'Register') && auth) next({ path: '/', replace: true })
    else if (to.meta.protect && !auth) next({ path: '/login' })
    else next()
})

export default router;